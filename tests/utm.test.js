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

test('atalho /tiktok vira utm_source=tiktok', () => {
  for (const caminho of ['/tiktok', '/tiktok/', '/tiktok.html', '/TikTok']) {
    const url = new URL(checkoutComOrigem(BASE, '', caminho));
    expect(url.searchParams.get('utm_source')).toBe('tiktok');
  }
  expect(new URL(checkoutComOrigem(BASE, '', '/instagram')).searchParams.get('utm_source')).toBe('instagram');
  expect(new URL(checkoutComOrigem(BASE, '', '/youtube')).searchParams.get('utm_source')).toBe('youtube');
});

test('caminho que não é atalho não muda o link', () => {
  expect(checkoutComOrigem(BASE, '', '/')).toBe(BASE);
  expect(checkoutComOrigem(BASE, '', '/qualquer')).toBe(BASE);
});

test('utm_source explícito no link vence o atalho; campanha soma ao atalho', () => {
  const url = new URL(checkoutComOrigem(BASE, '?utm_source=kwai&utm_campaign=v1', '/tiktok'));
  expect(url.searchParams.get('utm_source')).toBe('kwai');
  const url2 = new URL(checkoutComOrigem(BASE, '?utm_campaign=v1', '/tiktok'));
  expect(url2.searchParams.get('utm_source')).toBe('tiktok');
  expect(url2.searchParams.get('utm_campaign')).toBe('v1');
});
