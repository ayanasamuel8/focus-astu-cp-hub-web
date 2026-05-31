// screens/submission.jsx — syntax-highlighted code viewer (themeable)
function ScreenSubmission({ theme='focus' }) {
  const user = ME;
  return (
    <AppShell active="problems" role={user.role} user={user} scroll={true}
      header={<AppHeader title="Submission" crumbs="Problems / Two Sum / Submission" role={user.role} user={user}
        right={<Btn kind="ghost" size="sm" iconR="external">Open on LeetCode</Btn>} />}>
      <div style={{ maxWidth:1000, margin:'0 auto' }}>
        {/* problem header */}
        <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:18 }}>
          <PlatformBadge p="LEETCODE" full />
          <h1 style={{ margin:0, fontFamily:T.fD, fontSize:24, fontWeight:600, color:T.text, letterSpacing:-0.5, flex:1 }}>Two Sum</h1>
          <span style={{ fontFamily:T.fM, fontSize:11.5, color:T.text2, background:T.surface3, border:'1px solid '+T.border, borderRadius:6, padding:'3px 9px' }}>Easy</span>
          {['array','hashmap'].map(t=><span key={t} style={{ fontFamily:T.fM, fontSize:10.5, color:T.text2, background:T.surface3, border:'1px solid '+T.border, borderRadius:5, padding:'2px 7px' }}>{t}</span>)}
        </div>

        {/* submitter strip */}
        <div style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 16px', background:T.surface2,
          border:'1px solid '+T.border, borderRadius:12, marginBottom:16 }}>
          <Avatar name="Abel Tadesse" size={38} ring />
          <div style={{ flex:1 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ fontFamily:T.fD, fontSize:14, fontWeight:600, color:T.text }}>Abel Tadesse</span>
              <RoleBadge role="SQUAD_MEMBER" size="sm" /><SquadBadge squad="2nd Squad" size="sm" />
            </div>
            <div style={{ fontFamily:T.fM, fontSize:11, color:T.text3, marginTop:3 }}>submitted 12 minutes ago · via browser extension</div>
          </div>
          <div style={{ display:'flex', gap:18, alignItems:'center' }}>
            <Meta k="Verdict" v={<Verdict>Accepted</Verdict>} />
            <Meta k="Language" v={<span className="mono" style={{ fontSize:13, color:T.text }}>C++17</span>} />
            <Meta k="Runtime" v={<span className="mono" style={{ fontSize:13, color:T.text }}>4 ms</span>} />
          </div>
        </div>

        {/* code */}
        <CodeViewer theme={theme} file="two_sum.cpp" lang="C++17" code={SAMPLE_CPP} highlight={[7,8,9]}
          meta={<span style={{ fontFamily:T.fM, fontSize:10.5, color:T.text3 }}>theme · {CODE_THEMES[theme].name}</span>} />

        <div style={{ display:'flex', gap:12, marginTop:16 }}>
          <Btn kind="accentGhost" icon="book">Write an editorial</Btn>
          <Btn kind="ghost" icon="problems">All submissions (84)</Btn>
          <span style={{ flex:1 }} />
          <span style={{ fontFamily:T.fM, fontSize:11, color:T.text3, alignSelf:'center' }}>No code execution — stored &amp; displayed only</span>
        </div>
      </div>
    </AppShell>
  );
}
function Meta({ k, v }) {
  return (
    <div style={{ textAlign:'right' }}>
      <div style={{ fontFamily:T.fM, fontSize:9.5, letterSpacing:1.5, textTransform:'uppercase', color:T.text3, marginBottom:4 }}>{k}</div>
      {v}
    </div>
  );
}
Object.assign(window, { ScreenSubmission });
