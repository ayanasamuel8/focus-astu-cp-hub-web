// screens/problems.jsx — filterable problem table + expandable submission accordion
const { useState: useStateP } = React;

const PROBLEMS = [
  { id:1, name:'Two Sum', p:'LEETCODE', ext:'two-sum', tags:['array','hashmap'], diff:'Easy', solvers:84, mine:true },
  { id:2, name:'Educational Round 168 — C. Tree Cutting', p:'CODEFORCES', ext:'2050C', tags:['dp','trees'], diff:'1500', solvers:41, mine:true, eds:2 },
  { id:3, name:'ABC 348 — D. Medicines on Grid', p:'ATCODER', ext:'abc348_d', tags:['graph','bfs'], diff:'400', solvers:29, mine:false },
  { id:4, name:'Longest Palindromic Substring', p:'LEETCODE', ext:'longest-palindromic-substring', tags:['string','dp'], diff:'Medium', solvers:67, mine:true, eds:1 },
  { id:5, name:'Watermelon', p:'CODEFORCES', ext:'4A', tags:['math','brute force'], diff:'800', solvers:120, mine:true },
  { id:6, name:'Minimum Spanning Tree (Kruskal)', p:'OTHER', ext:'mst-kruskal', tags:['graph','dsu','mst'], diff:'—', solvers:18, mine:false },
];

const SUBS_FOR = [
  { user:'Abel Tadesse', lang:'C++', when:'12m ago', rt:'4 ms', mine:true },
  { user:'Naol Kebede', lang:'C++', when:'1h ago', rt:'6 ms' },
  { user:'Sara Mekonnen', lang:'Python', when:'3h ago', rt:'52 ms' },
  { user:'Yonas Abebe', lang:'Java', when:'yesterday', rt:'9 ms' },
];

function Tag({ children }) {
  return <span style={{ fontFamily:T.fM, fontSize:10.5, color:T.text2, background:T.surface3,
    border:'1px solid '+T.border, borderRadius:5, padding:'2px 7px' }}>{children}</span>;
}
function FilterPill({ children, active, icon }) {
  return (
    <button style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'7px 12px', borderRadius:8, cursor:'pointer',
      fontFamily:T.fD, fontSize:12.5, fontWeight:500,
      color: active?'#04201d':T.text2, background: active?T.accent:T.surface2,
      border:'1px solid '+(active?T.accent:T.border) }}>
      {icon && <Icon name={icon} size={14} />}{children}
    </button>
  );
}

function ProblemRow({ pr, open, onToggle }) {
  return (
    <div style={{ borderTop:'1px solid '+T.borderSoft, background: open?'rgba(37,214,193,0.03)':'transparent' }}>
      <div onClick={onToggle} style={{ display:'flex', alignItems:'center', gap:14, padding:'13px 18px', cursor:'pointer' }}>
        <div style={{ width:20, display:'grid', placeItems:'center' }}>
          {pr.mine
            ? <span style={{ width:18, height:18, borderRadius:5, background:'rgba(69,212,131,0.15)', display:'grid', placeItems:'center' }}><Icon name="check" size={13} style={{ color:T.gain }} /></span>
            : <span style={{ width:16, height:16, borderRadius:5, border:'1.5px solid '+T.border }} />}
        </div>
        <PlatformBadge p={pr.p} size="sm" />
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontFamily:T.fD, fontSize:14, fontWeight:500, color:T.text, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{pr.name}</div>
          <div className="mono" style={{ fontSize:10.5, color:T.text3, marginTop:2 }}>{pr.ext}</div>
        </div>
        <div style={{ display:'flex', gap:6 }}>{pr.tags.map(t=><Tag key={t}>{t}</Tag>)}</div>
        <span className="mono" style={{ fontSize:11.5, color:T.text2, width:54, textAlign:'center' }}>{pr.diff}</span>
        <span style={{ fontFamily:T.fM, fontSize:11.5, color:T.text2, width:84, textAlign:'right' }}>{pr.solvers} solved</span>
        {pr.eds ? <span style={{ fontFamily:T.fM, fontSize:10.5, color:T.accentText, display:'inline-flex', alignItems:'center', gap:4, width:74, justifyContent:'flex-end' }}><Icon name="book" size={12} />{pr.eds} ed.</span> : <span style={{ width:74 }} />}
        <Icon name="chevronD" size={16} style={{ color:T.text3, transform: open?'rotate(180deg)':'none', transition:'transform .2s' }} />
      </div>
      {open && (
        <div style={{ padding:'2px 18px 18px 52px' }}>
          <div style={{ background:T.surface, border:'1px solid '+T.border, borderRadius:11, overflow:'hidden' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 14px', borderBottom:'1px solid '+T.borderSoft }}>
              <span style={{ fontFamily:T.fM, fontSize:11, letterSpacing:1.5, textTransform:'uppercase', color:T.text3 }}>{SUBS_FOR.length} accepted submissions</span>
              <a style={{ fontFamily:T.fD, fontSize:12, fontWeight:600, color:T.accentText, display:'inline-flex', alignItems:'center', gap:5, cursor:'pointer' }}>Open problem <Icon name="external" size={12} /></a>
            </div>
            {SUBS_FOR.map((s,i)=>(
              <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 14px', borderTop: i?'1px solid '+T.borderSoft:'none',
                background: s.mine?'rgba(37,214,193,0.04)':'transparent' }}>
                <Avatar name={s.user} size={26} />
                <span style={{ fontFamily:T.fD, fontSize:13, fontWeight:500, color:T.text }}>{s.user}{s.mine && <span style={{ color:T.accentText, fontWeight:400 }}> · you</span>}</span>
                <Verdict>AC</Verdict>
                <span className="mono" style={{ fontSize:11, color:T.text2, marginLeft:'auto' }}>{s.lang}</span>
                <span className="mono" style={{ fontSize:11, color:T.text3, width:48, textAlign:'right' }}>{s.rt}</span>
                <span style={{ fontFamily:T.fM, fontSize:10.5, color:T.text3, width:78, textAlign:'right' }}>{s.when}</span>
                <Btn kind="solid" size="sm" icon="problems">View code</Btn>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ScreenProblems() {
  const [open, setOpen] = useStateP(2);
  const user = ME;
  return (
    <AppShell active="problems" role={user.role} user={user}
      header={<AppHeader title="Problems" crumbs="Hub / Problems" role={user.role} user={user}
        right={<Btn kind="accentGhost" size="sm" icon="plus">Log a solve</Btn>} />}>
      {/* filters */}
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:18, flexWrap:'wrap' }}>
        <div style={{ display:'flex', alignItems:'center', gap:9, background:T.surface, border:'1px solid '+T.border,
          borderRadius:9, padding:'9px 13px', width:280 }}>
          <Icon name="search" size={16} style={{ color:T.text3 }} />
          <span style={{ fontFamily:T.fB, fontSize:13, color:T.text3 }}>Search problems or tags…</span>
        </div>
        <span style={{ width:1, height:24, background:T.border }} />
        <FilterPill active>All</FilterPill>
        <FilterPill>LeetCode</FilterPill>
        <FilterPill>Codeforces</FilterPill>
        <FilterPill>AtCoder</FilterPill>
        <FilterPill>Other</FilterPill>
        <span style={{ flex:1 }} />
        <FilterPill icon="filter">Tags</FilterPill>
        <FilterPill icon="check">Unsolved</FilterPill>
      </div>

      <Card pad={0} style={{ overflow:'hidden' }}>
        {/* header row */}
        <div style={{ display:'flex', alignItems:'center', gap:14, padding:'10px 18px', background:T.surface3 }}>
          <span style={{ width:20 }} /><span style={{ width:52 }} />
          <span style={{ flex:1, fontFamily:T.fM, fontSize:10.5, letterSpacing:1.5, textTransform:'uppercase', color:T.text3 }}>Problem</span>
          <span style={{ fontFamily:T.fM, fontSize:10.5, letterSpacing:1.5, textTransform:'uppercase', color:T.text3 }}>Tags</span>
          <span style={{ width:54, textAlign:'center', fontFamily:T.fM, fontSize:10.5, letterSpacing:1, textTransform:'uppercase', color:T.text3 }}>Diff</span>
          <span style={{ width:84, textAlign:'right', fontFamily:T.fM, fontSize:10.5, letterSpacing:1, textTransform:'uppercase', color:T.text3 }}>Solvers</span>
          <span style={{ width:74 }} /><span style={{ width:16 }} />
        </div>
        {PROBLEMS.map(pr=><ProblemRow key={pr.id} pr={pr} open={open===pr.id} onToggle={()=>setOpen(open===pr.id?null:pr.id)} />)}
      </Card>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:16, fontFamily:T.fM, fontSize:11.5, color:T.text3 }}>
        <span>Showing 6 of 412 problems</span>
        <div style={{ display:'flex', gap:8 }}><Btn kind="ghost" size="sm">Prev</Btn><Btn kind="solid" size="sm">Next</Btn></div>
      </div>
    </AppShell>
  );
}

Object.assign(window, { ScreenProblems, PROBLEMS });
