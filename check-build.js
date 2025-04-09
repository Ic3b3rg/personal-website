import fs from "fs";
import crypto from "crypto";
import { exec as callbackExec } from "child_process";
import { promisify } from "util";

const exec = promisify(callbackExec);

const API_URL = `https://api.github.com/users/Ic3b3rg/events`;
const HASH_FILE = "./api-data.hash";

function saveLog(log) {
  const logDate = new Date();
  const timestamp = new Intl.DateTimeFormat("it-IT", {
    dateStyle: "short",
    timeStyle: "medium",
    timeZone: "Europe/Rome",
  }).format(logDate);
  fs.appendFileSync("build.log", `[${timestamp}] ${log}\n`, "utf8");
}

async function fetchEvents() {
  try {
    const response = await fetch(API_URL);
    return JSON.stringify(await response.json());
  } catch (error) {
    saveLog(JSON.stringify(error));
    throw Error(`Errore durante il fetch: ${error}`);
  }
}

function computeHash(data) {
  return crypto.createHash("sha256").update(data).digest("hex");
}
function createHashFile() {
  if (!fs.existsSync(HASH_FILE)) {
    fs.writeFileSync(HASH_FILE, "", "utf8");
  }
}
function getHash() {
  try {
    return fs.readFileSync(HASH_FILE, "utf8");
  } catch (err) {
    saveLog(
      "Nessun hash precedente trovato, build eseguita per la prima volta.",
    );
    return null;
  }
}

async function checkEdit() {
  try {
    const { stdout } = await exec("git pull");
    if (stdout.includes("Already up to date.")) {
      saveLog("Nessuna modifica trovata nel repository.");
      return false;
    } else {
      saveLog("Modifiche trovate nel repository.");
      return true;
    }
  } catch (error) {
    saveLog(`Errore durante git pull: ${error}`);
    return false; // In caso di errore, considera il repository come modificato (o gestisci l'errore diversamente)
  }
}

async function installDependencies() {
  saveLog("Installazione delle dipendenze...");
  try {
    const { stdout, stderr } = await exec("npm install");
    saveLog(stdout);
    if (stderr) {
      saveLog(stderr);
      console.error(stderr);
    }
  } catch (error) {
    saveLog(`Errore durante l'installazione delle dipendenze: ${error}`);
  }
}

async function buildProject() {
  saveLog("I dati API sono cambiati. Esecuzione della build...");
  try {
    const { stdout, stderr } = await exec("npm run build");
    saveLog(stdout);
    if (stderr) {
      saveLog(stderr);
    }
    saveLog("Build completata con successo.");
  } catch (error) {
    console.error(`Errore durante la build: ${error}`);
    saveLog(JSON.stringify(error));
  }
}

async function reloadNginx() {
  saveLog("Ricaricamento di Nginx...");
  try {
    const { stdout, stderr } = await exec("sudo systemctl reload nginx");
    saveLog(stdout);
    if (stderr) {
      saveLog(stderr);
      console.error(stderr);
    }
    return stdout;
  } catch (error) {
    console.error(`Errore durante il reload di Nginx: ${error}`);
    saveLog(JSON.stringify(error));
    return null;
  }
}

async function checkAndBuild() {
  createHashFile();
  const oldHash = getHash();
  try {
    const isRepoEdit = await checkEdit();
    if (isRepoEdit) {
      await installDependencies();
    }
    const data = await fetchEvents();
    const newHash = computeHash(data);
    fs.writeFileSync(HASH_FILE, newHash, "utf8");
    const isEventsEdit = newHash === oldHash;
    if (isEventsEdit || !isRepoEdit) {
      saveLog(
        "I dati API e della repository non sono cambiati. Build saltata.",
      );
    } else {
      await buildProject();
      await reloadNginx();
    }
  } catch (error) {
    saveLog(
      `Errore nella lettura delle API o nel controllo del repository: ${JSON.stringify(error)}`,
    );
  }
}

checkAndBuild();
