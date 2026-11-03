import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { ATALHOS } from './src/utm.js';

// Gera dist/tiktok.html etc. (cópias da landing). O GitHub Pages serve
// planoemdia.online/tiktok a partir de tiktok.html, sem redirecionar (D-54).
function paginasDeAtalho() {
  let saida = 'dist';
  return {
    name: 'paginas-de-atalho',
    apply: 'build',
    configResolved(config) { saida = config.build.outDir; },
    closeBundle() {
      for (const nome of ATALHOS) copyFileSync(resolve(saida, 'index.html'), resolve(saida, `${nome}.html`));
    },
  };
}

export default defineConfig({
  base: '/',
  plugins: [paginasDeAtalho()],
});
