'use client';
import React, { useState, useEffect, useRef, useCallback, useMemo, useContext, createContext, Fragment, forwardRef, memo, Children } from 'react';

// ---- Founding Partners ----
// 19 agency cards filtered by category. Each card has a logo tile,
// name, descriptor, blurb, and a "stage" pill (Incubate / Create / etc).

const PARTNERS = [
  { id: "noize",     name: "Noize",     desc: "Branding & design",                bg: "var(--volt)",     fg: "#0f1115",        font: "sans",   weight: 800,  text: "NOIZE\u00AE", cat: "creative",  blurb: "Brand identity, visual design, creative direction and brand strategy for businesses at every stage", stage: "Incubate + Create" },
  { id: "mentiis",   name: "Mentiis",   desc: "Corporate advisory",               bg: "#5BA019",         fg: "#ffffff",        font: "sans",   weight: 600,  text: "mentiis",     cat: "advisory",  blurb: "Strategy, planning, capital raising, franchise, licensing, mergers & acquisitions and restructuring", stage: "Incubate + Facilitate", logoSrc: "/assets/partners/mentiis.jpg" },
  { id: "aggyl",     name: "Aggyl",     desc: "Lean project management",          bg: "#B53C0E",         fg: "#ffffff",        font: "serif",  weight: 700,  text: "aggyl",       cat: "operations",blurb: "Agile and lean project management for complex, multi-agency projects and blue chip clients", stage: "Incubate + Operate", logoSrc: "/assets/partners/aggyl.jpg" },
  { id: "zilophone", name: "Zilophone", desc: "Telecommunications",               bg: "#7BD9D5",         fg: "#0f1115",        font: "sans",   weight: 700,  text: "zilo|phone",  cat: "operations",blurb: "1300 numbers, IVR systems, cloud telephony and telecoms infrastructure for businesses", stage: "Incubate", logoSrc: "/assets/partners/zilophone.jpg" },
  { id: "dmayn",     name: "Dmayn",     desc: "Domain name registration",         bg: "#0F4A6E",         fg: "#ffffff",        font: "sans",   weight: 800,  text: "DMAYN",       cat: "operations",blurb: "Domain name management, registration and digital infrastructure for brands and businesses", stage: "Incubate", logoSrc: "/assets/partners/dmayn.jpg" },
  { id: "ppayd",     name: "Ppayd",     desc: "Payments",                          bg: "#3CDFA1",         fg: "#0f1115",        font: "sans",   weight: 700,  italic: true, text: "ppayd",  cat: "financial", blurb: "Boutique payment processing with integrated software — innovative beyond standard payment gateways", stage: "Incubate", logoSrc: "/assets/partners/ppayd.jpg" },
  { id: "sccrol",    name: "Sccrol",    desc: "Website & app development",        bg: "#2A3138",         fg: "#ffffff",        font: "sans",   weight: 500,  text: "sccrol",      cat: "creative",  blurb: "Web design, web development, app development and digital product builds", stage: "Create", logoSrc: "/assets/partners/sccrol.jpg" },
  { id: "fllrt",     name: "Fllrt",     desc: "Public relations",                  bg: "#FF6B6B",         fg: "#ffffff",        font: "sans",   weight: 700,  text: "fllrt.",      cat: "growth",    blurb: "PR, media relations, news media strategy and brand reputation management", stage: "Accelerate", logoSrc: "/assets/partners/fllrt.jpg" },
  { id: "adwyre",    name: "Adwyre",    desc: "Media buying",                      bg: "#5C0E0E",         fg: "#ffffff",        font: "mono",   weight: 700,  text: "ADWYRE",      cat: "growth",    blurb: "Traditional media buying across TV, print, radio and out-of-home advertising", stage: "Accelerate", logoSrc: "/assets/partners/adwyre.jpg" },
  { id: "whunda",    name: "Whunda",    desc: "Digital marketing",                bg: "#FF7A47",         fg: "#ffffff",        font: "script", weight: 500,  text: "whunda",      cat: "growth",    blurb: "Search, social, paid and organic digital marketing for brand growth and customer acquisition", stage: "Accelerate", logoSrc: "/assets/partners/whunda.jpg" },
  { id: "fylmr",     name: "Fylmr",     desc: "Film & audio production",          bg: "#0f1115",         fg: "#ffffff",        font: "sans",   weight: 500,  text: "FYLMR",       cat: "creative",  blurb: "Video production, film, audio production and content creation for brands and campaigns", stage: "Create", logoSrc: "/assets/partners/fylmr.jpg" },
  { id: "fuyse",     name: "Fuyse",     desc: "Advanced software development",    bg: "#3D52F0",         fg: "#ffffff",        font: "sans",   weight: 700,  text: "fuyse",       cat: "creative",  blurb: "Custom software engineering, complex application development and advanced technical builds", stage: "Create", logoSrc: "/assets/partners/fuyse.jpg" },
  { id: "cnxon",     name: "Cnxon",     desc: "Business automation & SaaS",       bg: "#7AAA92",         fg: "#ffffff",        font: "sans",   weight: 500,  text: "cnxon",       cat: "operations",blurb: "Business automation, SaaS management and workflow integration for growing businesses", stage: "Create + Operate", logoSrc: "/assets/partners/cnxon.jpg" },
  { id: "sellx",     name: "Sellx",     desc: "Sales & business development",     bg: "#F73B32",         fg: "#ffffff",        font: "sans",   weight: 800,  italic: true, text: "sellx", cat: "growth",   blurb: "Sales strategy, direct marketing, outbound sales and business development", stage: "Accelerate", logoSrc: "/assets/partners/sellx.jpg" },
  { id: "xppoz",     name: "Xppoz",     desc: "Functions & events",                bg: "#3D2466",         fg: "#ffffff",        font: "sans",   weight: 600,  text: "XPPOZ",       cat: "growth",    blurb: "Event management, brand activations, functions and experiential marketing", stage: "Motivate", logoSrc: "/assets/partners/xppoz.jpg" },
  { id: "entayn",    name: "Entayn",    desc: "Member & incentive management",    bg: "#7DA3F0",         fg: "#ffffff",        font: "sans",   weight: 700,  text: "entayn",      cat: "growth",    blurb: "Membership programs, competitions, incentives, giveaways, influencer campaigns and affiliate networks", stage: "Motivate", logoSrc: "/assets/partners/entayn.jpg" },
  { id: "paakr",     name: "Paakr",     desc: "3PL & logistics",                  bg: "#3F5044",         fg: "#ffffff",        font: "sans",   weight: 600,  text: "paakr.",      cat: "operations",blurb: "Third-party logistics, warehousing, fulfilment and supply chain management", stage: "Operate", logoSrc: "/assets/partners/paakr.jpg" },
  { id: "sqeze",     name: "Sqeze",     desc: "Bookkeeping & financial reporting",bg: "#FFD400",         fg: "#0f1115",        font: "sans",   weight: 800,  text: "SQEZE",       cat: "financial", blurb: "Bookkeeping, financial reporting, accounts management and business financial health monitoring", stage: "Operate + Evaluate", logoSrc: "/assets/partners/sqeze.jpg" },
  { id: "servint",   name: "Servint",   desc: "Human resources & recruitment",    bg: "#E9B8E8",         fg: "#0f1115",        font: "serif",  weight: 600,  text: "servint",     cat: "operations",blurb: "HR management, recruitment, workforce planning and people operations", stage: "Operate", logoSrc: "/assets/partners/servint.jpg" },
];

const PARTNER_CATS = [
  { id: "all",        label: "All" },
  { id: "creative",   label: "Creative" },
  { id: "financial",  label: "Financial" },
  { id: "operations", label: "Operations" },
  { id: "growth",     label: "Growth" },
  { id: "advisory",   label: "Advisory" },
];

function PartnerLogo({ p, size = "lg" }) {
  // Render the stylised wordmark in its tile.
  const fontFam =
    p.font === "serif"  ? "'Instrument Serif', 'Times New Roman', serif" :
    p.font === "mono"   ? "'JetBrains Mono', monospace" :
    p.font === "script" ? "'Caveat', 'Brush Script MT', cursive" :
    "var(--font-sans)";
  const baseSize = size === "sm" ? 11 : size === "md" ? 13 : 15;
  // for very long words, shrink
  const len = p.text.replace(/\u00AE/g, '').length;
  const fontSize = len > 8 ? baseSize - 2 : len > 6 ? baseSize - 1 : baseSize;
  // Special case: zilophone has a styled split
  let inner;
  if (p.text.includes("|")) {
    const parts = p.text.split("|");
    inner = (
      <span style={{display:'inline-flex'}}>
        <span style={{fontWeight: 800}}>{parts[0]}</span>
        <span style={{fontWeight: 400, opacity: 0.85}}>{parts[1]}</span>
      </span>
    );
  } else {
    inner = p.text;
  }
  if (p.logoSrc) {
    return (
      <div className={`pp-logo pp-logo-${size}`} style={{ background: p.bg, padding: 0, overflow: 'hidden' }}>
        <img src={p.logoSrc} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
    );
  }
  return (
    <div className={`pp-logo pp-logo-${size}`} style={{
      background: p.bg,
      color: p.fg,
    }}>
      <span style={{
        fontFamily: fontFam,
        fontWeight: p.weight,
        fontStyle: p.italic ? 'italic' : 'normal',
        fontSize: `${fontSize}px`,
        letterSpacing: p.font === 'mono' ? '0.04em' : '-0.01em',
        lineHeight: 1,
      }}>{inner}</span>
    </div>
  );
}

function FoundingPartners() {
  const [filter, setFilter] = React.useState("all");
  const list = filter === "all" ? PARTNERS : PARTNERS.filter(p => p.cat === filter);
  return (
    <section className="section partners-section" id="partners">
      <div className="wrap">
        <div className="section-head" style={{textAlign:'center'}}>
          <span className="eyebrow eyebrow-pill" style={{margin:'0 auto'}}>Founding Partners</span>
          <h2 style={{maxWidth: '900px', margin: '14px auto 12px'}}>Loads of great agencies and growing every day</h2>
          <p style={{margin: '0 auto', maxWidth: '560px'}}>Every service your business will ever need, all in one place.</p>
        </div>

        {/* Decorative chip strip — all partners as small pills */}
        <div className="pp-strip">
          {PARTNERS.map(p => (
            <div className="pp-chip" key={p.id} title={`${p.name} — ${p.desc}`}>
              {p.logoSrc ? (
                <span className="pp-chip-inner" style={{background: p.bg, padding: 0, overflow: 'hidden'}}>
                  <img src={p.logoSrc} alt={p.name} style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}} />
                </span>
              ) : (
                <span className="pp-chip-inner" style={{background: p.bg, color: p.fg}}>
                  <span style={{
                    fontFamily: p.font === "serif"  ? "'Instrument Serif', serif" :
                                p.font === "mono"   ? "'JetBrains Mono', monospace" :
                                p.font === "script" ? "'Caveat', cursive" :
                                "var(--font-sans)",
                    fontWeight: p.weight,
                    fontStyle: p.italic ? 'italic' : 'normal',
                    fontSize: '13px',
                    letterSpacing: p.font === 'mono' ? '0.04em' : '-0.01em',
                  }}>{p.text.replace("|","")}</span>
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Filter pills */}
        <div className="pp-filters">
          {PARTNER_CATS.map(c => (
            <button
              key={c.id}
              className={`pp-filter ${filter === c.id ? 'is-active' : ''}`}
              onClick={() => setFilter(c.id)}
            >{c.label}</button>
          ))}
        </div>

        {/* Card grid */}
        <div className="pp-grid">
          {list.map(p => (
            <article className="pp-card" key={p.id}>
              <div className="pp-card-logo">
                <PartnerLogo p={p} size="lg" />
              </div>
              <div className="pp-card-body">
                <h3>{p.name}</h3>
                <div className="pp-card-cat">{p.desc}</div>
                <p className="pp-card-blurb">{p.blurb}</p>
                <span className="pp-card-stage">{p.stage}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FoundingPartners;
