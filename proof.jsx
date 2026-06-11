// proof.jsx — Testimonials, FAQ, Contact, Footer
const QUOTES = [
  {
    q: 'Sumith rebuilt our store in six weeks and our conversion rate jumped 50% in the first month. He doesn\'t just build — he thinks about the business.',
    name: 'Alex M.',
    role: 'Founder · DTC Audio Brand · UK',
    initials: 'A',
  },
  {
    q: 'The most reliable developer we\'ve worked with. Clear communication, clean code, and he actually cares about our revenue, not just the design.',
    name: 'Sarah K.',
    role: 'Head of Ecommerce · Home Decor Brand · USA',
    initials: 'S',
  },
  {
    q: 'Our store finally feels premium and loads instantly on mobile. Bounce rate halved within 30 days. Worth every rupee and then some.',
    name: 'Priya R.',
    role: 'Co-founder · Fashion Label · India',
    initials: 'P',
  },
];

function Testimonials() {
  return (
    <section className="section testimonials">
      <div className="container">
        <Reveal className="section-head section-head--center">
          <span className="eyebrow">Kind words</span>
          <h2>Founders don't hire me twice by accident.</h2>
        </Reveal>
        <div className="quotes">
          {QUOTES.map((t, i) => (
            <Reveal key={i} delay={i * 90} className="quote card">
              <div className="quote__stars">{[0,1,2,3,4].map(s => <Icon.star key={s} width="15" height="15" />)}</div>
              <p className="quote__text">"{t.q}"</p>
              <div className="quote__by">
                <span className="quote__avatar" aria-hidden="true">{t.initials}</span>
                <span><strong>{t.name}</strong><br/>{t.role}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  { q: 'What does a Shopify growth partner actually do?', a: 'More than build a store. I handle design, development, speed and conversion optimization as one ongoing relationship — so your store keeps improving long after launch, not just on day one.' },
  { q: 'How long does a Shopify store build take?', a: 'A focused theme customization is usually 2–3 weeks. A full custom Shopify or Shopify Plus build typically runs 4–6 weeks depending on scope. You\'ll get a fixed timeline before we start.' },
  { q: 'Do you work with Shopify Plus and headless?', a: 'Yes. I build on standard Shopify and Shopify Plus, and develop headless / Hydrogen storefronts and custom apps for brands that need advanced functionality or scale.' },
  { q: 'Which countries and niches do you work with?', a: 'I work with brands across the UK, US, Canada and India, and I\'m comfortable in any niche — with particular depth in tech, home decor and fashion.' },
  { q: 'How much does a Shopify project cost?', a: 'Every project is scoped and priced up front — no hourly surprises. Theme customizations start from £799; custom builds from £2,400; growth retainers from £699/mo. Book a free call and you\'ll leave with an exact quote.' },
  { q: 'Can you migrate my store from WooCommerce, Wix or Magento?', a: 'Absolutely. I run zero-downtime migrations that preserve your products, customers, URLs and SEO rankings, then rebuild the experience properly on Shopify.' },
  { q: 'Do you offer ongoing support after launch?', a: 'Yes — most clients stay on for CRO, A/B testing and iteration. You can also book one-off support or a retainer for continuous growth work.' },
];

function FAQItem({ f }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className={`faq ${open ? 'open' : ''}`}>
      <button className="faq__q" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span>{f.q}</span>
        <Icon.plus width="20" height="20" className="faq__icon" />
      </button>
      <div className="faq__a"><div className="faq__a-inner"><p>{f.a}</p></div></div>
    </div>
  );
}

function FAQ() {
  return (
    <section className="section section--soft" id="faq">
      <div className="container faq__wrap">
        <Reveal className="section-head">
          <span className="eyebrow">FAQ</span>
          <h2>Questions founders ask before we start.</h2>
          <p>Still unsure? Book a free call and ask me anything — no pitch, no pressure.</p>
        </Reveal>
        <div className="faqs">
          {FAQS.map((f, i) => <Reveal key={i} delay={i * 50}><FAQItem f={f} /></Reveal>)}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Replace REPLACE_WITH_YOUR_FORM_ID with your Formspree form ID
      // Get one free at https://formspree.io — takes 2 minutes
      const res = await fetch('https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID', {
        method: 'POST',
        body: new FormData(e.target),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) setSent(true);
    } catch {}
    setSubmitting(false);
  };

  return (
    <section className="section section--dark contact" id="contact">
      <div className="container contact__grid">
        <Reveal className="contact__copy">
          <span className="eyebrow">Let's talk</span>
          <h2>Book a free 30-minute strategy call.</h2>
          <p>Tell me about your store and goals. You'll leave the call with at least three concrete ideas to grow revenue — whether we work together or not.</p>
          <ul className="contact__list">
            <li><Icon.check width="18" height="18" /> No obligation, no hard sell</li>
            <li><Icon.check width="18" height="18" /> A quick audit of your current store</li>
            <li><Icon.check width="18" height="18" /> Clear next steps &amp; rough pricing</li>
          </ul>
          <div className="contact__details">
            <a href="mailto:services@storecraftstudio.in" className="contact__detail"><Icon.mail width="18" height="18" /> services@storecraftstudio.in</a>
            <a href="tel:+919606455835" className="contact__detail"><Icon.phone width="18" height="18" /> +91 96064 55835</a>
            <span className="contact__detail"><Icon.pin width="18" height="18" /> UK · US · Canada · India</span>
          </div>
              <a href="https://calendly.com/storecraftstudio/one-on-one-strategy-call" target="_blank" rel="noopener noreferrer"
             className="btn btn-ghost contact__calendly">
            <Icon.calendar width="17" height="17" /> Book directly on Calendly
          </a>
        </Reveal>

        <Reveal delay={120} className="contact__card">
          {sent ? (
            <div className="contact__success">
              <span className="contact__success-ic"><Icon.check width="34" height="34" /></span>
              <h3>Message received!</h3>
              <p>I'll reply within one business day to schedule your strategy call.</p>
              <button className="btn btn-ghost" onClick={() => setSent(false)}>Send another</button>
            </div>
          ) : (
            <form className="form" onSubmit={submit}>
              <div className="form__row">
                <label>Name<input required type="text" name="name" placeholder="Jane Founder" /></label>
                <label>Email<input required type="email" name="email" placeholder="jane@brand.com" /></label>
              </div>
              <label>Store URL<input type="text" name="store" placeholder="yourstore.com" /></label>
              <label>Niche
                <select name="niche" defaultValue="">
                  <option value="" disabled>Select a niche…</option>
                  <option>Tech &amp; Electronics</option>
                  <option>Home Decor</option>
                  <option>Fashion &amp; Apparel</option>
                  <option>Other</option>
                </select>
              </label>
              <label>What do you need help with?
                <textarea name="message" rows="3" placeholder="A redesign, faster store, more conversions…"></textarea>
              </label>
              {/* Honeypot — spam bots fill this, humans don't */}
              <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />
              <button type="submit" disabled={submitting} className="btn btn-primary btn-lg form__submit">
                {submitting ? 'Sending…' : <span style={{display:'inline-flex',alignItems:'center',gap:9}}>Book my free call <Icon.arrow /></span>}
              </button>
              <span className="form__fine">By submitting you agree to be contacted about your enquiry. No spam, ever.</span>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

const SOCIAL_LINKS = [
  { icon: 'linkedin', href: 'https://linkedin.com/in/sumithr', label: 'LinkedIn' },
  { icon: 'twitter', href: 'https://twitter.com/storecraftstudio', label: 'Twitter / X' },
  { icon: 'github', href: 'https://github.com/storecraftstudio', label: 'GitHub' },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Logo light />
          <p>Shopify developer &amp; growth partner. Fast, conversion-focused stores for ambitious DTC brands.</p>
          <div className="footer__stars">
            {[0,1,2,3,4].map(i => <Icon.star key={i} width="15" height="15" />)}
            <span>4.9/5 · 60+ founders</span>
          </div>
          <div className="footer__social">
            {SOCIAL_LINKS.map(s => {
              const Ic = Icon[s.icon];
              return (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer"
                   className="footer__social-link" aria-label={s.label}>
                  <Ic width="17" height="17" />
                </a>
              );
            })}
          </div>
        </div>
        <div className="footer__cols">
          <div className="footer__col">
            <span className="footer__h">Explore</span>
            <a href="#services">Services</a>
            <a href="#work">Case studies</a>
            <a href="#pricing">Pricing</a>
            <a href="#about">About</a>
            <a href="#process">Process</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="footer__col">
            <span className="footer__h">Services</span>
            <a href="#services">Shopify development</a>
            <a href="#services">Theme customization</a>
            <a href="#services">CRO &amp; speed</a>
            <a href="#services">Migrations</a>
            <a href="#services">Apps &amp; headless</a>
          </div>
          <div className="footer__col">
            <span className="footer__h">Contact</span>
            <a href="mailto:services@storecraftstudio.in">services@storecraftstudio.in</a>
            <a href="tel:+919606455835">+91 96064 55835</a>
            <a href="https://calendly.com/storecraftstudio/one-on-one-strategy-call" target="_blank" rel="noopener noreferrer">Book a call</a>
            <span className="footer__muted">UK · US · Canada · India</span>
          </div>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© 2026 Store Craft Studio — Sumith R. All rights reserved.</span>
        <span>storecraftstudio.in</span>
      </div>
    </footer>
  );
}

Object.assign(window, { Testimonials, FAQ, Contact, Footer });
