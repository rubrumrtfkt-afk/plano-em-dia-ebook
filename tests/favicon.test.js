import { readFileSync, existsSync } from 'node:fs';

const html = readFileSync('index.html', 'utf8');

test('favicon é o brand-mark (SVG + PNGs), não o emoji', () => {
  expect(html).not.toContain('%F0%9F%8C%B1');
  expect(html).toMatch(/<link rel="icon" type="image\/svg\+xml" href="\/favicon\.svg"/);
  expect(html).toMatch(/<link rel="icon" type="image\/png" sizes="32x32" href="\/favicon-32\.png"/);
  expect(html).toMatch(/<link rel="apple-touch-icon" href="\/apple-touch-icon\.png"/);
  for (const f of ['favicon.svg', 'favicon-32.png', 'apple-touch-icon.png']) expect(existsSync(`public/${f}`)).toBe(true);
});

test('SVG usa as cores do brand-mark', () => {
  const svg = readFileSync('public/favicon.svg', 'utf8');
  expect(svg).toMatch(/#E8F6EE/i);
  expect(svg).toMatch(/#2E9E6B/i);
});
