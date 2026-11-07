import { render, screen, within } from '@testing-library/react';
import { App } from '../src/main.jsx';
import { capitulos, faqs } from '../src/dados.js';
import { ebook } from '../src/content.js';

const TITULOS = [
  'Por que cuidar do seu dinheiro?',
  'Liberdade financeira: o que realmente significa?',
  'Os maiores erros financeiros e como evitá-los',
  'Organizando sua vida financeira',
  'Dívidas: como sair do ciclo e recuperar o controle',
  'O dinheiro explicado de forma simples',
  'Como ganhar mais dinheiro e aumentar sua renda',
  'Como começar a investir',
  'O comportamento por trás do dinheiro',
  'Seu plano de ação: o que fazer a partir de agora',
];

test('lista 10 capítulos em ordem', () => {
  expect(capitulos.map(([, titulo]) => titulo)).toEqual(TITULOS);
  render(<App />);
  const lista = screen.getByRole('list', { name: 'Capítulos do guia' });
  expect(within(lista).getAllByRole('heading').map((h) => h.textContent)).toEqual([...TITULOS, 'Seu Plano de 30 Dias']);
});

test('lista fecha com o plano liberado ao concluir; cap. 9 não promete o plano', () => {
  const { container } = render(<App />);
  const final = container.querySelector('.chapter-list li:last-child .chapter-row-final');
  expect(final.querySelector('h3').textContent).toBe('Seu Plano de 30 Dias');
  expect(final.querySelector('p').textContent).toMatch(/^Liberado quando você conclui os capítulos/);
  expect(final.querySelector('.chapter-lock svg')).not.toBeNull();
  expect(capitulos.at(-1)[2]).toBe('Junte o que você aprendeu e prepare o seu plano.');
  expect(container.querySelector('.hero-bottom').textContent).toContain('9 CAPÍTULOS + SEU PLANO DE 30 DIAS');
});

test('FAQ de entrega menciona Kiwify', () => {
  const [, resposta] = faqs.find(([p]) => /como recebo/i.test(p));
  expect(resposta).toMatch(/área de membros da Kiwify/);
});

test('FAQ de dados diz que nenhum valor é pedido', () => {
  const [, resposta] = faqs.find(([p]) => /dados financeiros/i.test(p));
  expect(resposta).toMatch(/nenhum valor/i);
});

test('não aparece a palavra "ebook" no texto visível', () => {
  const { container } = render(<App />);
  expect(container.textContent).not.toMatch(/e-?book/i);
  for (const el of container.querySelectorAll('[aria-label]')) expect(el.getAttribute('aria-label')).not.toMatch(/e-?book/i);
});

test('botão de compra usa ebook.checkoutUrl', () => {
  render(<App />);
  const compra = screen.getByRole('link', { name: /Quero meu guia interativo/ });
  expect(compra).toHaveAttribute('href', ebook.checkoutUrl);
});

test('botão de compra leva a origem da visita (utm_source) ao checkout', () => {
  window.history.replaceState(null, '', '/?utm_source=tiktok');
  try {
    render(<App />);
    const href = screen.getByRole('link', { name: /Quero meu guia interativo/ }).getAttribute('href');
    expect(new URL(href).searchParams.get('utm_source')).toBe('tiktok');
    expect(href.startsWith(ebook.checkoutUrl)).toBe(true);
  } finally {
    window.history.replaceState(null, '', '/');
  }
});

test('mostra o celular com um card de pergunta no hero', () => {
  render(<App />);
  expect(screen.getByRole('img', { name: /celular/i })).toBeInTheDocument();
});

test('simulador mantém o aviso de soma simples', () => {
  render(<App />);
  expect(screen.getByText('Soma simples dos aportes, sem considerar juros ou inflação.')).toBeInTheDocument();
});

test('não há botão de compra fixo no rodapé do celular', () => {
  const { container } = render(<App />);
  expect(container.querySelector('.mobile-buy')).toBeNull();
});

test('contato do FAQ mostra o e-mail visível e com mailto', () => {
  render(<App />);
  const link = screen.getByRole('link', { name: new RegExp(ebook.contactEmail.replace(/\./g, '\.')) });
  expect(link).toHaveAttribute('href', `mailto:${ebook.contactEmail}`);
  expect(link.textContent).toContain(ebook.contactEmail);
});

test('headline toca na dor de quem não sabe para onde foi o dinheiro', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Chega no fim do mês e não sabe para onde foi o dinheiro?');
  expect(screen.getByText('Organize seu salário em 30 dias, mesmo começando do zero.')).toBeInTheDocument();
});

test('preço aparece só logo antes do botão de checkout (não no topo)', () => {
  const { container } = render(<App />);
  const precos = container.querySelectorAll('.price-tag');
  expect(precos).toHaveLength(1);
  expect(container.querySelector('.hero .price-tag')).toBeNull();
  for (const p of precos) expect(p.textContent).toBe('R$ 29,90 à vista ou 3x no cartãomenos que um delivery');
  const botao = container.querySelector('#oferta .button-white');
  expect(botao.previousElementSibling).toHaveClass('price-tag');
});

test('FAQ 07 explica o reembolso de 7 dias pela Kiwify', () => {
  expect(faqs).toHaveLength(7);
  expect(faqs[6]).toEqual(['E se eu não gostar?', 'Você pode pedir reembolso em até 7 dias pela Kiwify, como prevê a lei.']);
  const { container } = render(<App />);
  const indices = [...container.querySelectorAll('.faq-index')].map((n) => n.textContent);
  expect(indices.at(-1)).toBe('07');
});

test('oferta mostra a garantia, usa a grade do simulador e não tem os círculos decorativos', () => {
  const { container } = render(<App />);
  const oferta = container.querySelector('#oferta');
  expect(oferta.querySelector('.offer-notes').textContent).toContain('7 dias de garantia');
  expect(oferta.querySelector('.offer-notes').textContent).not.toContain('No celular ou no computador');
  expect(oferta.querySelector('.simulator-grid-bg')).not.toBeNull();
  expect(oferta.querySelector('.offer-orb, .offer-decoration')).toBeNull();
});
