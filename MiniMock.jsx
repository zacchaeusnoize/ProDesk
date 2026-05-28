// MiniMock.jsx — embedded ProDesk dashboard mock for use in hero / spotlight

function Icon({ id, size = 16 }) {
  return (
    <svg width={size} height={size} aria-hidden="true">
      <use href={`assets/icons.svg#${id}`} />
    </svg>
  );
}

function MiniMock() {
  return (
    <div className="mock">
      <aside className="side">
        <div className="lg"><img src="assets/logo-wordmark.svg" alt="ProDesk" /></div>
        <div className="item on"><Icon id="i-dashboard" /> Dashboard</div>
        <div className="item"><Icon id="i-contacts" /> Contacts</div>
        <div className="item"><Icon id="i-pipelines" /> Pipelines</div>
        <div className="item"><Icon id="i-inbox" /> Inbox</div>
        <div className="item"><Icon id="i-docs" /> Docs</div>
        <div className="lab">Workspace</div>
        <div className="item"><Icon id="i-trend-up" /> Growth</div>
        <div className="item"><Icon id="i-sparkle" /> Activity</div>
        <div className="ftr">
          <div>Setup is <em>almost</em> done.</div>
          <button>Finish setup <span style={{fontFamily:'JetBrains Mono'}}>→</span></button>
        </div>
      </aside>

      <div className="main">
        <div className="top">
          <div>
            <div className="date">Tue, 28 Apr</div>
            <div className="greet">Good morning, <em>Maya</em>.</div>
          </div>
          <div className="sp" />
          <div className="search">
            <Icon id="i-search" size={13} />
            <span>Search</span>
            <span className="kbd">⌘K</span>
          </div>
          <button className="new"><Icon id="i-plus" size={11} /> New deal</button>
          <div className="av">M</div>
        </div>

        <div className="body">
          <div className="head">
            <h1>Today, <em>at a glance</em></h1>
            <span className="sub">Tue, 28 Apr · 5 things to click</span>
          </div>

          <div className="kpis">
            <div className="kpi">
              <div className="l">Pipeline</div>
              <div className="n">$127k</div>
              <div className="d">▲ 12% vs last wk</div>
            </div>
            <div className="kpi volt">
              <div className="l">Open deals</div>
              <div className="n">37</div>
              <div className="d">5 closing this wk</div>
            </div>
            <div className="kpi">
              <div className="l">Replies</div>
              <div className="n">142</div>
              <div className="d">▲ 8 today</div>
            </div>
            <div className="kpi">
              <div className="l">Setup</div>
              <div className="n">2 / 5</div>
              <div className="d">3 left</div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-head">
              <h2>Pipeline · Q2</h2>
              <span className="m">Drag to advance</span>
            </div>
            <div className="pipe">
              <div className="col">
                <div className="col-h"><span>Lead</span><span className="ct">4</span></div>
                <div className="deal"><div className="nm">Acme</div><div className="am">$14k</div></div>
                <div className="deal"><div className="nm">Vandelay</div><div className="am">$6k</div></div>
              </div>
              <div className="col">
                <div className="col-h"><span>Qualified</span><span className="ct">3</span></div>
                <div className="deal"><div className="nm">Northwind</div><div className="am">$24k</div></div>
                <div className="deal"><div className="nm">Soylent</div><div className="am">$32k</div></div>
              </div>
              <div className="col">
                <div className="col-h"><span>Proposal</span><span className="ct">2</span></div>
                <div className="deal"><div className="nm">Initech</div><div className="am">$9k</div></div>
              </div>
              <div className="col">
                <div className="col-h"><span>Negotiation</span><span className="ct">2</span></div>
                <div className="deal"><div className="nm">Globex</div><div className="am">$48k</div></div>
              </div>
              <div className="col">
                <div className="col-h"><span>Won</span><span className="ct">5</span></div>
                <div className="deal won"><div className="nm">Hooli</div><div className="am">$18k</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.MiniMock = MiniMock;
window.Icon = Icon;
