// Site.jsx — ProDesk marketing site

const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "audience": "brands",
  "showFloatingCards": true,
  "ctaCopy": "Join free",
  "heroHeadline": "The business management dashboard that puts everything in one place."
}/*EDITMODE-END*/;

function NavBar({ tweaks, setTweak }) {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#" className="brand-mark" aria-label="ProDesk home">
          <span className="wm">
            <span className="wm-pro">Pro</span><span className="wm-desk">Desk</span>
            <span className="wm-dot" aria-hidden="true"></span>
          </span>
        </a>
        <ul>
          <li><a href="#audience">For you</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#infin8">The INFIN8 system</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#story">Why ProDesk</a></li>
        </ul>
        <div className="nav-actions">
          <a href="#" className="signin">Sign in</a>
          <a href="#cta" className="btn btn-volt">
            Join free <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero({ tweaks }) {
  return (
    <header className="hero">
      <div className="hero-inner">
        <div className="hero-eyebrow">
          <span className="dot" />
          <span>One platform · Every tool · Free to join</span>
        </div>
        <h1>
          Stop being the office manager of your <em className="brand">own</em> business.
        </h1>
        <p className="lede">
          ProDesk is the operations dashboard that runs every agency, document
          and dollar from one tab — so you get back to actually building the
          thing. Free for brands, forever.
        </p>
        <div className="hero-cta">
          <a href="#cta" className="btn btn-volt">
            {tweaks.ctaCopy} <span className="arrow">→</span>
          </a>
          <a href="#calc" className="btn btn-ghost-on-ink">
            <Icon id="i-trend-up" size={14} /> I'm an agency — show me the math
          </a>
          <span className="meta">Free forever · No card · 4 minute setup</span>
        </div>
        <div className="hero-proof">
          <div className="hp"><span className="hp-num">14<span className="hp-u">hrs</span></span><span className="hp-l">saved per week, average brand</span></div>
          <div className="hp"><span className="hp-num">22<span className="hp-u">%</span></span><span className="hp-l">cut in unused subscriptions, month one</span></div>
          <div className="hp"><span className="hp-num">7<span className="hp-u">days</span></span><span className="hp-l">to onboard your full agency stack</span></div>
        </div>

        <div className="hero-stage">
          {tweaks.showFloatingCards && (
            <>
              <div className="hero-float left">
                <div className="ic"><Icon id="i-docs" /></div>
                <div>
                  <div className="lbl">Document locker</div>
                  <div className="val">v3 · always the right one</div>
                </div>
              </div>
              <div className="hero-float right">
                <div className="ic"><Icon id="i-trend-up" /></div>
                <div>
                  <div className="lbl">Subscriptions, this month</div>
                  <div className="val">$12,480 · across 14 agencies</div>
                </div>
              </div>
            </>
          )}
          <div className="hero-screenshot">
            <div className="hero-window-bar">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
              <span className="url-pill">prodesk.app/brand/northwind</span>
              <span style={{width: 30}} />
            </div>
            <MiniMock />
          </div>
        </div>
      </div>
    </header>
  );
}

const PROBLEM_LOGOS = [
  { name: "Lawyer · email", glyph: "✉" },
  { name: "Bookkeeper · portal", glyph: "$" },
  { name: "Designer · Dropbox", glyph: "▣" },
  { name: "Developer · Slack", glyph: "#" },
  { name: "Agency · PDF", glyph: "▤" },
  { name: "Studio · WeTransfer", glyph: "↗" },
];

function Logos() {
  return (
    <section className="logos">
      <div className="head">A dozen relationships. A dozen apps. One mess.</div>
      <div className="row">
        {PROBLEM_LOGOS.map((t) => (
          <div className="lg" key={t.name}>
            <span className="glyph" style={{color: 'var(--volt)'}}>{t.glyph}</span>
            {t.name}
          </div>
        ))}
      </div>
      <div style={{textAlign: 'center', marginTop: 36, fontSize: 14, color: 'rgba(244,241,232,0.55)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase'}}>
        ProDesk ends the chaos. ↓
      </div>
    </section>
  );
}

const AUDIENCES = [
  {
    id: "brands",
    eyebrow: "For Brands",
    title: "Run every agency, document and dollar from one tab.",
    body: "Stop chasing files in inboxes and PDFs in your Downloads folder. Your Info Hub becomes the single source of truth — automatically populated by the agencies you work with.",
    bullets: [
      "Run multiple brands from a single login",
      "Document Locker — one version, always the right one",
      "Every subscription, every renewal, in one view",
      "Pay in full, or spread over 12, 26 or 52 weeks",
    ],
    cta: "Join as a brand",
    icon: "i-dashboard",
  },
  {
    id: "agencies",
    eyebrow: "For Agencies & Professional Service Firms",
    title: "Your clients are equity. We help you monetise them.",
    body: "ProDesk treats your client relationships as equity. Every client you bring earns your agency a share of everything they ever spend on the platform — with any agency, on any service, forever.",
    bullets: [
      "Earn revenue share on every client you onboard — for life",
      "Win work from brands already on the platform",
      "Get paid automatically when clients approve",
      "Keep your tools, add ours alongside",
    ],
    cta: "Partner with ProDesk",
    icon: "i-pipelines",
  },
  {
    id: "contractors",
    eyebrow: "For Contractors, Freelancers & Staff",
    title: "Clear briefs. Transparent progress. Automatic payments.",
    body: "ProDesk connects you directly to the agencies and brands you work for. You see the job, you do the job, the client approves — and you get paid. Automatically. No follow-up emails.",
    bullets: [
      "Briefs that arrive complete, not in pieces",
      "Live progress visible to everyone — no status meetings",
      "Auto-payment on approval, not net-60",
      "Your full work history, portable",
    ],
    cta: "Find work on ProDesk",
    icon: "i-contacts",
  },
];

function Audience() {
  const [active, setActive] = useState("brands");
  const a = AUDIENCES.find((x) => x.id === active);
  return (
    <section className="section" id="audience">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow-line"><span className="dot" />Three sides · One platform</span>
          <h2>Built for the way modern brands <em className="brand">actually</em> get work done.</h2>
          <p className="lede">
            Brands need agencies. Agencies need talent. Talent needs clear work
            and clean payments. ProDesk is the layer that makes all three click.
          </p>
        </div>

        <div className="aud-tabs">
          {AUDIENCES.map((x) => (
            <button
              key={x.id}
              className={`aud-tab ${active === x.id ? 'on' : ''}`}
              onClick={() => setActive(x.id)}
            >
              <Icon id={x.icon} size={16} /> {x.eyebrow.replace('For ', '')}
            </button>
          ))}
        </div>

        <div className="aud-card">
          <div className="aud-copy">
            <span className="eyebrow-line"><span className="dot" />{a.eyebrow}</span>
            <h3 className="aud-title">{a.title}</h3>
            <p className="aud-body">{a.body}</p>
            <ul className="aud-bullets">
              {a.bullets.map((b) => (
                <li key={b}>
                  <span className="tick">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7" /></svg>
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <a href="#cta" className="btn btn-ink" style={{marginTop: 12}}>
              {a.cta} <span className="arrow">→</span>
            </a>
          </div>
          <div className="aud-visual">
            <MiniMock />
          </div>
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  {
    span: 4, ic: "i-dashboard", volt: true,
    title: "Run multiple brands, one login",
    body: "Create a separate profile for each business. Switch between them in a click — everything updates instantly. No more juggling logins.",
    meta: "Brand profiles",
  },
  {
    span: 4, ic: "i-sparkle",
    title: "Your business, completely organised",
    body: "The Info Hub is the central record of everything about your brand. Auto-populated by the agencies you work with. You stop chasing.",
    meta: "Info Hub",
  },
  {
    span: 4, ic: "i-docs",
    title: "One version. Always the right one.",
    body: "Upload to the Document Locker and your team always has the most recent, approved version. No 'final-final-v3-USE-THIS.pdf'.",
    meta: "Document Locker",
  },
  {
    span: 6, ic: "i-pipelines",
    title: "Never lose track of what you're paying for",
    body: "ProDesk pulls every subscription into a single view — what you're paying, who you're paying, and exactly when each one renews. The cancel button is right there.",
    meta: "Subscription manager",
  },
  {
    span: 6, ic: "i-trend-up", volt: true,
    title: "Know your numbers, by agency",
    body: "See breakdowns by agency, category and month. Make smarter calls about where your budget actually goes — not where you assumed it went.",
    meta: "Spend insights",
  },
  {
    span: 12, ic: "i-check", volt: true,
    title: "Pay on your terms. Agencies still get paid.",
    body: "Choose to pay an agency in full, or spread the cost over 12, 26 or 52 weeks. Your cash flow stays protected. The agency gets paid on time, every time. Everyone wins.",
    meta: "Flexible payments",
    big: true,
  },
];

function Features() {
  return (
    <section className="section" id="features" style={{paddingTop: 0}}>
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow-line"><span className="dot" />The features</span>
          <h2>Six features. <em className="brand">One</em> tab. Goodbye spreadsheet.</h2>
          <p className="lede">
            ProDesk replaces the swivel between inbox, Dropbox, Stripe portals and
            Slack threads with one quiet, opinionated workspace.
          </p>
        </div>

        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <article key={i} className={`feat span-${f.span} ${f.volt ? 'volt-ic' : ''} ${f.big ? 'feat-ink' : ''}`}>
              <div className="ic"><Icon id={f.ic} size={22} /></div>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
              <span className="meta">{f.meta}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const INFIN8 = [
  { n: "01", name: "INCUBATE",   blurb: "Get your foundations right before you build.",                               glyph: "◌" },
  { n: "02", name: "CREATE",     blurb: "Like having an entire creative agency in one app.",                          glyph: "✦" },
  { n: "03", name: "FABRICATE",  blurb: "Your one-stop partner for all physical business assets.",                    glyph: "▰" },
  { n: "04", name: "ACCELERATE", blurb: "Put lead generation and customer acquisition on auto-pilot.",                glyph: "↗" },
  { n: "05", name: "OPERATE",    blurb: "Keep your business humming with an outsourced management team.",             glyph: "◐" },
  { n: "06", name: "MOTIVATE",   blurb: "Drive engagement through activations, incentives and memberships.",          glyph: "✱" },
  { n: "07", name: "FACILITATE", blurb: "Advisory support from launch to exit — and every stage between.",            glyph: "◆" },
  { n: "08", name: "EVALUATE",   blurb: "Always measured, always calculated — never guessing.",                       glyph: "▣" },
];

function Infin8() {
  const [active, setActive] = useState(0);
  return (
    <section className="section infin8-section" id="infin8" style={{paddingTop: 0}}>
      <div className="wrap">
        <div className="infin8-shell">
          <div className="section-head" style={{margin: '0 auto 56px'}}>
            <span className="eyebrow-line" style={{color: 'rgba(244,241,232,0.6)'}}>
              <span className="dot" />The INFIN8 system
            </span>
            <h2 style={{color: 'var(--paper)'}}>
              One system. Eight stages. Sixty-four steps. <em className="brand" style={{color: 'var(--volt)'}}>Infinite</em> clarity.
            </h2>
            <p className="lede" style={{color: 'rgba(244,241,232,0.65)'}}>
              Most owners are doing the right things in the wrong order. INFIN8
              is the proven framework that takes your business through every
              stage of growth — from foundations to exit.
            </p>
          </div>

          <div className="infin8-grid">
            {INFIN8.map((s, i) => (
              <button
                key={s.n}
                className={`infin8-card ${active === i ? 'on' : ''}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <div className="infin8-num">
                  <span>{s.n}</span>
                  <span className="glyph">{s.glyph}</span>
                </div>
                <div className="infin8-name">{s.name}</div>
                <div className="infin8-blurb">{s.blurb}</div>
              </button>
            ))}
          </div>

          <div className="infin8-stats">
            <div className="stat">
              <div className="num">8</div>
              <div className="lbl">stages, in order</div>
            </div>
            <div className="stat">
              <div className="num">64</div>
              <div className="lbl">structured steps</div>
            </div>
            <div className="stat">
              <div className="num">∞</div>
              <div className="lbl">clarity, end to end</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Steps() {
  const steps = [
    {
      n: "01",
      title: "Create your brand profile",
      body: "Sign up free. Spin up a profile for each business you run. Add the basics — or let an agency populate them for you.",
      glyph: "→",
    },
    {
      n: "02",
      title: "Plug in your agencies",
      body: "Invite the agencies you already work with. They populate your Info Hub, upload to your Document Locker, log their subscriptions.",
      glyph: "✦",
    },
    {
      n: "03",
      title: "Run the business",
      body: "One tab. Every agency, document, payment and renewal. Pay in full or in instalments. Watch the chaos go quiet.",
      glyph: "✓",
    },
  ];
  return (
    <section className="section" id="setup" style={{paddingTop: 0}}>
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow-line"><span className="dot" />How it works</span>
          <h2>Three steps. <em className="brand">No</em> migration project.</h2>
          <p className="lede">
            Most teams are up and running by the end of an afternoon. The agencies
            you already work with do the heavy lifting — that's the point.
          </p>
        </div>
        <div className="steps">
          {steps.map((s) => (
            <div className="step" key={s.n}>
              <div className="num">Step <span>{s.n}</span></div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <div className="glyph">{s.glyph}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section className="section" id="story" style={{paddingTop: 0}}>
      <div className="wrap">
        <div className="testimonial">
          <div className="person">
            <div className="photo">
              <span className="badge">Founder · Maya Cole</span>
            </div>
          </div>
          <div>
            <span className="eyebrow-line"><span className="dot" />Customer story · Northwind Studio</span>
            <blockquote style={{marginTop: 16}}>
              We had eight agencies, six portals and zero idea what we were
              spending. ProDesk pulled all of it into one tab — and our
              <em> agencies</em> filled it in for us.
            </blockquote>
            <div className="who">
              <span className="name">Maya Cole</span>
              <span className="div" />
              <span className="role">Founder, Northwind Studio · 4 brands · 9 agencies</span>
            </div>

            <div className="outcome-row">
              <div className="oc"><div className="oc-n">$28k</div><div className="oc-l">unused subscriptions, killed in week one</div></div>
              <div className="oc"><div className="oc-n">14 hrs</div><div className="oc-l">a week, back in Maya's calendar</div></div>
              <div className="oc"><div className="oc-n">9→0</div><div className="oc-l">portals to log into every morning</div></div>
            </div>

            <div className="trust">
              <span className="lbl">Brands on ProDesk</span>
              <span className="lg">◆ Acme</span>
              <span className="lg">▲ Hooli</span>
              <span className="lg">● Initech</span>
              <span className="lg">◇ Soylent</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    {
      name: "Brand",
      price: 0,
      per: "free, forever",
      desc: "For founders running one or many brands. The full platform. No card.",
      featured: false,
      cta: "Join as a brand",
      tag: null,
      features: [
        "Unlimited brand profiles",
        "Info Hub + Document Locker",
        "Subscription tracking",
        "Pay in full or 12 / 26 / 52 weeks",
      ],
    },
    {
      name: "Agency",
      price: 0,
      per: "free + revenue share",
      desc: "For agencies and professional service firms. Earn equity in every client you bring.",
      featured: true,
      cta: "Partner with ProDesk",
      tag: "Earn for life",
      features: [
        "Lifetime revenue share on referred clients",
        "Win work from brands on platform",
        "Auto-billing, no chasing invoices",
        "Co-branded brand workspaces",
        "Priority support, real humans",
      ],
    },
  ];
  return (
    <section className="section" id="pricing">
      <div className="wrap">
        <div className="pricing-shell">
          <div className="section-head">
            <span className="eyebrow-line" style={{color: 'rgba(244,241,232,0.6)'}}>
              <span className="dot" />Pricing
            </span>
            <h2>Free to join. <em className="brand">Always.</em></h2>
            <p className="lede">
              Brands pay nothing to use ProDesk. Agencies earn revenue share for
              life on every client they refer. Contractors get paid automatically.
            </p>
          </div>

          <div className="price-grid">
            {tiers.map((t) => (
              <div key={t.name} className={`price-card ${t.featured ? 'featured' : ''}`}>
                <div className="name">
                  <span>{t.name}</span>
                  {t.tag && <span className="tag">{t.tag}</span>}
                </div>
                <div className="price">
                  <span className="cur">$</span>
                  <span>{t.price}</span>
                  <span className="per">{t.per}</span>
                </div>
                <p className="desc">{t.desc}</p>
                <ul>
                  {t.features.map((f) => (
                    <li key={f}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#cta" className={`btn ${t.featured ? 'btn-ink' : 'btn-volt'}`}>
                  {t.cta} <span className="arrow">→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const FAQ_ITEMS = [
  {
    q: "Is ProDesk really free for brands?",
    a: "Yes. Brands pay nothing for the platform. You only ever pay your agencies for the work they do — and ProDesk gives you control over how and when.",
  },
  {
    q: "How does the agency revenue share work?",
    a: "When you refer a client to ProDesk, your agency earns a share of everything that client ever spends on the platform — with any agency, on any service. For life. It's the closest thing to equity in your client relationships.",
  },
  {
    q: "What if my agencies aren't on ProDesk yet?",
    a: "Invite them — it's free. They get a co-branded workspace, automatic invoicing, and a lifetime revenue share on every brand they bring along after you. Most agencies are signed up by lunchtime.",
  },
  {
    q: "How do payment plans work?",
    a: "Choose to pay an agency in full, or spread the cost over 12, 26 or 52 weeks. Your cash flow stays protected. The agency still gets paid on time — ProDesk handles the rest.",
  },
  {
    q: "Where does the INFIN8 system fit in?",
    a: "INFIN8 is the framework underneath the dashboard — eight stages, sixty-four steps, from foundations to exit. ProDesk shows you which stage each of your brands is at, and what to do next.",
  },
];

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section" id="faq" style={{paddingTop: 0}}>
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow-line"><span className="dot" />FAQ</span>
          <h2>The questions <em className="brand">everyone</em> asks first.</h2>
        </div>
        <div className="faq">
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className={`faq-item ${open === i ? 'open' : ''}`}
              onClick={() => setOpen(open === i ? -1 : i)}
            >
              <h3 className="q">{item.q}</h3>
              <span className="toggle">+</span>
              <p className="a">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBand({ tweaks }) {
  return (
    <section className="section" id="cta" style={{paddingTop: 0}}>
      <div className="wrap">
        <div className="cta-band">
          <h2>Everything <em>clicks.</em><br />Free to join.</h2>
          <p>
            Spin up your brand profile in three minutes. Invite your agencies.
            Watch the chaos go quiet. No card. No setup fee. No catch.
          </p>
          <div className="ctas">
            <a href="#" className="btn btn-ink">
              {tweaks.ctaCopy} as a brand <span className="arrow">→</span>
            </a>
            <a href="#calc" className="btn btn-ghost">
              Partner as an agency
            </a>
            <a href="#" className="btn btn-ghost">
              Book a 15-min walkthrough
            </a>
          </div>
          <div className="meta">Free forever for brands · Revenue share for agencies · Auto-pay for talent</div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="grid">
          <div className="brand-col">
            <span className="wm wm-lg wm-on-ink">
              <span className="wm-pro">Pro</span><span className="wm-desk">Desk</span>
              <span className="wm-dot" aria-hidden="true"></span>
            </span>
            <p>
              The business management dashboard that puts everything in one
              place. Connecting brands, agencies and the talent who power the work.
            </p>
            <div className="sub-form">
              <input type="email" placeholder="you@yourcompany.co" />
              <button>Subscribe</button>
            </div>
          </div>
          <div className="col">
            <h4>Platform</h4>
            <ul>
              <li><a href="#features">Info Hub</a></li>
              <li><a href="#features">Document Locker</a></li>
              <li><a href="#features">Subscriptions</a></li>
              <li><a href="#features">Spend insights</a></li>
              <li><a href="#features">Payment plans</a></li>
            </ul>
          </div>
          <div className="col">
            <h4>For you</h4>
            <ul>
              <li><a href="#audience">Brands</a></li>
              <li><a href="#audience">Agencies</a></li>
              <li><a href="#audience">Contractors</a></li>
              <li><a href="#infin8">The INFIN8 system</a></li>
              <li><a href="#pricing">Pricing</a></li>
            </ul>
          </div>
          <div className="col">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Docs</a></li>
              <li><a href="#">Changelog</a></li>
              <li><a href="#">Templates</a></li>
              <li><a href="#">Status</a></li>
              <li><a href="#">Help centre</a></li>
            </ul>
          </div>
          <div className="col">
            <h4>Connect</h4>
            <ul>
              <li><a href="#">LinkedIn</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">YouTube</a></li>
              <li><a href="#">Community</a></li>
              <li><a href="#">support@prodesk.app</a></li>
            </ul>
          </div>
        </div>
        <div className="legal">
          <span>© 2026 ProDesk · Everything clicks.</span>
          <div className="links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Security</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ---- Manifesto ----
function Manifesto() {
  return (
    <section className="section manifesto" id="why">
      <div className="wrap">
        <div className="manifesto-grid">
          <div className="manifesto-left">
            <span className="eyebrow-line"><span className="dot" />Why ProDesk exists</span>
            <h2 className="manifesto-h">
              Modern brands have <em className="brand">never</em> had more help — and never felt more alone running it.
            </h2>
          </div>
          <div className="manifesto-right">
            <p>
              You were sold a stack of specialists. A lawyer. A bookkeeper. A
              designer. An ads agency. A virtual assistant. Each one excellent.
              Each one in a different inbox, on a different invoice, with a
              different login.
            </p>
            <p>
              <strong>The work got done. The owner became the office manager.</strong>
            </p>
            <p>
              ProDesk is the layer that connects the people who power your
              business — and turns the relationships you already have into the
              dashboard you've always wanted. We didn't add another tool.
              We replaced the chaos between them.
            </p>
            <div className="manifesto-sig">
              <span className="sig-line">— The ProDesk founders</span>
              <span className="sig-meta">Built by operators who got tired of being switchboards.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Integrations ----
const INTEGRATIONS = [
  { name: "Xero",        glyph: "X",  cat: "Accounting" },
  { name: "QuickBooks",  glyph: "Q",  cat: "Accounting" },
  { name: "Stripe",      glyph: "S",  cat: "Payments" },
  { name: "Gmail",       glyph: "M",  cat: "Email" },
  { name: "Google Drive",glyph: "△",  cat: "Files" },
  { name: "Dropbox",     glyph: "▱",  cat: "Files" },
  { name: "Slack",       glyph: "#",  cat: "Comms" },
  { name: "Notion",      glyph: "N",  cat: "Docs" },
  { name: "HubSpot",     glyph: "◉",  cat: "CRM" },
  { name: "Calendly",    glyph: "◷",  cat: "Scheduling" },
  { name: "DocuSign",    glyph: "✎",  cat: "Signing" },
  { name: "Zapier",      glyph: "⚡",  cat: "Automation" },
];
function Integrations() {
  return (
    <section className="section integrations" id="integrations" style={{paddingTop: 0}}>
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow-line"><span className="dot" />Plays nice with</span>
          <h2>Your stack stays. <em className="brand">ProDesk</em> ties it together.</h2>
          <p className="lede">
            Two-way sync with the tools your business already runs on. We don't
            ask you to migrate — we ask your tools to talk to each other for once.
          </p>
        </div>
        <div className="int-grid">
          {INTEGRATIONS.map((t) => (
            <div className="int-tile" key={t.name}>
              <span className="int-glyph">{t.glyph}</span>
              <div>
                <div className="int-name">{t.name}</div>
                <div className="int-cat">{t.cat}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="int-foot">
          <span>+ 40 more, with a public API and Zapier for the rest.</span>
          <a href="#" className="link-arrow">See the full list <span className="arrow">→</span></a>
        </div>
      </div>
    </section>
  );
}

// ---- Revenue-share Calculator ----
function Calculator() {
  const [clients, setClients] = useState(10);
  const [spend, setSpend] = useState(5000);
  const RATE = 0.05;
  const monthly = Math.round(clients * spend * RATE);
  const yearly = monthly * 12;
  const fiveYr = yearly * 5;
  const fmt = (n) => '$' + n.toLocaleString();
  return (
    <section className="section calc-section" id="calc" style={{paddingTop: 0}}>
      <div className="wrap">
        <div className="calc-shell">
          <div className="calc-copy">
            <span className="eyebrow-line" style={{color: 'rgba(244,241,232,0.6)'}}>
              <span className="dot" />For agencies
            </span>
            <h2 style={{color: 'var(--paper)'}}>
              Your client book is <em className="brand" style={{color: 'var(--volt)'}}>equity.</em> We pay you like it.
            </h2>
            <p className="lede" style={{color: 'rgba(244,241,232,0.7)'}}>
              Refer a client to ProDesk once. Earn <strong style={{color: 'var(--volt)'}}>5% of everything they ever
              spend</strong> — with any agency, on any service, for life. Not a
              referral bonus. A residual.
            </p>
            <ul className="calc-bullets">
              <li><span className="tick"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7" /></svg></span>Paid monthly, automatically, in your currency</li>
              <li><span className="tick"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7" /></svg></span>Stays yours even if the client switches agencies</li>
              <li><span className="tick"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7" /></svg></span>Transferable on sale of your agency</li>
            </ul>
          </div>
          <div className="calc-card">
            <div className="calc-head">Run the numbers</div>
            <label className="calc-row">
              <span>Clients you'd refer</span>
              <span className="calc-val">{clients}</span>
              <input type="range" min="1" max="50" value={clients} onChange={(e) => setClients(+e.target.value)} />
            </label>
            <label className="calc-row">
              <span>Avg. monthly spend per client</span>
              <span className="calc-val">{fmt(spend)}</span>
              <input type="range" min="500" max="25000" step="500" value={spend} onChange={(e) => setSpend(+e.target.value)} />
            </label>
            <div className="calc-results">
              <div className="cr">
                <span className="cr-l">Per month</span>
                <span className="cr-n">{fmt(monthly)}</span>
              </div>
              <div className="cr cr-mid">
                <span className="cr-l">Per year</span>
                <span className="cr-n">{fmt(yearly)}</span>
              </div>
              <div className="cr cr-feat">
                <span className="cr-l">Over 5 years</span>
                <span className="cr-n">{fmt(fiveYr)}</span>
              </div>
            </div>
            <a href="#cta" className="btn btn-volt" style={{width: '100%', justifyContent: 'center'}}>
              Apply as a partner agency <span className="arrow">→</span>
            </a>
            <div className="calc-fine">Indicative only. Final share confirmed in your partner agreement.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Comparison ----
const COMPARE_ROWS = [
  { row: "Where your agency contracts live",       us: "Document Locker",                 them: "Inbox + Dropbox + Drive" },
  { row: "Subscription renewals",                  us: "One view, one cancel button",     them: "Six portals, one nasty surprise" },
  { row: "Paying agencies",                        us: "Full or 12 / 26 / 52 weeks",      them: "All up front, every time" },
  { row: "Onboarding a new agency",                us: "They populate your hub for you",  them: "Brief docs, calls, follow-ups" },
  { row: "Knowing your real spend",                us: "By agency, category, month",      them: "Ask the bookkeeper" },
  { row: "What happens if an agency leaves",       us: "Your data stays. Yours.",          them: "Email begging for files" },
];
function Comparison() {
  return (
    <section className="section compare-section" id="compare" style={{paddingTop: 0}}>
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow-line"><span className="dot" />Honest comparison</span>
          <h2>The <em className="brand">old</em> way vs. ProDesk.</h2>
        </div>
        <div className="compare-table">
          <div className="compare-head">
            <div></div>
            <div className="ch ch-us">
              <span className="wm" style={{fontSize: 18}}>
                <span className="wm-pro">Pro</span><span className="wm-desk">Desk</span>
                <span className="wm-dot" aria-hidden="true"></span>
              </span>
            </div>
            <div className="ch ch-them">The way you do it now</div>
          </div>
          {COMPARE_ROWS.map((r) => (
            <div className="compare-row" key={r.row}>
              <div className="cr-label">{r.row}</div>
              <div className="cr-us">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{color: 'var(--ink)'}}><path d="M5 12l5 5L20 7" /></svg>
                <span>{r.us}</span>
              </div>
              <div className="cr-them">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{color: 'var(--fg-2)'}}><path d="M6 6l12 12M18 6l-12 12" /></svg>
                <span>{r.them}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Security ----
function Security() {
  const items = [
    { ic: "i-check",     t: "Bank-grade encryption",     b: "AES-256 at rest. TLS 1.3 in transit. Zero-knowledge document storage." },
    { ic: "i-docs",      t: "SOC 2 Type II",             b: "Independently audited. Annually re-certified. Report on request." },
    { ic: "i-dashboard", t: "Your data is yours",        b: "Export everything in one click — JSON, CSV, original files. No lock-in." },
    { ic: "i-pipelines", t: "Granular permissions",      b: "Agency-by-agency, document-by-document. Revoke access in one tap." },
  ];
  return (
    <section className="section security" id="security" style={{paddingTop: 0}}>
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow-line"><span className="dot" />Trust & security</span>
          <h2>One tab for everything is only <em className="brand">smart</em> if it's safe.</h2>
          <p className="lede">
            We're asking you to centralise your business. We take that seriously.
          </p>
        </div>
        <div className="sec-grid">
          {items.map((x) => (
            <div className="sec-card" key={x.t}>
              <div className="sec-ic"><Icon id={x.ic} size={20} /></div>
              <h3>{x.t}</h3>
              <p>{x.b}</p>
            </div>
          ))}
        </div>
        <div className="sec-badges">
          <div className="badge-pill">SOC 2 Type II</div>
          <div className="badge-pill">GDPR</div>
          <div className="badge-pill">ISO 27001</div>
          <div className="badge-pill">PCI DSS Level 1</div>
          <div className="badge-pill">99.98% uptime · last 12 mo</div>
        </div>
      </div>
    </section>
  );
}

function Tweaks({ tweaks, setTweak }) {
  return (
    <TweaksPanel>
      <TweakSection title="Hero">
        <TweakText
          label="Headline"
          value={tweaks.heroHeadline}
          onChange={(v) => setTweak('heroHeadline', v)}
        />
        <TweakText
          label="Primary CTA"
          value={tweaks.ctaCopy}
          onChange={(v) => setTweak('ctaCopy', v)}
        />
        <TweakToggle
          label="Floating hero cards"
          value={tweaks.showFloatingCards}
          onChange={(v) => setTweak('showFloatingCards', v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

function Site() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  return (
    <>
      <NavBar tweaks={tweaks} setTweak={setTweak} />
      <Hero tweaks={tweaks} />
      <Logos />
      <Manifesto />
      <Audience />
      <Features />
      <Integrations />
      <Calculator />
      <Infin8 />
      <Comparison />
      <Steps />
      <Testimonial />
      <Security />
      <Pricing />
      <Faq />
      <CtaBand tweaks={tweaks} />
      <Footer />
      <Tweaks tweaks={tweaks} setTweak={setTweak} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Site />);
