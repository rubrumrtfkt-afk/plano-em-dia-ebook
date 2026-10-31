// @vitest-environment node
import { ebook } from '../src/content.js';

const noCI = process.env.CI === 'true';

test.runIf(noCI)('checkoutUrl não é placeholder quando CI=true', () => {
  expect(ebook.checkoutUrl).not.toContain('SEU-LINK-AQUI');
  expect(ebook.checkoutUrl).toMatch(/^https:\/\/pay\.kiwify\.com\.br\/\w+/);
});

test.runIf(noCI)('e-mail de contato não é o de exemplo quando CI=true', () => {
  expect(ebook.contactEmail).not.toBe('contato@exemplo.com.br');
  expect(ebook.contactEmail).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
});
