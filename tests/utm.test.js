// @vitest-environment node
import { checkoutComOrigem } from '../src/utm.js';

const BASE = 'https://pay.kiwify.com.br/abc123';

test('sem parâmetros, devolve o link do checkout como está', () => {
  expect(checkoutComOrigem(BASE, '')).toBe(BASE);
});

test('repassa utm_source e os demais campos aceitos pela Kiwify', () => {
  const url = new URL(checkoutComOrigem(BASE, '?utm_source=tiktok&utm_campaign=video-dividas&src=bio&s1=x'));
  expect(url.origin + url.pathname).toBe(BASE);
  expect(url.searchParams.get('utm_source')).toBe('tiktok');
  expect(url.searchParams.get('utm_campaign')).toBe('video-dividas');
  expect(url.searchParams.get('src')).toBe('bio');
  expect(url.searchParams.get('s1')).toBe('x');
});

test('ignora parâmetros que a Kiwify não usa (ex.: fbclid)', () => {
  const url = new URL(checkoutComOrigem(BASE, '?utm_source=instagram&fbclid=XYZ&email=a@b.c'));
  expect([...url.searchParams.keys()]).toEqual(['utm_source']);
});

test('ignora valores vazios e corta valores muito longos', () => {
  const url = new URL(checkoutComOrigem(BASE, `?utm_source=&utm_medium=${'a'.repeat(300)}`));
  expect(url.searchParams.has('utm_source')).toBe(false);
  expect(url.searchParams.get('utm_medium')).toHaveLength(100);
});
