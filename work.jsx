// work.jsx — Services, CaseStudies, Process
const SERVICES = [
  { icon: 'cart', title: 'Custom Shopify Development', desc: 'Bespoke, fast-loading storefronts built on Shopify & Shopify Plus — pixel-perfect from Figma to live.' },
  { icon: 'code', title: 'Theme & Liquid Customization', desc: 'Deep Liquid, JS and metafield work to bend any theme to your brand and your roadmap.' },
  { icon: 'trend', title: 'Conversion Rate Optimization', desc: 'Data-led CRO — landing pages, PDP, checkout and A/B tests that move revenue, not vanity metrics.' },
  { icon: 'gauge', title: 'Speed & Performance', desc: 'Core Web Vitals tuning, lazy-loading and clean code that takes stores from sluggish to sub-2s.' },
  { icon: 'swap', title: 'Migrations & Replatforming', desc: 'Seamless moves from WooCommerce, Wix, Magento or BigCommerce — no traffic or SEO lost.' },
  { icon: 'layers', title: 'Apps, APIs & Headless', desc: 'Custom apps, third-party integrations and Hydrogen/headless builds for brands that need more.' },
];
function Services() {
  return (
    <section className="section section--soft" id="services">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">What I do</span>
          <h2>Everything your store needs to grow — under one roof.</h2>
          <p>From first line of Liquid to your best month ever. A full-stack Shopify partner so you don't juggle five freelancers.</p>
        </Reveal>
        <div className="services__grid">
          {SERVICES.map((s, i) => {
            const Ic = Icon[s.icon];
            return (
              <Reveal key={s.title} delay={(i % 3) * 90} className="service card">
                <span className="service__icon"><Ic width="22" height="22" /></span>
                <h3 className="service__title">{s.title}</h3>
                <p className="service__desc">{s.desc}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const WORK = [
  {
    brand: 'Standtron', url: 'https://standtron.com', niche: 'Tech & Accessories', hue: 255,
    desc: 'Official MOFT distributor in India. Rebuilt the storefront with a mega-menu, 2,400+ review integration and a full speed pass — cut load time by 40% and grew monthly revenue 38% in the first quarter post-launch.',
    img: 'https://standtron.com/cdn/shop/files/2021.6.7_Moft_6314_new.jpg?v=1779684174&width=1200',
    result: '+38% revenue · -40% load time',
  },
  {
    brand: 'Pardewale', url: 'https://pardewale.in', niche: 'Home Decor', hue: 28,
    desc: 'Custom curtain brand in Surat since 2004. Designed a collection-rich Shopify store with a live curtain configurator, tiered bulk-order discounts and a mobile checkout optimised for repeat buyers.',
    img: 'https://pardewale.in/cdn/shop/files/Living_Room_Curtain_Ideas.webp?v=1777637661&width=1200',
    result: '2× mobile conversion · launched in 3 weeks',
  },
  {
    brand: 'Yoshima', url: 'https://yoshima.in', niche: 'Fashion & Apparel', hue: 330,
    desc: 'Premium cotton essentials for men and women. Built a clean, mobile-first Shopify store with COD checkout, a 7-day returns flow and size-guide metafields — bounce rate dropped 34% after launch.',
    img: 'https://yoshima.in/cdn/shop/files/0A0A5386.jpg?v=1776249869&width=1000',
    result: '-34% bounce rate · sub-1.8s load',
  },
  {
    brand: 'Rudrakshwala', url: 'https://www.rudrakshwala.com', niche: 'Spiritual & Wellness', hue: 16,
    desc: 'Authentic Rudraksha and spiritual wellness products. Built a trust-first Shopify store with certificate-of-authenticity metafields, rich product descriptions and a high-intent PDP built to reduce pre-purchase anxiety.',
    img: '',
    result: 'Custom PDP · authenticity-first UX',
  },
  {
    brand: 'Gold Modil Machinery', url: 'https://goldmodilmachinary.in', niche: 'Industrial · B2B', hue: 45,
    desc: 'Jewellery and gold-working machinery supplier. Designed a B2B Shopify catalog with detailed technical spec pages, an enquiry-to-order flow and a clean navigation built for trade buyers.',
    img: '',
    result: 'B2B enquiry flow · spec-rich catalog',
  },
];

function WorkCard({ w, index }) {
  return (
    <Reveal delay={(index % 3) * 90} className="work-card card">
      <a className="work-card__media" href={w.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${w.brand}`}>
        <image-slot id={`work-${index}`} className="work-slot" shape="rect" fit="cover"
          {...(w.img ? { src: w.img } : {})}
          placeholder="Drop store screenshot"></image-slot>
        <div className="work-card__skeleton" style={{ '--hue': w.hue }} aria-hidden="true"></div>
        <span className="tag work-card__tag">{w.niche}</span>
      </a>
      <div className="work-card__body">
        <h3 className="work-card__brand">{w.brand}</h3>
        <p className="work-card__desc">{w.desc}</p>
        {w.result && <span className="work-card__result"><Icon.trend width="13" height="13" />{w.result}</span>}
        <a className="work-card__link" href={w.url} target="_blank" rel="noopener noreferrer">
          Visit live store <Icon.arrowUR width="15" height="15" />
        </a>
      </div>
    </Reveal>
  );
}

function CaseStudies() {
  return (
    <section className="section" id="work">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Selected work</span>
          <h2>Shopify stores I've designed, built &amp; shipped.</h2>
          <p>A few live builds across tech, home decor, fashion, wellness and B2B — every one a real, running Shopify store. Click any card to visit it.</p>
        </Reveal>
        <div className="work-grid">
          {WORK.map((w, i) => <WorkCard key={w.brand} w={w} index={i} />)}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { n: '01', t: 'Discovery & audit', d: 'We dig into your goals, customers and current store. You get a clear audit of what\u2019s leaking revenue.' },
  { n: '02', t: 'Strategy & roadmap', d: 'A prioritised plan — design, dev and CRO — scoped to impact, with fixed timelines and pricing.' },
  { n: '03', t: 'Design & build', d: 'Pixel-perfect design, then clean, fast Shopify code. You review in staging at every milestone.' },
  { n: '04', t: 'Launch', d: 'QA across devices, SEO checks and a zero-downtime go-live. Nothing breaks, nothing gets lost.' },
  { n: '05', t: 'Optimize & grow', d: 'Post-launch CRO, A/B testing and iteration. We keep pushing conversion month after month.' },
];
function Process() {
  return (
    <section className="section section--dark" id="process">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">How we work</span>
          <h2>A calm, transparent process — from kickoff to your best month.</h2>
        </Reveal>
        <div className="steps">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 80} className="step">
              <span className="step__n">{s.n}</span>
              <div className="step__body">
                <h3 className="step__t">{s.t}</h3>
                <p className="step__d">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const PACKAGES = [
  {
    name: 'Theme Customization',
    from: 'From £799',
    timeline: '2–3 weeks',
    desc: 'Take an existing Shopify theme and make it fully yours — your brand, your conversion goals.',
    features: [
      'Deep Liquid & JS customization',
      'Mobile-first responsive design',
      'Speed & Core Web Vitals pass',
      'SEO meta + structured data',
      '30 days post-launch support',
    ],
    cta: 'Start a project',
    highlight: false,
  },
  {
    name: 'Custom Shopify Build',
    from: 'From £2,400',
    timeline: '4–6 weeks',
    desc: 'Bespoke storefront built from Figma to live. Every pixel optimised to convert.',
    features: [
      'Custom design from scratch',
      'Shopify or Shopify Plus',
      'Custom sections & metafields',
      'CRO-focused PDP & checkout',
      'Performance tuned to sub-2s',
      '60 days post-launch support',
    ],
    cta: 'Book a strategy call',
    highlight: true,
    badge: 'Most popular',
  },
  {
    name: 'Growth Retainer',
    from: 'From £699 / mo',
    timeline: 'Ongoing',
    desc: 'Keep improving after launch with a dedicated growth partner in your corner every month.',
    features: [
      'Monthly CRO & A/B tests',
      'Speed & conversion audits',
      'Landing page builds',
      'App installs & integrations',
      'Priority development support',
    ],
    cta: 'Let\'s talk',
    highlight: false,
  },
];

function Pricing() {
  return (
    <section className="section section--soft" id="pricing">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Pricing</span>
          <h2>Clear, fixed pricing — no agency markup, no surprises.</h2>
          <p>Every project is scoped before we start. These are starting points — book a free call and you'll leave with an exact quote.</p>
        </Reveal>
        <div className="pricing__grid">
          {PACKAGES.map((pkg, i) => (
            <Reveal key={pkg.name} delay={i * 90} className={`pricing-card card${pkg.highlight ? ' pricing-card--highlight' : ''}`}>
              {pkg.badge && <span className="pricing-badge">{pkg.badge}</span>}
              <div className="pricing-card__name">{pkg.name}</div>
              <div className="pricing-card__price">{pkg.from}</div>
              <div className="pricing-card__timeline"><Icon.calendar width="13" height="13" /> {pkg.timeline}</div>
              <p className="pricing-card__desc">{pkg.desc}</p>
              <ul className="pricing-card__features">
                {pkg.features.map(f => (
                  <li key={f}><Icon.check width="16" height="16" />{f}</li>
                ))}
              </ul>
              <a href="#contact" className={`btn pricing-card__cta ${pkg.highlight ? 'btn-primary' : 'btn-ghost'}`}>
                {pkg.cta} <Icon.arrow />
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal className="pricing__note">
          <Icon.bolt width="16" height="16" />
          All prices in GBP. INR / USD equivalents available on request. Indian brands — pricing starts lower.
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { Services, CaseStudies, Process, Pricing });
