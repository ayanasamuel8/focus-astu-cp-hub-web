// screens/announcements.jsx — dual view: public (global only) vs authenticated (global + squad)
const ANN_GLOBAL = [
  { title:'Weekly Contest #14 standings are live', body:'128 members rated this round. Codeforces deltas have been synced automatically — head to the contest page to see where your squad landed and what’s left to upsolve. Top three across all squads earn a spot in next month’s invitational.', author:'Focus ASTU', role:'ADMIN', when:'2 hours ago' },
  { title:'4th Squad opens applications Monday', body:'We’re forming a new cohort. Squad Leads are finalizing curriculum tracks this week; invitations roll out Monday at 9:00. If you know a strong problem-solver in the community tier, nominate them to your lead.', author:'Selam Bekele', role:'SUPER_ADMIN', when:'1 day ago' },
  { title:'Browser extension v1.2 — faster AtCoder logging', body:'LeetCode and Codeforces submissions stay auto-captured. AtCoder now has a one-click manual flow from the extension popup. Update from the Settings page.', author:'Focus ASTU', role:'ADMIN', when:'3 days ago' },
];
const ANN_SQUAD = [
  { title:'DP week starts Monday — finish hashing first', body:'We move into Dynamic Programming next week. Before then, clear the remaining Arrays & Hashing problems and submit at least one editorial. I’ll review them Friday evening.', author:'Naol Kebede', role:'SQUAD_LEAD', when:'5 hours ago', squad:'2nd Squad' },
  { title:'Scrimmage #4 — Saturday 3PM', body:'Two-hour squad-only set, rated internally. Bring your A-game; standings feed straight to your profile.', author:'Naol Kebede', role:'SQUAD_LEAD', when:'2 days ago', squad:'2nd Squad' },
];

function AnnItem({ a, squad }) {
  const global = !squad;
  return (
    <div style={{ background: global?T.surface2:'rgba(37,214,193,0.045)', border:'1px solid '+(global?T.border:T.accentLine),
      borderRadius:14, padding:'20px 22px', position:'relative', overflow:'hidden' }}>
      {!global && <div style={{ position:'absolute', left:0, top:0, bottom:0, width:3, background:T.accent }} />}
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
        {global
          ? <span style={{ fontFamily:T.fM, fontSize:10, letterSpacing:2, color:T.text3, border:'1px solid '+T.border, borderRadius:6, padding:'3px 9px' }}>GLOBAL</span>
          : <SquadBadge squad={a.squad} size="sm" />}
        <span style={{ marginLeft:'auto', fontFamily:T.fM, fontSize:11, color:T.text3 }}>{a.when}</span>
      </div>
      <h3 style={{ margin:'0 0 9px', fontFamily:T.fD, fontSize:17, fontWeight:600, color:T.text, letterSpacing:-0.3 }}>{a.title}</h3>
      <p style={{ margin:0, fontFamily:T.fB, fontSize:14, lineHeight:1.6, color:T.text2 }}>{a.body}</p>
      <div style={{ display:'flex', alignItems:'center', gap:9, marginTop:16, paddingTop:14, borderTop:'1px solid '+T.borderSoft }}>
        <Avatar name={a.author} size={26} />
        <span style={{ fontFamily:T.fD, fontSize:12.5, fontWeight:500, color:T.text }}>{a.author}</span>
        <RoleBadge role={a.role} size="sm" />
      </div>
    </div>
  );
}

function ScreenAnnouncements({ authed=true }) {
  if (!authed) {
    // PUBLIC — landing shell, global only, read-only
    return (
      <div className="fa-app" style={{ background:T.bg, minHeight:'100%' }}>
        <FlameDef />
        <LandingNav />
        <div style={{ maxWidth:760, margin:'0 auto', padding:'48px 32px 56px' }}>
          <Kicker style={{ marginBottom:10 }}>Public · global only</Kicker>
          <h1 style={{ margin:'0 0 10px', fontFamily:T.fD, fontSize:34, fontWeight:700, color:T.text, letterSpacing:-1 }}>Announcements</h1>
          <p style={{ margin:'0 0 28px', fontFamily:T.fB, fontSize:15, color:T.text2, lineHeight:1.6, maxWidth:560 }}>
            Community-wide news from the Focus ASTU team. <span style={{ color:T.text3 }}>Squad announcements are private — sign in to see your squad’s feed.</span>
          </p>
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {ANN_GLOBAL.map((a,i)=><AnnItem key={i} a={a} />)}
          </div>
          <div style={{ marginTop:24, padding:'16px 18px', borderRadius:12, background:T.surface2, border:'1px dashed '+T.border,
            display:'flex', alignItems:'center', gap:12 }}>
            <Icon name="lock" size={18} style={{ color:T.text3 }} />
            <span style={{ fontFamily:T.fB, fontSize:13, color:T.text2, flex:1 }}>Squad-scoped announcements are visible after login.</span>
            <Btn kind="primary" size="sm">Login</Btn>
          </div>
        </div>
      </div>
    );
  }

  // AUTHENTICATED — Squad Lead: global + squad, Post button
  const role = 'SQUAD_LEAD';
  const user = { name:'Naol Kebede', squad:'2nd Squad', role };
  return (
    <AppShell active="announcements" role={role} user={user} scroll={true}
      header={<AppHeader title="Announcements" crumbs="Hub / Announcements" role={role} user={user}
        right={<Btn kind="accentGhost" size="sm" icon="plus">Post to squad</Btn>} />}>
      <div style={{ maxWidth:1080, margin:'0 auto' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:18 }}>
          <FilterPill active>All</FilterPill><FilterPill>Global</FilterPill><FilterPill>2nd Squad</FilterPill>
          <span style={{ marginLeft:'auto', fontFamily:T.fM, fontSize:11, color:T.text3 }}>Showing global + your squad</span>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, alignItems:'start' }}>
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <SubHead icon="announce" color={T.text2}>Global</SubHead>
            {ANN_GLOBAL.map((a,i)=><AnnItem key={i} a={a} />)}
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <SubHead icon="squad" color={T.accentText}>2nd Squad · you can post here</SubHead>
            {ANN_SQUAD.map((a,i)=><AnnItem key={i} a={a} squad />)}
            <div style={{ padding:'14px 16px', borderRadius:12, border:'1px dashed '+T.accentLine, background:T.accentGhost,
              display:'flex', alignItems:'center', gap:11, cursor:'pointer' }}>
              <Icon name="plus" size={16} style={{ color:T.accent }} />
              <span style={{ fontFamily:T.fD, fontSize:13, fontWeight:500, color:T.accentText }}>Write a squad announcement</span>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
function SubHead({ children, icon, color }) {
  return <div style={{ display:'flex', alignItems:'center', gap:8, fontFamily:T.fM, fontSize:11, letterSpacing:1.5, textTransform:'uppercase', color }}>
    <Icon name={icon} size={14} />{children}</div>;
}
Object.assign(window, { ScreenAnnouncements });
