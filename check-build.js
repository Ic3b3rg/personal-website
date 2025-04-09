import fs from "fs";
import crypto from "crypto";
import { exec } from "child_process";

const API_URL = `https://api.github.com/users/Ic3b3rg/events`;
const HASH_FILE = "./api-data.hash";

function saveLog(log) {
  const logDate = new Date();
  const timestamp = new Intl.DateTimeFormat("it-IT", {
    dateStyle: "short",
    timeStyle: "medium",
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
  }
}

async function checkAndBuild() {
  createHashFile();

  try {
    const data = await fetchEvents();
    const newHash = computeHash(data);
    const oldHash = getHash();

    if (newHash === oldHash) {
      saveLog("I dati API non sono cambiati. Build saltata.");
    } else {
      fs.writeFileSync(HASH_FILE, newHash, "utf8");
      saveLog("I dati API sono cambiati. Esecuzione della build...");
      exec("npm run build", (error, stdout, stderr) => {
        if (error) {
          console.error(`Errore durante la build: ${error}`);
          return;
        }
        saveLog(stdout);
        if (stderr) {
          saveLog(stderr);
          console.error(stderr);
        }
      });
    }
  } catch (error) {
    saveLog(`Errore nella lettura delle API: ${JSON.stringify(error)}`);
  }
}

checkAndBuild();
