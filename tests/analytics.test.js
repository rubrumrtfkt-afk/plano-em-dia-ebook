// @vitest-environment node
import { readFileSync } from 'node:fs';

const html = readFileSync('index.html', 'utf8');

// D-55: contador de visitas sem cookie (Cloudflare Web Analytics). Nada de GA/pixel na landing.
test('index.html carrega o beacon do Cloudflare Web Analytics com o token do site', () => {
  expect(html).toContain("src='https://static.cloudflareinsights.com/beacon.min.js'");
  expect(html).toContain(`data-cf-beacon='{"token": "dd2f365d1775417a9b863187d69418f2"}'`);
});

test('landing não carrega Google Analytics, Tag Manager nem pixels', () => {
  expect(html).not.toMatch(/googletagmanager|google-analytics|gtag\(|fbq\(|connect\.facebook|analytics\.tiktok/);
});
