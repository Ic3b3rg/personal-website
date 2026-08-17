import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const page = async (path) => readFile(new URL(path, import.meta.url), "utf8");

const expectedLinks = [
  "https://cal.com/silvio-ceccarini-gqz1ul",
  "mailto:ceccarinisilvio8@gmail.com",
  "https://www.linkedin.com/in/silvio-ceccarini",
];

const assertLandingContract = (html, { lang, headline, alternateHref }) => {
  assert.match(html, new RegExp(`<html lang="${lang}"`));
  assert.match(html, /data-landing="manual"/);
  assert.ok(html.includes(headline));
  assert.match(html, /data-project-figure/);
  assert.match(html, /data-manual-state/);
  assert.match(html, new RegExp(`href="${alternateHref}"`));

  for (const href of expectedLinks) {
    assert.ok(html.includes(`href="${href}"`), `missing link: ${href}`);
  }

  for (const initials of ["L.S.", "E.S.", "V.C."]) {
    assert.ok(html.includes(initials), `missing recommendation: ${initials}`);
  }
};

test("English homepage renders the approved freelance landing", async () => {
  const html = await page("../dist/index.html");

  assertLandingContract(html, {
    lang: "en",
    headline: "I build apps from scratch and support web and mobile teams.",
    alternateHref: "/it/",
  });
});

test("Italian homepage renders the approved freelance landing", async () => {
  const html = await page("../dist/it/index.html");

  assertLandingContract(html, {
    lang: "it",
    headline: "Sviluppo app da zero e affianco team web e mobile.",
    alternateHref: "/",
  });
});
