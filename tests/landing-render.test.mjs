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

test("Internal content groups use semantic icons instead of counters", () => {
  for (const html of [italianHtml, englishHtml]) {
    const situations = html.match(
      /<ul class="manual-profile__situations">([\s\S]*?)<\/ul>/,
    )?.[1];
    const team = html.match(
      /<ul[^>]*class="manual-team-spec"[^>]*>([\s\S]*?)<\/ul>/,
    )?.[1];
    const capabilities = html.match(
      /<ul[^>]*data-capabilities-list[^>]*>([\s\S]*?)<\/ul>/,
    )?.[1];
    const faqs = html.match(
      /<div class="manual-faq-list">([\s\S]*?)<\/section>/,
    )?.[1];

    assert.ok(situations);
    assert.equal(count(situations, /data-landing-icon=/g), 3);
    assert.doesNotMatch(situations, />0[1-9]</);

    assert.ok(team);
    assert.equal(count(team, /data-landing-icon=/g), 3);
    assert.doesNotMatch(team, />0[1-9]</);

    assert.ok(capabilities);
    assert.equal(count(capabilities, /data-landing-icon=/g), 6);
    assert.doesNotMatch(capabilities, />0[1-9]</);

    assert.ok(faqs);
    assert.doesNotMatch(faqs, /<summary><span[^>]*>/);
    assert.equal(count(html, /data-landing-icon=/g), 12);
    assert.doesNotMatch(html, /data-manual-chapter="\d/);
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

test("Project identities center their logos without editorial counters", () => {
  for (const html of [italianHtml, englishHtml]) {
    const projectList = html.match(
      /<ul class="manual-projects">([\s\S]*?)<\/ul>/,
    )?.[1];
    const identities = [
      ...(projectList?.matchAll(
        /<div class="manual-project__identity">([\s\S]*?)<\/div>/g,
      ) ?? []),
    ];

    assert.ok(projectList);
    assert.equal(identities.length, 3);

    for (const identity of identities) {
      assert.match(identity[1], /<img(?:\s|>)/);
      assert.doesNotMatch(identity[1], /<span(?:\s|>)/);
    }
  }
});

test("Recommendation signatures follow their quotes", () => {
  for (const html of [italianHtml, englishHtml]) {
    const quotes = [...html.matchAll(/<blockquote>([\s\S]*?)<\/blockquote>/g)];

    assert.equal(quotes.length, 3);

    for (const quote of quotes) {
      assert.match(
        quote[1],
        /<p>[\s\S]*?<\/p><footer class="manual-quote__signature"><cite>[A-Z]\.\s?[A-Z]\.<\/cite><\/footer>/,
      );
    }
  }
});

test("About section renders the complete narrative on both routes", () => {
  for (const [html, title, lead, closing] of [
    [
      italianHtml,
      "Chi sono",
      "Mi piace capire come funzionano le cose.",
      "capire come farla funzionare.",
    ],
    [
      englishHtml,
      "About me",
      "I like understanding how things work",
      "figuring out how to make it work.",
    ],
  ]) {
    const about = html.match(
      /<section class="manual-chapter manual-about" id="about"[\s\S]*?<\/section>/,
    )?.[0];

    assert.ok(about);
    assert.match(about, new RegExp(`<h2>${title}</h2>`));
    assert.equal(count(about, /<p(?:\s|>)/g), 7);
    assert.ok(about.includes(lead));
    assert.ok(about.includes(closing));
  }
});

test("Late chapters keep the approved order and numbering", () => {
  for (const html of [italianHtml, englishHtml]) {
    const chapters = [
      ...html.matchAll(
        /<section class="manual-chapter[^"]*" id="(recommendations|about|contact|faq)"[\s\S]*?<span aria-hidden="true">(\d{2})<\/span>/g,
      ),
    ].map((match) => [match[1], match[2]]);

    assert.deepEqual(chapters, [
      ["recommendations", "06"],
      ["about", "07"],
      ["contact", "08"],
      ["faq", "09"],
    ]);
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
