# Plano em Dia — landing page do guia interativo

Landing page responsiva em português que apresenta e vende o **Plano em Dia**, um guia interativo de educação financeira em cards (prefácio + 9 capítulos, diagnóstico sem julgamento e plano de 30 dias). Feita com React e Vite, no estilo A: claro e acolhedor, com tons pastel e verdes. O link da bio do TikTok aponta para cá, e a compra acontece no checkout da Kiwify.

⚠️ Este repositório é **público**. Os textos dos cards do produto ficam em outro repositório, privado. Aqui entram só as descrições de venda.

## Começar localmente

```bash
npm install
npm run dev
npm test        # testes (paleta, tamanhos de letra, textos)
npm run build   # versão de produção
```

## Personalizar antes de publicar

- Em `src/content.js`, troque o link real do checkout da Kiwify e o e-mail de contato. Se o placeholder `SEU-LINK-AQUI` continuar lá, o deploy falha de propósito.
- Os textos de venda (benefícios, capítulos, perguntas frequentes) ficam em `src/dados.js`.
- O simulador soma só os aportes de 12 meses, sem juros nem inflação.
- A publicação é feita pelo GitHub Pages a cada push na `main` (`.github/workflows/deploy.yml`).
