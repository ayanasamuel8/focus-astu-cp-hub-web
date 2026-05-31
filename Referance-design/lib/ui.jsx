// lib/ui.jsx — Focus ASTU CP Hub shared design system
// Tokens, icons, badges, cards, buttons, and the two app shells.
const { useState, useEffect, useRef } = React;

const T = {
  bg:'#0a0c10', surface:'#11141a', surface2:'#161a21', surface3:'#1d222b',
  hover:'#222834', border:'#272d39', borderSoft:'#1c212a',
  text:'#e9ebf0', text2:'#99a0ad', text3:'#626a78',
  accent:'#25d6c1', accent2:'#14b3a2', accentText:'#63e6d6',
  accentGhost:'rgba(37,214,193,0.13)', accentLine:'rgba(37,214,193,0.30)',
  gain:'#45d483', loss:'#f2654f', streak:'#ff9646', streak2:'#ff6a35',
  warn:'#f3b53c', warnGhost:'rgba(243,181,60,0.14)',
  lc:'#ffa116', cf:'#5790ff', ac:'#a78bfa', other:'#8c94a3',
  fD:'var(--font-display)', fB:'var(--font-body)', fM:'var(--font-mono)', fS:'var(--font-serif)',
};

// ── Icons (24x24 stroke, currentColor) ───────────────────────────────
const ICONS = {
  dashboard:'M3 3h7v7H3zM14 3h7v4h-7zM14 11h7v10h-7zM3 14h7v7H3z',
  problems:'M4 4h16M4 4v16M4 20h16M8 9l2 2-2 2M13 13h4',
  contests:'M8 21h8M12 17v4M6 4h12v5a6 6 0 0 1-12 0zM6 5H3v2a3 3 0 0 0 3 3M18 5h3v2a3 3 0 0 1-3 3',
  squad:'M3 5h6v6H3zM3 16h6M3 13h6M13 4l8 0M13 9l8 0M13 15l8 0M13 20l8 0',
  announce:'M3 11l14-6v14L3 13zM3 11v2M17 8a3 3 0 0 1 0 6M7 13v5a1 1 0 0 0 1 1h1',
  profile:'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0',
  settings:'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19 12a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7 7 0 0 0-2-1.2L16 2H8l-.5 2.6a7 7 0 0 0-2 1.2l-2.4-1-2 3.4 2 1.6A7 7 0 0 0 3 12c0 .4 0 .8.1 1.2l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 2 1.2L8 22h8l.5-2.6a7 7 0 0 0 2-1.2l2.4 1 2-3.4-2-1.6c.1-.4.1-.8.1-1.2z',
  admin:'M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z M9 12l2 2 4-4',
  search:'M11 11m-7 0a7 7 0 1 0 14 0a7 7 0 1 0-14 0M21 21l-4.3-4.3',
  flame:'M12 2c1 3-1 4-2 6s-1 4 1 4c1.5 0 2-1 2-2 1 1 2 2.5 2 4a5 5 0 0 1-10 0c0-3 2-5 3-7 1-2 4-3 4-5z',
  copy:'M9 9h11v11H9zM5 15H4V4h11v1',
  check:'M4 12l5 5L20 6',
  chevron:'M9 6l6 6-6 6',
  chevronD:'M6 9l6 6 6-6',
  plus:'M12 5v14M5 12h14',
  arrow:'M5 12h14M13 6l6 6-6 6',
  external:'M14 5h5v5M19 5l-8 8M11 5H5v14h14v-6',
  bolt:'M13 2L4 14h6l-1 8 9-12h-6z',
  lock:'M6 11h12v9H6zM8 11V8a4 4 0 0 1 8 0v3',
  mail:'M3 6h18v12H3zM3 7l9 6 9-6',
  ban:'M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0-18 0M6 6l12 12',
  key:'M15 7a4 4 0 1 0-3.5 4l1.5 1.5 2 0 0 2 2 0 0 2 3 0 0-3-5-5z',
  book:'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 5v14',
  trophy:'M8 21h8M12 17v4M6 4h12v5a6 6 0 0 1-12 0zM6 5H3v2a3 3 0 0 0 3 3M18 5h3v2a3 3 0 0 1-3 3',
  clock:'M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0-18 0M12 7v5l3 2',
  link:'M9 15l6-6M10 6l1-1a4 4 0 0 1 6 6l-1 1M14 18l-1 1a4 4 0 0 1-6-6l1-1',
  filter:'M3 5h18l-7 8v6l-4 2v-8z',
  logout:'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9',
  verse:'M12 3v18M5 7h14M7 3h10v4a5 5 0 0 1-10 0z',
};
function Icon({ name, size=18, sw=1.8, style, fill }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill||'none'}
      stroke={fill?'none':'currentColor'} strokeWidth={sw} strokeLinecap="round"
      strokeLinejoin="round" style={{ flexShrink:0, ...style }}>
      <path d={ICONS[name]} />
    </svg>
  );
}

// ── Buttons ───────────────────────────────────────────────────────────
function Btn({ children, kind='primary', size='md', icon, iconR, full, style, onClick }) {
  const sz = size==='sm' ? {p:'7px 12px',fs:12.5,gap:6} : size==='lg' ? {p:'13px 22px',fs:15,gap:9} : {p:'10px 16px',fs:13.5,gap:7};
  const kinds = {
    primary:{ background:T.accent, color:'#04201d', border:'1px solid '+T.accent, fontWeight:600 },
    accentGhost:{ background:T.accentGhost, color:T.accentText, border:'1px solid '+T.accentLine, fontWeight:600 },
    ghost:{ background:'transparent', color:T.text2, border:'1px solid '+T.border, fontWeight:500 },
    solid:{ background:T.surface3, color:T.text, border:'1px solid '+T.border, fontWeight:500 },
    danger:{ background:'rgba(242,101,79,0.12)', color:T.loss, border:'1px solid rgba(242,101,79,0.4)', fontWeight:600 },
  };
  return (
    <button onClick={onClick} style={{
      display:'inline-flex', alignItems:'center', justifyContent:'center', gap:sz.gap,
      padding:sz.p, fontSize:sz.fs, fontFamily:T.fD, letterSpacing:0.1, borderRadius:8,
      cursor:'pointer', whiteSpace:'nowrap', width:full?'100%':'auto', transition:'filter .15s',
      ...kinds[kind], ...style }}>
      {icon && <Icon name={icon} size={sz.fs+2} />}
      {children}
      {iconR && <Icon name={iconR} size={sz.fs+2} />}
    </button>
  );
}

// ── Generic surfaces ────────────────────────────────────────────────────
function Card({ children, style, pad=20, hover, accent }) {
  return (
    <div style={{
      background:T.surface2, border:'1px solid '+T.border, borderRadius:14, padding:pad,
      ...(accent?{borderColor:T.accentLine}:{}), ...style }}>{children}</div>
  );
}
// kicker label
function Kicker({ children, color=T.text3, style }) {
  return <div style={{ fontFamily:T.fM, fontSize:11, letterSpacing:2, textTransform:'uppercase', color, ...style }}>{children}</div>;
}

// ── Platform badge ───────────────────────────────────────────────────────
const PLAT = {
  LEETCODE:{ label:'LeetCode', short:'LC', c:T.lc },
  CODEFORCES:{ label:'Codeforces', short:'CF', c:T.cf },
  ATCODER:{ label:'AtCoder', short:'AC', c:T.ac },
  OTHER:{ label:'Other', short:'··', c:T.other },
};
function PlatformBadge({ p, full, size='md' }) {
  const d = PLAT[p] || PLAT.OTHER;
  const s = size==='sm'?{fs:10.5,py:2,px:6,dot:5}:{fs:11.5,py:3,px:8,dot:6};
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:6, padding:`${s.py}px ${s.px}px`,
      borderRadius:6, fontFamily:T.fM, fontSize:s.fs, fontWeight:600, letterSpacing:0.3,
      color:d.c, background:d.c+'1c', border:'1px solid '+d.c+'33' }}>
      <span style={{ width:s.dot, height:s.dot, borderRadius:2, background:d.c }} />
      {full ? d.label : d.short}
    </span>
  );
}

// ── Role badge (earned / tiered) ─────────────────────────────────────────
const ROLE = {
  COMMUNITY:   { label:'Community',   tier:0, c:T.text2, glyph:'◦' },
  SQUAD_MEMBER:{ label:'Member',      tier:1, c:'#7fd1c4', glyph:'▸' },
  SQUAD_LEAD:  { label:'Squad Lead',  tier:2, c:T.accent,  glyph:'★' },
  ADMIN:       { label:'Admin',       tier:3, c:'#e7b765', glyph:'◆' },
  SUPER_ADMIN: { label:'Super Admin', tier:4, c:'#f4d58a', glyph:'❖' },
};
function RoleBadge({ role, size='md' }) {
  const r = ROLE[role] || ROLE.COMMUNITY;
  const s = size==='sm'?{fs:10.5,py:3,px:8}:{fs:12,py:4,px:11};
  const tierStyle = (() => {
    if (r.tier === 0) return { color:T.text2, background:'transparent', border:'1px solid '+T.border };
    if (r.tier === 1) return { color:r.c, background:'rgba(127,209,196,0.10)', border:'1px solid rgba(127,209,196,0.28)' };
    if (r.tier === 2) return { color:'#062b27', background:'linear-gradient(180deg,#37e3cf,#1ab9a8)', border:'1px solid '+T.accent, fontWeight:700 };
    if (r.tier === 3) return { color:'#3a2c0f', background:'linear-gradient(180deg,#f0c878,#d6a martin)', border:'1px solid #e7b765' };
    return { color:'#2e2403', background:'linear-gradient(180deg,#ffe7a8,#e9c069)', border:'1px solid #f4d58a', boxShadow:'0 0 14px rgba(244,213,138,0.28)' };
  })();
  // fix accidental token in tier 3 gradient
  if (r.tier===3) tierStyle.background='linear-gradient(180deg,#f0c878,#d6a24a)';
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:5, padding:`${s.py}px ${s.px}px`,
      borderRadius:7, fontFamily:T.fD, fontSize:s.fs, fontWeight:600, letterSpacing:0.3,
      ...tierStyle }}>
      <span style={{ fontSize:s.fs-1, lineHeight:1 }}>{r.glyph}</span>{r.label}
    </span>
  );
}

// ── Squad badge ──────────────────────────────────────────────────────────
function SquadBadge({ squad, lead, size='md' }) {
  if (!squad) return null;
  const s = size==='sm'?{fs:10.5,py:3,px:7}:{fs:12,py:4,px:9};
  const n = (squad.match(/\d+/)||['#'])[0];
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:6, padding:`${s.py}px ${s.px}px`,
      borderRadius:7, fontFamily:T.fD, fontSize:s.fs, fontWeight:600, color:T.text,
      background:T.surface3, border:'1px solid '+T.border }}>
      <span className="mono" style={{ fontSize:s.fs-1, fontWeight:700, color:T.accentText,
        background:T.accentGhost, borderRadius:4, padding:'1px 4px', lineHeight:1.3 }}>{n}</span>
      {squad}{lead && <span style={{ color:T.accent }}>· Lead</span>}
    </span>
  );
}

// ── Avatar (monogram) ──────────────────────────────────────────────────
function Avatar({ name, size=40, banned, ring }) {
  const init = (name||'?').split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
  const hues = [185, 150, 45, 265, 320, 210];
  const h = hues[(name||'').length % hues.length];
  return (
    <div style={{ width:size, height:size, borderRadius:size*0.32, flexShrink:0,
      display:'flex', alignItems:'center', justifyContent:'center',
      fontFamily:T.fD, fontWeight:600, fontSize:size*0.38, color:'#fff',
      background: banned ? T.surface3 : `linear-gradient(145deg, oklch(0.55 0.12 ${h}), oklch(0.4 0.10 ${h+20}))`,
      filter: banned?'grayscale(1) opacity(0.6)':'none',
      border: ring?'2px solid '+T.accent:'1px solid '+T.border }}>
      {banned ? <Icon name="ban" size={size*0.5} /> : init}
    </div>
  );
}

// ── Streak flame ────────────────────────────────────────────────────────
function Streak({ days, size='md' }) {
  const s = size==='sm'?{fs:13,ic:14}:{fs:16,ic:18};
  const hot = days >= 7;
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:5, fontFamily:T.fD, fontWeight:700,
      fontSize:s.fs, color: hot?T.streak:T.text2 }}>
      <span style={{ display:'inline-flex', animation: hot?'fa-flame 1.6s ease-in-out infinite':'none',
        color: days>0?T.streak:T.text3 }}>
        <Icon name="flame" size={s.ic} fill={days>0?'url(#flameG)':'none'} sw={1.6}
          style={{ filter: hot?'drop-shadow(0 0 6px rgba(255,150,70,0.6))':'none' }} />
      </span>
      <span className="num">{days}</span>
    </span>
  );
}
// gradient def for the flame (rendered once)
function FlameDef() {
  return (
    <svg width="0" height="0" style={{ position:'absolute' }}>
      <defs><linearGradient id="flameG" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#ff6a35" /><stop offset="100%" stopColor="#ffc24d" />
      </linearGradient></defs>
    </svg>
  );
}

// ── Stat card (distinct from other cards) ────────────────────────────────
function StatCard({ label, value, sub, accent, icon, delta }) {
  return (
    <div style={{ background:T.surface2, border:'1px solid '+T.border, borderRadius:12,
      padding:'16px 18px', position:'relative', overflow:'hidden', flex:1, minWidth:0 }}>
      <div style={{ position:'absolute', top:0, left:0, width:3, height:'100%',
        background: accent||T.border }} />
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
        <Kicker>{label}</Kicker>
        {icon && <Icon name={icon} size={16} style={{ color:T.text3 }} />}
      </div>
      <div style={{ display:'flex', alignItems:'baseline', gap:8, marginTop:10 }}>
        <span className="disp num" style={{ fontSize:30, fontWeight:600, color:T.text, letterSpacing:-0.5, lineHeight:1 }}>{value}</span>
        {delta && <span className="num" style={{ fontSize:13, fontWeight:600, color: delta>0?T.gain:T.loss }}>
          {delta>0?'▲':'▼'}{Math.abs(delta)}</span>}
      </div>
      {sub && <div style={{ fontSize:12.5, color:T.text3, marginTop:6 }}>{sub}</div>}
    </div>
  );
}

// ── Verdict tag ────────────────────────────────────────────────────────
function Verdict({ ok=true, children }) {
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:5, fontFamily:T.fM, fontSize:11.5,
      fontWeight:600, padding:'2px 8px', borderRadius:5,
      color: ok?T.gain:T.loss, background:(ok?'rgba(69,212,131,':'rgba(242,101,79,')+'0.12)',
      border:'1px solid '+(ok?'rgba(69,212,131,':'rgba(242,101,79,')+'0.3)' }}>
      <span style={{ width:5, height:5, borderRadius:5, background:'currentColor' }} />
      {children || (ok?'Accepted':'Failed')}
    </span>
  );
}

// ── Logo / wordmark ──────────────────────────────────────────────────────
function Logo({ size=20, mark=true, sub=true }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:11 }}>
      {mark && (
        <div style={{ width:size*1.7, height:size*1.7, borderRadius:size*0.5, flexShrink:0,
          display:'grid', placeItems:'center', position:'relative',
          background:'linear-gradient(150deg,#16323a,#0c1418)', border:'1px solid '+T.accentLine,
          boxShadow:'inset 0 0 16px rgba(37,214,193,0.12)' }}>
          <span style={{ fontFamily:T.fD, fontWeight:700, fontSize:size*0.92, color:T.accent,
            lineHeight:1 }}>ƒ</span>
          <span style={{ position:'absolute', right:size*0.18, bottom:size*0.2, width:size*0.26,
            height:size*0.26, borderRadius:'50%', background:T.accent, boxShadow:'0 0 8px '+T.accent }} />
        </div>
      )}
      <div style={{ lineHeight:1.05 }}>
        <div style={{ fontFamily:T.fD, fontWeight:700, fontSize:size*0.86, letterSpacing:0.2, color:T.text }}>
          Focus<span style={{ color:T.accent }}>·</span>ASTU
        </div>
        {sub && <div style={{ fontFamily:T.fM, fontSize:size*0.42, letterSpacing:2.5, textTransform:'uppercase', color:T.text3, marginTop:2 }}>CP&nbsp;Hub</div>}
      </div>
    </div>
  );
}

// ── Sidebar nav config (role-aware) ─────────────────────────────────────
const NAV = [
  { id:'dashboard',  label:'Dashboard',     icon:'dashboard' },
  { id:'problems',   label:'Problems',      icon:'problems' },
  { id:'contests',   label:'Contests',      icon:'contests' },
  { id:'squad',      label:'My Squad',      icon:'squad',     roles:['SQUAD_MEMBER','SQUAD_LEAD'] },
  { id:'announcements', label:'Announcements', icon:'announce' },
  { id:'profile',    label:'Profile',       icon:'profile' },
  { id:'settings',   label:'Settings',      icon:'settings' },
  { id:'admin',      label:'Admin',         icon:'admin',     roles:['ADMIN','SUPER_ADMIN'], gated:true },
];
function navForRole(role) {
  return NAV.filter(n => !n.roles || n.roles.includes(role));
}

// ── Sidebar ──────────────────────────────────────────────────────────────
function Sidebar({ active, role, user, onNav }) {
  const items = navForRole(role);
  return (
    <aside style={{ width:236, flexShrink:0, background:T.surface, borderRight:'1px solid '+T.border,
      display:'flex', flexDirection:'column', height:'100%' }}>
      <div style={{ padding:'20px 18px 18px' }}><Logo size={19} /></div>
      <nav style={{ padding:'6px 12px', display:'flex', flexDirection:'column', gap:2, flex:1 }}>
        {items.map(n => {
          const on = n.id===active;
          return (
            <button key={n.id} onClick={()=>onNav&&onNav(n.id)} style={{
              display:'flex', alignItems:'center', gap:11, padding:'9px 12px', borderRadius:9,
              border:'none', cursor:'pointer', textAlign:'left', width:'100%',
              fontFamily:T.fD, fontSize:13.5, fontWeight: on?600:500,
              color: on?T.text:T.text2,
              background: on?T.accentGhost:'transparent',
              boxShadow: on?'inset 0 0 0 1px '+T.accentLine:'none', position:'relative' }}>
              {on && <span style={{ position:'absolute', left:-12, top:'50%', transform:'translateY(-50%)',
                width:3, height:18, borderRadius:3, background:T.accent }} />}
              <Icon name={n.icon} size={17} style={{ color: on?T.accent:T.text3 }} />
              {n.label}
              {n.gated && <span style={{ marginLeft:'auto', fontFamily:T.fM, fontSize:9, letterSpacing:1,
                color:'#e7b765', border:'1px solid rgba(231,183,101,0.4)', borderRadius:4, padding:'1px 4px' }}>ADMIN</span>}
            </button>
          );
        })}
      </nav>
      <div style={{ padding:12, borderTop:'1px solid '+T.border }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 8px', borderRadius:10 }}>
          <Avatar name={user.name} size={36} />
          <div style={{ minWidth:0, flex:1 }}>
            <div style={{ fontFamily:T.fD, fontWeight:600, fontSize:13, color:T.text, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{user.name}</div>
            <div style={{ fontSize:11, color:T.text3, whiteSpace:'nowrap' }}>{user.squad||'Community'}</div>
          </div>
          <Icon name="logout" size={16} style={{ color:T.text3 }} />
        </div>
      </div>
    </aside>
  );
}

// ── App header ─────────────────────────────────────────────────────────
function AppHeader({ title, crumbs, role, user, right }) {
  return (
    <header style={{ height:60, flexShrink:0, borderBottom:'1px solid '+T.border, background:'rgba(10,12,16,0.7)',
      backdropFilter:'blur(10px)', display:'flex', alignItems:'center', padding:'0 26px', gap:18 }}>
      <div style={{ flex:1, minWidth:0 }}>
        {crumbs && <div style={{ fontFamily:T.fM, fontSize:11, color:T.text3, letterSpacing:0.5, marginBottom:2 }}>{crumbs}</div>}
        <h1 style={{ margin:0, fontFamily:T.fD, fontSize:18, fontWeight:600, color:T.text, letterSpacing:-0.2 }}>{title}</h1>
      </div>
      {right}
      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
        <button style={{ width:36, height:36, borderRadius:9, border:'1px solid '+T.border, background:T.surface2,
          color:T.text2, display:'grid', placeItems:'center', cursor:'pointer' }}><Icon name="search" size={17} /></button>
        <RoleBadge role={role} size="sm" />
      </div>
    </header>
  );
}

// ── App shell wrapper ────────────────────────────────────────────────────
function AppShell({ active, role, user, header, children, scroll }) {
  return (
    <div className="fa-app" style={{ display:'flex', height:'100%', width:'100%', overflow:'hidden' }}>
      <FlameDef />
      <Sidebar active={active} role={role} user={user} onNav={null} />
      <div style={{ flex:1, minWidth:0, display:'flex', flexDirection:'column', height:'100%' }}>
        {header}
        <main style={{ flex:1, overflow: scroll===false?'hidden':'auto', padding:'26px 30px' }}>
          {children}
        </main>
      </div>
    </div>
  );
}

// ── Landing navbar ───────────────────────────────────────────────────────
function LandingNav({ authed }) {
  return (
    <nav style={{ display:'flex', alignItems:'center', padding:'20px 48px', gap:32,
      borderBottom:'1px solid '+T.borderSoft, position:'relative', zIndex:3 }}>
      <Logo size={20} />
      <div style={{ flex:1 }} />
      <a style={{ fontFamily:T.fD, fontSize:14, fontWeight:500, color:T.text2, textDecoration:'none' }}>Announcements</a>
      <Btn kind="ghost" size="sm" iconR="arrow">Dashboard</Btn>
      {!authed && <Btn kind="primary" size="sm">Login / Sign Up</Btn>}
    </nav>
  );
}

// expose
Object.assign(window, {
  T, Icon, ICONS, Btn, Card, Kicker, PlatformBadge, PLAT, RoleBadge, ROLE,
  SquadBadge, Avatar, Streak, FlameDef, StatCard, Verdict, Logo,
  Sidebar, AppHeader, AppShell, LandingNav, NAV, navForRole,
});
