// Site.jsx — ProDesk marketing site

const { useState, useEffect, createContext, useContext } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "showFloatingCards": true,
  "ctaCopy": "Join free"
}/*EDITMODE-END*/;

// ---- Persona system ----
const PERSONAS = {
  brand: {
    id: "brand",
    label: "Brand",
    article: "a",
    ic: "i-dashboard",
    eyebrow: "For Brands & Entrepreneurs",
    tag: "Viewing as a Brand",
    sub: "Entrepreneurs & business owners looking for agency partners",
  },
  agency: {
    id: "agency",
    label: "Agency",
    article: "an",
    ic: "i-contacts",
    eyebrow: "For Agencies & Professional Service Firms",
    tag: "Viewing as an Agency",
    sub: "Professional service firms seeking clients & talent",
  },
  contractor: {
    id: "contractor",
    label: "Contractor",
    article: "a",
    ic: "i-pipelines",
    eyebrow: "For Contractors, Freelancers & Staff",
    tag: "Viewing as a Contractor",
    sub: "Freelancers & specialists looking for opportunities",
  },
};

const PersonaCtx = createContext(null);
const usePersona = () => useContext(PersonaCtx);

// ---- Nav ----
function NavBar() {
  const { persona, setPersona, chosen, reset } = usePersona();
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#" className="brand-mark" aria-label="ProDesk home">
          <span className="wm">
            <span className="wm-svg" role="img" aria-label="ProDesk"></span>
            <span className="wm-dot" aria-hidden="true"></span>
          </span>
        </a>

        <div className="nav-chooser" role="tablist" aria-label="View ProDesk for…">
          {!chosen && (
            <>
              <span className="nc-arrow" aria-hidden="true">
                <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
                  <path d="M2 7 H18 M13 2 L18 7 L13 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className="nc-prompt">Pick your role</span>
            </>
          )}
          <button
            type="button"
            role="tab"
            aria-selected={!persona}
            className={`nc-tab nc-default ${!persona ? 'on' : ''}`}
            onClick={() => reset()}
          >
            ProDesk
          </button>
          {Object.values(PERSONAS).map((p) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={persona === p.id}
              className={`nc-tab nc-${p.id} ${persona === p.id ? 'on' : ''}`}
              onClick={() => setPersona(p.id, true)}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="nav-actions">
          <a href="https://app.prodesk.com/" className="signin">Sign in</a>
          <a href="https://app.prodesk.com/" className="btn btn-volt">
            Join free <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

// ---- Hero (persona-aware) ----
const HERO_COPY = {
  none: {
    eyebrow: "One platform · Every tool · Free for brands",
    h: <>Brands and their Agencies now have a way to work together in <em className="brand">perfect harmony.</em></>,
    lede: "ProDesk is the operations dashboard that consolidates everything; projects, documents, knowledge, resources, payments and subscriptions all in a single workspace — it's the outsourcing super machine brands and agencies love.",
    primary: "Get started — it's free",
    secondaryHref: "#features",
    secondaryLabel: "See how it works",
    secondaryIc: "i-dashboard",
    meta: "Free forever for brands · No card · 4 minute setup",
    proof: [
      { n: "1", u: "tab", l: "every agency, doc, payment and renewal" },
      { n: "14", u: "hrs", l: "saved per week, on average" },
      { n: "0", u: "$", l: "to join — free for brands, forever" },
    ],
    url: "prodesk.app/dashboard",
  },
  brand: {
    eyebrow: "One platform · Every tool · Free for brands",
    h: <>Stop being the <em className="brand">office manager</em> of your own business.</>,
    lede: "ProDesk is the operations dashboard that runs every agency, document and dollar from one tab — so you get back to actually building the thing. Free for brands, forever.",
    primary: "Join free as a Brand",
    secondaryHref: "#features",
    secondaryLabel: "See how it works",
    secondaryIc: "i-dashboard",
    meta: "Free forever · No card · 4 minute setup",
    proof: [
      { n: "14", u: "hrs", l: "saved per week, average brand" },
      { n: "22", u: "%", l: "cut in unused subscriptions, month one" },
      { n: "7", u: "days", l: "to onboard your full agency stack" },
    ],
    url: "prodesk.app/brand/northwind",
  },
  agency: {
    eyebrow: "For Agencies · Earn for life · No platform fees",
    h: <>Your client book is <em className="brand">equity.</em> We pay you like it.</>,
    lede: "ProDesk treats your client relationships as equity. Every brand you bring earns your agency a share of everything they ever spend on the platform — with any agency, on any service, forever.",
    primary: "Apply as a partner agency",
    secondaryHref: "#calc",
    secondaryLabel: "Run the numbers",
    secondaryIc: "i-trend-up",
    meta: "100% on direct work · 7% on the network · Transferable on sale",
    proof: [
      { n: "100", u: "%", l: "on every client you do the work for" },
      { n: "7", u: "%", l: "forever, on every dollar they spend with the network" },
      { n: "0", u: "$", l: "platform fees, ever, for partner agencies" },
    ],
    url: "prodesk.app/agency/dashboard",
  },
  contractor: {
    eyebrow: "For Contractors · Clear briefs · Auto-payment",
    h: <>Clear briefs. <em className="brand">Transparent</em> progress. Automatic payments.</>,
    lede: "ProDesk connects you directly to the agencies you work for. You see the job. You do the job. The agency approves. You get paid — automatically. No follow-up emails, ever.",
    primary: "Find work on ProDesk",
    secondaryHref: "#features",
    secondaryLabel: "How payment works",
    secondaryIc: "i-check",
    meta: "Free to join · Paid same-day on approval · Portable work history",
    proof: [
      { n: "0", u: "days", l: "wait time — paid the moment work is approved" },
      { n: "100", u: "%", l: "of briefs arrive complete, with deliverables clear" },
    ],
    url: "prodesk.app/contractor/jobs",
  },
};

function Hero({ tweaks }) {
  const { persona, setPersona } = usePersona();
  const c = HERO_COPY[persona] || HERO_COPY.none;
  return (
    <header className="hero">
      <div className="hero-inner">
        <div className="hero-eyebrow">
          <span className="dot" />
          <span>{c.eyebrow}</span>
        </div>

        <h1 key={`h-${persona || 'none'}`} className="persona-fade">{c.h}</h1>
        <p key={`l-${persona || 'none'}`} className="lede persona-fade">{c.lede}</p>
        <div className="hero-cta">
          <a href="https://app.prodesk.com/" className="btn btn-volt">
            {c.primary} <span className="arrow">→</span>
          </a>
          <a href={c.secondaryHref} className="btn btn-ghost-on-ink">
            <Icon id={c.secondaryIc} size={14} /> {c.secondaryLabel}
          </a>
          <span className="meta">{c.meta}</span>
        </div>
        <div className="hero-proof">
          {c.proof.map((p, i) => (
            <div className="hp" key={i}>
              <span className="hp-num">{p.n}<span className="hp-u">{p.u}</span></span>
              <span className="hp-l">{p.l}</span>
            </div>
          ))}
        </div>

        <div className="hero-stage">
          {tweaks.showFloatingCards && <HeroFloats persona={persona} />}
          <div className="hero-screenshot">
            <div className="hero-window-bar">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
              <span className="url-pill">{c.url}</span>
              <span style={{width: 30}} />
            </div>
            <MiniMock />
          </div>
        </div>
      </div>
    </header>
  );
}

function HeroFloats({ persona }) {
  const map = {
    none: [
      { side: "left",  ic: "i-dashboard", lbl: "Everything in one tab",   val: "agencies · docs · subs · pay" },
      { side: "right", ic: "i-check",     lbl: "Set up in an afternoon",  val: "no migration project" },
    ],
    brand: [
      { side: "left",  ic: "i-docs",     lbl: "Document locker",         val: "v3 · always the right one" },
      { side: "right", ic: "i-trend-up", lbl: "Subs, this month",         val: "$12,480 · 14 agencies" },
    ],
    agency: [
      { side: "left",  ic: "i-trend-up", lbl: "Lifetime earnings",        val: "$48,200 / mo · 27 clients" },
      { side: "right", ic: "i-contacts", lbl: "New brand referral",       val: "Northwind Studio · approved" },
    ],
    contractor: [
      { side: "left",  ic: "i-check",    lbl: "Brief approved",           val: "$3,400 · paid in 12 minutes" },
      { side: "right", ic: "i-pipelines",lbl: "Active jobs",              val: "4 in progress · 2 reviewing" },
    ],
  };
  const set = map[persona] || map.none;
  return (
    <>
      {set.map((f) => (
        <div className={`hero-float ${f.side}`} key={f.side}>
          <div className="ic"><Icon id={f.ic} /></div>
          <div>
            <div className="lbl">{f.lbl}</div>
            <div className="val">{f.val}</div>
          </div>
        </div>
      ))}
    </>
  );
}

// ---- Logos (chaos strip) ----
const PROBLEM_LOGOS = [
  { name: "Lawyer · email", glyph: "✉" },
  { name: "Bookkeeper · portal", glyph: "$" },
  { name: "Designer · Dropbox", glyph: "▣" },
  { name: "Developer · Slack", glyph: "#" },
  { name: "Agency · PDF", glyph: "▤" },
  { name: "Studio · WeTransfer", glyph: "↗" },
];

const LOGOS_COPY = {
  none:       { head: "One business. A dozen specialists. A dozen apps.",       tail: "ProDesk replaces all of it. ↓", hideRow: true },
  brand:      { head: "One brand. A dozen agencies. A dozen apps.",              tail: "ProDesk ends the chaos. ↓", hideRow: true },
  agency:     { head: "A dozen clients. A dozen tool stacks. One mess.",         tail: "ProDesk turns that mess into your revenue. ↓", hideRow: true },
  contractor: { head: "A dozen briefs. A dozen apps. One mess.",                 tail: "ProDesk gets you paid faster. ↓", hideRow: true },
};

function Logos() {
  const { persona } = usePersona();
  const c = LOGOS_COPY[persona] || LOGOS_COPY.none;
  return (
    <section className="logos">
      <div className="persona-fade" key={persona || 'none'}>
        <div className="head">{c.head}</div>
        {!c.hideRow && (
          <div className="row">
            {PROBLEM_LOGOS.map((t) => (
              <div className="lg" key={t.name}>
                <span className="glyph" style={{color: 'var(--volt)'}}>{t.glyph}</span>
                {t.name}
              </div>
            ))}
          </div>
        )}
        <div style={{textAlign: 'center', marginTop: 36, fontSize: 14, color: 'rgba(249,250,252,0.55)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase'}}>
          {c.tail}
        </div>
      </div>
    </section>
  );
}

// ---- Personalise — the chooser ----
function Personalise() {
  const { persona, setPersona, chosen } = usePersona();
  if (chosen) return null;
  const a = persona ? PERSONAS[persona] : null;
  return (
    <section className="section personalise" id="personalise">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow-line"><span className="dot" />Personalise your experience</span>
          <h2>Tell us <em className="brand">who</em> you are.</h2>
          <p className="lede">
            Pick your role and we'll customise the rest of the page to show
            exactly how ProDesk works for you.
          </p>
        </div>

        <div className="ps-pill" role="tablist" aria-label="Choose your role">
          {Object.values(PERSONAS).map((p) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={persona === p.id}
              className={`ps-tab ${persona === p.id ? 'on' : ''}`}
              onClick={() => setPersona(p.id, false)}
            >
              <Icon id={p.ic} size={16} />
              <span>{p.label}</span>
            </button>
          ))}
        </div>

        {a ? (
          <>
            <div className={`ps-banner ps-${persona}`} key={persona}>
              <div className="ps-banner-ic"><Icon id={a.ic} size={22} /></div>
              <div className="ps-banner-copy">
                <div className="ps-banner-tag">{a.tag}</div>
                <div className="ps-banner-sub">{a.sub}</div>
              </div>
              <button className="btn btn-volt ps-banner-cta" onClick={() => setPersona(persona, true)}>
                Personalise the page <span className="arrow">→</span>
              </button>
            </div>

            <div className="ps-scroll">
              <span className="ps-arrow">↓</span>
              <span>Or scroll — we'll keep showing you the {a.label.toLowerCase()} view</span>
            </div>
          </>
        ) : (
          <div className="ps-scroll">
            <span className="ps-arrow">↑</span>
            <span>Pick a role above — or keep scrolling to see the generic tour</span>
          </div>
        )}
      </div>
    </section>
  );
}

// ---- Manifesto (persona-aware) ----
const MANIFESTO_COPY = {
  none: {
    eyebrow: "Why ProDesk exists",
    h: <>Modern business has <em className="brand">never</em> had more tools — or felt more fragmented.</>,
    body: [
      "Every business runs across a stack of specialists, software and subscriptions. Different inboxes. Different invoices. Different logins. The work gets done — and somebody becomes the office manager by accident.",
      <strong>Brands deserve one workspace. Agencies deserve one engine. Talent deserves one place to do the work.</strong>,
      "ProDesk is the connecting layer. One platform where brands, agencies and the talented people who serve them actually work together — instead of alongside each other in twelve different apps.",
    ],
  },
  brand: {
    eyebrow: "Why ProDesk exists",
    h: <>Manage every agency relationship in <em className="brand">one</em> place — and watch your business scale.</>,
    body: [
      "Curated services. Proven suppliers. Expert advice. ProDesk gives you a single command centre for every brand you own and every agency you work with — so you can stop coordinating and start growing.",
      <strong>Your business, properly organised. For once.</strong>,
      "Every document, every payment, every project, every renewal — in the right place, owned by you, accessible to the right people. Run one brand or twenty. The chaos goes quiet.",
    ],
  },
  agency: {
    eyebrow: "Why ProDesk exists",
    h: <>Make every client you win count <em className="brand">forever</em>.</>,
    body: [
      "Our unique affiliate system rewards your agency for every brand you bring to the platform — for life. When your clients buy services from any other agency on ProDesk, you earn. Across every category. Across every project. Forever.",
      <strong>1,000 clients = 1,000 brands earning your agency revenue, every month.</strong>,
      "Your book of business finally behaves like a book of business. The relationships you've spent years building become an asset that compounds — even on the work you don't do.",
    ],
  },
  contractor: {
    eyebrow: "Why ProDesk exists",
    h: <>So talented people can <em className="brand">focus</em> on their actual talents.</>,
    body: [
      "You sent the deliverable. You followed up. You followed up again. You sent the invoice. You followed that up too. The work was always the easy part — getting paid for it was the second job.",
      <strong>You shouldn't have to be a debt collector to be a designer.</strong>,
      "ProDesk connects you directly to the people approving your work, and pays you the moment they say yes. No portals. No net-60. No reminding. The brief is clear, the progress is visible, and the money lands.",
    ],
  },
};

function Manifesto() {
  const { persona } = usePersona();
  const c = MANIFESTO_COPY[persona] || MANIFESTO_COPY.none;
  return (
    <section className="section manifesto" id="why">
      <div className="wrap persona-fade" key={persona || 'none'}>
        <div className="manifesto-grid">
          <div className="manifesto-left">
            <span className="eyebrow-line"><span className="dot" />{c.eyebrow}</span>
            <h2 className="manifesto-h">{c.h}</h2>
          </div>
          <div className="manifesto-right">
            {c.body.map((p, i) => (
              p && p.type === 'strong'
                ? <p key={i}><strong>{p.props.children}</strong></p>
                : <p key={i}>{p}</p>
            ))}
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

// ---- Features (persona-aware) ----
const FEATURE_SETS = {
  none: {
    eyebrow: "What's inside ProDesk",
    h: <>One workspace. <em className="brand">Every</em> tool you'd otherwise need.</>,
    lede: "ProDesk replaces the swivel between inbox, Dropbox, Stripe portals and Slack threads with a single, opinionated workspace. Every capability below works the same way for brands, agencies and contractors.",
    list: [
      { span: 6, ic: "i-dashboard", volt: true, big: true, title: "One dashboard for the whole business",
        body: "Brand profiles, agency relationships, active projects, recent payments, upcoming renewals — every signal that matters, at a glance. Switch between businesses or clients with a single click.",
        meta: "Unified workspace" },
      { span: 6, ic: "i-sparkle", big: true, title: "An always-current source of truth",
        body: "The Info Hub holds everything about a business — brand assets, contacts, accounts, contracts, credentials. Auto-populated by the agencies who work in it. Nobody has to chase anyone.",
        meta: "Info Hub" },
      { span: 4, ic: "i-docs", title: "Document Locker",
        body: "Versioned files with a single approved copy. No more 'final-final-v3-USE-THIS.pdf' floating in three inboxes.",
        meta: "Smart documents" },
      { span: 4, ic: "i-pipelines", volt: true, title: "Subscription manager",
        body: "Every recurring charge in one view — what you're paying, who you're paying, exactly when each renews. The cancel button is right there.",
        meta: "Renewals & subs" },
      { span: 4, ic: "i-trend-up", title: "Spend insights",
        body: "Real-time breakdowns by agency, category and month. Make smarter calls about where the budget actually goes.",
        meta: "Reporting" },
      { span: 4, ic: "i-check", volt: true, title: "Flexible payments",
        body: "Pay an agency in full, or spread it over 12 / 26 / 52 weeks. Cash flow stays protected. The agency still gets paid on time.",
        meta: "Payment plans" },
      { span: 4, ic: "i-contacts", title: "CRM & relationships",
        body: "Every agency, contractor, brand and contact across your network — with shared notes, history and ownership. No spreadsheets.",
        meta: "Contacts & CRM" },
      { span: 4, ic: "i-dashboard", title: "Projects & briefs",
        body: "Structured briefs with deliverables, deadlines and approvers. Live status visible to everyone who needs to see it.",
        meta: "Project workspace" },
      { span: 6, ic: "i-check", volt: true, title: "Auto-billing & approvals",
        body: "Approved deliverable triggers payment automatically. ProDesk handles invoicing, reminders, escrow — you don't.",
        meta: "Smart invoicing" },
      { span: 6, ic: "i-pipelines", title: "Granular permissions",
        body: "Agency-by-agency, document-by-document. Add a contractor to a single project, revoke access in one tap. Everything is logged.",
        meta: "Access & audit" },
      { span: 12, ic: "i-sparkle", volt: true, big: true,
        title: "Built around the INFIN8 framework, so the work has a shape.",
        body: "Every project, agency and supplier in ProDesk is mapped to one of eight stages — from foundations to exit. You always know what stage your business is at, what comes next, and which of your relationships is doing the work.",
        meta: "INFIN8 system" },
    ],
  },
  brand: {
    eyebrow: "Built for brands",
    h: <>Every brand. Every agency. Every doc. <em className="brand">One</em> tab.</>,
    lede: "Your business — properly organised for once. Every agency you work with, every document, every renewal, every conversation. All in one place. All controlled by you.",
    list: [
      { span: 4, ic: "i-dashboard", volt: true,  title: "Run multiple brands, one login",       body: "Each business gets its own ProDesk. Switch in a click — every agency, doc and dollar updates instantly. Founders with a stable of brands, this one's for you.", meta: "Brand profiles" },
      { span: 4, ic: "i-sparkle",                title: "An Info Hub powered by your agencies",  body: "Your law firm logs the company certificate. Your accountant logs the ABN. Your branding agency logs the logo files. Everything about your brand, captured at the source — never lost again.", meta: "Info Hub" },
      { span: 4, ic: "i-docs",                   title: "Document Locker, with version control",body: "Upload your own documents. Your team always sees the latest approved version. Goodbye 'final-final-v3-USE-THIS.pdf'.", meta: "Document Locker" },
      { span: 6, ic: "i-pipelines",              title: "Every subscription. One tab.",         body: "SEO retainers, domains, ads, bookkeeping, software — all the recurring spend that quietly bleeds you. Tracked centrally. The cancel button is right there.", meta: "Subscription manager" },
      { span: 6, ic: "i-trend-up", volt: true,   title: "Spend, by agency, by brand",            body: "Real-time breakdowns by agency, category, project and month. Track every dollar across every brand you own — no spreadsheets, no surprises.", meta: "Spend insights" },
      { span: 6, ic: "i-contacts",               title: "Power Chat — one thread per brand",    body: "Talk to any agency, or every agency, on any brand — all in one place. The single point of communication founders have always needed. No more 'which Slack was that in?'", meta: "Power Chat" },
      { span: 6, ic: "i-check",                  title: "Marketplace + INCUB8 browse",          body: "Browse services Netflix-style with video walkthroughs. Or follow the INCUB8 64-step path — the proven order to take any business through, from foundations to scale.", meta: "Marketplace" },
      { span: 6, ic: "i-pipelines",              title: "Permissions, granular and obvious",    body: "Make any Info Hub page public, private, or invite-only. Add staff with the access they need. Revoke in one tap. Everything is logged.", meta: "Access control" },
      { span: 6, ic: "i-check", volt: true,      title: "Pay your way — full, 12, 26 or 52 weeks", body: "Spread agency fees over 12, 26 or 52 weeks if it suits your cash flow. The agency still gets paid on time. Your business keeps moving.", meta: "Flexible payments" },
      { span: 6, ic: "i-trend-up", volt: true,   title: "Refer a founder. Earn 7%. Forever.",  body: "Brought another founder to ProDesk? You earn 7% of every dollar they spend on the platform — for the life of their business. Same model as the agencies. Pays automatically, in your currency.", meta: "Brand affiliate" },
      { span: 12, ic: "i-sparkle", volt: true, big: true, title: "Your business co-pilot. Always knows what's next.", body: "ProDesk isn't just storage — it's a command centre with a structure underneath. The proven INFIN8 framework guides you through every stage of growth, with the right agencies surfaced at the right time. Stop guessing. Start moving.", meta: "Built on INFIN8" },
    ],
  },
  agency: {
    eyebrow: "Built for agencies",
    h: <>The all-in-one agency software. <em className="brand">Proposal</em> to payout.</>,
    lede: "The first system of its kind. Win clients in the marketplace. Manage every project. Pay your contractors. Earn from clients you've already brought to the platform — for life.",
    list: [
      { span: 6, ic: "i-docs", volt: true, big: true, title: "Proposals. Built from your catalogue. Sign + pay in one click.",
        body: "Drag products and services from your catalogue into a proposal in minutes. Send it. The client checks it, approves it, and pays — all inside ProDesk. No PandaDoc, no Stripe checkout link, no follow-up.", meta: "Proposals" },
      { span: 6, ic: "i-dashboard", big: true, title: "Branded client portal. Your logo, your colours.",
        body: "Every brand you onboard gets a workspace that looks like yours. Your team and theirs work side-by-side. ProDesk powers it underneath — invisibly.", meta: "Branded portal" },
      { span: 4, ic: "i-sparkle",     title: "Product & service catalogue", body: "Sell physical products, digital downloads, services, or subscriptions — all from one catalogue. Add them to proposals or list them in the Marketplace.", meta: "Catalogue" },
      { span: 4, ic: "i-pipelines",   title: "Kanban the client can see",   body: "Every project on a board. Clients comment, approve, and watch progress. Contractors get briefed. On approval, they're paid automatically.", meta: "Project Kanban" },
      { span: 4, ic: "i-check",       title: "Service questions & forms",   body: "Build forms that clients must complete per product. Need a business name + shareholders before you can register a company? Set it once. Jobs sit in CLIENT SUPPLY until done.", meta: "Briefing forms" },
      { span: 4, ic: "i-contacts",    title: "Contractor management",       body: "Invite your trusted contractors. Set standard budgets, time allocations and briefs per project type. Manage workloads. Pay them on approval — automatically.", meta: "Contractor layer" },
      { span: 4, ic: "i-trend-up",    title: "Staff payments & commissions",body: "Pay your team based on Kanban stages — sales commission, project management fee, contractor allocation cut. Set the splits once. ProDesk handles the rest.", meta: "Team payouts" },
      { span: 4, ic: "i-check", volt: true, title: "Payment plans — earn the interest", body: "Clients pay upfront, or over 12 / 26 / 52 weeks. You earn 5% / 10% / 15% on top. Get a minimum 50% on completion. Paid in full within the term.", meta: "Payment plans" },
      { span: 6, ic: "i-trend-up", volt: true, title: "You bring the client. You own them. Forever.",
        body: "If your clients buy from any other agency on ProDesk, you collect a 7% affiliate share — for the life of the relationship. 1,000 clients = 1,000 brands generating revenue across every category we cover.", meta: "Affiliate program" },
      { span: 6, ic: "i-pipelines", volt: true, title: "Discipline-based exclusivity",
        body: "Your clients will never see an agency that competes with you in the Marketplace. Bring them in. Keep them. We protect the relationship.", meta: "Client protection" },
      { span: 4, ic: "i-dashboard",   title: "List in the Marketplace",     body: "Choose which products and services appear publicly. Or use ProDesk only for production — never list a thing. Your call, every time.", meta: "Marketplace listing" },
      { span: 4, ic: "i-sparkle",     title: "Resources to win clients",    body: "Publish guides, sample documents, education. DIY brands learn — and many become paying clients. Lead generation, baked in.", meta: "Resource Centre" },
      { span: 4, ic: "i-contacts",    title: "Power Chat",                  body: "One thread per brand, across every agency on the job. Talk to your team, the client, or every other agency — all in one place. Brands love it.", meta: "Power Chat" },
      { span: 12, ic: "i-check", volt: true, big: true, title: "Auto-payments. No chasing. No invoicing. No net-60.",
        body: "Client approves the deliverable → contractor is paid that day. Staff commissions fire on stage moves. Your share lands when the milestone clears. ProDesk handles every cent moving in every direction. You build the agency.", meta: "Automated money" },
    ],
  },
  contractor: {
    eyebrow: "Built for contractors",
    h: <>Five things you'll <em className="brand">stop</em> dreading.</>,
    lede: "Unclear briefs. Late payments. Lost portfolios. Five things ProDesk just deletes from your week.",
    list: [
      { span: 4, ic: "i-docs", volt: true,  title: "Briefs that arrive complete",           body: "Every job comes with deliverables, deadlines, files and approvers spelled out. No 'just hop on a call to align'.", meta: "Structured briefs" },
      { span: 4, ic: "i-pipelines",         title: "Live progress, visible to everyone",   body: "Your status updates live where the client looks. No more weekly check-ins. No more 'just bumping this up'.",          meta: "Transparent status" },
      { span: 4, ic: "i-check",             title: "Auto-paid the moment it's approved",   body: "Client approves the deliverable in ProDesk → money in your account same day. No invoicing. No net-60.",                meta: "Same-day payment" },
      { span: 6, ic: "i-trend-up", volt: true, title: "A portfolio that follows you",        body: "Every project, every approval, every client testimonial — automatically logged to your portable contractor profile. Take it with you anywhere.", meta: "Portable portfolio" },
      { span: 6, ic: "i-contacts",          title: "Find work from agencies you'd want to work with", body: "Apply directly to agencies and brands using ProDesk. Your work history is already there. They've already seen the standard.", meta: "Talent marketplace" },
      { span: 12, ic: "i-dashboard", volt: true, big: true, title: "One inbox. One calendar. One ledger. Across every client.", body: "ProDesk consolidates every job, every client, every payout into a single view. No more 14 chat apps and a spreadsheet for invoices. The whole freelance business, in one tab.", meta: "Consolidated workspace" },
    ],
  },
};

function Features() {
  const { persona } = usePersona();
  const c = FEATURE_SETS[persona] || FEATURE_SETS.none;
  return (
    <section className="section" id="features">
      <div className="wrap persona-fade" key={persona || 'none'}>
        <div className="section-head">
          <span className="eyebrow-line"><span className="dot" />{c.eyebrow}</span>
          <h2>{c.h}</h2>
          <p className="lede">{c.lede}</p>
        </div>

        <div className="features-grid">
          {c.list.map((f, i) => (
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

// ---- INFIN8 (universal — same for all) ----
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

const INFIN8_COPY = {
  none: {
    h: <>One system. Eight stages. Sixty-four steps. <em className="brand" style={{color: 'var(--volt)'}}>Infinite</em> clarity.</>,
    lede: "INFIN8 is the framework underneath every workspace in ProDesk — a proven map of every stage a business moves through, from foundations to exit. Your projects, agencies and contractors all sit against it.",
  },
  brand: {
    h: <>One system. Eight stages. Sixty-four steps. <em className="brand" style={{color: 'var(--volt)'}}>Infinite</em> clarity.</>,
    lede: "Most owners are doing the right things in the wrong order. INFIN8 is the proven framework that takes your business through every stage of growth — from foundations to exit.",
  },
  agency: {
    h: <>Sell your services <em className="brand" style={{color: 'var(--volt)'}}>inside</em> a framework brands trust.</>,
    lede: "INFIN8 maps every business need a brand has — across eight stages and sixty-four steps. List your service against the stages it serves, and let the framework do the selling.",
  },
  contractor: {
    h: <>The framework <em className="brand" style={{color: 'var(--volt)'}}>that</em> structures the work you'll be briefed on.</>,
    lede: "Every job on ProDesk is mapped to an INFIN8 stage. You'll know exactly which part of the brand's growth your work is powering — and how to talk about it.",
  },
};

function Infin8() {
  const [active, setActive] = useState(0);
  const { persona } = usePersona();
  const c = INFIN8_COPY[persona] || INFIN8_COPY.none;
  return (
    <section className="section infin8-section" id="infin8">
      <div className="wrap persona-fade" key={persona || 'none'}>
        <div className="infin8-shell">
          <div className="section-head" style={{margin: '0 auto 56px'}}>
            <span className="eyebrow-line" style={{color: 'rgba(244,241,232,0.6)'}}>
              <span className="dot" />The INFIN8 system
            </span>
            <h2 style={{color: 'var(--paper)'}}>{c.h}</h2>
            <p className="lede" style={{color: 'rgba(244,241,232,0.65)'}}>{c.lede}</p>
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
            <div className="stat"><div className="num">8</div><div className="lbl">stages, in order</div></div>
            <div className="stat"><div className="num">64</div><div className="lbl">structured steps</div></div>
            <div className="stat"><div className="num">∞</div><div className="lbl">clarity, end to end</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Steps (persona-aware) ----
const STEPS_COPY = {
  none: {
    h: <>Three steps. <em className="brand">No</em> migration project.</>,
    lede: "Most teams are up and running by the end of an afternoon. The agencies and contractors you already work with do the heavy lifting — that's the point.",
    list: [
      { n: "01", title: "Create your workspace",  body: "Sign up free. Spin up a profile for your business — or invite the agency you work with to set it up for you.", glyph: "→" },
      { n: "02", title: "Plug in your network",   body: "Invite the agencies, contractors and suppliers you already work with. They populate your hub, upload to your locker, log their work.", glyph: "✦" },
      { n: "03", title: "Run the business",       body: "One tab. Every relationship, document, payment and renewal in view. Pay in full or in instalments. Watch the chaos go quiet.", glyph: "✓" },
    ],
  },
  brand: {
    h: <>Three steps. <em className="brand">No</em> migration project.</>,
    lede: "Most teams are up and running by the end of an afternoon. The agencies you already work with do the heavy lifting — that's the point.",
    list: [
      { n: "01", title: "Create your brand profile",  body: "Sign up free. Spin up a profile for each business you run. Add the basics — or let an agency populate them for you.", glyph: "→" },
      { n: "02", title: "Plug in your agencies",       body: "Invite the agencies you already work with. They populate your Info Hub, upload to your Document Locker, log their subscriptions.", glyph: "✦" },
      { n: "03", title: "Run the business",            body: "One tab. Every agency, document, payment and renewal. Pay in full or in instalments. Watch the chaos go quiet.", glyph: "✓" },
    ],
  },
  agency: {
    h: <>Three steps to your <em className="brand">first</em> payout.</>,
    lede: "Most partner agencies are paid their first revenue share within the same month they apply. Here's the path.",
    list: [
      { n: "01", title: "Apply as a partner agency",   body: "Tell us about your firm and the kind of clients you work with. Most agencies are approved within a business day.", glyph: "→" },
      { n: "02", title: "Onboard your existing book",  body: "Invite your clients onto their own ProDesk workspaces — co-branded with your agency. They use it free, you earn forever.", glyph: "✦" },
      { n: "03", title: "Win + earn",                  body: "Win new work from brands already on platform. Keep 100% on what you deliver. Earn 7% on every dollar your referred clients spend with anyone else on the network — for life.", glyph: "✓" },
    ],
  },
  contractor: {
    h: <>Three steps to your <em className="brand">next</em> approved deliverable.</>,
    lede: "ProDesk is free for contractors. Here's how a typical week starts.",
    list: [
      { n: "01", title: "Build your portable profile", body: "Sign up free. Add your skills, your rates, the work you've already done. ProDesk verifies it once — agencies see it everywhere.", glyph: "→" },
      { n: "02", title: "Get briefed properly",        body: "Agencies invite you to jobs with full deliverables, deadlines and approvers attached. You see the scope before you say yes.", glyph: "✦" },
      { n: "03", title: "Deliver. Get paid same-day.", body: "Submit the work in ProDesk. The client approves. Payment lands the same day. Your portfolio updates automatically.", glyph: "✓" },
    ],
  },
};

function Steps() {
  const { persona } = usePersona();
  const c = STEPS_COPY[persona] || STEPS_COPY.none;
  return (
    <section className="section" id="setup">
      <div className="wrap persona-fade" key={persona || 'none'}>
        <div className="section-head">
          <span className="eyebrow-line"><span className="dot" />How it works</span>
          <h2>{c.h}</h2>
          <p className="lede">{c.lede}</p>
        </div>
        <div className="steps">
          {c.list.map((s) => (
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

// ---- Testimonials carousel (persona-aware) ----
// Photo + name + site fields are intentionally placeholders — to be supplied later.
// Quotes & outcomes are tuned to the benefits each persona cares about.
const PORTRAITS = {
  warm:    'linear-gradient(135deg, #2a2826 0%, #4a4540 60%, #6e655a 100%)',
  amber:   'linear-gradient(135deg, #2a1a14 0%, #5a3528 50%, #8a5a44 100%)',
  graphite:'linear-gradient(135deg, #1f1f1d 0%, #3a342e 60%, #5a4f44 100%)',
  steel:   'linear-gradient(135deg, #1a2030 0%, #2c3850 60%, #4a5870 100%)',
  sand:    'linear-gradient(135deg, #2a2622 0%, #4a3e34 50%, #786858 100%)',
};

const TESTIMONIAL_SETS = {
  // Mixed lineup for the no-persona overview
  none: [
    {
      id: 'none-1', name: 'Sarah', initials: 'S',
      role: 'Founder at XPPOZ', sub: 'Events & activations',
      site: 'xppoz.com', siteUrl: 'https://xppoz.com',
      type: 'Agency owner', accent: 'volt', portrait: PORTRAITS.warm,
      photo: 'assets/people/sarah.jpeg',
      quote: "I used to spend half my week managing the process of managing the process. ProDesk just does it. I run bigger events with a smaller team than I ever thought possible.",
      outcome: 'Admin time dropped by 60% in the first month',
    },
    {
      id: 'none-2', name: 'Simon', initials: 'Si',
      role: 'Founder at Startup Crew', sub: 'Venture studio · Multiple brands',
      site: 'startupcrew.com.au', siteUrl: 'https://startupcrew.com.au',
      type: 'Brand', accent: 'sky', portrait: PORTRAITS.steel,
      photo: 'assets/people/simon.jpeg',
      quote: "We run 27 brands out of one ProDesk account. Switching between them takes one click. I can't imagine going back to the chaos we had before.",
      outcome: '27+ brands, one dashboard',
    },
    {
      id: 'none-3', name: 'Chris', initials: 'C',
      role: 'Director at NOIZE Agency', sub: 'Branding & design',
      site: 'noize.com.au', siteUrl: 'https://noize.com.au',
      type: 'Agency owner', accent: 'volt', portrait: PORTRAITS.graphite,
      photo: 'assets/people/chris.jpeg',
      quote: "We used to end the relationship at the brand launch. Now we're the agency that introduces clients to their entire professional services network. ProDesk made that possible.",
      outcome: 'Earns 7% commission on all client spending',
    },
    {
      id: 'none-4', name: 'Ainsley', initials: 'A',
      role: 'Founder at Tank Bathhouse', sub: 'Wellness & hospitality',
      site: 'tankpa.com.au', siteUrl: 'https://tankpa.com.au',
      type: 'Brand', accent: 'sky', portrait: PORTRAITS.sand,
      photo: 'assets/people/ainsley.jpeg',
      quote: "I finally feel like I'm running my business, not just reacting to it. Everything is in one place and everyone can see what they need to see. It's exactly what I needed.",
      outcome: 'All agencies in one unified view',
    },
    {
      id: 'none-5', name: 'Zaach', initials: 'Z',
      role: 'Founder at Aggyl', sub: 'Approved ProDesk Sales Agency',
      site: 'aggyl.com', siteUrl: 'https://aggyl.com',
      type: 'Agency owner', accent: 'amber', portrait: PORTRAITS.amber,
      photo: 'assets/people/zaach.jpeg',
      quote: "ProDesk is the only platform I've found that actually works for managing projects across multiple agencies. The transparency it gives clients is a genuine competitive advantage for us.",
      outcome: 'Earns 30% sales commission on every service',
    },
    {
      id: 'none-6', name: 'Ayden', initials: 'Ay',
      role: 'Photographer & content producer', sub: 'Freelance · Brand & event',
      site: 'aydenstudio.com', siteUrl: 'https://aydenstudio.com',
      type: 'Contractor', accent: 'volt', portrait: PORTRAITS.graphite,
      photo: 'assets/people/ayden.jpeg',
      quote: "Same-day pay is the headline, but it's also the reality. I submit the work, the client approves, the money lands. I haven't sent a follow-up email about an invoice in eight months.",
      outcome: 'Paid the same day on every approved deliverable',
    },
  ],

  // BRAND testimonials — only filled-in entries
  brand: [
    {
      id: 'brand-simon', name: 'Simon', initials: 'Si',
      role: 'Founder at Startup Crew', sub: 'Venture studio · Multiple brands',
      site: 'startupcrew.com.au', siteUrl: 'https://startupcrew.com.au',
      type: 'Brand', accent: 'sky', portrait: PORTRAITS.steel,
      photo: 'assets/people/simon.jpeg',
      quote: "We run 27 brands out of one ProDesk account. Switching between them takes one click. I can't imagine going back to the chaos we had before.",
      outcome: '27+ brands, one dashboard',
    },
    {
      id: 'brand-ainsley', name: 'Ainsley', initials: 'A',
      role: 'Founder at Tank Bathhouse', sub: 'Wellness & hospitality',
      site: 'tankpa.com.au', siteUrl: 'https://tankpa.com.au',
      type: 'Brand', accent: 'sky', portrait: PORTRAITS.sand,
      photo: 'assets/people/ainsley.jpeg',
      quote: "I finally feel like I'm running my business, not just reacting to it. Everything is in one place and everyone can see what they need to see. It's exactly what I needed.",
      outcome: 'All agencies in one unified view',
    },
  ],

  // AGENCY testimonials — only filled-in entries
  agency: [
    {
      id: 'agency-sarah', name: 'Sarah', initials: 'S',
      role: 'Founder at XPPOZ', sub: 'Events & activations',
      site: 'xppoz.com', siteUrl: 'https://xppoz.com',
      type: 'Agency owner', accent: 'volt', portrait: PORTRAITS.warm,
      photo: 'assets/people/sarah.jpeg',
      quote: "I used to spend half my week managing the process of managing the process. ProDesk just does it. I run bigger events with a smaller team than I ever thought possible.",
      outcome: 'Admin time dropped by 60% in the first month',
    },
    {
      id: 'agency-chris', name: 'Chris', initials: 'C',
      role: 'Director at NOIZE Agency', sub: 'Branding & design',
      site: 'noize.com.au', siteUrl: 'https://noize.com.au',
      type: 'Agency owner', accent: 'volt', portrait: PORTRAITS.graphite,
      photo: 'assets/people/chris.jpeg',
      quote: "We used to end the relationship at the brand launch. Now we're the agency that introduces clients to their entire professional services network. ProDesk made that possible.",
      outcome: 'Earns 7% commission on all client spending',
    },
    {
      id: 'agency-zaach', name: 'Zaach', initials: 'Z',
      role: 'Founder at Aggyl', sub: 'Approved ProDesk Sales Agency',
      site: 'aggyl.com', siteUrl: 'https://aggyl.com',
      type: 'Agency owner', accent: 'amber', portrait: PORTRAITS.amber,
      photo: 'assets/people/zaach.jpeg',
      quote: "ProDesk is the only platform I've found that actually works for managing projects across multiple agencies. The transparency it gives clients is a genuine competitive advantage for us.",
      outcome: 'Earns 30% sales commission on every service',
    },
  ],

  // CONTRACTOR testimonials — only filled-in entries
  contractor: [
    {
      id: 'contractor-ayden', name: 'Ayden', initials: 'Ay',
      role: 'Photographer & content producer', sub: 'Freelance · Brand & event',
      site: 'aydenstudio.com', siteUrl: 'https://aydenstudio.com',
      type: 'Contractor', accent: 'volt', portrait: PORTRAITS.graphite,
      photo: 'assets/people/ayden.jpeg',
      quote: "Same-day pay is the headline, but it's also the reality. I submit the work, the client approves, the money lands. I haven't sent a follow-up email about an invoice in eight months. I'd forgotten what that felt like.",
      outcome: 'Paid the same day on every approved deliverable',
    },
    {
      id: 'contractor-venji', name: 'Venji', initials: 'V',
      role: 'Brand designer & art director', sub: 'Freelance · Identity systems',
      site: 'venji.studio', siteUrl: 'https://venji.studio',
      type: 'Contractor', accent: 'amber', portrait: PORTRAITS.warm,
      photo: 'assets/people/venji.jpeg',
      quote: "My portfolio updates itself. Every approval, every testimonial, every project gets logged automatically. When a new agency wants to brief me, the entire track record is already there — verified. I haven't manually updated a case study in a year.",
      outcome: 'Portable, verified portfolio that builds itself',
    },
    {
      id: 'contractor-chloe', name: 'Chloe', initials: 'Ch',
      role: 'Copywriter & content strategist', sub: 'Freelance · Brand voice',
      site: 'chloewrites.co', siteUrl: 'https://chloewrites.co',
      type: 'Contractor', accent: 'sky', portrait: PORTRAITS.sand,
      photo: 'assets/people/chloe.jpeg',
      quote: "Every brief lands with deliverables, deadlines and an actual approver attached. No more 'just hop on a call to align'. I see the scope before I say yes. I do the work, I send it, it's approved. The whole thing takes the friction out of freelancing.",
      outcome: 'Briefs that arrive complete, every time',
    },
  ],
};

function Testimonial() {
  const { persona } = usePersona();
  const list = TESTIMONIAL_SETS[persona] || TESTIMONIAL_SETS.none;
  const [idx, setIdx] = useState(0);
  // Reset to first card when the persona changes
  useEffect(() => { setIdx(0); }, [persona]);
  const safeIdx = Math.min(idx, list.length - 1);
  const t = list[safeIdx];
  const next = () => setIdx((i) => (i + 1) % list.length);
  const prev = () => setIdx((i) => (i - 1 + list.length) % list.length);

  const headings = {
    none:       { eyebrow: 'Real stories from real users', l1: 'ProDesk works differently for everyone.', l2: 'It just works.' },
    brand:      { eyebrow: 'Brands on ProDesk',            l1: 'Founders who got out of the office-manager seat.', l2: "Here's how it sounds when it works." },
    agency:     { eyebrow: 'Agencies on ProDesk',          l1: 'Agencies who finally own the asset they built.', l2: 'The book of business, behaving like a book of business.' },
    contractor: { eyebrow: 'Contractors on ProDesk',       l1: 'Specialists who stopped chasing payment.', l2: 'And started building a portable career.' },
  };
  const head = headings[persona] || headings.none;

  const QuoteMark = ({ size = 28 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7.5 6C5 6 3 8 3 10.5c0 2.5 2 4.5 4.5 4.5 .9 0 1.5-.2 1.5-.2C8.7 16.4 7 17.7 7 17.7l1.4 1.6S13 16.4 13 11c0-2.8-2.2-5-5.5-5zm10 0C15 6 13 8 13 10.5c0 2.5 2 4.5 4.5 4.5 .9 0 1.5-.2 1.5-.2-.3 1.6-2 2.9-2 2.9l1.4 1.6S23 16.4 23 11c0-2.8-2.2-5-5.5-5z"/>
    </svg>
  );
  const ChevL = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 18l-6-6 6-6"/>
    </svg>
  );
  const ChevR = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 6l6 6-6 6"/>
    </svg>
  );
  const ExtLink = () => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 4h6v6M20 4l-9 9M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4"/>
    </svg>
  );

  return (
    <section className="section testimonials-section" id="story">
      <div className="wrap">
        <div className="ts-head">
          <span className="ts-eyebrow">{head.eyebrow}</span>
          <h2 className="ts-title">
            {head.l1}
            <br/>
            <span className="ts-title-2">{head.l2}</span>
          </h2>
        </div>

        <div className="ts-stage">
          <button className="ts-nav ts-prev" onClick={prev} aria-label="Previous testimonial">
            <ChevL />
          </button>

          <article className={`ts-card ts-accent-${t.accent}`} key={t.id}>
            <div className="ts-photo" style={{ background: t.portrait }}>
              {t.photo ? (
                <img className="ts-photo-img" src={t.photo} alt={`${t.name} — ${t.role}`} loading="lazy" />
              ) : (
                <div className="ts-photo-initials">{t.initials}</div>
              )}
              <div className="ts-photo-quotemark" aria-hidden="true">
                <QuoteMark size={14} />
              </div>
            </div>
            <div className="ts-body">
              <div className="ts-id">
                <span className="ts-name">{t.name}</span>
                <span className="ts-type-pill">{t.type}</span>
              </div>
              <div className="ts-role">{t.role}</div>
              <div className="ts-sub">{t.sub}</div>
              <a className="ts-site" href={t.siteUrl} target="_blank" rel="noreferrer">
                {t.site} <ExtLink />
              </a>

              <div className="ts-quotemark" aria-hidden="true">
                <QuoteMark size={28} />
              </div>
              <blockquote className="ts-quote">{t.quote}</blockquote>

              <div className="ts-outcome">
                <span className="ts-outcome-dot" />
                {t.outcome}
              </div>
            </div>
          </article>

          <button className="ts-nav ts-next" onClick={next} aria-label="Next testimonial">
            <ChevR />
          </button>
        </div>

        <div className="ts-thumbs" role="tablist">
          {list.map((p, i) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={i === safeIdx}
              className={`ts-thumb ${i === safeIdx ? 'on' : ''}`}
              onClick={() => setIdx(i)}
              title={`${p.name} · ${p.role}`}
            >
              <span className="ts-thumb-img" style={{ background: p.portrait }}>
                {p.photo ? (
                  <img src={p.photo} alt="" loading="lazy" />
                ) : (
                  p.initials
                )}
              </span>
            </button>
          ))}
        </div>
        <div className="ts-thumb-caption">
          <strong>{t.name}</strong> · {t.role.replace(/^.*at /, '').replace(/^.*Partner, /, '')}
        </div>
      </div>
    </section>
  );
}

// ---- Replaces (universal) ----
const REPLACES = [
  { cat: "Proposals",          name: "PandaDoc",    glyph: "✎", note: "Agencies send proposals through the system. Clients accept, pay and track them online — no PDFs, no checkout links." },
  { cat: "Sales CRM",          name: "Pipedrive",   glyph: "◉", note: "Agencies track deals across stages so nothing falls through the cracks. Brands stay informed without chasing." },
  { cat: "Marketplace",        name: "Fiverr·Upwork",glyph: "▦", note: "Vetted agencies list their offering. Brands access everything they need to run a business — no language barrier, no poor-quality 'gigs'." },
  { cat: "Project management", name: "Asana·Monday",glyph: "▤", note: "Agencies run projects on a Kanban their client can see. Brands watch progress live — no status meetings required." },
  { cat: "Client portal",      name: "Moxo·Copilot",glyph: "▣", note: "Agencies get a branded portal — their logo, their domain. Brands see one professional workspace per agency they engage." },
  { cat: "Payments",           name: "Stripe·invoicing",glyph:"$", note: "Agencies take payment inside the proposal. Brands pay upfront or over 12 / 26 / 52 weeks — same flow, no surprises." },
  { cat: "Shopping cart",      name: "Shopify·WooCommerce",glyph:"⌘", note: "Agencies sell physical, digital, services or subscriptions from one catalogue. Brands buy in a couple of clicks." },
  { cat: "Recurring billing",  name: "ChargeBee·Stripe Billing",glyph:"⟳", note: "Agencies bill retainers and subscriptions automatically. Brands see every renewal in one tab — and the cancel button is right there." },
  { cat: "File storage",       name: "Dropbox·WeTransfer",glyph:"▱", note: "Agencies upload final files to the Document Locker. Brands always see the latest approved version — no 'final-final-v3.pdf'." },
  { cat: "Tasks & to-dos",     name: "Todoist·Things",glyph:"✓", note: "Agencies and contractors run tasks on the project. Stage moves trigger payments automatically. Brands watch it happen." },
  { cat: "Team chat",          name: "Slack·Moxo",  glyph: "✻", note: "Brands talk to one agency or every agency working on a brand — all in one thread. Agencies stop hunting across Slack workspaces." },
  { cat: "Affiliate program",  name: "PartnerStack·Rewardful",glyph:"✦", note: "Built-in for both sides. Brands earn 7% for introducing other founders. Agencies earn 7% on every cross-network sale, for life." },
];

function Replaces() {
  return (
    <section className="section integrations replaces" id="replaces">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow-line"><span className="dot" />One subscription. Twelve cancellations.</span>
          <h2>ProDesk replaces the <em className="brand">tab graveyard</em>.</h2>
          <p className="lede">
            We're not another integration to wire up. We're the workspace your business actually runs in —
            so the twelve SaaS subscriptions you're currently juggling get a polite cancellation email.
          </p>
        </div>
        <div className="int-grid replaces-grid">
          {REPLACES.map((t) => (
            <div className="int-tile replaces-tile" key={t.cat}>
              <div className="rep-head">
                <span className="int-glyph">{t.glyph}</span>
                <div>
                  <div className="int-cat">{t.cat}</div>
                  <div className="rep-vs">vs <s>{t.name}</s></div>
                </div>
              </div>
              <p className="rep-note">{t.note}</p>
            </div>
          ))}
        </div>
        <div className="int-foot">
          <span>That's <strong>12 subscriptions</strong> — and roughly 12 logins, 12 invoices and 12 places your data goes to die.</span>
        </div>
      </div>
    </section>
  );
}

// ---- How agencies earn (Agency only) — the real model ----
function HowAgenciesEarn() {
  const { persona } = usePersona();
  if (persona !== 'agency') return null;
  const scenarios = [
    {
      n: "100%",
      label: "Direct work",
      headline: "You bring the client. You do the work.",
      body: "You keep 100% of the fee, minus Stripe's processing. ProDesk takes nothing. Your client, your relationship, your margin — same as it ever was, just with the operations sorted.",
      tag: "Your client + your service",
    },
    {
      n: "7%",
      label: "Cross-network",
      headline: "You bring the client. Another agency does the work.",
      body: "Even if your client buys a service you don't offer, you earn 7% of every dollar they spend on ProDesk — for the life of the relationship. They're still your client. You just don't have to deliver everything.",
      tag: "Your client + their service",
    },
    {
      n: "30%",
      label: "Sales agency",
      headline: "You're the approved sales agency that closed the deal.",
      body: "Approved sales agencies earn 30% of the fee on deals they close for other agencies on the network. The agency doing the work keeps 50%. ProDesk takes 13%. Affiliate gets 7%.",
      tag: "Their client + you closed it",
    },
    {
      n: "50%",
      label: "Network work",
      headline: "Another agency brings the client. You deliver.",
      body: "Minimum 50% of the project fee, paid to you on completion or every four weeks — whichever comes first. The rest is split: 13% ProDesk, 7% affiliate, 30% sales agency. No chasing, ever.",
      tag: "Their client + your service",
    },
  ];
  return (
    <section className="section earn-section" id="earn">
      <div className="wrap">
        <div className="section-head" style={{margin: '0 auto 56px'}}>
          <span className="eyebrow-line"><span className="dot" />How agencies earn</span>
          <h2>
            Four ways to <em className="brand">make money</em>. One platform.
          </h2>
          <p className="lede">
            ProDesk isn't a marketplace skimming the top. It's an operating system that pays
            you for every relationship you bring — whether you deliver the work or not.
          </p>
        </div>
        <div className="earn-grid">
          {scenarios.map((s) => (
            <div className="earn-card" key={s.n}>
              <div className="earn-pct">
                <span className="earn-num">{s.n}</span>
                <span className="earn-lbl">{s.label}</span>
              </div>
              <div className="earn-tag">{s.tag}</div>
              <h3 className="earn-h">{s.headline}</h3>
              <p className="earn-body">{s.body}</p>
            </div>
          ))}
        </div>
        <div className="earn-stack">
          <div className="earn-stack-head">The full network split, when you didn't bring the client and didn't close the deal</div>
          <div className="earn-stack-bars">
            <div className="esb-bar esb-agency" style={{flex: 50}}>
              <span className="esb-pct">50%</span>
              <span className="esb-lbl">Delivery agency</span>
            </div>
            <div className="esb-bar esb-sales" style={{flex: 30}}>
              <span className="esb-pct">30%</span>
              <span className="esb-lbl">Sales agency</span>
            </div>
            <div className="esb-bar esb-prodesk" style={{flex: 13}}>
              <span className="esb-pct">13%</span>
              <span className="esb-lbl">ProDesk</span>
            </div>
            <div className="esb-bar esb-affiliate" style={{flex: 7}}>
              <span className="esb-pct">7%</span>
              <span className="esb-lbl">Affiliate</span>
            </div>
          </div>
          <div className="earn-stack-fine">Bring your own client + deliver your own service, and the entire fee (less Stripe) is yours.</div>
        </div>
      </div>
    </section>
  );
}

// ---- Calculator (Agency only) — three-tier model ----
function Calculator() {
  const { persona } = usePersona();
  if (persona !== 'agency') return null;
  const [direct, setDirect] = useState(8);
  const [referred, setReferred] = useState(20);
  const [spend, setSpend] = useState(5000);
  // Direct clients: keep 100% (we model 95% net of Stripe for realism on the calc)
  // Referred clients: earn 7% lifetime affiliate share on their spend
  const directMonthly = Math.round(direct * spend * 0.95);
  const referredMonthly = Math.round(referred * spend * 0.07);
  const monthly = directMonthly + referredMonthly;
  const yearly = monthly * 12;
  const fiveYr = yearly * 5;
  const fmt = (n) => '$' + n.toLocaleString();
  return (
    <section className="section calc-section" id="calc">
      <div className="wrap">
        <div className="calc-shell">
          <div className="calc-copy">
            <span className="eyebrow-line" style={{color: 'rgba(244,241,232,0.6)'}}>
              <span className="dot" />Run the numbers
            </span>
            <h2 style={{color: 'var(--paper)'}}>
              Two income streams. <em className="brand" style={{color: 'var(--volt)'}}>One platform.</em>
            </h2>
            <p className="lede" style={{color: 'rgba(244,241,232,0.7)'}}>
              Keep <strong style={{color: 'var(--volt)'}}>100%</strong> on the clients you do work for.
              Earn <strong style={{color: 'var(--volt)'}}>7%</strong> on every dollar they spend with anyone else on the network — forever.
            </p>
            <ul className="calc-bullets">
              <li><span className="tick"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7" /></svg></span>Auto-paid monthly, in your currency</li>
              <li><span className="tick"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7" /></svg></span>Yours even if the client switches agencies</li>
              <li><span className="tick"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7" /></svg></span>Transferable on sale of your agency</li>
            </ul>
          </div>
          <div className="calc-card">
            <div className="calc-head">Project your earnings</div>
            <label className="calc-row">
              <span>Clients you do the work for</span>
              <span className="calc-val">{direct}</span>
              <input type="range" min="0" max="40" value={direct} onChange={(e) => setDirect(+e.target.value)} />
            </label>
            <label className="calc-row">
              <span>Clients you refer to others</span>
              <span className="calc-val">{referred}</span>
              <input type="range" min="0" max="100" value={referred} onChange={(e) => setReferred(+e.target.value)} />
            </label>
            <label className="calc-row">
              <span>Avg. monthly spend per client</span>
              <span className="calc-val">{fmt(spend)}</span>
              <input type="range" min="500" max="25000" step="500" value={spend} onChange={(e) => setSpend(+e.target.value)} />
            </label>
            <div className="calc-split">
              <div className="cs-row"><span className="cs-l">Direct work · 100%</span><span className="cs-n">{fmt(directMonthly)}/mo</span></div>
              <div className="cs-row"><span className="cs-l">Network share · 7%</span><span className="cs-n">{fmt(referredMonthly)}/mo</span></div>
            </div>
            <div className="calc-results">
              <div className="cr"><span className="cr-l">Per month</span><span className="cr-n">{fmt(monthly)}</span></div>
              <div className="cr cr-mid"><span className="cr-l">Per year</span><span className="cr-n">{fmt(yearly)}</span></div>
              <div className="cr cr-feat"><span className="cr-l">Over 5 years</span><span className="cr-n">{fmt(fiveYr)}</span></div>
            </div>
            <a href="https://app.prodesk.com/" className="btn btn-volt" style={{width: '100%', justifyContent: 'center'}}>
              Apply as a partner agency <span className="arrow">→</span>
            </a>
            <div className="calc-fine">Indicative only. Direct stream shown net of Stripe processing. Final share confirmed in your partner agreement.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Old-way panel (Contractor only) ----
function ContractorOldWay() {
  const { persona } = usePersona();
  if (persona !== 'contractor') return null;
  const items = [
    "No more chasing invoices",
    "No more unclear briefs buried in email threads",
    "No more wondering if the client has approved your work",
    "No more 30-day payment terms",
    "No more lost revisions across 4 chat apps",
    "No more rebuilding your portfolio every two years",
  ];
  return (
    <section className="section old-way-section">
      <div className="wrap">
        <div className="old-way-shell">
          <div className="section-head" style={{margin: '0 auto 32px'}}>
            <span className="eyebrow-line" style={{color: 'rgba(244,241,232,0.6)'}}>
              <span className="dot" />The way it was
            </span>
            <h2 style={{color: 'var(--paper)'}}>The old way of working is <em className="brand" style={{color: 'var(--volt)'}}>broken.</em></h2>
          </div>
          <div className="old-way-grid">
            {items.map((t) => (
              <div className="ow-row" key={t}>
                <span className="ow-tick">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7" /></svg>
                </span>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Comparison (persona-aware rows) ----
const COMPARE_SETS = {
  none: {
    h: <>The <em className="brand">old</em> way vs. ProDesk.</>,
    rows: [
      { row: "Briefs, contracts and final files",     us: "Document Locker — every brand, every agency, one source of truth", them: "Inbox + Dropbox + Drive + 'can you re-send that?'" },
      { row: "Talking to your agencies (or your clients)", us: "Power Chat — brand-scoped, every agency in one thread", them: "Six Slacks, two emails, a WhatsApp" },
      { row: "Subscription renewals",                 us: "One view, one cancel button",      them: "Six portals, one nasty surprise" },
      { row: "Paying for work",                       us: "Upfront or 12 / 26 / 52 week payment plans",  them: "Net-30 invoices, chase emails, all up front" },
      { row: "Sending and signing proposals",         us: "Built from the catalogue. Sign + pay in one click.", them: "PandaDoc, Stripe link, follow-up call" },
      { row: "Tracking project progress",             us: "Live Kanban — your client sees it move",  them: "'Quick status call?' every Tuesday" },
      { row: "Onboarding a new partner or client",    us: "They populate your hub. You start working.",  them: "Brief docs, calls, follow-ups, repeat" },
      { row: "What happens when a partner leaves",    us: "Your data stays. Yours.",          them: "Email begging for files" },
      { row: "Knowing the real spend or revenue",     us: "By agency, category, month, brand", them: "Ask the bookkeeper" },
    ],
  },
  brand: {
    h: <>The <em className="brand">old</em> way vs. ProDesk.</>,
    rows: [
      { row: "Where your agency contracts live",       us: "Document Locker",                 them: "Inbox + Dropbox + Drive" },
      { row: "Subscription renewals",                  us: "One view, one cancel button",     them: "Six portals, one nasty surprise" },
      { row: "Paying agencies",                        us: "Upfront or 12 / 26 / 52 week payment plans",      them: "All up front, every time" },
      { row: "Onboarding a new agency",                us: "They populate your hub for you",  them: "Brief docs, calls, follow-ups" },
      { row: "Knowing your real spend",                us: "By agency, category, month",      them: "Ask the bookkeeper" },
      { row: "What happens if an agency leaves",       us: "Your data stays. Yours.",          them: "Email begging for files" },
    ],
  },
  agency: {
    h: <>The <em className="brand">old</em> agency model vs. ProDesk.</>,
    rows: [
      { row: "What happens after a client engagement",  us: "100% direct · 7% on the network, forever", them: "Hope they call you next year" },
      { row: "Finding new clients",                     us: "Inbound from brands on platform",  them: "Cold outreach + referrals" },
      { row: "Getting paid",                            us: "Auto-billed on approval",          them: "Chase invoices, every time" },
      { row: "Workspaces with clients",                 us: "Co-branded, white-labelled",       them: "Email threads + Drive folders" },
      { row: "Selling the agency",                      us: "Earnings transfer with the sale",   them: "Goodwill, on a handshake" },
      { row: "Your contractors",                        us: "Marked-up, margin yours",          them: "On their own invoices, on the side" },
    ],
  },
  contractor: {
    h: <>The <em className="brand">old</em> freelance grind vs. ProDesk.</>,
    rows: [
      { row: "Getting briefed",                         us: "Complete brief, approver named",   them: "'Just hop on a call to align'" },
      { row: "Status updates",                          us: "Live, where the client looks",     them: "Weekly check-in emails" },
      { row: "Getting paid",                            us: "Same-day on approval",             them: "Net-60, then the chase" },
      { row: "Disputes",                                us: "Mediated, escrow-protected",       them: "Lose work, lose money, lose sleep" },
      { row: "Your portfolio",                          us: "Auto-updated, portable",           them: "Out of date, screenshots, NDAs" },
      { row: "Finding the next gig",                    us: "Marketplace of intent buyers",     them: "Twitter, Slack DMs, hope" },
    ],
  },
};

function Comparison() {
  const { persona } = usePersona();
  const c = COMPARE_SETS[persona] || COMPARE_SETS.none;
  return (
    <section className="section compare-section" id="compare">
      <div className="wrap persona-fade" key={persona || 'none'}>
        <div className="section-head">
          <span className="eyebrow-line"><span className="dot" />Honest comparison</span>
          <h2>{c.h}</h2>
        </div>
        <div className="compare-table">
          <div className="compare-head">
            <div></div>
            <div className="ch ch-us">
              <span className="wm" style={{fontSize: 18}}>
                <span className="wm-svg" role="img" aria-label="ProDesk"></span>
                <span className="wm-dot" aria-hidden="true"></span>
              </span>
            </div>
            <div className="ch ch-them">The way it works now</div>
          </div>
          {c.rows.map((r) => (
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

// ---- Security (universal) ----
function Security() {
  const items = [
    { ic: "i-check",     t: "Bank-grade encryption",     b: "AES-256 at rest. TLS 1.3 in transit. Zero-knowledge document storage." },
    { ic: "i-docs",      t: "SOC 2 Type II",             b: "Independently audited. Annually re-certified. Report on request." },
    { ic: "i-dashboard", t: "Your data is yours",        b: "Export everything in one click — JSON, CSV, original files. No lock-in." },
    { ic: "i-pipelines", t: "Granular permissions",      b: "Agency-by-agency, document-by-document. Revoke access in one tap." },
  ];
  return (
    <section className="section security" id="security">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow-line"><span className="dot" />Trust & security</span>
          <h2>One tab for everything is only <em className="brand">smart</em> if it's safe.</h2>
          <p className="lede">We're asking you to centralise your business. We take that seriously.</p>
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

// ---- Pricing (persona-aware emphasis) ----
function Pricing() {
  const { persona } = usePersona();
  const tiers = [
    {
      id: "brand",
      name: "Brand",
      price: 0,
      per: "free, forever",
      desc: "For founders running one or many brands. The full platform. No card.",
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
      id: "agency",
      name: "Agency",
      price: 0,
      per: "free + earn on the whole network",
      desc: "For agencies and professional service firms. Earn equity in every client you bring.",
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
    {
      id: "contractor",
      name: "Contractor",
      price: 0,
      per: "free + same-day pay",
      desc: "For freelancers and specialists. Find work, get paid, take your portfolio with you.",
      cta: "Find work on ProDesk",
      tag: null,
      features: [
        "Free profile + portable portfolio",
        "Same-day payment on approval",
        "Apply directly to brands & agencies",
        "Dispute mediation + escrow protection",
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
              Brands pay nothing. Agencies earn revenue share for life on every
              client they refer. Contractors get paid same-day. Everyone wins.
            </p>
          </div>

          <div className="price-grid price-grid-3">
            {tiers.map((t) => (
              <div key={t.name} className={`price-card ${persona === t.id ? 'featured' : ''}`}>
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
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="https://app.prodesk.com/" className={`btn ${persona === t.id ? 'btn-ink' : 'btn-volt'}`}>
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

// ---- FAQ (persona-aware) ----
const FAQ_SETS = {
  none: [
    { q: "What does ProDesk actually do?", a: "ProDesk is the operations dashboard that consolidates the relationships, documents, subscriptions and payments running every modern business — into one tab. The agencies you already work with populate your workspace; you stop being the switchboard." },
    { q: "Who is it for?", a: "Three roles share the same workspace: brands (free, forever), agencies and professional service firms (free + lifetime revenue share on every brand they bring), and contractors (free + same-day pay on approved work). Everyone gets the same toolset, tuned to their role." },
    { q: "Is it free?", a: "Free for brands, forever — and brands earn 7% lifetime commission for every other founder they introduce to ProDesk. Free for agencies — they keep 100% on direct work and earn 7% on every cross-network sale. Free for contractors, with no platform cut. ProDesk earns from the transaction layer, not the seats." },
    { q: "How long does it take to set up?", a: "Most teams are operational by the end of an afternoon. There's no migration project — your existing agencies plug in, populate the hub and bring their documents with them." },
    { q: "Where does the INFIN8 system fit in?", a: "INFIN8 is the framework underneath the dashboard — eight stages, sixty-four steps, from foundations to exit. Every project, agency and supplier in your workspace sits against it, so the work always has a shape." },
  ],
  brand: [
    { q: "Is ProDesk really free for brands?", a: "Yes. Brands pay nothing for the platform. You only ever pay your agencies for the work they do — and ProDesk gives you control over how and when." },
    { q: "What if my agencies aren't on ProDesk yet?", a: "Invite them — it's free. They get a co-branded workspace, automatic invoicing, and a lifetime revenue share on every brand they bring along. Most agencies are signed up by lunchtime." },
    { q: "How do payment plans work?", a: "Choose to pay an agency in full, or spread the cost over 12, 26 or 52 weeks. Your cash flow stays protected. The agency still gets paid on time — ProDesk handles the rest." },
    { q: "Can I run multiple brands from one account?", a: "Yes. Spin up unlimited brand profiles, switch between them with a click. Permissions, documents, subscriptions and spend stay separate." },
    { q: "Where does the INFIN8 system fit in?", a: "INFIN8 is the framework underneath the dashboard — eight stages, sixty-four steps, from foundations to exit. ProDesk shows you which stage each of your brands is at, and what to do next." },
  ],
  agency: [
    { q: "How does the agency revenue model actually work?", a: "Four scenarios. (1) You bring the client and you do the work — you keep 100% of the fee, minus Stripe processing. (2) You bring the client and another agency on the network does the work — you earn 7% of every dollar they spend, for the life of the relationship. (3) You're an approved sales agency closing a deal for someone else — you take 30% of the fee. (4) Another agency brings the client and you deliver the work — you keep a minimum 50%, paid on completion or every four weeks, whichever comes first. ProDesk takes 13% on network deals. for life. Paid monthly, automatically." },
    { q: "Does the share apply only to your services?", a: "No — that's the point. Even if the brand uses another agency for a service you don't offer, you still earn your share. You introduced them. You earn forever." },
    { q: "What happens if I sell the agency?", a: "Your earnings stream transfers with the sale. Your client book is now a real, valued asset on your balance sheet — exactly as it always should have been." },
    { q: "Are there any fees for partner agencies?", a: "No. ProDesk is free for partner agencies. You earn from referrals, you pay nothing. We make our money from the platform's transactional model." },
    { q: "Can I bring my freelancers on too?", a: "Yes. Onboard your contractors under your agency, brief them through ProDesk, mark up their time, and bill the brand at your rate. Your margin stays yours." },
  ],
  contractor: [
    { q: "How fast do I actually get paid?", a: "Same day. The moment your deliverable is approved by the client in ProDesk, the payment is released. Most contractors see it in their account within an hour." },
    { q: "What if there's a dispute?", a: "ProDesk holds payment in escrow from the moment work starts. If there's a disagreement, our team mediates — and we pay you for the work you've already done." },
    { q: "Is there a cut taken from my pay?", a: "No platform fee for contractors. The agency or brand pays ProDesk. You keep 100% of your agreed rate." },
    { q: "Can I take my portfolio with me?", a: "Yes. Every approved deliverable, every testimonial, every client engagement is automatically logged to your portable contractor profile. Export it any time." },
    { q: "Do I need to apply, or can I just join?", a: "You can join free in under two minutes. Approved deliverables build your reputation — agencies see your verified track record before they brief you." },
  ],
};

function Faq() {
  const [open, setOpen] = useState(0);
  const { persona } = usePersona();
  const items = FAQ_SETS[persona] || FAQ_SETS.none;
  const askedBy = persona ? `${PERSONAS[persona].label.toLowerCase()}s` : 'everyone';
  return (
    <section className="section" id="faq">
      <div className="wrap persona-fade" key={persona || 'none'}>
        <div className="section-head">
          <span className="eyebrow-line"><span className="dot" />FAQ</span>
          <h2>The questions <em className="brand">{askedBy}</em> ask first.</h2>
        </div>
        <div className="faq">
          {items.map((item, i) => (
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

// ---- CTA Band (persona-aware) ----
// ---- Rotating tagline (cross-fades between two phrases) ----
function RotatingTagline({ phrases, sub, interval = 3200 }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % phrases.length), interval);
    return () => clearInterval(t);
  }, [phrases.length, interval]);
  return (
    <span className="rt">
      <span className="rt-stack" aria-live="polite">
        {phrases.map((p, i) => (
          <span key={i} className={`rt-phrase ${i === idx ? 'is-on' : ''}`}>
            {p}
          </span>
        ))}
      </span>
      {sub ? <><br />{sub}</> : null}
    </span>
  );
}

const CTA_COPY = {
  none: {
    h: <RotatingTagline phrases={[<>Everything <em>clicks.</em></>, <>Powered by <em>people.</em></>]} sub={<>When it's all in one place.</>} />,
    p: "Spin up your workspace in three minutes. Plug in the agencies, contractors and suppliers you already work with. Watch the chaos go quiet. No card. No setup fee. No catch.",
    primary: "Get started — it's free",
    secondary: "I'm an agency partner",
    secondaryHref: "#",
    tertiary: "Book a 15-min walkthrough",
    meta: "Free forever for brands · Revenue share for agencies · Same-day pay for talent",
  },
  brand: {
    h: <RotatingTagline phrases={[<>Everything <em>clicks.</em></>, <>Powered by <em>people.</em></>]} sub={<>Free for brands.</>} />,
    p: "Spin up your brand profile in three minutes. Invite your agencies. Watch the chaos go quiet. No card. No setup fee. No catch.",
    primary: "Join free as a Brand",
    secondary: "Partner as an agency",
    secondaryHref: "#",
    tertiary: "Book a 15-min walkthrough",
    meta: "Free forever for brands · Revenue share for agencies · Same-day pay for talent",
  },
  agency: {
    h: <RotatingTagline phrases={[<>Everything <em>clicks.</em></>, <>Powered by <em>people.</em></>]} sub={<>And keeps paying.</>} />,
    p: "Apply once. Onboard your existing book. Earn forever on every client you bring — across any service, with any agency, for the life of the relationship.",
    primary: "Apply as a partner agency",
    secondary: "I'm a brand, not an agency",
    secondaryHref: "#",
    tertiary: "Talk to the partnerships team",
    meta: "100% direct · 7% network · Auto-paid · Transferable on sale",
  },
  contractor: {
    h: <RotatingTagline phrases={[<>Everything <em>clicks.</em></>, <>Powered by <em>people.</em></>]} sub={<>And gets paid.</>} />,
    p: "Build your portable profile in two minutes. Get briefed properly. Deliver, get approved, get paid the same day. Zero invoicing. Zero chasing.",
    primary: "Find work on ProDesk",
    secondary: "I'm an agency, not a contractor",
    secondaryHref: "#",
    tertiary: "How payment actually works",
    meta: "Free · Same-day pay · Escrow-protected · Portable portfolio",
  },
};

function CtaBand() {
  const { persona } = usePersona();
  const c = CTA_COPY[persona] || CTA_COPY.none;
  return (
    <section className="section" id="cta">
      <div className="wrap persona-fade" key={persona || 'none'}>
        <div className="cta-band">
          <h2>{c.h}</h2>
          <p>{c.p}</p>
          <div className="ctas">
            <a href="https://app.prodesk.com/" className="btn btn-ink">
              {c.primary} <span className="arrow">→</span>
            </a>
            <a href="https://app.prodesk.com/" className="btn btn-ghost">{c.secondary}</a>
            <a href="https://app.prodesk.com/" className="btn btn-ghost">{c.tertiary}</a>
          </div>
          <div className="meta">{c.meta}</div>
        </div>
      </div>
    </section>
  );
}

// ---- Footer (universal) ----
function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="grid">
          <div className="brand-col">
            <span className="wm wm-lg wm-on-ink">
              <span className="wm-svg" role="img" aria-label="ProDesk"></span>
              <span className="wm-dot" aria-hidden="true"></span>
            </span>
            <p>The business management dashboard that puts everything in one place. Connecting brands, agencies and the talent who power the work.</p>
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
              <li><a href="#personalise">Brands</a></li>
              <li><a href="#personalise">Agencies</a></li>
              <li><a href="#personalise">Contractors</a></li>
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

function Tweaks({ tweaks, setTweak, persona, setPersona }) {
  return (
    <TweaksPanel>
      <TweakSection title="Persona">
        <TweakRadio
          label="View as"
          value={persona || 'none'}
          options={[
            { value: "none", label: "None" },
            { value: "brand", label: "Brand" },
            { value: "agency", label: "Agency" },
            { value: "contractor", label: "Contractor" },
          ]}
          onChange={(v) => setPersona(v === 'none' ? null : v, v !== 'none')}
        />
      </TweakSection>
      <TweakSection title="Hero">
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
  const [persona, setPersonaState] = useState(null);
  const [chosen, setChosen] = useState(false);
  const setPersona = (p, lock = true) => {
    setPersonaState(p);
    if (lock && p) setChosen(true);
    if (!p) setChosen(false);
  };
  const reset = () => { setPersonaState(null); setChosen(false); };

  const ctxValue = { persona, setPersona, chosen, reset };

  return (
    <PersonaCtx.Provider value={ctxValue}>
      <div className={`page ${persona ? `persona-${persona}` : 'persona-none'}`}>
        <NavBar />
        <Hero tweaks={tweaks} />
        <Logos />
        <Manifesto />
        <Features />
        <Infin8 />
        <Replaces />
        <HowAgenciesEarn />
        <Calculator />
        <ContractorOldWay />
        <Comparison />
        <Steps />
        <Testimonial />
        <Security />
        <FoundingPartners />
        <Pricing />
        <Faq />
        <CtaBand />
        <Footer />
        <Tweaks tweaks={tweaks} setTweak={setTweak} persona={persona} setPersona={setPersona} />
      </div>
    </PersonaCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Site />);
