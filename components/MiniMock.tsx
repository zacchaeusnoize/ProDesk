'use client';
import React, { useState, useEffect, useRef, useCallback, useMemo, useContext, createContext, Fragment, forwardRef, memo, Children } from 'react';
import { usePersona } from "./PersonaContext";

// MiniMock.jsx — embedded Scorol-style ProDesk dashboard (persona-aware).
// Sidebar + topbar are stable across personas; the welcome line, the 3 KPI
// cards, the empty-state copy, the activity feed, and the "next up" checklist
// adapt to whichever persona the visitor selected.

function Icon({ id, name, size = 16, ...rest }) {
  // Accept either `id` (legacy) or `name` (Scorol convention).
  const sym = id || name;
  return (
    <svg width={size} height={size} aria-hidden="true" {...rest}>
      <use href={`/assets/icons.svg#${sym}`} />
    </svg>
  );
}
// Alias used by the imported Scorol-style markup.
const AppIcon = ({ name, size = 16 }) => <Icon id={name} size={size} />;

// ─────────────────────────────────────────────────────────────────────────────
// Per-persona dashboard data. Numbers and language come from the three
// reference dashboards the user provided (Brand / Agency / Contractor). The
// Scorol shell stays identical across personas — only the content rotates.
// ─────────────────────────────────────────────────────────────────────────────
const PERSONA_DATA = {
  brand: {
    crumbPill: "Brand",
    workspaceGlyph: "MA",
    workspaceName: "Maven & Co.",
    workspaceMeta: "Pro · 6 seats",
    welcomeName: "Maya",
    welcomeAgency: "Maven & Co.",
    nav: [
      { id: 'dashboard', label: 'Dashboard',         icon: 'i-dashboard', active: true },
      { id: 'projects',  label: 'Projects',          icon: 'i-pipelines', badge: '12' },
      { id: 'agencies',  label: 'Agencies',          icon: 'i-contacts' },
      { id: 'briefs',    label: 'Briefs',            icon: 'i-docs' },
      { id: 'assets',    label: 'Brand assets',      icon: 'i-brand-assets' },
      { id: 'team',      label: 'Team',              icon: 'i-workspace' },
      { id: 'budget',    label: 'Budgets',           icon: 'i-trend-up' },
    ],
    moneyNav: [
      { id: 'spend',  label: 'Spend',         icon: 'i-trend-up' },
      { id: 'inv',    label: 'Invoices',      icon: 'i-docs' },
      { id: 'plan',   label: 'Plan',          icon: 'i-calendar' },
    ],
    kpis: [
      { id: 'projects', label: 'Active projects', value: '12', unit: 'live',
        icon: 'i-pipelines', tone: 'k-volt',
        delta: { dir: 'up', text: '+3 this week' },
        bars: [2,4,3,5,4,6,7,6,8,9,10,12], onIdx: [11] },
      { id: 'agencies', label: 'Agencies engaged', value: '8', unit: 'on retainer',
        icon: 'i-contacts', tone: '',
        delta: { dir: 'flat', text: '2 pending' },
        bars: [3,3,4,4,5,5,6,6,7,7,8,8], onIdx: [10,11] },
      { id: 'budget', label: 'Budget spent', value: '$45.2k', unit: '68% of plan',
        icon: 'i-trend-up', tone: 'k-ink',
        delta: { dir: 'flat', text: 'Q2 pacing' },
        bars: [1,2,3,4,5,6,7,8,9,10,11,12], onIdx: [9,10,11] },
    ],
    emptyEyebrow: "Nothing here — yet",
    emptyHeadlineLeft: "One ",
    emptyHeadlineEm: "click",
    emptyHeadlineRight: " away from your first brief.",
    emptyBody: "Spin up a brief, hand it to one of your agencies, or import a project. Approvals, files and invoices follow you in.",
    emptyPrimary: "New brief",
    emptySecondary: "From template",
    activity: [
      { time: '09:41', volt: true, body: <span><span className="who"><span className="dt" />You</span> assigned <b>Spring campaign</b> to <b>Northwind</b>.</span>, stamp: 'BRAND' },
      { time: '09:32', body: <span>Brief <b>Holiday refresh</b> approved by <em>legal</em></span>, stamp: 'BRAND' },
      { time: 'YEST.', body: <span>3 deliverables landed from <b>Acme</b></span>, stamp: 'BRAND' },
      { time: 'YEST.', body: <span>Brand kit synced · <em>14 assets</em></span>, stamp: 'BRAND' },
    ],
    nextUp: [
      { id: 1, label: 'Connect your bank account', badge: '2 min', done: true },
      { id: 2, label: 'Invite a creative lead',    badge: '1 min', done: false },
      { id: 3, label: 'Approve the Q2 budget',     badge: '3 min', done: false },
    ],
  },

  agency: {
    crumbPill: "Agency",
    workspaceGlyph: "SC",
    workspaceName: "Scorol",
    workspaceMeta: "Pro · 4 seats",
    welcomeName: "Christopher",
    welcomeAgency: "Scorol",
    nav: [
      { id: 'dashboard', label: 'Dashboard',         icon: 'i-dashboard', active: true },
      { id: 'clients',   label: 'Clients',           icon: 'i-contacts',     badge: '24' },
      { id: 'info',      label: 'Info hub',          icon: 'i-docs' },
      { id: 'proposals', label: 'Proposals',         icon: 'i-pipelines' },
      { id: 'projects',  label: 'Projects',          icon: 'i-workspace' },
      { id: 'catalog',   label: 'Catalog',           icon: 'i-brand-assets' },
      { id: 'team',      label: 'Team',              icon: 'i-contacts' },
    ],
    moneyNav: [
      { id: 'earnings', label: 'Earnings',     icon: 'i-trend-up' },
      { id: 'invoice',  label: 'Invoice',      icon: 'i-docs' },
      { id: 'subs',     label: 'Subscriptions',icon: 'i-calendar' },
    ],
    kpis: [
      { id: 'clients', label: 'Active clients', value: '24', unit: 'live',
        icon: 'i-contacts', tone: 'k-volt',
        delta: { dir: 'up', text: '+5 this month' },
        bars: [4,6,8,10,12,14,16,18,20,22,23,24], onIdx: [11] },
      { id: 'proj', label: 'Active projects', value: '0', unit: 'in flight',
        icon: 'i-pipelines', tone: '',
        delta: { dir: 'flat', text: 'Nothing yet' },
        bars: [0,0,0,0,0,0,0,0,0,0,0,0], onIdx: [] },
      { id: 'props', label: 'Pending proposals', value: '0', unit: 'awaiting reply',
        icon: 'i-docs', tone: 'k-ink',
        delta: { dir: 'flat', text: 'No pending' },
        bars: [0,0,0,0,0,0,0,0,0,0,0,0], onIdx: [] },
    ],
    emptyEyebrow: "Nothing here — yet",
    emptyHeadlineLeft: "One ",
    emptyHeadlineEm: "click",
    emptyHeadlineRight: " away from your first project.",
    emptyBody: "Start a project from a signed proposal, or spin one up from scratch. Tasks, files and invoices follow you in.",
    emptyPrimary: "New project",
    emptySecondary: "From proposal",
    activity: [
      { time: '09:41', volt: true, body: <span><span className="who"><span className="dt" />You</span> created agency <b>Scorol</b>. Welcome.</span>, stamp: 'SCOROL' },
      { time: '09:38', body: <span>Workspace seat invited to <b>chris@scorol.co</b></span>, stamp: 'SCOROL' },
      { time: 'YEST.', body: <span>Stripe connected — payouts <em>ready</em></span>, stamp: 'SCOROL' },
      { time: 'YEST.', body: <span>Brand kit imported · 14 assets</span>, stamp: 'SCOROL' },
    ],
    nextUp: [
      { id: 1, label: 'Connect your bank account', badge: '2 min', done: true },
      { id: 2, label: 'Invite your first teammate', badge: '1 min', done: false },
      { id: 3, label: 'Add your first client',     badge: '3 min', done: false },
    ],
  },

  contractor: {
    crumbPill: "Contractor",
    workspaceGlyph: "JD",
    workspaceName: "Jordan, solo",
    workspaceMeta: "Solo · 1 seat",
    welcomeName: "Jordan",
    welcomeAgency: "your studio",
    nav: [
      { id: 'dashboard', label: 'Dashboard',         icon: 'i-dashboard', active: true },
      { id: 'projects',  label: 'Projects',          icon: 'i-pipelines', badge: '5' },
      { id: 'clients',   label: 'Clients',           icon: 'i-contacts' },
      { id: 'time',      label: 'Time tracking',     icon: 'i-activity' },
      { id: 'inv',       label: 'Invoices',          icon: 'i-docs' },
      { id: 'cat',       label: 'Service catalog',   icon: 'i-brand-assets' },
    ],
    moneyNav: [
      { id: 'earn', label: 'Earnings',     icon: 'i-trend-up' },
      { id: 'tax',  label: 'Tax & GST',    icon: 'i-docs' },
      { id: 'pay',  label: 'Payouts',      icon: 'i-calendar' },
    ],
    kpis: [
      { id: 'proj', label: 'Active projects', value: '5', unit: 'in flight',
        icon: 'i-pipelines', tone: 'k-volt',
        delta: { dir: 'flat', text: '2 ending soon' },
        bars: [3,3,4,4,5,5,5,5,5,5,5,5], onIdx: [11] },
      { id: 'hrs', label: 'Hours logged', value: '142', unit: 'this month',
        icon: 'i-activity', tone: '',
        delta: { dir: 'up', text: '+12 vs last' },
        bars: [4,6,5,8,7,9,8,11,10,12,12,11], onIdx: [9,10] },
      { id: 'earn', label: 'Earnings', value: '$8.4k', unit: 'pending: $2.1k',
        icon: 'i-trend-up', tone: 'k-ink',
        delta: { dir: 'up', text: '+$1.2k MoM' },
        bars: [2,3,4,5,5,7,8,9,10,11,11,12], onIdx: [10,11] },
    ],
    emptyEyebrow: "Pipeline preview",
    emptyHeadlineLeft: "Three ",
    emptyHeadlineEm: "clicks",
    emptyHeadlineRight: " from your next invoice.",
    emptyBody: "Track time against projects, mark a milestone done, and ProDesk drafts the invoice. You just hit send.",
    emptyPrimary: "Start tracking",
    emptySecondary: "Draft an invoice",
    activity: [
      { time: '09:41', volt: true, body: <span><span className="who"><span className="dt" />You</span> logged <b>2.5h</b> on <em>Northwind landing</em></span>, stamp: 'STUDIO' },
      { time: '09:14', body: <span>Invoice <b>#0042</b> paid — $2,400</span>, stamp: 'STUDIO' },
      { time: 'YEST.', body: <span>Milestone <b>Design QA</b> marked <em>done</em></span>, stamp: 'STUDIO' },
      { time: 'YEST.', body: <span>New client request from <b>Acme</b></span>, stamp: 'STUDIO' },
    ],
    nextUp: [
      { id: 1, label: 'Connect your bank account', badge: '2 min', done: true },
      { id: 2, label: 'Set your hourly rate',      badge: '1 min', done: false },
      { id: 3, label: 'Add your ABN for invoices', badge: '2 min', done: false },
    ],
  },
};

function MockSidebar({ d }) {
  return (
    <aside className="mk-side">
      <div className="mk-brand">
        <img src="/assets/logo-wordmark.svg" alt="ProDesk" />
        <span className="mk-brand-pill">{d.crumbPill}</span>
      </div>

      <div className="mk-switch">
        <div className="gly">{d.workspaceGlyph}</div>
        <div className="info">
          <div className="nm">{d.workspaceName}</div>
          <div className="mt">{d.workspaceMeta}</div>
        </div>
        <span className="chev"><AppIcon name="i-chevron-down" size={11} /></span>
      </div>

      {d.nav.map((it) => (
        <div key={it.id} className={`mk-nav ${it.active ? 'on' : ''}`}>
          <AppIcon name={it.icon} size={13} />
          <span>{it.label}</span>
          {it.badge ? <span className="badge">{it.badge}</span> : null}
        </div>
      ))}

      <div className="mk-sect">Money</div>
      {d.moneyNav.map((it) => (
        <div key={it.id} className="mk-nav">
          <AppIcon name={it.icon} size={13} />
          <span>{it.label}</span>
        </div>
      ))}

      <div className="mk-side-foot">
        <button className="mk-danger">
          <AppIcon name="i-close" size={11} /> Delete workspace
        </button>
      </div>
    </aside>
  );
}

function MockTopbar({ d }) {
  return (
    <header className="mk-top">
      <div className="mk-crumbs">
        <span>{d.workspaceName}</span>
        <span className="sep">/</span>
        <span className="here">Dashboard</span>
      </div>
      <div className="mk-top-sp" />
      <div className="mk-search">
        <AppIcon name="i-search" size={11} />
        <span>Search projects…</span>
        <span className="kbd">⌘K</span>
      </div>
      <div className="mk-iconbtn"><AppIcon name="i-check" size={11} /></div>
      <div className="mk-iconbtn">
        <AppIcon name="i-bell" size={11} />
        <span className="nd" />
      </div>
      <div className="mk-av">{d.workspaceGlyph.slice(0,2)}</div>
    </header>
  );
}

function MockKpi({ k }) {
  return (
    <div className={`mk-kpi ${k.tone}`}>
      <div className="top">
        <div className="gly"><AppIcon name={k.icon} size={13} /></div>
        <span className={`delta ${k.delta.dir === 'up' ? 'pos' : ''}`}>
          {k.delta.dir === 'up' ? <AppIcon name="i-trend-up" size={8} /> : null}
          {k.delta.text}
        </span>
      </div>
      <div className="num">{k.value}<span className="unit">{k.unit}</span></div>
      <div className="meter">
        {k.bars.map((h, i) => (
          <div
            key={i}
            className={`bar ${k.onIdx.includes(i) ? 'on' : ''}`}
            style={{ height: `${Math.max(3, (h / 12) * 14)}px` }}
          />
        ))}
      </div>
      <div className="lab">{k.label}</div>
    </div>
  );
}

function MockEmpty({ d }) {
  return (
    <section className="mk-panel">
      <div className="mk-panelh">
        <div>
          <h2>Active projects</h2>
          <div className="sub">Latest updates across all projects.</div>
        </div>
        <div className="right">
          <button className="mk-btn-ghost"><AppIcon name="i-filter" size={10} /> Filter</button>
          <button className="mk-btn-ghost">View all <AppIcon name="i-arrow-right" size={10} /></button>
        </div>
      </div>
      <div className="mk-tabs">
        <div className="mk-tab on">All <span className="pill">{d.kpis[1].value}</span></div>
        <div className="mk-tab">In progress</div>
        <div className="mk-tab">Review</div>
        <div className="mk-tab">On hold</div>
        <div className="mk-tab">Done</div>
      </div>
      <div className="mk-empty">
        <div className="left">
          <div className="eyebrow">{d.emptyEyebrow}</div>
          <h3>{d.emptyHeadlineLeft}<em>{d.emptyHeadlineEm}</em>{d.emptyHeadlineRight}</h3>
          <p>{d.emptyBody}</p>
          <div className="ctas">
            <button className="mk-btn-primary"><AppIcon name="i-plus" size={10} /> {d.emptyPrimary}</button>
            <button className="mk-btn-ghost">{d.emptySecondary} <AppIcon name="i-arrow-right" size={10} /></button>
          </div>
        </div>
        <div className="mk-sketch" aria-hidden="true">
          <div className="mk-srow">
            <div className="sw" />
            <div className="ln" />
            <div className="ln short" />
            <span className="stamp">DRAFT</span>
          </div>
          <div className="mk-srow k-volt">
            <div className="sw" />
            <div className="ln" />
            <div className="ln short" />
            <span className="stamp">LIVE</span>
          </div>
          <div className="mk-srow">
            <div className="sw" />
            <div className="ln" />
            <div className="ln short" />
            <span className="stamp">REVIEW</span>
          </div>
          <span className="ghost">Your projects, when they click in</span>
        </div>
      </div>
    </section>
  );
}

function MockActivity({ d }) {
  return (
    <section className="mk-panel">
      <div className="mk-panelh">
        <div>
          <h2>Activity</h2>
          <div className="sub">The last few clicks across your workspace.</div>
        </div>
      </div>
      <div className="mk-act">
        {d.activity.map((it, i) => (
          <div key={i} className={`mk-act-item ${it.volt ? 'volt' : ''}`}>
            <span className="time">{it.time}</span>
            <span className="body">{it.body}</span>
            <span className="stamp">{it.stamp}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function MockNextUp({ d }) {
  const remaining = d.nextUp.filter(s => !s.done).length;
  return (
    <section className="mk-panel">
      <div className="mk-panelh">
        <div>
          <h2>Next up</h2>
          <div className="sub">
            You're <em style={{fontFamily:'var(--font-serif)', fontStyle:'italic'}}>{remaining}</em>{' '}
            {remaining === 1 ? 'click' : 'clicks'} from done.
          </div>
        </div>
      </div>
      <div className="mk-next">
        {d.nextUp.map((s) => (
          <div key={s.id} className={`mk-next-item ${s.done ? 'done' : ''}`}>
            <div className="box">{s.done ? <AppIcon name="i-check" size={9} /> : null}</div>
            <span className="label">{s.label}</span>
            <span className="badge">{s.badge}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function MiniMock() {
  // Read persona from context if available; default to 'brand'.
  const ctx = usePersona();
  const persona = (ctx && ctx.persona) || 'brand';
  const d = PERSONA_DATA[persona] || PERSONA_DATA.brand;

  return (
    <div className={`mock mock-${persona}`}>
      <MockSidebar d={d} />
      <div className="mk-main">
        <MockTopbar d={d} />
        <div className="mk-page">
          <div className="mk-pageh">
            <div>
              <div className="mk-eyebrow">Tuesday, 28 Apr · Dashboard</div>
              <h1>Welcome back, <span className="nm">{d.welcomeName}</span>.</h1>
              <div className="mk-sub">Here's what's clicked at <b>{d.welcomeAgency}</b> since you logged off.</div>
            </div>
            <div className="mk-actions">
              <button className="mk-btn-ghost"><AppIcon name="i-calendar" size={10} /> This week</button>
              <button className="mk-btn-primary"><AppIcon name="i-plus" size={10} /> {persona === 'brand' ? 'New brief' : persona === 'contractor' ? 'New invoice' : 'New proposal'}</button>
            </div>
          </div>

          <div className="mk-kpis">
            {d.kpis.map((k) => <MockKpi key={k.id} k={k} />)}
          </div>

          <MockEmpty d={d} />

          <div className="mk-split">
            <MockActivity d={d} />
            <MockNextUp d={d} />
          </div>
        </div>
      </div>
    </div>
  );
}


export default MiniMock;
