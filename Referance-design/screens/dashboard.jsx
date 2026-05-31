// screens/dashboard.jsx — personal home (stats, recent submissions, announcement previews, quick links)
const ME = { name:'Abel Tadesse', squad:'2nd Squad', role:'SQUAD_MEMBER', problems:247, streak:14, cf:1648, rank:7 };

const RECENT_SUBS = [
  { name:'Two Sum',                 p:'LEETCODE',   lang:'C++',    when:'12m ago' },
  { name:'Edu Round 168 · Div2 C',  p:'CODEFORCES', lang:'C++',    when:'2h ago' },
  { name:'Longest Palindrome',      p:'LEETCODE',   lang:'Python', when:'5h ago' },
  { name:'ABC 348 · D — Grid Walk', p:'ATCODER',    lang:'C++',    when:'yesterday' },
  { name:'Min Spanning Tree',       p:'OTHER',      lang:'Java',   when:'yesterday' },
];

function SectionHead({ children, action }) {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
      <h2 style={{ margin:0, fontFamily:T.fD, fontSize:15.5, fontWeight:600, color:T.text, letterSpacing:-0.2 }}>{children}</h2>
      {action}
    </div>
  );
}

function QuickLink({ icon, label, sub, color }) {
  return (
    <div style={{ flex:1, display:'flex', alignItems:'center', gap:12, padding:'15px 16px', background:T.surface2,
      border:'1px solid '+T.border, borderRadius:12, cursor:'pointer' }}>
      <div style={{ width:38, height:38, borderRadius:10, display:'grid', placeItems:'center',
        background:(color||T.accent)+'1c', color:color||T.accent }}><Icon name={icon} size={19} /></div>
      <div style={{ flex:1 }}>
        <div style={{ fontFamily:T.fD, fontSize:14, fontWeight:600, color:T.text }}>{label}</div>
        <div style={{ fontFamily:T.fB, fontSize:11.5, color:T.text3 }}>{sub}</div>
      </div>
      <Icon name="arrow" size={16} style={{ color:T.text3 }} />
    </div>
  );
}

function DashboardBody({ role=ME.role, name=ME.name }) {
  const r = ROLE[role] || ROLE.COMMUNITY;
  const inSquad = role==='SQUAD_MEMBER' || role==='SQUAD_LEAD';
  return (
    <div style={{ maxWidth:1080, margin:'0 auto' }}>
      {/* greeting */}
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:22, flexWrap:'wrap', gap:14 }}>
        <div>
          <div style={{ fontFamily:T.fB, fontSize:13.5, color:T.text3 }}>Good evening,</div>
          <h1 style={{ margin:'2px 0 0', fontFamily:T.fD, fontSize:26, fontWeight:600, color:T.text, letterSpacing:-0.5 }}>{name.split(' ')[0]} 👋</h1>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:9 }}>
          {inSquad && <SquadBadge squad={ME.squad} lead={role==='SQUAD_LEAD'} />}
          <RoleBadge role={role} />
        </div>
      </div>

      {/* stats */}
      <div style={{ display:'flex', gap:14, marginBottom:24 }}>
        <StatCard label="Problems solved" value={ME.problems} sub="+8 this week" accent={T.accent} icon="check" />
        <StatCard label="Current streak" value={ME.streak} sub="days · keep it alive" accent={T.streak} icon="flame" />
        <StatCard label="Codeforces" value={ME.cf} delta={47} sub="after Round 168" accent={T.cf} icon="contests" />
        <StatCard label={inSquad?'Squad rank':'Global rank'} value={'#'+ME.rank} sub={inSquad?'in '+ME.squad:'community'} accent={T.ac} icon="trophy" />
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:20 }}>
        {/* recent submissions */}
        <div>
          <SectionHead action={<Btn kind="ghost" size="sm" iconR="arrow">All</Btn>}>Recent submissions</SectionHead>
          <Card pad={0} style={{ overflow:'hidden' }}>
            {RECENT_SUBS.map((s,i)=>(
              <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 16px',
                borderTop: i?'1px solid '+T.borderSoft:'none' }}>
                <PlatformBadge p={s.p} size="sm" />
                <span style={{ fontFamily:T.fD, fontSize:13.5, fontWeight:500, color:T.text, flex:1, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{s.name}</span>
                <span className="mono" style={{ fontSize:11.5, color:T.text2 }}>{s.lang}</span>
                <Verdict>AC</Verdict>
                <span style={{ fontFamily:T.fM, fontSize:11, color:T.text3, width:78, textAlign:'right' }}>{s.when}</span>
              </div>
            ))}
          </Card>
        </div>

        {/* announcement previews */}
        <div>
          <SectionHead action={<Btn kind="ghost" size="sm" iconR="arrow">All</Btn>}>Announcements</SectionHead>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            <AnnouncementCard scope="GLOBAL" compact title="Weekly Contest #14 standings live" excerpt="128 members rated. Check your delta." author="Focus ASTU" when="2h ago" />
            {inSquad
              ? <AnnouncementCard scope="SQUAD" compact squad={ME.squad} title="DP week starts Monday" excerpt="Finish the hashmap track first." author="Naol · Lead" when="5h ago" />
              : <AnnouncementCard scope="GLOBAL" compact title="4th Squad applications open" excerpt="Invitations roll out Monday." author="Admin" when="1d ago" />}
          </div>
        </div>
      </div>

      {/* quick links */}
      <div style={{ marginTop:24 }}>
        <SectionHead>Jump back in</SectionHead>
        <div style={{ display:'flex', gap:14 }}>
          <QuickLink icon="problems" label="Problems" sub="Browse & log solutions" color={T.accent} />
          <QuickLink icon="contests" label="Contests" sub="2 awaiting upsolve" color={T.warn} />
          {inSquad && <QuickLink icon="squad" label="My Squad" sub="Curriculum · DP Basics" color={T.ac} />}
        </div>
      </div>
    </div>
  );
}

function ScreenDashboard() {
  return (
    <AppShell active="dashboard" role={ME.role} user={ME}
      header={<AppHeader title="Dashboard" crumbs="Home" role={ME.role} user={ME} />}>
      <DashboardBody />
    </AppShell>
  );
}

Object.assign(window, { ScreenDashboard, DashboardBody, ME, RECENT_SUBS, DashSectionHead:SectionHead });
