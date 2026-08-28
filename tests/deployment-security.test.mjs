import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const nginxConfigUrl = new URL(
  "../deploy/nginx/personal-website-security.conf",
  import.meta.url,
);
const workflowUrl = new URL("../.github/workflows/ci-cd.yml", import.meta.url);

test("Nginx policy scopes security headers to the public landing documents", async () => {
  const config = await readFile(nginxConfigUrl, "utf8");

  assert.match(
    config,
    /map "\$host:\$uri" \$personal_website_document_enabled/,
  );
  assert.match(
    config,
    /map \$personal_website_document_enabled \$personal_website_csp/,
  );
  assert.match(config, /silvioceccarini\\\.dev/);
  assert.doesNotMatch(
    config,
    /map \$host \$personal_website_csp/,
    "CSP must not cover the noindex prototype documents",
  );
  assert.match(config, /default-src 'self'/);
  assert.match(config, /object-src 'none'/);
  assert.match(config, /base-uri 'self'/);
  assert.match(config, /frame-ancestors 'none'/);
  assert.match(config, /require-trusted-types-for 'script'/);
  assert.match(
    config,
    /add_header Content-Security-Policy \$personal_website_csp always;/,
  );
  assert.match(config, /max-age=31536000/);
  assert.match(config, /Cross-Origin-Opener-Policy/);
  assert.match(config, /X-Frame-Options/);
  assert.match(config, /X-Content-Type-Options/);
  assert.match(config, /Referrer-Policy/);
  assert.match(config, /Permissions-Policy/);
  assert.match(config, /no-transform/);
  assert.match(config, /max-age=31536000, immutable/);
});

test("Deployment validates and reloads Nginx before checking public headers", async () => {
  const workflow = await readFile(workflowUrl, "utf8");

  assert.match(workflow, /personal-website-security\.conf/);
  assert.match(workflow, /sudo nginx -t/);
  assert.match(workflow, /Verify production response headers/);
  assert.match(workflow, /content-security-policy/i);
  assert.match(workflow, /strict-transport-security/i);
  assert.match(workflow, /cross-origin-opener-policy/i);
  assert.match(workflow, /referrer-policy/i);
});
