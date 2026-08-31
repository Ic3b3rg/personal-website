import assert from "node:assert/strict";
import { stat } from "node:fs/promises";
import test from "node:test";

import { landingCopy } from "../src/components/Landing/copy.ts";

const expectedProjectUrls = [
  "https://www.liberipro.it/",
  "https://play.google.com/store/apps/details?id=it.admiralpay",
  "https://indigo.ai/",
];

test("Italian landing copy exposes the approved long-form narrative", () => {
  const copy = landingCopy.it;

  assert.equal(copy.role, "Software Freelance Senior");
  assert.equal(
    copy.headline,
    "Sviluppo app da zero o collaboro con team web e mobile",
  );
  assert.match(copy.heroBody[2], /^Costruisco applicazioni da zero,/);
  assert.match(copy.proof, /^7\+ anni di esperienza/);
  assert.equal(copy.heroBody.length, 3);
  assert.equal(copy.introduction.length, 7);
  assert.deepEqual(
    copy.services.map(({ title }) => title),
    ["Sviluppo", "Supporto a team web e mobile"],
  );
  assert.match(copy.approachParagraphs[2], /^Durante lo sviluppo può capitare/);
  assert.equal(copy.capabilityItems.length, 6);
  assert.equal(copy.projects.length, 3);
  assert.equal(copy.faqs.length, 5);
});

test("About copy preserves the approved Italian narrative in both languages", () => {
  const italian = landingCopy.it;
  const english = landingCopy.en;

  assert.equal(italian.aboutTitle, "Chi sono");
  assert.deepEqual(italian.aboutParagraphs, [
    "Mi piace capire come funzionano le cose. Soprattutto, mettendoci mano.",
    "Sono una persona curiosa e pratica. Assemblo, smonto, sperimento, anche sbagliando, per capire cosa posso fare di meglio.",
    "È un approccio che mi accompagna nel software, ma la curiosità per la tecnologia non finisce con il mio lavoro. Al di fuori, costruisco e piloto droni FPV e sperimento con elettronica, IoT e domotica.",
    "Non mi basta che qualcosa funzioni: voglio capire perché funziona, come è costruito e dove può essere migliorato.",
    "Quando voglio cambiare completamente registro, mi perdo in un videogioco o suono la batteria. Quest’ultima rappresenta un altro lato di me: richiede coordinazione, ritmo, pratica e costanza, ma, allo stesso tempo, lascia spazio alla creatività.",
    "Infatti mi piace quando posso trasformare un'idea in qualcosa di concreto: che sia la musica, un'applicazione, un drone assemblato pezzo per pezzo o un'automazione che prima esisteva soltanto nella mia testa.",
    "In fondo, il filo conduttore è sempre lo stesso: mi diverte partire da un'idea e capire come farla funzionare.",
  ]);
  assert.equal(english.aboutTitle, "About me");
  assert.equal(english.aboutParagraphs.length, italian.aboutParagraphs.length);
  assert.match(english.aboutParagraphs.join(" "), /FPV drones/);
  assert.match(english.aboutParagraphs.join(" "), /play the drums/);
});

test("Project evidence uses the approved products, facts, and destinations", () => {
  const projects = landingCopy.it.projects;

  assert.deepEqual(
    projects.map(({ name }) => name),
    ["LiberiPro", "APAY E-wallet", "indigo.ai"],
  );
  assert.deepEqual(
    projects.map(({ href }) => href),
    expectedProjectUrls,
  );
  assert.match(projects[0].description.join(" "), /300 membri/);
  assert.match(projects[1].description.join(" "), /100\.000 download/);
  assert.match(projects[2].description.join(" "), /cinque secondi/);
});

test("Every project uses a local, non-empty logo asset", async () => {
  for (const project of landingCopy.it.projects) {
    const logo = await stat(
      new URL(`../public${project.logoSrc}`, import.meta.url),
    );

    assert.ok(logo.isFile(), `${project.name} logo must be a file`);
    assert.ok(logo.size > 0, `${project.name} logo must not be empty`);
  }
});

test("English copy is a complete native adaptation of the Italian structure", () => {
  const italian = landingCopy.it;
  const english = landingCopy.en;

  assert.equal(english.role, "Senior Freelance Software Engineer");
  assert.equal(
    english.headline,
    "I build apps from scratch or collaborate with web and mobile teams",
  );
  assert.equal(english.services[0].title, "Development");
  assert.match(english.proof, /^7\+ years of experience/);
  assert.equal(english.heroBody.length, italian.heroBody.length);
  assert.equal(english.introduction.length, italian.introduction.length);
  assert.equal(english.services.length, italian.services.length);
  assert.equal(english.capabilityItems.length, italian.capabilityItems.length);
  assert.equal(english.projects.length, italian.projects.length);
  assert.equal(english.faqs.length, italian.faqs.length);
  assert.deepEqual(
    english.projects.map(({ href }) => href),
    expectedProjectUrls,
  );
});
