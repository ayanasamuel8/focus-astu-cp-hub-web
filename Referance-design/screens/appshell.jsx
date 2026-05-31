// screens/appshell.jsx — full app shell with a LIVE role switcher (demonstrates nav gating)
const { useState: useStateS } = React;

const ROLE_ORDER = ['COMMUNITY','SQUAD_MEMBER','SQUAD_LEAD','ADMIN','SUPER_ADMIN'];

function RoleSwitcher({ role, setRole }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 14px', marginBottom:22,
      background:'linear-gradient(180deg,#12171c,#0e1216)', border:'1px solid '+T.accentLine, borderRadius:12,
      boxShadow:'inset 0 0 40px rgba(37,214,193,0.05)' }}>
      <Icon name="bolt" size={16} style={{ color:T.accent }} fill={T.accent} />
      <span style={{ fontFamily:T.fD, fontSize:13, fontWeight:600, color:T.text }}>Preview as role</span>
      <span style={{ fontFamily:T.fB, fontSize:12, color:T.text3 }}>— watch the sidebar change</span>
      <div style={{ marginLeft:'auto', display:'flex', gap:4, background:T.surface, padding:4, borderRadius:9, border:'1px solid '+T.border }}>
        {ROLE_ORDER.map(r=>{
          const on = r===role;
          return (
            <button key={r} onClick={()=>setRole(r)} style={{
              padding:'6px 11px', borderRadius:6, border:'none', cursor:'pointer',
              fontFamily:T.fD, fontSize:11.5, fontWeight:600, letterSpacing:0.2, whiteSpace:'nowrap',
              color: on?'#04201d':T.text2, background: on?T.accent:'transparent' }}>
              {ROLE[r].label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ScreenAppShell() {
  const [role, setRole] = useStateS('SQUAD_LEAD');
  const inSquad = role==='SQUAD_MEMBER' || role==='SQUAD_LEAD';
  const isAdmin = role==='ADMIN' || role==='SUPER_ADMIN';
  const user = { name:'Abel Tadesse', squad: inSquad?'2nd Squad':null, role };
  return (
    <div className="fa-app" style={{ display:'flex', height:'100%', width:'100%', overflow:'hidden' }}>
      <FlameDef />
      <Sidebar active="dashboard" role={role} user={user} />
      <div style={{ flex:1, minWidth:0, display:'flex', flexDirection:'column', height:'100%' }}>
        <AppHeader title="Dashboard" crumbs="Home" role={role} user={user} />
        <main style={{ flex:1, overflow:'auto', padding:'22px 30px' }}>
          <RoleSwitcher role={role} setRole={setRole} />
          {/* gating note */}
          <div style={{ display:'flex', gap:10, marginBottom:22, flexWrap:'wrap' }}>
            <GateChip on={true} label="Dashboard · Problems · Contests · Announcements · Profile · Settings" always />
            <GateChip on={inSquad} label="My Squad" cond="SQUAD_MEMBER / LEAD" />
            <GateChip on={isAdmin} label="Admin" cond="ADMIN / SUPER_ADMIN" />
          </div>
          <DashboardBody role={role} name={user.name} />
        </main>
      </div>
    </div>
  );
}

function GateChip({ on, label, cond, always }) {
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'6px 11px', borderRadius:8,
      fontFamily:T.fM, fontSize:11, letterSpacing:0.2,
      background: on?'rgba(69,212,131,0.10)':T.surface2,
      border:'1px solid '+(on?'rgba(69,212,131,0.3)':T.border),
      color: on?T.gain:T.text3, opacity:on?1:0.6 }}>
      <Icon name={on?'check':'lock'} size={12} />
      {label}{!always && <span style={{ color:T.text3 }}>· {cond}</span>}
    </span>
  );
}

Object.assign(window, { ScreenAppShell, RoleSwitcher });
