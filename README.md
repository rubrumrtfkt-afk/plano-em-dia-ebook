# Plano em Dia — landing page do ebook

Landing page responsiva em português para apresentar e vender um ebook de planejamento financeiro. Feita com React e Vite, com paleta azul, animações leves, simulador interativo de aportes e FAQ em acordeão.

## Começar localmente

```bash
npm install
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
```

## Personalizar antes de publicar

- Edite `src/content.js` para informar o link real do checkout e seu email de contato.
- Atualize o título, nome da marca, capítulos, perguntas e textos em `src/main.jsx`.
- O endereço de pagamento está como `https://pay.kiwify.com.br/SEU-LINK-AQUI`; troque pelo link da sua plataforma.
- O simulador calcula apenas o total dos aportes em 12 meses; não inclui juros nem inflação.
- O email de contato está como `contato@exemplo.com.br` e deve ser substituído pelo seu.

## Skills aplicadas

- `emil-design-eng` — hierarquia visual, feedback ao toque, curvas de animação, movimentos curtos e respeito a `prefers-reduced-motion`.
- `remotion-markup` — ritmo, entrada escalonada e composição da ilustração do ebook; a página usa CSS/React no navegador, não o renderizador Remotion.
