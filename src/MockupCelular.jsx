import { ClipboardCheck, MessageCircleQuestion } from 'lucide-react';

// Ilustração: um card de pergunta no estilo do guia (texto inventado só para a vitrine).
export default function MockupCelular() {
  return (
    <div className="phone-scene">
      <div className="phone-shadow" />
      <div className="phone" role="img" aria-label="Celular mostrando um card de pergunta do guia Plano em Dia">
        <div className="phone-screen" aria-hidden="true">
          <div className="phone-notch">.</div>
          <div className="phone-status"><span>CAPÍTULO 3</span><span>2 DE 9</span></div>
          <div className="phone-progress"><i className="feito" /><i className="feito" /><i /><i /><i /><i /><i /><i /><i /></div>
          <div className="phone-card">
            <span className="phone-tag">PERGUNTA PARA VOCÊ</span>
            <p className="phone-question">Para onde foi o seu dinheiro este mês?</p>
            <span className="phone-option">Contas fixas</span>
            <span className="phone-option selecionada">Gastos pequenos do dia a dia</span>
            <span className="phone-option">Parcelas e juros</span>
            <div className="phone-mirror">
              <b>Os gastos pequenos são o seu ponto cego.</b>
              <span>É o caso mais comum.</span>
            </div>
          </div>
          <div className="phone-button">Continuar</div>
        </div>
      </div>
      <div className="float-note note-savings" aria-hidden="true">
        <span className="note-icon"><MessageCircleQuestion size={18} /></span>
        <span><b>Diagnóstico</b><small>sem certo ou errado</small></span>
      </div>
      <div className="float-note note-format" aria-hidden="true">
        <span className="format-icon"><ClipboardCheck size={18} /></span>
        <span><b>Plano de 30 dias</b><small>com checklist</small></span>
      </div>
    </div>
  );
}
