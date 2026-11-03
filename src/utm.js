// Repassa ao checkout da Kiwify a origem da visita (ex.: ?utm_source=tiktok),
// para o painel de vendas mostrar de qual rede veio cada compra.
// Só os campos que a Kiwify registra; nada é guardado nem enviado a outro lugar.
const CAMPOS = ['src', 'sck', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 's1', 's2', 's3'];
const TAMANHO_MAXIMO = 100;

export function checkoutComOrigem(checkoutUrl, search) {
  const visita = new URLSearchParams(search);
  const url = new URL(checkoutUrl);
  let mudou = false;
  for (const campo of CAMPOS) {
    const valor = (visita.get(campo) ?? '').trim().slice(0, TAMANHO_MAXIMO);
    if (valor) { url.searchParams.set(campo, valor); mudou = true; }
  }
  return mudou ? url.toString() : checkoutUrl;
}
