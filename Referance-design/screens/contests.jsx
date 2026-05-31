// screens/contests.jsx — contest list, detail standings, upsolve-urgency variants
const { useState: useStateC } = React;

const CONTESTS = [
  { id:1, name:'Focus Weekly Contest #14', ext:'2050', when:'Apr 14, 2026', parts:128, rank:7, delta:47, live:false },
  { id:2, name:'Educational Codeforces Round 168', ext:'2048', when:'Apr 7, 2026', parts:96, rank:12, delta:21 },
  { id:3, name:'2nd Squad Scrimmage #3', ext:'sq2-3', when:'Mar 30, 2026', parts:42, rank:3, delta:0, squad:'2nd Squad' },
  { id:4, name:'Focus Weekly Contest #13', ext:'2039', when:'Mar 24, 2026', parts:117, rank:19, delta:-12 },
];

const PROBS = ['A','B','C','D','E','F'];
// status: 'ac' solved in contest, 'up' upsolved after, 'todo' needs upsolve, '' not attempted
const STANDINGS = [
  { rank:1, name:'Yonas Abebe', squad:'1st Squad', solved:5, pen:412, oldR:1832, newR:1903, cells:['ac','ac','ac','ac','ac','todo'] },
  { rank:2, name:'Sara Mekonnen', squad:'1st Squad', solved:5, pen:498, oldR:1788, newR:1841, cells:['ac','ac','ac','ac','ac',''] },
  { rank:3, name:'Dawit Lemma', squad:'3rd Squad', solved:4, pen:301, oldR:1654, newR:1702, cells:['ac','ac','ac','ac','up','todo'] },
  { rank:7, name:'Abel Tadesse', squad:'2nd Squad', me:true, solved:4, pen:356, oldR:1601, newR:1648, cells:['ac','ac','ac','ac','todo','todo'] },
  { rank:9, name:'Naol Kebede', squad:'2nd Squad', solved:3, pen:289, oldR:1577, newR:1561, cells:['ac','ac','ac','up','todo',''] },
];

function ContestCard({ c }) {
  const me = ME;
  return (
    <div style={{ display:'flex', alignItems:'center', gap:18, padding:'16px 20px', background:T.surface2,
      border:'1px solid '+T.border, borderRadius:13, cursor:'pointer' }}>
      <div style={{ width:46, height:46, borderRadius:11, display:'grid', placeItems:'center',
        background:c.squad?'rgba(167,139,250,0.12)':T.accentGhost, color:c.squad?T.ac:T.accent }}>
        <Icon name="trophy" size={22} />
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:9 }}>
          <span style={{ fontFamily:T.fD, fontSize:15.5, fontWeight:600, color:T.text }}>{c.name}</span>
          {c.squad && <SquadBadge squad={c.squad} size="sm" />}
        </div>
        <div style={{ display:'flex', gap:16, marginTop:5, fontFamily:T.fM, fontSize:11.5, color:T.text3 }}>
          <span><Icon name="clock" size={11} style={{ verticalAlign:-1, marginRight:4 }} />{c.when}</span>
          <span>{c.parts} participants</span>
          <span>CF #{c.ext}</span>
        </div>
      </div>
      <div style={{ textAlign:'right' }}>
        <div className="disp" style={{ fontSize:20, fontWeight:600, color:T.text }}>#{c.rank}</div>
        <div className="mono" style={{ fontSize:12, fontWeight:600, color: c.delta>0?T.gain:c.delta<0?T.loss:T.text3 }}>
          {c.delta>0?'▲ +':c.delta<0?'▼ ':'± '}{c.delta!==0?Math.abs(c.delta):'0'}</div>
      </div>
      <Icon name="chevron" size={18} style={{ color:T.text3 }} />
    </div>
  );
}

function ScreenContests() {
  const user = ME;
  return (
    <AppShell active="contests" role={user.role} user={user}
      header={<AppHeader title="Contests" crumbs="Hub / Contests" role={user.role} user={user}
        right={user.role==='SQUAD_LEAD'||user.role==='ADMIN'||user.role==='SUPER_ADMIN' ? <Btn kind="accentGhost" size="sm" icon="plus">Sync CF contest</Btn> : null} />}>
      <div style={{ maxWidth:980, margin:'0 auto' }}>
        <div style={{ display:'flex', gap:14, marginBottom:22 }}>
          <StatCard label="Contests run" value="26" sub="all squads" accent={T.accent} icon="trophy" />
          <StatCard label="Your best rank" value="#3" sub="Scrimmage #3" accent={T.ac} icon="contests" />
          <StatCard label="Awaiting upsolve" value="2" sub="from last round" accent={T.warn} icon="bolt" />
        </div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
          <h2 style={{ margin:0, fontFamily:T.fD, fontSize:16, fontWeight:600, color:T.text }}>Synced contests</h2>
          <div style={{ display:'flex', gap:6 }}><FilterPill active>All</FilterPill><FilterPill>Squad</FilterPill><FilterPill>Global</FilterPill></div>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {CONTESTS.map(c=><ContestCard key={c.id} c={c} />)}
        </div>
      </div>
    </AppShell>
  );
}

// problem status cell
function Cell({ s }) {
  if (s==='ac') return <span style={{ display:'inline-grid', placeItems:'center', width:30, height:30, borderRadius:7, background:'rgba(69,212,131,0.14)', color:T.gain }}><Icon name="check" size={15} /></span>;
  if (s==='up') return <span style={{ display:'inline-grid', placeItems:'center', width:30, height:30, borderRadius:7, background:T.accentGhost, color:T.accentText, fontFamily:T.fM, fontSize:11, fontWeight:600 }}>↑</span>;
  if (s==='todo') return <span style={{ display:'inline-grid', placeItems:'center', width:30, height:30, borderRadius:7, background:T.warnGhost, color:T.warn, border:'1px solid rgba(243,181,60,0.4)', animation:'fa-pulse-ring 2.2s infinite' }}><Icon name="bolt" size={14} fill={T.warn} /></span>;
  return <span style={{ display:'inline-grid', placeItems:'center', width:30, height:30, borderRadius:7, background:T.surface, color:T.text3, fontFamily:T.fM, fontSize:12 }}>·</span>;
}

function ScreenContestDetail() {
  const [view, setView] = useStateC('standings');
  const user = ME;
  return (
    <AppShell active="contests" role={user.role} user={user} scroll={true}
      header={<AppHeader title="Focus Weekly Contest #14" crumbs="Contests / #14" role={user.role} user={user}
        right={<Btn kind="ghost" size="sm" iconR="external">View on Codeforces</Btn>} />}>
      <div style={{ maxWidth:1080, margin:'0 auto' }}>
        {/* meta */}
        <div style={{ display:'flex', gap:14, marginBottom:20 }}>
          <StatCard label="Held" value="Apr 14" sub="2026 · 2h 00m" accent={T.accent} icon="clock" />
          <StatCard label="Participants" value="128" sub="across 4 squads" accent={T.ac} icon="profile" />
          <StatCard label="Your rank" value="#7" delta={47} sub="1601 → 1648" accent={T.cf} icon="trophy" />
          <StatCard label="Synced" value="4m" sub="ago · auto" accent={T.text2} icon="bolt" />
        </div>

        {/* toggle */}
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14 }}>
          <div style={{ display:'flex', gap:4, background:T.surface2, padding:4, borderRadius:10, border:'1px solid '+T.border }}>
            {[['standings','Full standings'],['upsolve','My upsolve queue']].map(([k,l])=>(
              <button key={k} onClick={()=>setView(k)} style={{ padding:'8px 14px', borderRadius:7, border:'none', cursor:'pointer',
                fontFamily:T.fD, fontSize:12.5, fontWeight:600, color: view===k?'#04201d':T.text2, background: view===k?T.accent:'transparent' }}>{l}</button>
            ))}
          </div>
          <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:14, fontFamily:T.fM, fontSize:11, color:T.text3 }}>
            <Legend c={T.gain} label="solved" /><Legend c={T.accentText} label="upsolved" /><Legend c={T.warn} label="needs upsolve" pulse />
          </div>
        </div>

        {view==='standings' ? (
          <Card pad={0} style={{ overflow:'hidden' }}>
            <div style={{ display:'flex', alignItems:'center', gap:14, padding:'10px 18px', background:T.surface3 }}>
              <span style={{ width:34, fontFamily:T.fM, fontSize:10.5, letterSpacing:1, color:T.text3 }}>#</span>
              <span style={{ flex:1, fontFamily:T.fM, fontSize:10.5, letterSpacing:1.5, textTransform:'uppercase', color:T.text3 }}>Participant</span>
              {PROBS.map(p=><span key={p} style={{ width:30, textAlign:'center', fontFamily:T.fM, fontSize:11, fontWeight:600, color:T.text3 }}>{p}</span>)}
              <span style={{ width:50, textAlign:'right', fontFamily:T.fM, fontSize:10.5, letterSpacing:1, color:T.text3 }}>Pen</span>
              <span style={{ width:120, textAlign:'right', fontFamily:T.fM, fontSize:10.5, letterSpacing:1, textTransform:'uppercase', color:T.text3 }}>Rating Δ</span>
            </div>
            {STANDINGS.map((s,i)=>(
              <div key={i} style={{ display:'flex', alignItems:'center', gap:14, padding:'11px 18px', borderTop:'1px solid '+T.borderSoft,
                background: s.me?'rgba(37,214,193,0.05)':'transparent' }}>
                <span className="disp" style={{ width:34, fontSize:15, fontWeight:600, color: s.rank<=3?T.warn:T.text2 }}>{s.rank}</span>
                <div style={{ flex:1, display:'flex', alignItems:'center', gap:10, minWidth:0 }}>
                  <Avatar name={s.name} size={28} ring={s.me} />
                  <div style={{ minWidth:0 }}>
                    <div style={{ fontFamily:T.fD, fontSize:13.5, fontWeight:500, color:T.text }}>{s.name}{s.me && <span style={{ color:T.accentText }}> · you</span>}</div>
                    <div style={{ fontFamily:T.fM, fontSize:10, color:T.text3 }}>{s.squad}</div>
                  </div>
                </div>
                {s.cells.map((c,j)=><span key={j} style={{ width:30, display:'grid', placeItems:'center' }}><Cell s={c} /></span>)}
                <span className="mono" style={{ width:50, textAlign:'right', fontSize:12, color:T.text2 }}>{s.pen}</span>
                <span style={{ width:120, textAlign:'right', display:'flex', justifyContent:'flex-end', alignItems:'center', gap:8 }}>
                  <span className="mono" style={{ fontSize:11.5, color:T.text3 }}>{s.oldR}→{s.newR}</span>
                  <span className="mono" style={{ fontSize:12.5, fontWeight:600, color: s.newR>=s.oldR?T.gain:T.loss }}>{s.newR>=s.oldR?'▲'+(s.newR-s.oldR):'▼'+(s.oldR-s.newR)}</span>
                </span>
              </div>
            ))}
          </Card>
        ) : (
          <div>
            <div style={{ fontFamily:T.fB, fontSize:13.5, color:T.text2, marginBottom:14 }}>You solved <strong style={{ color:T.text }}>4 of 6</strong>. Two problems are still open — upsolving keeps your streak honest.</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
              <UpsolveCard letter="E" name="Tree Cutting" diff="1900" />
              <UpsolveCard letter="F" name="Palindromic Subsequences" diff="2100" />
            </div>
            <div style={{ marginTop:14, opacity:0.8 }}>
              <div style={{ fontFamily:T.fM, fontSize:10.5, letterSpacing:1.5, textTransform:'uppercase', color:T.text3, marginBottom:10 }}>Already cleared</div>
              <div style={{ display:'flex', gap:10 }}>
                {['A · Watermelon','B · Prefix Sums','C · Two Pointers','D · Medicines'].map(x=>(
                  <span key={x} style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 12px', borderRadius:9, background:T.surface2, border:'1px solid '+T.border, fontFamily:T.fD, fontSize:12.5, color:T.text2 }}>
                    <Icon name="check" size={13} style={{ color:T.gain }} />{x}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

function Legend({ c, label, pulse }) {
  return <span style={{ display:'inline-flex', alignItems:'center', gap:6 }}>
    <span style={{ width:9, height:9, borderRadius:3, background:c, animation: pulse?'fa-pulse-ring 2.2s infinite':'none' }} />{label}</span>;
}

function UpsolveCard({ letter, name, diff }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:14, padding:'16px 18px', borderRadius:13,
      background:'rgba(243,181,60,0.07)', border:'1px solid rgba(243,181,60,0.4)', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', left:0, top:0, bottom:0, width:3, background:T.warn }} />
      <div style={{ width:42, height:42, borderRadius:10, display:'grid', placeItems:'center', background:T.warnGhost,
        color:T.warn, fontFamily:T.fD, fontSize:18, fontWeight:700, animation:'fa-pulse-ring 2.2s infinite' }}>{letter}</div>
      <div style={{ flex:1 }}>
        <div style={{ fontFamily:T.fD, fontSize:14.5, fontWeight:600, color:T.text }}>{name}</div>
        <div style={{ fontFamily:T.fM, fontSize:11, color:T.warn, marginTop:3 }}>NEEDS UPSOLVE · rated {diff}</div>
      </div>
      <Btn kind="solid" size="sm" iconR="arrow">Solve now</Btn>
    </div>
  );
}

// ── Upsolve urgency variation board ─────────────────────────────────────
function UpsolveVariant({ variant }) {
  return (
    <div className="fa-app" style={{ background:T.bg, minHeight:'100%', padding:34 }}>
      <FlameDef />
      <div style={{ fontFamily:T.fM, fontSize:11, letterSpacing:2, textTransform:'uppercase', color:T.text3, marginBottom:6 }}>Unsolved contest problem</div>
      <div style={{ fontFamily:T.fS, fontStyle:'italic', fontSize:14, color:T.text3, marginBottom:26 }}>How urgently should an open problem nudge you?</div>

      {variant==='pulse' && (
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <Row3 done letter="C" name="Two Pointers" />
          <div style={{ display:'flex', alignItems:'center', gap:14, padding:'16px 18px', borderRadius:13, background:T.surface2, border:'1px solid '+T.border }}>
            <div style={{ width:42, height:42, borderRadius:10, display:'grid', placeItems:'center', background:T.warnGhost, color:T.warn, fontFamily:T.fD, fontSize:18, fontWeight:700, animation:'fa-pulse-ring 1.8s infinite' }}>E</div>
            <div style={{ flex:1 }}><div style={{ fontFamily:T.fD, fontSize:14.5, fontWeight:600, color:T.text }}>Tree Cutting</div>
              <div style={{ fontFamily:T.fM, fontSize:11, color:T.warn, marginTop:3 }}>NEEDS UPSOLVE</div></div>
            <Btn kind="solid" size="sm" iconR="arrow">Solve</Btn>
          </div>
          <p style={{ fontFamily:T.fB, fontSize:12.5, color:T.text3, margin:'6px 0 0' }}>A pulsing ring on the problem letter. Quiet but alive — the eye keeps returning to it.</p>
        </div>
      )}

      {variant==='stripe' && (
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <Row3 done letter="C" name="Two Pointers" />
          <div style={{ display:'flex', alignItems:'center', gap:14, padding:'16px 18px', borderRadius:13, position:'relative', overflow:'hidden',
            background:'rgba(243,181,60,0.07)', border:'1px solid rgba(243,181,60,0.45)' }}>
            <div style={{ position:'absolute', inset:0, backgroundImage:'repeating-linear-gradient(45deg, rgba(243,181,60,0.08) 0 10px, transparent 10px 20px)' }} />
            <div style={{ width:42, height:42, borderRadius:10, display:'grid', placeItems:'center', background:T.warn, color:'#3a2c0f', fontFamily:T.fD, fontSize:18, fontWeight:700, position:'relative' }}>E</div>
            <div style={{ flex:1, position:'relative' }}><div style={{ fontFamily:T.fD, fontSize:14.5, fontWeight:600, color:T.text }}>Tree Cutting</div>
              <div style={{ fontFamily:T.fM, fontSize:11, color:T.warn, marginTop:3 }}>NEEDS UPSOLVE</div></div>
            <Btn kind="solid" size="sm" iconR="arrow">Solve</Btn>
          </div>
          <p style={{ fontFamily:T.fB, fontSize:12.5, color:T.text3, margin:'6px 0 0' }}>Hazard-stripe background. Reads as a clear “open item” without motion — good for reduced-motion users.</p>
        </div>
      )}

      {variant==='glow' && (
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <Row3 done letter="C" name="Two Pointers" />
          <div style={{ display:'flex', alignItems:'center', gap:14, padding:'16px 18px', borderRadius:13,
            background:'rgba(243,181,60,0.08)', border:'1px solid rgba(243,181,60,0.5)', boxShadow:'0 0 24px rgba(243,181,60,0.22)' }}>
            <div style={{ width:42, height:42, borderRadius:10, display:'grid', placeItems:'center', background:T.warnGhost, color:T.warn, fontFamily:T.fD, fontSize:18, fontWeight:700, boxShadow:'0 0 16px rgba(243,181,60,0.5)' }}>E</div>
            <div style={{ flex:1 }}><div style={{ fontFamily:T.fD, fontSize:14.5, fontWeight:600, color:T.text }}>Tree Cutting</div>
              <div style={{ fontFamily:T.fM, fontSize:11, color:T.warn, marginTop:3 }}>NEEDS UPSOLVE</div></div>
            <Btn kind="solid" size="sm" iconR="arrow">Solve</Btn>
          </div>
          <p style={{ fontFamily:T.fB, fontSize:12.5, color:T.text3, margin:'6px 0 0' }}>A warm outer glow lifts the whole row off the surface. Most prominent — best when upsolves are rare.</p>
        </div>
      )}
    </div>
  );
}
function Row3({ done, letter, name }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:14, padding:'16px 18px', borderRadius:13, background:T.surface2, border:'1px solid '+T.border, opacity:0.7 }}>
      <div style={{ width:42, height:42, borderRadius:10, display:'grid', placeItems:'center', background:'rgba(69,212,131,0.14)', color:T.gain }}><Icon name="check" size={18} /></div>
      <div style={{ flex:1 }}><div style={{ fontFamily:T.fD, fontSize:14.5, fontWeight:600, color:T.text }}>{name}</div>
        <div style={{ fontFamily:T.fM, fontSize:11, color:T.gain, marginTop:3 }}>SOLVED IN CONTEST</div></div>
    </div>
  );
}

Object.assign(window, { ScreenContests, ScreenContestDetail, UpsolveVariant });
