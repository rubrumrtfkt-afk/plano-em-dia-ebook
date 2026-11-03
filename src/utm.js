// Repassa ao checkout da Kiwify a origem da visita, para o painel de vendas
// mostrar de qual rede veio cada compra. Dois jeitos de marcar a origem:
// - atalho no caminho: planoemdia.online/tiktok → utm_source=tiktok (D-54);
// - parâmetros no link: ?utm_source=...&utm_campaign=... (D-53).
// Só os campos que a Kiwify registra; nada é guardado nem enviado a outro lugar.
export const ATALHOS = ['tiktok', 'instagram', 'youtube'];
const CAMPOS = ['src', 'sck', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 's1', 's2', 's3'];
const TAMANHO_MAXIMO = 100;

function atalhoDoCaminho(pathname = '/') {
  const nome = pathname.toLowerCase().replace(/^\/+|\/+$/g, '').replace(/\.html$/, '');
  return ATALHOS.includes(nome) ? nome : null;
}

export function checkoutComOrigem(checkoutUrl, search, pathname) {
  const visita = new URLSearchParams(search);
  const url = new URL(checkoutUrl);
  let mudou = false;
  for (const campo of CAMPOS) {
    const valor = (visita.get(campo) ?? '').trim().slice(0, TAMANHO_MAXIMO);
    if (valor) { url.searchParams.set(campo, valor); mudou = true; }
  }
  const atalho = atalhoDoCaminho(pathname);
  if (atalho && !url.searchParams.has('utm_source')) { url.searchParams.set('utm_source', atalho); mudou = true; }
  return mudou ? url.toString() : checkoutUrl;
}
