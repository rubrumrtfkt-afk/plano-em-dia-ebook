import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowDown, ArrowRight, ArrowUpRight, BadgeCheck, BookOpen, Check,
  ChevronDown, CircleHelp, Compass, Download, Landmark, Menu, MoveUpRight,
  ShieldCheck, Sparkles, Wallet, X,
} from 'lucide-react';
import { ebook } from './content';
import './styles.css';

const benefits = [
  { icon: Wallet, number: '01', title: 'Enxergue seu dinheiro', text: 'Entenda o que entra, o que sai e por que o mês parece terminar antes do salário.' },
  { icon: Compass, number: '02', title: 'Escolha um caminho', text: 'Transforme desejos soltos em metas claras, prioridades e próximos passos possíveis.' },
  { icon: Landmark, number: '03', title: 'Construa sua base', text: 'Aprenda a criar uma reserva e conheça os conceitos essenciais para começar a investir.' },
];

const chapters = [
  ['01', 'Seu ponto de partida', 'Um retrato honesto e sem julgamento da sua vida financeira.'],
  ['02', 'Orçamento que funciona', 'Uma forma simples de organizar entradas, gastos e escolhas.'],
  ['03', 'Metas com intenção', 'Como dar nome, prazo e prioridade ao que você quer conquistar.'],
  ['04', 'Reserva de tranquilidade', 'Entenda para que serve e como começar a construí-la aos poucos.'],
  ['05', 'Investimentos sem mistério', 'Conceitos fundamentais para conversar com mais segurança.'],
  ['06', 'Seu plano para seguir', 'Um roteiro prático para transformar leitura em ação no seu ritmo.'],
];

const faqs = [
  ['Preciso entender de finanças para começar?', 'Não. O conteúdo parte dos fundamentos e explica os termos com linguagem simples, para que você avance sem precisar de experiência prévia.'],
  ['Como recebo o ebook?', 'Depois da confirmação do pagamento, o acesso é enviado digitalmente pelo checkout. Você poderá ler no celular, tablet ou computador.'],
  ['O ebook recomenda investimentos específicos?', 'O material é educativo. Ele apresenta conceitos e ajuda você a organizar suas decisões, sem indicar ativos ou prometer resultados.'],
  ['Posso ler no meu próprio ritmo?', 'Sim. O ebook fica disponível para consulta, então você pode avançar aos poucos e voltar aos capítulos que quiser.'],
];

function BookMockup() {
  return (
    <div className="book-scene" aria-label="Capa ilustrada do ebook Plano em Dia">
      <div className="book-shadow" />
      <div className="book-cover">
        <div className="cover-top"><span>GUIA PRÁTICO</span><span>01 / 06</span></div>
        <div className="cover-art" aria-hidden="true">
          <div className="cover-orbit orbit-one" /><div className="cover-orbit orbit-two" />
          <div className="cover-sun" /><div className="cover-bars"><i /><i /><i /><i /><i /></div>
          <svg className="cover-path" viewBox="0 0 330 220" fill="none" aria-hidden="true">
            <path d="M12 190C71 176 82 132 133 143C179 153 185 94 226 102C266 109 279 53 320 28" stroke="url(#line)" strokeWidth="3" strokeLinecap="round" />
            <path d="M12 190C71 176 82 132 133 143C179 153 185 94 226 102C266 109 279 53 320 28V220H12V190Z" fill="url(#area)" />
            <defs><linearGradient id="line" x1="12" y1="190" x2="320" y2="28"><stop stopColor="#a9dcff"/><stop offset="1" stopColor="#fff"/></linearGradient><linearGradient id="area" x1="150" y1="50" x2="150" y2="220"><stop stopColor="#8ecfff" stopOpacity=".23"/><stop offset="1" stopColor="#8ecfff" stopOpacity="0"/></linearGradient></defs>
          </svg>
          <span className="cover-point point-a"/><span className="cover-point point-b"/><span className="cover-point point-c"/>
        </div>
        <div className="cover-title">Plano<br /><em>em dia.</em></div>
        <p className="cover-subtitle">UM GUIA LEVE PARA<br />CUIDAR BEM DO SEU DINHEIRO</p>
        <div className="cover-footer"><span>PLANO EM DIA</span><span>2026</span></div>
      </div>
      <div className="float-note note-savings"><span className="note-icon"><ArrowUpRight size={16}/></span><span><b>Passo a passo</b><small>no seu ritmo</small></span></div>
      <div className="float-note note-format"><span className="format-icon"><BookOpen size={16}/></span><span><b>Leitura digital</b><small>em qualquer tela</small></span></div>
      <span className="scene-star star-one">✳</span><span className="scene-star star-two">✳</span>
    </div>
  );
}

function Reveal({ children, className = '', delay = 0 }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = document.querySelector(`[data-reveal-id="${id}"]`);
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  const id = React.useId();
  return <div data-reveal-id={id} className={`reveal ${visible ? 'is-visible' : ''} ${className}`} style={{ '--reveal-delay': `${delay}ms` }}>{children}</div>;
}

function App() {
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
          <a href="#beneficios" onClick={() => setMenuOpen(false)}>O que você ganha</a><a href="#conteudo" onClick={() => setMenuOpen(false)}>Por dentro do guia</a><a href="#duvidas" onClick={() => setMenuOpen(false)}>Dúvidas</a>
        </nav>
        <a className="header-cta" href="#oferta">Quero meu guia <ArrowUpRight size={15}/></a>
        <button className="menu-toggle" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-inner">
            <div className="hero-copy">
              <div className="eyebrow hero-eyebrow"><span className="eyebrow-dot"/> UM GUIA PARA A VIDA REAL <span className="eyebrow-line"/></div>
              <h1>Seu dinheiro,<br/><span>com direção.</span></h1>
              <p className="hero-lede">Organize as contas, planeje o que importa e construa uma relação mais tranquila com o seu dinheiro — um passo de cada vez.</p>
              <div className="hero-actions"><a className="button button-primary" href="#oferta">Conheça o ebook <ArrowRight size={18}/></a><a className="text-link" href="#conteudo"><span className="play-circle"><ArrowDown size={14}/></span> Explore o conteúdo</a></div>
              <div className="hero-proof"><div className="proof-avatars"><span>A</span><span>M</span><span>J</span><span>+</span></div><div><div className="proof-stars">★★★★★</div><p>Mais clareza começa com o próximo passo.</p></div></div>
            </div>
            <BookMockup />
          </div>
          <div className="hero-bottom"><span>EDUCAÇÃO FINANCEIRA SEM COMPLICAÇÃO</span><span>01 — 04 <span className="bottom-rule"/></span></div>
        </section>

        <section className="value-strip" aria-label="Características do ebook"><div><ShieldCheck/><span>Feito para iniciantes</span></div><i/><div><BookOpen/><span>Leitura leve e prática</span></div><i/><div><Sparkles/><span>Ideias para aplicar hoje</span></div><i/><div><Download/><span>Acesso digital</span></div></section>

        <section className="benefits section-pad" id="beneficios">
          <div className="section-heading"><Reveal><span className="eyebrow"><span className="eyebrow-dot blue-dot"/> MAIS CLAREZA, MENOS PESO</span><h2>Organizar o dinheiro<br/>pode ser <span>mais simples.</span></h2></Reveal><Reveal delay={80}><p>Sem fórmulas mágicas e sem precisar saber tudo antes de começar. Só uma boa estrutura para tomar decisões com mais confiança.</p><a className="subtle-link" href="#conteudo">Veja o que tem dentro <ArrowRight size={15}/></a></Reveal></div>
          <div className="benefit-grid">{benefits.map(({ icon: Icon, number, title, text }, i) => <Reveal key={number} delay={i * 70}><article className="benefit-card"><div className="card-top"><span className="benefit-icon"><Icon size={20}/></span><span className="card-number">{number} / 03</span></div><h3>{title}</h3><p>{text}</p><div className="card-arrow"><ArrowUpRight size={16}/></div></article></Reveal>)}</div>
        </section>

        <section className="simulator-section">
          <div className="simulator-grid-bg" aria-hidden="true"/>
          <div className="simulator-wrap">
            <Reveal className="simulator-copy"><span className="eyebrow light-eyebrow"><span className="eyebrow-dot"/> UM EXERCÍCIO DE PLANEJAMENTO</span><h2>Pequenos passos.<br/><span>Um plano seu.</span></h2><p>Escolha um valor mensal e veja quanto ele representa em um ano. Não é previsão de rendimento: é só um jeito de visualizar o poder da constância.</p><div className="simulator-caption"><span className="caption-icon"><CircleHelp size={15}/></span><span>Um ponto de partida para pensar nas suas metas, sem compromisso.</span></div></Reveal>
            <Reveal className="simulator-card" delay={100}><div className="simulator-card-head"><span>SIMULADOR DE CONSTÂNCIA</span><span className="live-indicator"><i/> AO VIVO</span></div><div className="sim-label"><span>Se você separasse por mês</span><span className="amount">{formatCurrency(monthly)}<small> / mês</small></span></div><input aria-label="Valor mensal para guardar" type="range" min="50" max="2000" step="50" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} style={{ '--range-progress': `${((monthly - 50) / 1950) * 100}%` }}/><div className="range-labels"><span>R$ 50</span><span>R$ 2.000</span></div><div className="result-panel"><div><span>EM 12 MESES, ISSO SERIA</span><strong key={annual}>{formatCurrency(annual)}</strong></div><div className="result-chart" aria-hidden="true">{Array.from({ length: 12 }, (_, i) => <i key={i} style={{ height: `${18 + (i + 1) * 5.9}px`, animationDelay: `${i * 35}ms` }}/>)}</div></div><p className="sim-disclaimer">Soma simples dos aportes, sem considerar juros ou inflação.</p></Reveal>
          </div>
        </section>

        <section className="contents section-pad" id="conteudo">
          <div className="contents-intro"><Reveal><span className="eyebrow"><span className="eyebrow-dot blue-dot"/> POR DENTRO DO EBOOK</span><h2>Um mapa para<br/><span>seguir no seu ritmo.</span></h2><p>Capítulos diretos, exemplos do cotidiano e espaço para adaptar cada ideia à sua realidade.</p><div className="contents-stamp"><span className="stamp-circle"><BookOpen size={22}/></span><span><b>Um guia prático</b><small>do primeiro passo ao seu plano</small></span></div></Reveal></div>
          <div className="chapter-list">{chapters.map(([n, title, text], i) => <Reveal key={n} delay={i * 40}><article className="chapter-row"><span className="chapter-number">{n}</span><div className="chapter-info"><h3>{title}</h3><p>{text}</p></div><span className="chapter-arrow"><ArrowUpRight size={17}/></span></article></Reveal>)}</div>
        </section>

        <section className="quote-band"><Reveal><span className="quote-mark">“</span><blockquote>Você não precisa ter tudo resolvido.<br/><em>Só precisa saber qual é o próximo passo.</em></blockquote><span className="quote-credit">UMA IDEIA QUE GUIA O PLANO EM DIA</span></Reveal></section>

        <section className="faq-section section-pad" id="duvidas"><div className="faq-layout"><Reveal className="faq-intro"><span className="eyebrow"><span className="eyebrow-dot blue-dot"/> ANTES DE COMEÇAR</span><h2>Dúvidas<br/><span>frequentes.</span></h2><p>Ainda quer entender melhor? Aqui estão as respostas mais importantes.</p><div className="faq-aside"><CircleHelp size={18}/><span>Não encontrou sua dúvida?<br/><a href="mailto:contato@planoemdia.com.br">Fale com a gente <ArrowUpRight size={13}/></a></span></div></Reveal><div className="faq-list">{faqs.map(([question, answer], i) => <Reveal key={question} delay={i * 45}><article className={`faq-item ${openFaq === i ? 'faq-open' : ''}`}><button aria-expanded={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? -1 : i)}><span className="faq-index">0{i + 1}</span><span>{question}</span><ChevronDown size={18}/></button><div className="faq-answer"><p>{answer}</p></div></article></Reveal>)}</div></div></section>

        <section className="offer-section" id="oferta"><div className="offer-orb orb-a"/><div className="offer-orb orb-b"/><Reveal className="offer-content"><span className="eyebrow light-eyebrow"><span className="eyebrow-dot"/> O PRÓXIMO PASSO É SEU</span><h2>Seu plano começa<br/>com <em>uma escolha.</em></h2><p>Leia, reflita e leve uma ideia prática para a sua vida financeira ainda hoje.</p><a className="button button-white" href={checkout} target="_blank" rel="noreferrer">Quero meu ebook <MoveUpRight size={17}/></a><div className="offer-notes"><span><BadgeCheck size={15}/> Conteúdo digital</span><i/><span><BadgeCheck size={15}/> Leia quando quiser</span><i/><span><BadgeCheck size={15}/> Acesso após a compra</span></div></Reveal><div className="offer-decoration" aria-hidden="true"><div className="dec-ring ring-large"/><div className="dec-ring ring-small"/><span>PLANO<br/>EM DIA</span><div className="dec-spark">✳</div></div></section>
      </main>

      <footer className="site-footer"><a className="brand footer-brand" href="#inicio"><span className="brand-mark"><span/><span/><span/></span><span>plano<span className="brand-dot">.</span>em dia</span></a><span>Um passo de cada vez também é caminho.</span><span>© 2026 Plano em Dia</span></footer>
      <a className="mobile-buy" href="#oferta">Quero meu ebook <ArrowRight size={17}/></a>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
