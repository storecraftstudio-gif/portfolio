// lib.jsx — shared hooks, components, icons for Store Craft Studio
const { useState, useEffect, useRef, useCallback } = React;

/* Robust enter-view detection: IntersectionObserver + rect polling +
   scroll/resize listeners. Polling catches programmatic scroll (which
   doesn't dispatch scroll events). Fires once, then cleans up. */
function useInView(opts) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let done = false;
    let io, poll;
    const cleanup = () => {
      if (io) io.disconnect();
      if (poll) clearInterval(poll);
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
    const fire = () => { if (done) return; done = true; setInView(true); cleanup(); };
    const check = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top < vh * 0.9 && r.bottom > 0) fire();
    };
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) fire(); });
      }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px', ...(opts || {}) });
      io.observe(el);
    }
    check();
    poll = setInterval(check, 200);
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return cleanup;
  }, []);
  return [ref, inView];
}

/* Reveal wrapper */
function Reveal({ children, delay = 0, as = 'div', className = '', style = {}, ...rest }) {
  const [ref, inView] = useInView();
  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'in' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* Animated number counter — fires once when scrolled into view. */
function Counter({ to, prefix = '', suffix = '', decimals = 0, duration = 1600 }) {
  const [ref, inView] = useInView();
  const started = useRef(false);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { setVal(to); return; }
    const t0 = performance.now();
    let timer;
    const step = () => {
      const p = Math.min((performance.now() - t0) / duration, 1);
      setVal(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) timer = setTimeout(step, 16);
      else setVal(to);
    };
    step();
    return () => clearTimeout(timer);
  }, [inView]);
  const display = val.toLocaleString('en-US', {
    minimumFractionDigits: decimals, maximumFractionDigits: decimals
  });
  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

/* Brand logo lockup — cart + </> mark recreated as SVG (matches uploaded logo) */
function CartMark({ size = 34, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <g stroke={color} strokeWidth="8.5" strokeLinejoin="round" strokeLinecap="round" fill="none">
        {/* cart basket */}
        <path d="M14 30 H70 L63 60 H24 Z" />
        {/* handle to top-right */}
        <path d="M70 30 L84 16 H92" />
        {/* wheels base */}
        <path d="M26 74 H58 M58 74 V64 M58 74 L64 82" />
        <path d="M26 74 L20 82" />
      </g>
      {/* code chevrons + slash inside basket */}
      <g stroke={color} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M33 38 L25 45 L33 52" />
        <path d="M55 38 L63 45 L55 52" />
        <path d="M48 36 L40 54" />
      </g>
    </svg>
  );
}

function Logo({ light = false, mark = false }) {
  const ink = light ? '#fff' : 'var(--ink)';
  if (mark) return <CartMark size={36} color={ink} />;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <CartMark size={30} color={ink} />
      <span style={{
        fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 19,
        letterSpacing: '-0.01em', color: ink, lineHeight: 1
      }}>
        Store<span style={{ color: 'var(--brand)' }}>Craft</span>Studio
      </span>
    </span>
  );
}

/* Small inline icons */
const Icon = {
  arrow: (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  arrowUR: (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  check: (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  plus: (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>,
  star: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="m12 2 2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2Z"/></svg>,
  bolt: (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  code: (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 4l-4 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  cart: (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M3 4h2l2.4 12.2a1 1 0 0 0 1 .8h8.7a1 1 0 0 0 1-.8L21 8H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9.5" cy="20" r="1.4" fill="currentColor"/><circle cx="18" cy="20" r="1.4" fill="currentColor"/></svg>,
  gauge: (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M12 13l4-4M3 13a9 9 0 0 1 18 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="13" r="1.6" fill="currentColor"/></svg>,
  layers: (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="m12 3 9 5-9 5-9-5 9-5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="m3 13 9 5 9-5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  swap: (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M4 9h13l-3-3M20 15H7l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  trend: (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M3 17l6-6 4 4 8-8M21 7v5h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  phone: (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M6.6 3h2.5l1.5 4-2 1.4a12 12 0 0 0 5 5l1.4-2 4 1.5v2.5a2 2 0 0 1-2.2 2A16 16 0 0 1 4.6 5.2 2 2 0 0 1 6.6 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  mail: (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.8"/><path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  pin: (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.8"/></svg>,
  calendar: (p) => <svg viewBox="0 0 24 24" fill="none" {...p}><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  linkedin: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>,
  twitter: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.733-8.835L1.254 2.25H8.08l4.264 5.633 5.9-5.633Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  github: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>,
};

Object.assign(window, { useInView, Reveal, Counter, CartMark, Logo, Icon });
