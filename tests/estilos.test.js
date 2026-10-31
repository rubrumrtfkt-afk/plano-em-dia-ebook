// @vitest-environment node
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');

function matiz(r, g, b) {
  const [R, G, B] = [r, g, b].map((v) => v / 255);
  const max = Math.max(R, G, B), min = Math.min(R, G, B), d = max - min;
  if (d === 0) return { h: 0, s: 0 };
  let h;
  if (max === R) h = ((G - B) / d) % 6;
  else if (max === G) h = (B - R) / d + 2;
  else h = (R - G) / d + 4;
  h = (h * 60 + 360) % 360;
  const l = (max + min) / 2;
  const s = d / (1 - Math.abs(2 * l - 1));
  return { h, s };
}

function cores(texto) {
  const lista = [];
  for (const [m, hex] of texto.matchAll(/#([0-9a-f]{6}|[0-9a-f]{3})\b/gi)) {
    const h = hex.length === 3 ? hex.split('').map((c) => c + c).join('') : hex;
    lista.push({ m, rgb: [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) });
  }
  for (const [m, r, g, b] of texto.matchAll(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/gi)) {
    lista.push({ m, rgb: [r, g, b].map(Number) });
  }
  return lista;
}

function blocoMobile(texto) {
  const i = texto.indexOf('@media (max-width: 620px)');
  expect(i).toBeGreaterThan(-1);
  let nivel = 0;
  for (let j = texto.indexOf('{', i); j < texto.length; j++) {
    if (texto[j] === '{') nivel++;
    if (texto[j] === '}') nivel--;
    if (nivel === 0) return texto.slice(i, j + 1);
  }
  throw new Error('bloco mobile sem fim');
}

test('não há cores azuis (matiz 190°–250° com saturação perceptível)', () => {
  const azuis = cores(css).filter(({ rgb }) => {
    const { h, s } = matiz(...rgb);
    return h >= 190 && h <= 250 && s > 0.15;
  });
  expect(azuis.map((c) => c.m)).toEqual([]);
});

test('tokens do estilo A existem em :root', () => {
  const root = css.slice(css.indexOf(':root'), css.indexOf('}', css.indexOf(':root'))).toLowerCase();
  for (const cor of ['#fff8ef', '#2b2b2b', '#2e9e6b', '#e8f6ee', '#eadbc8']) expect(root).toContain(cor);
});

test('mobile sem texto de leitura < 14px', () => {
  const DECORATIVOS = ['.hero-bottom', '.phone-notch', '.phone-status'];
  const bloco = blocoMobile(css);
  const pequenos = [];
  for (const [, seletor, corpo] of bloco.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    for (const [, px] of corpo.matchAll(/font-size:\s*(\d+(?:\.\d+)?)px/g)) {
      const sel = seletor.trim();
      if (Number(px) < 14 && !DECORATIVOS.some((d) => sel.includes(d))) pequenos.push(`${sel}: ${px}px`);
    }
  }
  expect(pequenos).toEqual([]);
});

test('nenhuma regra de texto fica abaixo de 12px em qualquer tela', () => {
  const pequenos = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)]
    .flatMap(([, sel, corpo]) => [...corpo.matchAll(/font-size:\s*(\d+(?:\.\d+)?)px/g)].map(([, px]) => [sel.trim(), Number(px)]))
    .filter(([sel, px]) => px < 12 && !sel.includes('.phone-'));
  expect(pequenos).toEqual([]);
});

describe('revisão final: toque e foco', () => {
  it('remove o destaque azul padrão do Android ao tocar', () => {
    expect(css).toMatch(/-webkit-tap-highlight-color:\s*(transparent|rgba\(46,\s*158,\s*107)/);
  });
  it('links e controles de toque têm pelo menos 48px', () => {
    const regra = (sel) => {
      const inicio = css.indexOf(`${sel} {`);
      return inicio < 0 ? '' : css.slice(inicio, css.indexOf('}', inicio));
    };
    expect(regra('.faq-aside a')).toMatch(/min-height:\s*48px/);
    expect(regra('.subtle-link')).toMatch(/min-height:\s*48px/);
    expect(regra('.simulator-card input[type=range]')).toMatch(/height:\s*48px/);
  });
  it('foco visível em branco sobre as seções verde-escuras', () => {
    expect(css).toMatch(/\.offer-section :focus-visible[^{]*\{[^}]*outline-color:\s*#FFFFFF/i);
    expect(css).toMatch(/\.simulator-section :focus-visible[^{]*\{[^}]*outline-color:\s*#FFFFFF/i);
  });
});
