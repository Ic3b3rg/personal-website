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

test("Brand and workflow render their visual assets accessibly", () => {
  const pages = [
    [italianHtml, "Analisi → Sviluppo → Rilascio"],
    [englishHtml, "Analysis → Development → Release"],
  ];

  for (const [html, flowTitle] of pages) {
    assert.match(
      html,
      /<a[^>]*class="manual-mark"[^>]*>[\s\S]*?<img[^>]*class="manual-mark__avatar"[^>]*src="\/silvio-avatar\.35c8d6f7\.png"/,
    );

    const renderedFlowTitle = html.match(
      /<h2[^>]*data-flow-title[^>]*>[\s\S]*?<\/h2>/,
    )?.[0];

    assert.ok(renderedFlowTitle);
    assert.match(renderedFlowTitle, new RegExp(`aria-label="${flowTitle}"`));
    assert.equal(count(renderedFlowTitle, /data-flow-stage/g), 3);
    assert.equal(count(renderedFlowTitle, /data-flow-connector/g), 2);
  }
});

test("Header brand stays logo-only in both languages", () => {
  for (const html of [italianHtml, englishHtml]) {
    const brand = html.match(
      /<a[^>]*class="manual-mark"[^>]*>[\s\S]*?<\/a>/,
    )?.[0];

    assert.ok(brand);
    assert.match(brand, /<img[^>]*class="manual-mark__avatar"/);
    assert.doesNotMatch(brand, /<strong(?:\s|>)/);
  }
});

test("Hero owns the primary conversion while the profile stays editorial", () => {
  for (const html of [italianHtml, englishHtml]) {
    const feature = html.match(
      /<div class="manual-cover__feature">([\s\S]*?)<div class="manual-cover__footer">/,
    )?.[1];
    const footer = html.match(
      /<div class="manual-cover__footer">([\s\S]*?)<div class="manual-flow-copy">/,
    )?.[1];
    const profile = html.match(
      /<section class="manual-profile"[\s\S]*?<\/section>/,
    )?.[0];

    assert.ok(feature);
    assert.match(feature, /class="manual-cover__pitch"/);
    assert.match(feature, /class="manual-proof"/);
    assert.match(feature, /class="manual-actions"/);

    assert.ok(footer);
    assert.match(footer, /class="[^\"]*manual-cover__lead[^\"]*"/);
    assert.match(footer, /class="[^\"]*manual-cover__detail[^\"]*"/);
    assert.doesNotMatch(footer, /class="manual-actions"/);

    assert.ok(profile);
    assert.doesNotMatch(profile, /class="manual-actions"/);
  }
});

test("Header exposes the primary booking action in both languages", () => {
  for (const [html, label] of [
    [italianHtml, "Prenota una call"],
    [englishHtml, "Book a call"],
  ]) {
    const header = html.match(
      /<header class="manual-header">[\s\S]*?<\/header>/,
    )?.[0];

    assert.ok(header);
    assert.equal(count(header, /class="[^"]*\bmanual-header__cta\b[^"]*"/g), 1);
    assert.match(
      header,
      /<a[^>]*class="[^"]*\bmanual-header__cta\b[^"]*"[^>]*href="https:\/\/cal\.com\/silvio-ceccarini-gqz1ul"[^>]*target="_blank"[^>]*rel="noopener noreferrer"[^>]*>/,
    );
    assert.match(header, new RegExp(`>${label}</a>`));
  }
});

test("Critical visual assets use compact, cacheable formats", () => {
  for (const html of [italianHtml, englishHtml]) {
    assert.match(
      html,
      /<link rel="icon" type="image\/png" href="\/silvio-avatar\.35c8d6f7\.png">/,
    );
    assert.match(
      html,
      /href="\/fonts\/cabinet-grotesk-variable\.68ea8405\.woff2" as="font" type="font\/woff2"/,
    );
    assert.match(
      html,
      /href="\/fonts\/satoshi-variable\.ea7da896\.woff2" as="font" type="font\/woff2"/,
    );
    assert.doesNotMatch(html, /\.ttf(?:"|')/);
  }
});

test("Email links opt out of Cloudflare HTML rewriting", () => {
  for (const html of [italianHtml, englishHtml]) {
    assert.equal(count(html, /<!--email_off-->/g), 2);
    assert.equal(count(html, /<!--\/email_off-->/g), 2);
    assert.equal(
      count(
        html,
        /<!--email_off--><a[^>]*href="mailto:[^"]+"[^>]*>[\s\S]*?<\/a><!--\/email_off-->/g,
      ),
      2,
    );
  }
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
