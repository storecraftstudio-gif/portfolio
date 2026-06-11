// hero.jsx — Nav, Hero, ClientLogos, Metrics
const NAV_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#process', label: 'Process' },
  { href: '#faq', label: 'FAQ' },
];

function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <a href="#top" className="nav__logo" aria-label="Store Craft Studio home"><Logo /></a>
        <nav className="nav__links" aria-label="Primary">
          {NAV_LINKS.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        </nav>
        <div className="nav__cta">
          <a href="#contact" className="btn btn-primary">Book a free call <Icon.arrow /></a>
        </div>
        <button className="nav__burger" aria-label="Menu" onClick={() => setOpen(!open)}>
          <span/><span/><span/>
        </button>
      </div>
      {open && (
        <div className="nav__mobile">
          {NAV_LINKS.map((l) => <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>)}
          <a href="#contact" className="btn btn-primary" onClick={() => setOpen(false)}>Book a free call</a>
        </div>
      )}
    </header>
  );
}

function Hero({ heroTitle }) {
  // highlight the clause after an em dash, if present
  const title = heroTitle || "Shopify stores that don't just look good — they sell.";
  const dash = title.indexOf('—');
  const head = dash >= 0 ? title.slice(0, dash + 1) : title;
  const tail = dash >= 0 ? title.slice(dash + 1) : '';
  return (
    <section className="hero" id="top">
      <div className="hero__bg" aria-hidden="true"></div>
      <div className="container hero__inner">
        <div className="hero__copy">
          <Reveal as="span" className="pill-badge">
            <span className="dot"></span> Shopify Growth Partner · UK · US · CA · IND
          </Reveal>
          <Reveal as="h1" delay={60} className="hero__title">
            {head} {tail && <span className="hl">{tail.trim()}</span>}
          </Reveal>
          <Reveal as="p" delay={140} className="hero__sub">
            I'm <strong>Sumith R</strong>, founder of <strong>Store Craft Studio</strong> — a Shopify
            developer &amp; growth partner helping DTC brands in tech, home decor and fashion turn
            browsers into buyers with fast, conversion-focused stores.
          </Reveal>
          <Reveal delay={220} className="hero__actions">
            <a href="#contact" className="btn btn-primary btn-lg">Book a free strategy call <Icon.arrow /></a>
            <a href="#work" className="btn btn-ghost btn-lg">View case studies</a>
          </Reveal>
          <Reveal delay={300} className="hero__trust">
            <div className="stars" aria-label="4.9 out of 5 rating">
              {[0,1,2,3,4].map(i => <Icon.star key={i} width="16" height="16" />)}
            </div>
            <span><strong>4.9/5</strong> from 60+ founders · <strong>120+</strong> stores shipped</span>
          </Reveal>
        </div>

        <Reveal delay={180} className="hero__visual">
          <div className="browser">
            <div className="browser__bar">
              <span className="browser__dot"></span><span className="browser__dot"></span><span className="browser__dot"></span>
              <span className="browser__url"><Icon.cart width="13" height="13" /> yourstore.com</span>
            </div>
            <div className="browser__view">
              <image-slot id="hero-store" className="hero-slot" shape="rect"
                placeholder="Drop a client store screenshot"></image-slot>
              <div className="store-skeleton" aria-hidden="true">
                <div className="ss-nav"><span></span><span></span><span></span><span className="ss-cart"></span></div>
                <div className="ss-hero"><div className="ss-h1"></div><div className="ss-h2"></div><div className="ss-btn"></div></div>
                <div className="ss-grid">
                  {[0,1,2].map(i => <div key={i} className="ss-card"><div className="ss-img"></div><div className="ss-l"></div><div className="ss-l short"></div></div>)}
                </div>
              </div>
            </div>
          </div>
          <div className="float-card float-card--rev">
            <span className="fc-label">Revenue this month</span>
            <span className="fc-value">$<Counter to={184500} duration={1800} /></span>
            <span className="fc-trend"><Icon.trend width="14" height="14" /> +38% vs last month</span>
          </div>
          <div className="float-card float-card--cvr">
            <span className="fc-mini-label"><Icon.gauge width="14" height="14" /> Conversion</span>
            <span className="fc-mini-value"><Counter to={4.7} decimals={1} suffix="%" /></span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const CLIENTS = ['Standtron', 'Pardewale', 'Yoshima', 'Rudrakshwala', 'Gold Modil', 'MOFT India'];
function ClientLogos() {
  return (
    <section className="logos">
      <div className="container">
        <Reveal as="p" className="logos__label">Trusted by ambitious brands across 4 countries</Reveal>
        <Reveal delay={80} className="logos__row">
          {CLIENTS.map((c) => <span key={c} className="logos__item">{c}</span>)}
        </Reveal>
      </div>
    </section>
  );
}

const METRICS = [
  { to: 14, prefix: '$', suffix: 'M+', label: 'Revenue influenced for clients' },
  { to: 120, suffix: '+', label: 'Shopify stores designed & built' },
  { to: 38, prefix: '+', suffix: '%', label: 'Average conversion-rate lift' },
  { to: 1.6, decimals: 1, suffix: 's', label: 'Average store load time' },
];
function Metrics() {
  return (
    <section className="section metrics">
      <div className="container">
        <div className="metrics__grid">
          {METRICS.map((m, i) => (
            <Reveal key={m.label} delay={i * 90} className="metric">
              <span className="metric__value">
                <Counter to={m.to} prefix={m.prefix} suffix={m.suffix} decimals={m.decimals || 0} />
              </span>
              <span className="metric__label">{m.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section about" id="about">
      <div className="container about__grid">
        <Reveal className="about__img-wrap">
          <image-slot id="about-photo" className="about-slot" shape="rounded" radius="24"
            placeholder="Drop your headshot here"></image-slot>
          <div className="about__img-bg" aria-hidden="true"></div>
        </Reveal>
        <Reveal delay={80} className="about__copy">
          <span className="eyebrow">About me</span>
          <h2>Hi, I'm Sumith R — Shopify developer and growth partner.</h2>
          <p>I've spent the last 5+ years building Shopify stores that convert. I started Store Craft Studio because DTC founders deserve a single reliable partner — from first line of Liquid to your best revenue month ever — without agency overhead or freelancer roulette.</p>
          <p style={{ marginTop: 16 }}>I work with brands across the UK, US, Canada and India, with deep niche knowledge in tech, home decor and fashion. Every project is scoped and priced up front. No surprises.</p>
          <div className="about__badges">
            <span className="tag"><Icon.check width="13" height="13" /> Shopify Partner</span>
            <span className="tag"><Icon.check width="13" height="13" /> 120+ stores shipped</span>
            <span className="tag"><Icon.check width="13" height="13" /> 4.9 / 5 from 60+ founders</span>
          </div>
          <div className="about__actions">
            <a href="#contact" className="btn btn-primary">Book a free call <Icon.arrow /></a>
            <a href="https://linkedin.com/in/sumithr" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <Icon.linkedin width="16" height="16" /> LinkedIn profile
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Hero, ClientLogos, Metrics, About });
