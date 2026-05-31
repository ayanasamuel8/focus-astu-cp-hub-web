// screens/profile.jsx — role & squad badges, platform handles, streak, recent submissions
function HandleChip({ p, handle }) {
  const d = PLAT[p];
  return (
    <a style={{ display:'flex', alignItems:'center', gap:9, padding:'10px 12px', borderRadius:10, cursor:'pointer',
      background:T.surface, border:'1px solid '+T.border }}>
      <span style={{ width:26, height:26, borderRadius:7, display:'grid', placeItems:'center', background:d.c+'1c', color:d.c, fontFamily:T.fM, fontSize:11, fontWeight:700 }}>{d.short}</span>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontFamily:T.fM, fontSize:9.5, letterSpacing:1, textTransform:'uppercase', color:T.text3 }}>{d.label}</div>
        <div className="mono" style={{ fontSize:12.5, color:T.text, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{handle}</div>
      </div>
      <Icon name="external" size={13} style={{ color:T.text3 }} />
    </a>
  );
}

// activity heat strip (12 weeks)
function HeatStrip() {
  const cells = Array.from({length:7*16}, (_,i)=>{
    const v = [0,0,1,1,2,3,2,1,0,3,3,2][((i*7)%12)] ?? (i%4);
    return Math.min(4, (v + (i%5===0?2:0)) % 5);
  });
  const col = ['#181c22','rgba(37,214,193,0.25)','rgba(37,214,193,0.45)','rgba(37,214,193,0.7)','#25d6c1'];
  return (
    <div>
      <div style={{ display:'grid', gridTemplateRows:'repeat(7,12px)', gridAutoFlow:'column', gridAutoColumns:'12px', gap:3 }}>
        {cells.map((v,i)=><span key={i} style={{ width:12, height:12, borderRadius:3, background:col[v] }} />)}
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:10, fontFamily:T.fM, fontSize:10, color:T.text3 }}>
        Less {col.map((c,i)=><span key={i} style={{ width:11, height:11, borderRadius:3, background:c }} />)} More
      </div>
    </div>
  );
}

const ROLE_HISTORY = [
  { role:'SQUAD_MEMBER', squad:'2nd Squad', when:'Mar 2026', now:true },
  { role:'COMMUNITY', squad:null, when:'Jan 2026' },
];

function ScreenProfile() {
  const user = ME;
  return (
    <AppShell active="profile" role={user.role} user={user} scroll={true}
      header={<AppHeader title="Profile" crumbs="Hub / Profile" role={user.role} user={user}
        right={<Btn kind="ghost" size="sm" icon="settings">Edit profile</Btn>} />}>
      <div style={{ maxWidth:1080, margin:'0 auto', display:'grid', gridTemplateColumns:'340px 1fr', gap:22 }}>
        {/* left — identity card */}
        <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
          <Card style={{ textAlign:'center' }} pad={24}>
            <div style={{ display:'flex', justifyContent:'center', marginBottom:14 }}><Avatar name="Abel Tadesse" size={84} ring /></div>
            <h2 style={{ margin:0, fontFamily:T.fD, fontSize:21, fontWeight:600, color:T.text, letterSpacing:-0.4 }}>Abel Tadesse</h2>
            <div style={{ fontFamily:T.fM, fontSize:12, color:T.text3, marginTop:4 }}>@abel_t · joined Jan 2026</div>
            <div style={{ display:'flex', justifyContent:'center', flexWrap:'wrap', gap:8, marginTop:16 }}>
              <RoleBadge role="SQUAD_MEMBER" /><SquadBadge squad="2nd Squad" />
            </div>
            <p style={{ fontFamily:T.fB, fontSize:13, color:T.text2, lineHeight:1.6, margin:'18px 0 0' }}>
              Second-year SE. Grinding graphs &amp; DP. Aiming for Specialist by June.
            </p>
            <div style={{ display:'flex', gap:10, marginTop:18 }}>
              <Btn kind="solid" size="sm" full icon="link">Telegram</Btn>
              <Btn kind="solid" size="sm" full icon="external">LinkedIn</Btn>
            </div>
          </Card>

          {/* handles */}
          <div>
            <div style={{ fontFamily:T.fM, fontSize:10.5, letterSpacing:1.5, textTransform:'uppercase', color:T.text3, marginBottom:11 }}>Platform handles</div>
            <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
              <HandleChip p="CODEFORCES" handle="abel_cf" />
              <HandleChip p="LEETCODE" handle="abel_t" />
              <HandleChip p="ATCODER" handle="abel_at" />
            </div>
          </div>
        </div>

        {/* right — stats + activity */}
        <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
          <div style={{ display:'flex', gap:14 }}>
            <StatCard label="Problems" value="247" sub="unique solves" accent={T.accent} icon="check" />
            <StatCard label="Streak" value="14" sub="best · 21 days" accent={T.streak} icon="flame" />
            <StatCard label="Contests" value="11" sub="rated" accent={T.cf} icon="trophy" />
            <StatCard label="CF Rating" value="1648" delta={47} accent={T.ac} icon="contests" />
          </div>

          <Card>
            <DashSectionHead>Activity · last 16 weeks</DashSectionHead>
            <div style={{ display:'flex', alignItems:'center', gap:28 }}>
              <HeatStrip />
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                <div><div className="disp" style={{ fontSize:26, fontWeight:600, color:T.text }}>189</div><div style={{ fontFamily:T.fM, fontSize:11, color:T.text3 }}>solves this period</div></div>
                <div><Streak days={14} /><div style={{ fontFamily:T.fM, fontSize:11, color:T.text3, marginTop:4 }}>current streak</div></div>
              </div>
            </div>
          </Card>

          <div style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:20 }}>
            <div>
              <DashSectionHead action={<Btn kind="ghost" size="sm" iconR="arrow">All</Btn>}>Recent submissions</DashSectionHead>
              <Card pad={0} style={{ overflow:'hidden' }}>
                {RECENT_SUBS.slice(0,4).map((s,i)=>(
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:11, padding:'11px 14px', borderTop: i?'1px solid '+T.borderSoft:'none' }}>
                    <PlatformBadge p={s.p} size="sm" />
                    <span style={{ fontFamily:T.fD, fontSize:13, fontWeight:500, color:T.text, flex:1, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{s.name}</span>
                    <span className="mono" style={{ fontSize:11, color:T.text2 }}>{s.lang}</span>
                    <span style={{ fontFamily:T.fM, fontSize:10.5, color:T.text3, width:74, textAlign:'right' }}>{s.when}</span>
                  </div>
                ))}
              </Card>
            </div>
            <div>
              <DashSectionHead>Role history</DashSectionHead>
              <Card>
                <div style={{ display:'flex', flexDirection:'column' }}>
                  {ROLE_HISTORY.map((h,i)=>(
                    <div key={i} style={{ display:'flex', gap:12, paddingBottom: i<ROLE_HISTORY.length-1?16:0 }}>
                      <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                        <span style={{ width:10, height:10, borderRadius:5, background: h.now?T.accent:T.border, marginTop:4 }} />
                        {i<ROLE_HISTORY.length-1 && <span style={{ flex:1, width:2, background:T.border, marginTop:4 }} />}
                      </div>
                      <div>
                        <div style={{ display:'flex', alignItems:'center', gap:7 }}>
                          <RoleBadge role={h.role} size="sm" />{h.squad && <span style={{ fontFamily:T.fM, fontSize:10.5, color:T.text3 }}>· {h.squad}</span>}
                        </div>
                        <div style={{ fontFamily:T.fM, fontSize:10.5, color:T.text3, marginTop:5 }}>{h.when}{h.now && ' · current'}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
Object.assign(window, { ScreenProfile });
