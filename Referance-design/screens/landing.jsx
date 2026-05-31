// screens/landing.jsx — public landing page + hero/verse composition variants
const VERSE = {
  text: 'Whatever you do, work at it with all your heart, as working for the Lord, and not for human masters.',
  ref: 'Colossians 3:23',
};
const LAND_ANN = [
  { scope:'GLOBAL', title:'Weekly Contest #14 standings are live', excerpt:'128 members rated. Codeforces deltas synced — check where your squad landed.', author:'Focus ASTU', when:'2h ago' },
  { scope:'GLOBAL', title:'New invite cohort: 4th Squad opens applications', excerpt:'Squad Leads finalize curriculum tracks this week. Invitations roll out Monday.', author:'Admin', when:'1d ago' },
  { scope:'GLOBAL', title:'Browser extension v1.2 — AtCoder manual logging', excerpt:'LeetCode & Codeforces stay auto-captured. AtCoder now has a faster manual flow.', author:'Focus ASTU', when:'3d ago' },
];
const STATS = [['142','Members'],['18,400','Problems solved'],['26','Contests run']];

function Stars() {
  // subtle starfield via radial dots
  const dots = Array.from({length:40}, (_,i)=>({ x:(i*97)%100, y:(i*53)%100, s:(i%3)+1, o:0.12+(i%4)*0.06 }));
  return (
    <svg width="100%" height="100%" style={{ position:'absolute', inset:0, pointerEvents:'none' }} preserveAspectRatio="none">
      {dots.map((d,i)=>(<circle key={i} cx={d.x+'%'} cy={d.y+'%'} r={d.s*0.8} fill="#25d6c1" opacity={d.o} />))}
    </svg>
  );
}

function VerseBand({ kind }) {
  // kind: 'band' | 'card' | 'hero'
  if (kind==='card') return (
    <div style={{ background:'linear-gradient(150deg,#10171b,#0b0f14)', border:'1px solid '+T.accentLine,
      borderRadius:18, padding:'34px 36px', position:'relative', overflow:'hidden',
      boxShadow:'inset 0 0 60px rgba(37,214,193,0.06)' }}>
      <div style={{ position:'absolute', top:-30, right:-20, fontFamily:T.fS, fontSize:200, color:'rgba(37,214,193,0.05)', lineHeight:1 }}>”</div>
      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:18 }}>
        <Icon name="verse" size={16} style={{ color:T.accent }} />
        <span style={{ fontFamily:T.fM, fontSize:11, letterSpacing:2.5, textTransform:'uppercase', color:T.accentText }}>Verse of the day</span>
      </div>
      <div style={{ fontFamily:T.fS, fontStyle:'italic', fontWeight:500, fontSize:23, lineHeight:1.5, color:T.text, position:'relative' }}>{VERSE.text}</div>
      <div style={{ fontFamily:T.fD, fontSize:14, fontWeight:600, color:T.accentText, marginTop:18, letterSpacing:0.5 }}>— {VERSE.ref}</div>
    </div>
  );
  // band (full-width quiet)
  return (
    <div style={{ borderTop:'1px solid '+T.borderSoft, borderBottom:'1px solid '+T.borderSoft,
      background:'radial-gradient(120% 140% at 50% 0%, rgba(37,214,193,0.05), transparent 60%)',
      padding:'58px 48px', textAlign:'center', position:'relative' }}>
      <div style={{ display:'inline-flex', alignItems:'center', gap:8, marginBottom:22 }}>
        <span style={{ width:34, height:1, background:T.accentLine }} />
        <span style={{ fontFamily:T.fM, fontSize:11, letterSpacing:3, textTransform:'uppercase', color:T.accentText }}>Verse of the day</span>
        <span style={{ width:34, height:1, background:T.accentLine }} />
      </div>
      <div style={{ fontFamily:T.fS, fontStyle:'italic', fontWeight:500, fontSize:34, lineHeight:1.45, color:T.text, maxWidth:860, margin:'0 auto', letterSpacing:-0.3 }}>“{VERSE.text}”</div>
      <div style={{ fontFamily:T.fD, fontSize:15, fontWeight:600, color:T.accentText, marginTop:24, letterSpacing:0.5 }}>{VERSE.ref}</div>
    </div>
  );
}

function HeroCodeGlyph() {
  return (
    <div style={{ background:'#0c0f14', border:'1px solid '+T.border, borderRadius:14, overflow:'hidden',
      boxShadow:'0 30px 80px rgba(0,0,0,0.5)' }}>
      <div style={{ display:'flex', alignItems:'center', gap:7, padding:'9px 13px', borderBottom:'1px solid '+T.border }}>
        {['#ff5f56','#ffbd2e','#27c93f'].map(c=><span key={c} style={{ width:9, height:9, borderRadius:5, background:c, opacity:0.8 }} />)}
        <span className="mono" style={{ fontSize:11, color:T.text3, marginLeft:6 }}>streak.cpp</span>
      </div>
      <CodeBlock theme="focus" fontSize={12} code={`// 14-day streak · keep it alive
while (today) {
    solve(problem);     // +1
    if (accepted) {
        streak++;
        push(squad.feed);
    }
}`} />
    </div>
  );
}

// hero block, layout varies by variant
function Hero({ variant }) {
  const heading = (
    <h1 style={{ margin:0, fontFamily:T.fD, fontWeight:700, fontSize:variant==='split'?54:64, lineHeight:1.02,
      letterSpacing:-2, color:T.text }}>
      Where ASTU<br/>learns to <span style={{ color:T.accent }}>solve</span><span className="fa-caret" />
    </h1>
  );
  const tagline = (
    <p style={{ fontFamily:T.fB, fontSize:17, lineHeight:1.6, color:T.text2, maxWidth:480, margin:'22px 0 0' }}>
      A private, invite-only competitive programming hub for the Focus ASTU community — track every solve, run internal contests, and grow through squad-led curriculum.
    </p>
  );
  const ctas = (
    <Row gap={12} style={{ marginTop:30 }}>
      <Btn kind="primary" size="lg" iconR="arrow">Go to Dashboard</Btn>
      <Btn kind="ghost" size="lg">View Announcements</Btn>
    </Row>
  );

  if (variant==='split') return (
    <div style={{ display:'grid', gridTemplateColumns:'1.1fr 0.9fr', gap:48, alignItems:'center', padding:'72px 48px 64px' }}>
      <div><Kicker color={T.accentText} style={{ marginBottom:18 }}>Adama Science &amp; Technology University</Kicker>{heading}{tagline}{ctas}</div>
      <VerseBand kind="card" />
    </div>
  );
  // centered hero (band variant + featured variant share this)
  return (
    <div style={{ textAlign:'center', padding:'80px 48px 56px', position:'relative' }}>
      <Stars />
      <div style={{ position:'relative' }}>
        <Kicker color={T.accentText} style={{ marginBottom:20 }}>Adama Science &amp; Technology University</Kicker>
        <h1 style={{ margin:'0 auto', fontFamily:T.fD, fontWeight:700, fontSize:72, lineHeight:1.0, letterSpacing:-2.5, color:T.text, maxWidth:760 }}>
          Where ASTU learns to <span style={{ color:T.accent }}>solve</span>
        </h1>
        <p style={{ fontFamily:T.fB, fontSize:18, lineHeight:1.6, color:T.text2, maxWidth:600, margin:'24px auto 0' }}>
          A private, invite-only competitive programming hub — track every solve, run internal contests, and grow through squad-led curriculum.
        </p>
        <Row gap={12} style={{ marginTop:32, justifyContent:'center' }}>
          <Btn kind="primary" size="lg" iconR="arrow">Go to Dashboard</Btn>
          <Btn kind="ghost" size="lg">View Announcements</Btn>
        </Row>
      </div>
    </div>
  );
}

function StatsStrip() {
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', borderTop:'1px solid '+T.border,
      borderBottom:'1px solid '+T.border }}>
      {STATS.map(([v,l],i)=>(
        <div key={l} style={{ padding:'34px 28px', textAlign:'center', borderLeft: i?'1px solid '+T.border:'none' }}>
          <div className="disp num" style={{ fontSize:44, fontWeight:600, color:T.text, letterSpacing:-1 }}>{v}</div>
          <div style={{ fontFamily:T.fM, fontSize:12, letterSpacing:2, textTransform:'uppercase', color:T.text3, marginTop:8 }}>{l}</div>
        </div>
      ))}
    </div>
  );
}

function AnnFeed() {
  return (
    <div style={{ padding:'56px 48px 64px' }}>
      <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:26 }}>
        <div>
          <Kicker style={{ marginBottom:8 }}>From the community</Kicker>
          <h2 style={{ margin:0, fontFamily:T.fD, fontSize:28, fontWeight:600, color:T.text, letterSpacing:-0.5 }}>Global announcements</h2>
        </div>
        <Btn kind="ghost" size="sm" iconR="arrow">All announcements</Btn>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
        {LAND_ANN.map((a,i)=><AnnouncementCard key={i} {...a} />)}
      </div>
    </div>
  );
}

function LandingFooter() {
  return (
    <div style={{ borderTop:'1px solid '+T.border, padding:'30px 48px', display:'flex', alignItems:'center', gap:20 }}>
      <Logo size={17} />
      <span style={{ fontFamily:T.fB, fontSize:12.5, color:T.text3 }}>Focus ASTU Competitive Programming Community · Adama, Ethiopia</span>
      <span style={{ marginLeft:'auto', fontFamily:T.fM, fontSize:11, color:T.text3 }}>Invite-only · {new Date().getFullYear()}</span>
    </div>
  );
}

// composition variants
function LandingPage({ variant='band' }) {
  return (
    <div className="fa-app" style={{ background:T.bg, minHeight:'100%', position:'relative' }}>
      <FlameDef />
      <div style={{ position:'absolute', top:0, left:0, right:0, height:520,
        background:'radial-gradient(80% 90% at 50% -10%, rgba(37,214,193,0.10), transparent 65%)', pointerEvents:'none' }} />
      <LandingNav />
      <div style={{ position:'relative' }}>
        {variant==='split' ? (
          <><Hero variant="split" /><StatsStrip /></>
        ) : variant==='featured' ? (
          <><Hero variant="center" />
            <div style={{ padding:'0 48px 8px' }}><VerseBand kind="card" /></div>
            <StatsStrip /></>
        ) : (
          <><Hero variant="center" /><VerseBand kind="band" /><StatsStrip /></>
        )}
        <AnnFeed />
        <LandingFooter />
      </div>
    </div>
  );
}

Object.assign(window, { LandingPage, VerseBand, VERSE });
