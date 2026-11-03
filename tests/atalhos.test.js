// @vitest-environment node
import { readFileSync } from 'node:fs';
import { ATALHOS } from '../src/utm.js';

test('atalhos são tiktok, instagram e youtube', () => {
  expect(ATALHOS).toEqual(['tiktok', 'instagram', 'youtube']);
});

test('index.html aponta a versão canônica para a raiz (atalhos não viram páginas duplicadas no Google)', () => {
  expect(readFileSync('index.html', 'utf8')).toContain('<link rel="canonical" href="https://planoemdia.online/" />');
});
