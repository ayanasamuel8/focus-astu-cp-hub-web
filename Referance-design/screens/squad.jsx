// screens/squad.jsx — curriculum tree: Track → Topic → Problem (expandable)
const { useState: useStateSq } = React;

const CURRICULUM = [
  { id:'t1', title:'Python Foundations', done:18, total:24, topics:[
    { id:'tp1', title:'Arrays & Hashing', done:6, total:6, problems:[
      { name:'Two Sum', p:'LEETCODE', solved:true }, { name:'Group Anagrams', p:'LEETCODE', solved:true },
      { name:'Top K Frequent', p:'LEETCODE', solved:true }, { name:'Watermelon', p:'CODEFORCES', solved:true } ] },
    { id:'tp2', title:'Two Pointers', done:4, total:5, problems:[
      { name:'Valid Palindrome', p:'LEETCODE', solved:true }, { name:'3Sum', p:'LEETCODE', solved:false },
      { name:'Container With Most Water', p:'LEETCODE', solved:true } ] },
    { id:'tp3', title:'Sliding Window', done:3, total:6, problems:[] },
  ]},
  { id:'t2', title:'Graph Algorithms', done:7, total:20, topics:[
    { id:'tp4', title:'BFS / DFS', done:5, total:8, problems:[
      { name:'Number of Islands', p:'LEETCODE', solved:true }, { name:'ABC 348 D — Grid', p:'ATCODER', solved:false } ] },
    { id:'tp5', title:'Shortest Paths', done:2, total:7, problems:[] },
  ]},
  { id:'t3', title:'Dynamic Programming', done:0, total:16, topics:[
    { id:'tp6', title:'1D DP', done:0, total:8, problems:[] },
    { id:'tp7', title:'Grid DP', done:0, total:8, problems:[] },
  ]},
];

const SQUAD_ROSTER = [
  { name:'Naol Kebede', role:'SQUAD_LEAD', solved:312 },
  { name:'Abel Tadesse', role:'SQUAD_MEMBER', solved:247, me:true },
  { name:'Sara Mekonnen', role:'SQUAD_MEMBER', solved:228 },
  { name:'Yonas Abebe', role:'SQUAD_MEMBER', solved:201 },
  { name:'Helen Girma', role:'SQUAD_MEMBER', solved:167 },
];

function Progress({ done, total, w=120, color=T.accent }) {
  const pct = total? Math.round(done/total*100):0;
  return (
    <div style={{ display:'flex', alignItems:'center', gap:9 }}>
      <span style={{ width:w, height:6, borderRadius:4, background:T.surface3, overflow:'hidden' }}>
        <span style={{ display:'block', width:pct+'%', height:'100%', background:color }} /></span>
      <span className="mono" style={{ fontSize:11, color:T.text2, width:46 }}>{done}/{total}</span>
    </div>
  );
}

function Topic({ tp, open, onToggle, lead }) {
  return (
    <div style={{ borderTop:'1px solid '+T.borderSoft }}>
      <div onClick={onToggle} style={{ display:'flex', alignItems:'center', gap:12, padding:'11px 14px 11px 30px', cursor:'pointer' }}>
        <Icon name="chevron" size={14} style={{ color:T.text3, transform: open?'rotate(90deg)':'none', transition:'transform .2s' }} />
        <span style={{ fontFamily:T.fD, fontSize:13.5, fontWeight:500, color:T.text, flex:1 }}>{tp.title}</span>
        {tp.done===tp.total && <Verdict>Complete</Verdict>}
        <Progress done={tp.done} total={tp.total} w={90} color={tp.done===tp.total?T.gain:T.accent} />
        {lead && <Icon name="settings" size={14} style={{ color:T.text3 }} />}
      </div>
      {open && (
        <div style={{ padding:'0 14px 14px 50px' }}>
          {tp.problems.length ? (
            <div style={{ background:T.surface, border:'1px solid '+T.border, borderRadius:10, overflow:'hidden' }}>
              {tp.problems.map((p,i)=>(
                <div key={i} style={{ display:'flex', alignItems:'center', gap:11, padding:'9px 13px', borderTop: i?'1px solid '+T.borderSoft:'none' }}>
                  {p.solved
                    ? <span style={{ width:17, height:17, borderRadius:5, background:'rgba(69,212,131,0.15)', display:'grid', placeItems:'center' }}><Icon name="check" size={12} style={{ color:T.gain }} /></span>
                    : <span style={{ width:15, height:15, borderRadius:5, border:'1.5px solid '+T.border }} />}
                  <PlatformBadge p={p.p} size="sm" />
                  <span style={{ fontFamily:T.fD, fontSize:13, fontWeight:500, color: p.solved?T.text2:T.text, flex:1 }}>{p.name}</span>
                  <Icon name="external" size={13} style={{ color:T.text3 }} />
                </div>
              ))}
              {lead && <div style={{ padding:'9px 13px', borderTop:'1px solid '+T.borderSoft }}>
                <span style={{ display:'inline-flex', alignItems:'center', gap:6, fontFamily:T.fD, fontSize:12, color:T.accentText, cursor:'pointer' }}><Icon name="plus" size={13} />Add problem</span></div>}
            </div>
          ) : (
            <div style={{ padding:'14px', textAlign:'center', fontFamily:T.fB, fontSize:12.5, color:T.text3, background:T.surface, border:'1px dashed '+T.border, borderRadius:10 }}>
              {lead ? <span style={{ color:T.accentText, cursor:'pointer' }}>+ Add the first problem to this topic</span> : 'No problems added yet.'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Track({ tr, lead }) {
  const [open, setOpen] = useStateSq({});
  return (
    <Card pad={0} style={{ overflow:'hidden' }}>
      <div style={{ display:'flex', alignItems:'center', gap:14, padding:'15px 18px', background:T.surface3 }}>
        <div style={{ width:34, height:34, borderRadius:9, display:'grid', placeItems:'center', background:T.accentGhost, color:T.accent }}><Icon name="book" size={17} /></div>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:T.fD, fontSize:15, fontWeight:600, color:T.text }}>{tr.title}</div>
          <div style={{ fontFamily:T.fM, fontSize:11, color:T.text3, marginTop:2 }}>{tr.topics.length} topics</div>
        </div>
        <Progress done={tr.done} total={tr.total} color={tr.done?T.accent:T.text3} />
        {lead && <Btn kind="ghost" size="sm" icon="plus">Topic</Btn>}
      </div>
      {tr.topics.map(tp=><Topic key={tp.id} tp={tp} lead={lead} open={!!open[tp.id]} onToggle={()=>setOpen({...open,[tp.id]:!open[tp.id]})} />)}
    </Card>
  );
}

function ScreenSquad() {
  const role = 'SQUAD_LEAD';
  const lead = role==='SQUAD_LEAD';
  const user = { name:'Naol Kebede', squad:'2nd Squad', role };
  return (
    <AppShell active="squad" role={role} user={user} scroll={true}
      header={<AppHeader title="2nd Squad" crumbs="Hub / My Squad" role={role} user={user}
        right={lead ? <Btn kind="accentGhost" size="sm" icon="plus">New track</Btn> : null} />}>
      <div style={{ maxWidth:1120, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 300px', gap:24 }}>
        {/* curriculum */}
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
            <h2 style={{ margin:0, fontFamily:T.fD, fontSize:17, fontWeight:600, color:T.text }}>Curriculum</h2>
            <span style={{ fontFamily:T.fM, fontSize:11, color:T.text3 }}>Track → Topic → Problem</span>
            {lead && <span style={{ marginLeft:'auto', display:'inline-flex', alignItems:'center', gap:6, fontFamily:T.fM, fontSize:10.5, color:T.accentText, background:T.accentGhost, border:'1px solid '+T.accentLine, borderRadius:7, padding:'4px 9px' }}><Icon name="settings" size={12} />Lead editing</span>}
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {CURRICULUM.map(tr=><Track key={tr.id} tr={tr} lead={lead} />)}
          </div>
        </div>

        {/* roster */}
        <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
          <Card>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
              <SquadBadge squad="2nd Squad" /><span style={{ fontFamily:T.fM, fontSize:11, color:T.text3, marginLeft:'auto' }}>5 members</span>
            </div>
            <div style={{ display:'flex', gap:14 }}>
              <div><div className="disp" style={{ fontSize:24, fontWeight:600, color:T.text }}>56%</div><div style={{ fontFamily:T.fM, fontSize:10.5, color:T.text3 }}>track avg</div></div>
              <div><div className="disp" style={{ fontSize:24, fontWeight:600, color:T.text }}>1,155</div><div style={{ fontFamily:T.fM, fontSize:10.5, color:T.text3 }}>squad solves</div></div>
            </div>
          </Card>
          <div>
            <div style={{ fontFamily:T.fM, fontSize:10.5, letterSpacing:1.5, textTransform:'uppercase', color:T.text3, marginBottom:11 }}>Members</div>
            <Card pad={0} style={{ overflow:'hidden' }}>
              {SQUAD_ROSTER.map((m,i)=>(
                <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 13px', borderTop: i?'1px solid '+T.borderSoft:'none', background: m.me?'rgba(37,214,193,0.04)':'transparent' }}>
                  <Avatar name={m.name} size={28} ring={m.me} />
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontFamily:T.fD, fontSize:12.5, fontWeight:500, color:T.text, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{m.name.split(' ')[0]} {m.name.split(' ')[1][0]}.</div>
                    {m.role==='SQUAD_LEAD' && <div style={{ fontFamily:T.fM, fontSize:9.5, color:T.accent }}>LEAD</div>}
                  </div>
                  <span className="mono" style={{ fontSize:11.5, color:T.text2 }}>{m.solved}</span>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
Object.assign(window, { ScreenSquad });
