import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowDown, ArrowRight, ArrowUpRight, BadgeCheck, ChevronDown, CircleHelp, ClipboardCheck,
  LayoutList, Menu, MessageCircleQuestion, MoveUpRight, ShieldCheck, Smartphone, X,
} from 'lucide-react';
import { ebook } from './content';
import { beneficios, capitulos, faqs } from './dados';
import MockupCelular from './MockupCelular';
import './styles.css';

function Reveal({ children, className = '', delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const id = React.useId();
  useEffect(() => {
    const node = document.querySelector(`[data-reveal-id="${id}"]`);
    if (!node || typeof IntersectionObserver === 'undefined') { setVisible(true); return undefined; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, [id]);
  return <div data-reveal-id={id} className={`reveal ${visible ? 'is-visible' : ''} ${className}`} style={{ '--reveal-delay': `${delay}ms` }}>{children}</div>;
}

export function App() {
  const [monthly, setMonthly] = useState(350);
  const [openFaq, setOpenFaq] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const annual = monthly * 12;
  const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value);
  const checkout = ebook.checkoutUrl;

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Plano em Dia, início"><span className="brand-mark"><span/><span/><span/></span><span>plano<span className="brand-dot">.</span>em dia</span></a>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Navegação principal">
          <a href="#beneficios" onClick={() => setMenuOpen(false)}>O que você ganha</a>
          <a href="#conteudo" onClick={() => setMenuOpen(false)}>Por dentro do guia</a>
          <a href="#duvidas" onClick={() => setMenuOpen(false)}>Dúvidas</a>
        </nav>
        <a className="header-cta" href="#oferta">Quero meu guia <ArrowUpRight size={16}/></a>
        <button className="menu-toggle" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-inner">
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow-dot"/> GUIA INTERATIVO DE EDUCAÇÃO FINANCEIRA <span className="eyebrow-line"/></div>
              <h1>Seu dinheiro,<br/><span>com direção.</span></h1>
              <p className="hero-lede">Um guia em cards, feito para o celular: você responde perguntas sobre a sua vida, descobre por onde começar e sai com um plano de 30 dias.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#oferta">Conhecer o guia <ArrowRight size={20}/></a>
                <a className="text-link" href="#conteudo"><span className="play-circle"><ArrowDown size={16}/></span> Ver os capítulos</a>
              </div>
              <div className="hero-proof"><ShieldCheck size={22} color="#1F6B4A"/><p>Pouco texto por tela, letra grande e nenhum julgamento.</p></div>
            </div>
            <MockupCelular />
          </div>
          <div className="hero-bottom" aria-hidden="true"><span>EDUCAÇÃO FINANCEIRA SEM COMPLICAÇÃO</span><span>PREFÁCIO + 9 CAPÍTULOS <span className="bottom-rule"/></span></div>
        </section>

        <section className="value-strip" aria-label="Características do guia">
          <div><ShieldCheck/><span>Feito para iniciantes</span></div><i/>
          <div><Smartphone/><span>Pouco texto, no seu ritmo</span></div><i/>
          <div><MessageCircleQuestion/><span>Diagnóstico sem julgamento</span></div><i/>
          <div><ClipboardCheck/><span>Plano de 30 dias + planilha</span></div>
        </section>

        <section className="benefits section-pad" id="beneficios">
          <div className="section-heading">
            <Reveal><span className="eyebrow"><span className="eyebrow-dot"/> MAIS CLAREZA, MENOS PESO</span><h2>Organizar o dinheiro<br/>pode ser <span>mais simples.</span></h2></Reveal>
            <Reveal delay={80}><p>Sem fórmulas mágicas e sem promessas de enriquecimento. Só uma boa estrutura para você tomar decisões com mais confiança.</p><a className="subtle-link" href="#conteudo">Veja o que tem dentro <ArrowRight size={17}/></a></Reveal>
          </div>
          <div className="benefit-grid">{beneficios.map(({ icon: Icon, number, title, text }, i) => <Reveal key={number} delay={i * 70}><article className="benefit-card"><div className="card-top"><span className="benefit-icon"><Icon size={22}/></span><span className="card-number">{number} / 03</span></div><h3>{title}</h3><p>{text}</p><div className="card-arrow"><ArrowUpRight size={18}/></div></article></Reveal>)}</div>
        </section>

        <section className="simulator-section">
          <div className="simulator-grid-bg" aria-hidden="true"/>
          <div className="simulator-wrap">
            <Reveal className="simulator-copy"><span className="eyebrow light-eyebrow"><span className="eyebrow-dot"/> UM EXERCÍCIO DE PLANEJAMENTO</span><h2>Pequenos passos.<br/><span>Um plano seu.</span></h2><p>Escolha um valor mensal e veja quanto ele representa em um ano. Não é previsão de rendimento: é só um jeito de visualizar o poder da constância.</p><div className="simulator-caption"><span className="caption-icon"><CircleHelp size={18}/></span><span>Um ponto de partida para pensar nas suas metas, sem compromisso.</span></div></Reveal>
            <Reveal className="simulator-card" delay={100}><div className="simulator-card-head"><span>SIMULADOR DE CONSTÂNCIA</span><span className="live-indicator"><i/> AO VIVO</span></div><div className="sim-label"><span>Se você separasse por mês</span><span className="amount">{formatCurrency(monthly)}<small> / mês</small></span></div><input aria-label="Valor mensal para guardar" type="range" min="50" max="2000" step="50" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} style={{ '--range-progress': `${((monthly - 50) / 1950) * 100}%` }}/><div className="range-labels"><span>R$ 50</span><span>R$ 2.000</span></div><div className="result-panel"><div><span>EM 12 MESES, ISSO SERIA</span><strong key={annual}>{formatCurrency(annual)}</strong></div><div className="result-chart" aria-hidden="true">{Array.from({ length: 12 }, (_, i) => <i key={i} style={{ height: `${18 + (i + 1) * 5.9}px`, animationDelay: `${i * 35}ms` }}/>)}</div></div><p className="sim-disclaimer">Soma simples dos aportes, sem considerar juros ou inflação.</p></Reveal>
          </div>
        </section>

        <section className="contents section-pad" id="conteudo">
          <div className="contents-intro"><Reveal><span className="eyebrow"><span className="eyebrow-dot"/> POR DENTRO DO GUIA</span><h2>Um mapa para<br/><span>seguir no seu ritmo.</span></h2><p>Prefácio e 9 capítulos em cards curtos. Cada capítulo termina com uma prática simples para a vida real.</p><div className="contents-stamp"><span className="stamp-circle"><LayoutList size={22}/></span><span><b>Do primeiro passo</b><small>ao seu plano de 30 dias</small></span></div></Reveal></div>
          <ol className="chapter-list" aria-label="Capítulos do guia">{capitulos.map(([n, title, text], i) => <li key={title}><Reveal delay={i * 40}><article className="chapter-row"><span className="chapter-number">{n}</span><div className="chapter-info"><h3>{title}</h3><p>{text}</p></div><span className="chapter-arrow" aria-hidden="true"><ArrowUpRight size={18}/></span></article></Reveal></li>)}</ol>
        </section>

        <section className="quote-band"><Reveal><span className="quote-mark" aria-hidden="true">“</span><blockquote>Você não precisa ter tudo resolvido.<br/><em>Só precisa saber qual é o próximo passo.</em></blockquote><span className="quote-credit">UMA IDEIA QUE GUIA O PLANO EM DIA</span></Reveal></section>

        <section className="faq-section section-pad" id="duvidas"><div className="faq-layout"><Reveal className="faq-intro"><span className="eyebrow"><span className="eyebrow-dot"/> ANTES DE COMEÇAR</span><h2>Dúvidas<br/><span>frequentes.</span></h2><p>Ainda quer entender melhor? Aqui estão as respostas mais importantes.</p><div className="faq-aside"><CircleHelp size={20}/><span>Não encontrou sua dúvida?<br/>Fale com a gente:<br/><a href={`mailto:${ebook.contactEmail}`}>{ebook.contactEmail} <ArrowUpRight size={15}/></a></span></div></Reveal><div className="faq-list">{faqs.map(([question, answer], i) => <Reveal key={question} delay={i * 45}><article className={`faq-item ${openFaq === i ? 'faq-open' : ''}`}><button aria-expanded={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? -1 : i)}><span className="faq-index">0{i + 1}</span><span>{question}</span><ChevronDown size={20}/></button><div className="faq-answer"><p>{answer}</p></div></article></Reveal>)}</div></div></section>

        <section className="offer-section" id="oferta"><div className="offer-orb orb-a"/><div className="offer-orb orb-b"/><Reveal className="offer-content"><span className="eyebrow light-eyebrow"><span className="eyebrow-dot"/> O PRÓXIMO PASSO É SEU</span><h2>Seu plano começa<br/>com <em>uma escolha.</em></h2><p>Responda, reflita e saia com um plano de 30 dias para a sua vida financeira.</p><a className="button button-white" href={checkout} target="_blank" rel="noreferrer">Quero meu guia interativo <MoveUpRight size={19}/></a><div className="offer-notes"><span><BadgeCheck size={17}/> Acesso pela área de membros da Kiwify</span><i/><span><BadgeCheck size={17}/> No celular ou no computador</span><i/><span><BadgeCheck size={17}/> Planilha modelo inclusa</span></div></Reveal><div className="offer-decoration" aria-hidden="true"><div className="dec-ring ring-large"/><div className="dec-ring ring-small"/><span>PLANO<br/>EM DIA</span><div className="dec-spark">✳</div></div></section>
      </main>

      <footer className="site-footer"><a className="brand footer-brand" href="#inicio"><span className="brand-mark"><span/><span/><span/></span><span>plano<span className="brand-dot">.</span>em dia</span></a><span>Conteúdo educativo. Não é recomendação de investimento.</span><span>© 2026 Plano em Dia</span></footer>
    </>
  );
}

const raiz = document.getElementById('root');
if (raiz) createRoot(raiz).render(<App />);
