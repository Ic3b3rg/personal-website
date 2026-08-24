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

  assert.equal(copy.role, "Sviluppatore Software Freelance Senior");
  assert.equal(
    copy.headline,
    "Sviluppo app da zero. Affianco team web e mobile.",
  );
  assert.match(copy.proof, /^7\+ anni di esperienza/);
  assert.equal(copy.heroBody.length, 3);
  assert.equal(copy.introduction.length, 7);
  assert.deepEqual(
    copy.services.map(({ title }) => title),
    ["Sviluppo app end-to-end", "Supporto a team web e mobile"],
  );
  assert.equal(copy.capabilityItems.length, 6);
  assert.equal(copy.projects.length, 3);
  assert.equal(copy.faqs.length, 5);
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
