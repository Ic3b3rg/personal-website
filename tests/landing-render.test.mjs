import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const italianHtml = await readFile(
  new URL("../dist/it/index.html", import.meta.url),
  "utf8",
);
const englishHtml = await readFile(
  new URL("../dist/index.html", import.meta.url),
  "utf8",
);

function count(html, pattern) {
  return html.match(pattern)?.length ?? 0;
}

function bodyOf(html) {
  return html.match(/<body(?:\s[^>]*)?>([\s\S]*)<\/body>/)?.[1] ?? "";
}

test("Italian page renders the approved semantic content structure", () => {
  assert.equal(count(italianHtml, /<h1(?:\s|>)/g), 1);
  assert.ok(count(italianHtml, /<h2(?:\s|>)/g) >= 8);
  assert.ok(count(italianHtml, /<h3(?:\s|>)/g) >= 4);
  assert.match(italianHtml, /id="projects"/);
  assert.match(italianHtml, /id="faq"/);
  assert.equal(count(italianHtml, /<details(?:\s|>)/g), 5);
  assert.match(italianHtml, /Alcuni progetti su cui ho lavorato/);
  assert.match(italianHtml, /Possiamo lavorare insieme\./);
});

test("Italian page removes obsolete editorial counters", () => {
  assert.doesNotMatch(italianHtml, /Edizione 2026/);
  assert.doesNotMatch(italianHtml, /03 \/ 03/);
  assert.match(italianHtml, /Analisi → Sviluppo → Rilascio/);
});

test("Project evidence and external destinations render on both languages", () => {
  for (const html of [italianHtml, englishHtml]) {
    assert.match(html, /LiberiPro/);
    assert.match(html, /APAY E-wallet/);
    assert.match(html, /indigo\.ai/);
    assert.match(html, /https:\/\/www\.liberipro\.it\//);
    assert.match(
      html,
      /play\.google\.com\/store\/apps\/details\?id=it\.admiralpay/,
    );
    assert.match(html, /https:\/\/indigo\.ai\//);
  }
});

test("English page mirrors projects, FAQ, and contact sections", () => {
  assert.equal(count(englishHtml, /<h1(?:\s|>)/g), 1);
  assert.match(englishHtml, /id="projects"/);
  assert.match(englishHtml, /id="faq"/);
  assert.equal(count(englishHtml, /<details(?:\s|>)/g), 5);
  assert.match(englishHtml, /We can work together\./);
});

test("Both routes expose the approved SEO metadata", () => {
  assert.match(
    italianHtml,
    /<title>Sviluppatore Software Freelance Senior \| Silvio Ceccarini<\/title>/,
  );
  assert.match(
    italianHtml,
    /<meta name="description" content="Sviluppatore software freelance senior per startup e aziende\. Sviluppo app end-to-end e supporto team web e mobile, dal progetto al rilascio\."/,
  );
  assert.match(
    englishHtml,
    /<title>Senior Freelance Software Engineer \| Silvio Ceccarini<\/title>/,
  );
  assert.doesNotMatch(italianHtml, /6 anni di esperienza/);
  assert.doesNotMatch(englishHtml, /6 years of experience/);
});

test("SEO positioning copy stays out of the visible page content", () => {
  assert.doesNotMatch(
    bodyOf(italianHtml),
    /Sviluppatore software freelance senior per startup e aziende\./,
  );
  assert.doesNotMatch(
    bodyOf(englishHtml),
    /Senior freelance software engineer for startups and companies\./,
  );
});

test("Visible FAQs are also represented as structured data", () => {
  for (const html of [italianHtml, englishHtml]) {
    assert.match(html, /"@type":"FAQPage"/);
    assert.equal(count(html, /"@type":"Question"/g), 5);
    assert.equal(count(html, /"@type":"Answer"/g), 5);
  }
});
