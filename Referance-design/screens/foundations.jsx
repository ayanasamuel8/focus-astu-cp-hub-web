// screens/foundations.jsx — design system reference boards
const FBoard = ({ children, pad=34, w }) => (
  <div className="fa-app" style={{ background:T.bg, minHeight:'100%', padding:pad, width:'100%' }}>
    <FlameDef />{children}
  </div>
);
const FLabel = ({ children, style }) => (
  <div style={{ fontFamily:T.fM, fontSize:11, letterSpacing:2, textTransform:'uppercase', color:T.text3, marginBottom:16, ...style }}>{children}</div>
);
const Row = ({ children, gap=10, style }) => <div style={{ display:'flex', flexWrap:'wrap', gap, alignItems:'center', ...style }}>{children}</div>;

// ── TYPE ────────────────────────────────────────────────────────────────
function FoundationType() {
  const specs = [
    ['Display', 'Space Grotesk · 56 / 600', 56, 600, T.fD, 'Solve. Together.'],
    ['Heading', 'Space Grotesk · 28 / 600', 28, 600, T.fD, 'Weekly Contest #14 standings'],
    ['Subheading','Space Grotesk · 19 / 500', 19, 500, T.fD, 'Recent submissions across your squad'],
    ['Body','IBM Plex Sans · 15 / 400', 15, 400, T.fB, 'A centralized space for tracking problem-solving progress, running internal contests, and building competitive accountability.'],
    ['Caption','IBM Plex Sans · 12.5 / 500', 12.5, 500, T.fB, 'Synced 4 minutes ago · 128 participants'],
  ];
  return (
    <FBoard>
      <div style={{ fontFamily:T.fD, fontSize:13, color:T.text2, marginBottom:4 }}>Type system</div>
      <div style={{ fontFamily:T.fS, fontStyle:'italic', fontSize:15, color:T.text3, marginBottom:30 }}>Four voices: geometric display, humanist text, monospace code, serif scripture.</div>
      <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
        {specs.map(([name,meta,fs,fw,ff,txt])=>(
          <div key={name} style={{ display:'grid', gridTemplateColumns:'150px 1fr', gap:24, alignItems:'baseline', borderTop:'1px solid '+T.borderSoft, paddingTop:18 }}>
            <div><div style={{ fontFamily:T.fD, fontSize:14, fontWeight:600, color:T.text }}>{name}</div>
              <div style={{ fontFamily:T.fM, fontSize:10.5, color:T.text3, marginTop:4 }}>{meta}</div></div>
            <div style={{ fontFamily:ff, fontSize:fs, fontWeight:fw, color:T.text, letterSpacing: fs>30?-1:0, lineHeight:1.15 }}>{txt}</div>
          </div>
        ))}
        <div style={{ display:'grid', gridTemplateColumns:'150px 1fr', gap:24, alignItems:'baseline', borderTop:'1px solid '+T.borderSoft, paddingTop:18 }}>
          <div><div style={{ fontFamily:T.fD, fontSize:14, fontWeight:600, color:T.text }}>Code & handles</div>
            <div style={{ fontFamily:T.fM, fontSize:10.5, color:T.text3, marginTop:4 }}>JetBrains Mono · 13</div></div>
          <div className="mono" style={{ fontSize:13, color:T.text }}>
            <span style={{ color:'#5fd0ff' }}>for</span> (<span style={{ color:'#a78bfa' }}>int</span> i = <span style={{ color:'#ff9d6b' }}>0</span>; i &lt; n; i++) <span style={{ color:T.text2 }}>&#123;...&#125;</span><br/>
            <span style={{ color:T.accentText }}>@tourist</span> · <span style={{ color:T.accentText }}>cf:Benq</span> · <span style={{ color:T.accentText }}>lc:neal_wu</span>
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'150px 1fr', gap:24, alignItems:'baseline', borderTop:'1px solid '+T.borderSoft, paddingTop:18 }}>
          <div><div style={{ fontFamily:T.fD, fontSize:14, fontWeight:600, color:T.text }}>Scripture</div>
            <div style={{ fontFamily:T.fM, fontSize:10.5, color:T.text3, marginTop:4 }}>Spectral italic · 22</div></div>
          <div style={{ fontFamily:T.fS, fontStyle:'italic', fontSize:22, color:T.text, lineHeight:1.4 }}>
            “Whatever you do, work at it with all your heart.”
          </div>
        </div>
      </div>
    </FBoard>
  );
}

// ── COLOR ───────────────────────────────────────────────────────────────
function Swatch({ c, name, hex, big, sel }) {
  return (
    <div style={{ width: big?96:70 }}>
      <div style={{ height: big?72:52, borderRadius:10, background:c, border:'1px solid rgba(255,255,255,0.08)',
        boxShadow: sel?'0 0 0 2px '+T.bg+', 0 0 0 4px '+T.accent:'none', position:'relative' }}>
        {sel && <span style={{ position:'absolute', top:6, right:6, fontFamily:T.fM, fontSize:9, color:'#04201d', background:T.accent, borderRadius:4, padding:'1px 4px', fontWeight:700 }}>USED</span>}
      </div>
      <div style={{ fontFamily:T.fD, fontSize:11.5, color:T.text, marginTop:7 }}>{name}</div>
      <div style={{ fontFamily:T.fM, fontSize:10, color:T.text3 }}>{hex}</div>
    </div>
  );
}
function FoundationColor() {
  return (
    <FBoard>
      <FLabel>Base · cool near-black</FLabel>
      <Row gap={12}>
        {[['#0a0c10','bg'],['#11141a','surface'],['#161a21','surface-2'],['#1d222b','surface-3'],['#272d39','border'],['#626a78','text-3'],['#99a0ad','text-2'],['#e9ebf0','text']].map(([c,n])=>(
          <Swatch key={n} c={c} name={n} hex={c} />
        ))}
      </Row>
      <FLabel style={{ marginTop:34 }}>Signature accent — chosen direction + alternates</FLabel>
      <Row gap={14}>
        <Swatch big c={T.accent} name="Focus Teal" hex="#25d6c1" sel />
        <Swatch big c="#5b8cff" name="Indigo" hex="#5b8cff" />
        <Swatch big c="#e7b765" name="Gold" hex="#e7b765" />
        <Swatch big c="#ff7849" name="Ember" hex="#ff7849" />
        <div style={{ alignSelf:'stretch', display:'flex', alignItems:'center', maxWidth:230, marginLeft:10 }}>
          <div style={{ fontFamily:T.fB, fontSize:12.5, color:T.text2, lineHeight:1.5 }}>
            Teal reads focused & technical, and sits clear of every semantic hue below. Swap in one tap if you prefer warmer.</div>
        </div>
      </Row>
      <FLabel style={{ marginTop:34 }}>Semantic — meaning, never decoration</FLabel>
      <Row gap={12}>
        <Swatch c={T.gain} name="Gain ▲" hex="#45d483" />
        <Swatch c={T.loss} name="Loss ▼" hex="#f2654f" />
        <Swatch c={T.streak} name="Streak" hex="#ff9646" />
        <Swatch c={T.warn} name="Upsolve" hex="#f3b53c" />
      </Row>
      <FLabel style={{ marginTop:34 }}>Platform — four distinct identities</FLabel>
      <Row gap={12}>
        <Swatch c={T.lc} name="LeetCode" hex="#ffa116" />
        <Swatch c={T.cf} name="Codeforces" hex="#5790ff" />
        <Swatch c={T.ac} name="AtCoder" hex="#a78bfa" />
        <Swatch c={T.other} name="Other" hex="#8c94a3" />
      </Row>
    </FBoard>
  );
}

// ── BADGES ──────────────────────────────────────────────────────────────
function FoundationBadges() {
  return (
    <FBoard>
      <FLabel>Role badges — a tier ladder, earned not assigned</FLabel>
      <div style={{ display:'flex', alignItems:'flex-end', gap:14, marginBottom:8 }}>
        {['COMMUNITY','SQUAD_MEMBER','SQUAD_LEAD','ADMIN','SUPER_ADMIN'].map((r,i)=>(
          <div key={r} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:10 }}>
            <div style={{ height: 14+i*14, width:2, background:'linear-gradient(180deg,transparent,'+T.border+')' }} />
            <RoleBadge role={r} />
          </div>
        ))}
      </div>
      <div style={{ fontFamily:T.fM, fontSize:10.5, color:T.text3, marginTop:6 }}>flat → tinted → accent → bronze → radiant gold</div>

      <FLabel style={{ marginTop:36 }}>Squad badges</FLabel>
      <Row gap={12}>
        <SquadBadge squad="1st Squad" />
        <SquadBadge squad="2nd Squad" lead />
        <SquadBadge squad="3rd Squad" />
      </Row>

      <FLabel style={{ marginTop:36 }}>Platform badges</FLabel>
      <Row gap={12}>
        {['LEETCODE','CODEFORCES','ATCODER','OTHER'].map(p=><PlatformBadge key={p} p={p} full />)}
        <span style={{ width:20 }} />
        {['LEETCODE','CODEFORCES','ATCODER','OTHER'].map(p=><PlatformBadge key={p+'s'} p={p} />)}
      </Row>

      <FLabel style={{ marginTop:36 }}>Status & streak</FLabel>
      <Row gap={16}>
        <Verdict>Accepted</Verdict>
        <Verdict ok={false}>Wrong Answer</Verdict>
        <span style={{ display:'inline-flex', alignItems:'center', gap:6, color:T.gain, fontFamily:T.fD, fontWeight:600, fontSize:14 }}>▲ +47</span>
        <span style={{ display:'inline-flex', alignItems:'center', gap:6, color:T.loss, fontFamily:T.fD, fontWeight:600, fontSize:14 }}>▼ −12</span>
        <span style={{ width:16 }} />
        <Streak days={2} /><Streak days={14} />
        <span style={{ display:'inline-flex', alignItems:'center', gap:6, fontFamily:T.fD, fontWeight:600, fontSize:13, color:'#3a2c0f', background:T.warn, padding:'4px 10px', borderRadius:7, animation:'fa-pulse-ring 2s infinite' }}>UPSOLVE</span>
      </Row>
    </FBoard>
  );
}

// ── COMPONENTS ──────────────────────────────────────────────────────────
function Input({ label, value, ph, icon, mono }) {
  return (
    <div>
      {label && <div style={{ fontFamily:T.fD, fontSize:12, fontWeight:500, color:T.text2, marginBottom:7 }}>{label}</div>}
      <div style={{ display:'flex', alignItems:'center', gap:9, background:T.surface, border:'1px solid '+T.border,
        borderRadius:9, padding:'10px 13px' }}>
        {icon && <Icon name={icon} size={16} style={{ color:T.text3 }} />}
        <span style={{ fontFamily: mono?T.fM:T.fB, fontSize:13.5, color: value?T.text:T.text3 }}>{value||ph}</span>
      </div>
    </div>
  );
}
function FoundationComponents() {
  return (
    <FBoard>
      <FLabel>Buttons</FLabel>
      <Row gap={10}>
        <Btn kind="primary" iconR="arrow">Go to Dashboard</Btn>
        <Btn kind="accentGhost" icon="plus">Post Announcement</Btn>
        <Btn kind="solid" icon="filter">Filter</Btn>
        <Btn kind="ghost">Cancel</Btn>
        <Btn kind="danger" icon="ban">Ban user</Btn>
      </Row>
      <FLabel style={{ marginTop:30 }}>Inputs</FLabel>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, maxWidth:560 }}>
        <Input label="Email" value="abel@astu.edu.et" icon="mail" />
        <Input label="Codeforces handle" value="abel_t" mono icon="link" />
      </div>
      <FLabel style={{ marginTop:30 }}>Stat cards — distinct from content cards</FLabel>
      <Row gap={14} style={{ flexWrap:'nowrap' }}>
        <StatCard label="Problems" value="247" sub="+8 this week" accent={T.accent} icon="check" />
        <StatCard label="Streak" value="14" sub="days · personal best" accent={T.streak} icon="flame" />
        <StatCard label="CF Rating" value="1648" delta={47} accent={T.cf} icon="contests" />
      </Row>
      <FLabel style={{ marginTop:30 }}>Announcement cards — global vs squad-scoped</FLabel>
      <Row gap={14} style={{ flexWrap:'nowrap', alignItems:'stretch' }}>
        <AnnouncementCard scope="GLOBAL" title="Weekly Contest #14 is live" excerpt="Two-hour ICPC-style set. Standings sync from Codeforces automatically." author="Focus ASTU" when="2h ago" />
        <AnnouncementCard scope="SQUAD" title="2nd Squad — DP week starts Monday" excerpt="Finish the hashmap track before we move on. Editorials due Friday." author="Naol · Lead" when="5h ago" squad="2nd Squad" />
      </Row>
    </FBoard>
  );
}

// announcement card primitive (shared)
function AnnouncementCard({ scope, title, excerpt, author, when, squad, compact }) {
  const global = scope==='GLOBAL';
  return (
    <div style={{ flex:1, minWidth:0, background: global?T.surface2:'rgba(37,214,193,0.04)',
      border:'1px solid '+(global?T.border:T.accentLine), borderRadius:13, padding: compact?14:18,
      position:'relative', overflow:'hidden' }}>
      {!global && <div style={{ position:'absolute', left:0, top:0, bottom:0, width:3, background:T.accent }} />}
      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
        {global
          ? <span style={{ fontFamily:T.fM, fontSize:10, letterSpacing:1.5, color:T.text3, border:'1px solid '+T.border, borderRadius:5, padding:'2px 7px' }}>GLOBAL</span>
          : <SquadBadge squad={squad} size="sm" />}
        <span style={{ marginLeft:'auto', fontFamily:T.fM, fontSize:11, color:T.text3 }}>{when}</span>
      </div>
      <div style={{ fontFamily:T.fD, fontSize: compact?14:15.5, fontWeight:600, color:T.text, marginBottom:6, letterSpacing:-0.2 }}>{title}</div>
      <div style={{ fontFamily:T.fB, fontSize:13, color:T.text2, lineHeight:1.5 }}>{excerpt}</div>
      <div style={{ fontFamily:T.fM, fontSize:11, color:T.text3, marginTop:12 }}>{author}</div>
    </div>
  );
}

Object.assign(window, { FoundationType, FoundationColor, FoundationBadges, FoundationComponents, AnnouncementCard, FInput:Input });
