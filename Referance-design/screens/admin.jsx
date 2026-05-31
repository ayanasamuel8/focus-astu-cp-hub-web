// screens/admin.jsx — user management, roles, bans, invitations, contest sync
const { useState: useStateAd } = React;

const USERS = [
  { name:'Selam Bekele', email:'selam.b@astu.edu.et', squad:'—', role:'SUPER_ADMIN', status:'active', solved:489 },
  { name:'Naol Kebede', email:'naol.k@astu.edu.et', squad:'2nd Squad', role:'SQUAD_LEAD', status:'active', solved:312 },
  { name:'Abel Tadesse', email:'abel.t@astu.edu.et', squad:'2nd Squad', role:'SQUAD_MEMBER', status:'active', solved:247 },
  { name:'Sara Mekonnen', email:'sara.m@astu.edu.et', squad:'1st Squad', role:'SQUAD_MEMBER', status:'active', solved:228 },
  { name:'Bruk Alemu', email:'bruk.a@astu.edu.et', squad:'—', role:'COMMUNITY', status:'active', solved:14 },
  { name:'Mikiyas Hailu', email:'miki.h@astu.edu.et', squad:'3rd Squad', role:'SQUAD_MEMBER', status:'banned', solved:96 },
];
const INVITES = [
  { email:'hana.w@astu.edu.et', token:'a3f9…c1d', exp:'in 71h', status:'pending' },
  { email:'kalkidan.m@astu.edu.et', token:'7b22…e90', exp:'in 48h', status:'pending' },
  { email:'eyob.t@astu.edu.et', token:'fd01…22a', exp:'used', status:'used' },
];

function Pill({ children, c=T.text2, bg=T.surface3, br=T.border }) {
  return <span style={{ display:'inline-flex', alignItems:'center', gap:6, fontFamily:T.fD, fontSize:11.5, fontWeight:500,
    color:c, background:bg, border:'1px solid '+br, borderRadius:7, padding:'4px 10px', cursor:'pointer' }}>{children}<Icon name="chevronD" size={11} /></span>;
}

function UserRow({ u }) {
  const banned = u.status==='banned';
  return (
    <div style={{ display:'flex', alignItems:'center', gap:14, padding:'12px 18px', borderTop:'1px solid '+T.borderSoft,
      background: banned?'rgba(242,101,79,0.05)':'transparent', opacity: banned?0.85:1 }}>
      <Avatar name={u.name} size={32} banned={banned} />
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontFamily:T.fD, fontSize:13.5, fontWeight:500, color: banned?T.text2:T.text }}>{u.name}</div>
        <div className="mono" style={{ fontSize:10.5, color:T.text3 }}>{u.email}</div>
      </div>
      <div style={{ width:110 }}><Pill>{u.squad}</Pill></div>
      <div style={{ width:140 }}><Pill c={ROLE[u.role].c}>{ROLE[u.role].label}</Pill></div>
      <span className="mono" style={{ width:50, textAlign:'right', fontSize:11.5, color:T.text2 }}>{u.solved}</span>
      <div style={{ width:120, display:'flex', justifyContent:'flex-end' }}>
        {banned
          ? <span style={{ display:'inline-flex', alignItems:'center', gap:6, fontFamily:T.fM, fontSize:11, fontWeight:600, color:T.loss, background:'rgba(242,101,79,0.12)', border:'1px solid rgba(242,101,79,0.4)', borderRadius:7, padding:'4px 10px' }}><Icon name="ban" size={12} />Banned</span>
          : <ToggleBan banned={false} />}
      </div>
      <Icon name="settings" size={15} style={{ color:T.text3, cursor:'pointer' }} />
    </div>
  );
}
function ToggleBan({ banned }) {
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:7, fontFamily:T.fM, fontSize:11, color:T.gain }}>
      <span style={{ width:30, height:17, borderRadius:9, background:'rgba(69,212,131,0.25)', position:'relative', cursor:'pointer' }}>
        <span style={{ position:'absolute', right:2, top:2, width:13, height:13, borderRadius:7, background:T.gain }} /></span>
      Active
    </span>
  );
}

function ScreenAdmin() {
  const [tab, setTab] = useStateAd('users');
  const role = 'ADMIN';
  const user = { name:'Selam Bekele', squad:null, role:'SUPER_ADMIN' };
  return (
    <AppShell active="admin" role={role} user={user} scroll={true}
      header={<AppHeader title="Admin" crumbs="Hub / Admin" role={user.role} user={user} />}>
      <div style={{ maxWidth:1120, margin:'0 auto' }}>
        <div style={{ display:'flex', gap:14, marginBottom:22 }}>
          <StatCard label="Total members" value="142" sub="+6 this week" accent={T.accent} icon="profile" />
          <StatCard label="Active" value="138" sub="non-banned" accent={T.gain} icon="check" />
          <StatCard label="Banned" value="4" sub="write-locked" accent={T.loss} icon="ban" />
          <StatCard label="Pending invites" value="2" sub="awaiting signup" accent={T.warn} icon="mail" />
        </div>

        {/* tabs */}
        <div style={{ display:'flex', gap:4, background:T.surface2, padding:4, borderRadius:11, border:'1px solid '+T.border, width:'fit-content', marginBottom:18 }}>
          {[['users','User management'],['invites','Invitations'],['sync','Contest sync']].map(([k,l])=>(
            <button key={k} onClick={()=>setTab(k)} style={{ padding:'9px 16px', borderRadius:8, border:'none', cursor:'pointer',
              fontFamily:T.fD, fontSize:13, fontWeight:600, color: tab===k?'#04201d':T.text2, background: tab===k?T.accent:'transparent' }}>{l}</button>
          ))}
        </div>

        {tab==='users' && (
          <Card pad={0} style={{ overflow:'hidden' }}>
            <div style={{ display:'flex', alignItems:'center', gap:14, padding:'12px 18px', background:T.surface3 }}>
              <span style={{ flex:1, fontFamily:T.fM, fontSize:10.5, letterSpacing:1.5, textTransform:'uppercase', color:T.text3 }}>Member</span>
              <span style={{ width:110, fontFamily:T.fM, fontSize:10.5, letterSpacing:1, textTransform:'uppercase', color:T.text3 }}>Squad</span>
              <span style={{ width:140, fontFamily:T.fM, fontSize:10.5, letterSpacing:1, textTransform:'uppercase', color:T.text3 }}>Role</span>
              <span style={{ width:50, textAlign:'right', fontFamily:T.fM, fontSize:10.5, letterSpacing:1, textTransform:'uppercase', color:T.text3 }}>Solv</span>
              <span style={{ width:120, textAlign:'right', fontFamily:T.fM, fontSize:10.5, letterSpacing:1, textTransform:'uppercase', color:T.text3 }}>Status</span>
              <span style={{ width:15 }} />
            </div>
            {USERS.map((u,i)=><UserRow key={i} u={u} />)}
          </Card>
        )}

        {tab==='invites' && (
          <div style={{ display:'grid', gridTemplateColumns:'320px 1fr', gap:20 }}>
            <Card>
              <DashSectionHead>Generate invitation</DashSectionHead>
              <AuthField label="Email to invite" value="" ph="name@astu.edu.et" icon="mail" />
              <div style={{ fontFamily:T.fB, fontSize:12, color:T.text3, margin:'2px 0 16px', lineHeight:1.5 }}>A token locked to this email, valid 72 hours.</div>
              <Btn kind="primary" full icon="plus">Generate invite link</Btn>
            </Card>
            <div>
              <DashSectionHead>Recent invitations</DashSectionHead>
              <Card pad={0} style={{ overflow:'hidden' }}>
                {INVITES.map((iv,i)=>(
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'13px 16px', borderTop: i?'1px solid '+T.borderSoft:'none' }}>
                    <Icon name="mail" size={16} style={{ color:T.text3 }} />
                    <span style={{ fontFamily:T.fD, fontSize:13, color:T.text, flex:1 }}>{iv.email}</span>
                    <span className="mono" style={{ fontSize:11, color:T.text3 }}>{iv.token}</span>
                    <span style={{ fontFamily:T.fM, fontSize:11, color: iv.status==='used'?T.text3:T.warn, width:64, textAlign:'right' }}>{iv.exp}</span>
                    {iv.status==='pending'
                      ? <Btn kind="ghost" size="sm" icon="copy">Copy</Btn>
                      : <span style={{ fontFamily:T.fM, fontSize:11, color:T.gain, display:'inline-flex', alignItems:'center', gap:5 }}><Icon name="check" size={12} />Used</span>}
                  </div>
                ))}
              </Card>
            </div>
          </div>
        )}

        {tab==='sync' && (
          <div style={{ display:'grid', gridTemplateColumns:'340px 1fr', gap:20 }}>
            <Card>
              <DashSectionHead>Sync a Codeforces contest</DashSectionHead>
              <AuthField label="Contest ID" value="2050" mono icon="contests" hint="e.g. 2050 — from the CF contest URL." />
              <Btn kind="primary" full icon="bolt">Fetch standings</Btn>
              <div style={{ marginTop:16, padding:'12px 14px', borderRadius:10, background:T.surface, border:'1px solid '+T.border, fontFamily:T.fB, fontSize:12, color:T.text3, lineHeight:1.6 }}>
                Maps CF handles → portal users, records ranks, rating deltas, and per-problem solves. Unmatched handles are skipped.
              </div>
            </Card>
            <div>
              <DashSectionHead>Recently synced</DashSectionHead>
              <Card pad={0} style={{ overflow:'hidden' }}>
                {CONTESTS.slice(0,3).map((c,i)=>(
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'13px 16px', borderTop: i?'1px solid '+T.borderSoft:'none' }}>
                    <div style={{ width:30, height:30, borderRadius:8, display:'grid', placeItems:'center', background:T.accentGhost, color:T.accent }}><Icon name="trophy" size={15} /></div>
                    <span style={{ fontFamily:T.fD, fontSize:13, color:T.text, flex:1 }}>{c.name}</span>
                    <span className="mono" style={{ fontSize:11, color:T.text3 }}>#{c.ext}</span>
                    <span style={{ fontFamily:T.fM, fontSize:11, color:T.text2 }}>{c.parts} mapped</span>
                    <Verdict>synced</Verdict>
                  </div>
                ))}
              </Card>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
Object.assign(window, { ScreenAdmin });
