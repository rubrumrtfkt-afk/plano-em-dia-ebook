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
  expect(within(lista).getAllByRole('heading').map((h) => h.textContent)).toEqual(TITULOS);
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
