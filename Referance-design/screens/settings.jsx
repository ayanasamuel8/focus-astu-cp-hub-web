// screens/settings.jsx — API key generation for the browser extension
function Step({ n, title, children, last }) {
  return (
    <div style={{ display:'flex', gap:14, paddingBottom: last?0:18 }}>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
        <span style={{ width:26, height:26, borderRadius:13, flexShrink:0, display:'grid', placeItems:'center',
          fontFamily:T.fD, fontSize:12, fontWeight:700, color:T.accent, background:T.accentGhost, border:'1px solid '+T.accentLine }}>{n}</span>
        {!last && <span style={{ flex:1, width:2, background:T.border, marginTop:6 }} />}
      </div>
      <div style={{ paddingTop:2 }}>
        <div style={{ fontFamily:T.fD, fontSize:13.5, fontWeight:600, color:T.text }}>{title}</div>
        <div style={{ fontFamily:T.fB, fontSize:12.5, color:T.text2, lineHeight:1.55, marginTop:3 }}>{children}</div>
      </div>
    </div>
  );
}

function ScreenSettings() {
  const user = ME;
  return (
    <AppShell active="settings" role={user.role} user={user} scroll={true}
      header={<AppHeader title="Settings" crumbs="Hub / Settings / Extension" role={user.role} user={user} />}>
      <div style={{ maxWidth:880, margin:'0 auto' }}>
        {/* connection status */}
        <Card style={{ marginBottom:20, display:'flex', alignItems:'center', gap:16 }}>
          <div style={{ width:48, height:48, borderRadius:12, display:'grid', placeItems:'center', background:'rgba(69,212,131,0.12)', color:T.gain }}>
            <Icon name="bolt" size={24} fill={T.gain} />
          </div>
          <div style={{ flex:1 }}>
            <div style={{ display:'flex', alignItems:'center', gap:9 }}>
              <h2 style={{ margin:0, fontFamily:T.fD, fontSize:16, fontWeight:600, color:T.text }}>Browser extension</h2>
              <span style={{ display:'inline-flex', alignItems:'center', gap:6, fontFamily:T.fM, fontSize:11, fontWeight:600, color:T.gain, background:'rgba(69,212,131,0.12)', border:'1px solid rgba(69,212,131,0.35)', borderRadius:7, padding:'3px 9px' }}>
                <span style={{ width:6, height:6, borderRadius:3, background:T.gain }} />Connected</span>
            </div>
            <div style={{ fontFamily:T.fB, fontSize:13, color:T.text2, marginTop:4 }}>Auto-captures accepted submissions from LeetCode &amp; Codeforces. AtCoder &amp; Other are logged manually.</div>
          </div>
          <div style={{ display:'flex', gap:8 }}>
            {['LEETCODE','CODEFORCES'].map(p=><PlatformBadge key={p} p={p} />)}
          </div>
        </Card>

        {/* API key */}
        <div style={{ fontFamily:T.fM, fontSize:10.5, letterSpacing:1.5, textTransform:'uppercase', color:T.text3, marginBottom:11 }}>Personal API key</div>
        <Card style={{ marginBottom:14 }}>
          <div style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 14px', background:'#0c0f14', border:'1px solid '+T.border, borderRadius:10 }}>
            <Icon name="key" size={17} style={{ color:T.accent }} />
            <span className="mono" style={{ fontSize:13.5, color:T.text, flex:1, letterSpacing:0.5 }}>fak_live_7Q2··········································xR9</span>
            <Btn kind="ghost" size="sm" icon="copy">Copy</Btn>
            <Btn kind="solid" size="sm">Reveal</Btn>
          </div>
          <div style={{ display:'flex', alignItems:'flex-start', gap:9, marginTop:14, padding:'11px 14px', borderRadius:10,
            background:T.warnGhost, border:'1px solid rgba(243,181,60,0.35)' }}>
            <Icon name="lock" size={15} style={{ color:T.warn, marginTop:1 }} />
            <span style={{ fontFamily:T.fB, fontSize:12.5, color:T.text2, lineHeight:1.55, flex:1 }}>
              The raw key is shown <strong style={{ color:T.warn }}>once</strong> on generation — we store only a SHA-256 hash. If you lose it, regenerate; the old key stops working immediately.
            </span>
          </div>
          <div style={{ display:'flex', gap:10, marginTop:16 }}>
            <Btn kind="accentGhost" icon="key">Regenerate key</Btn>
            <Btn kind="danger" icon="ban">Revoke</Btn>
            <span style={{ marginLeft:'auto', alignSelf:'center', fontFamily:T.fM, fontSize:11, color:T.text3 }}>Last used 12m ago · 247 submissions captured</span>
          </div>
        </Card>

        {/* handshake steps */}
        <div style={{ fontFamily:T.fM, fontSize:10.5, letterSpacing:1.5, textTransform:'uppercase', color:T.text3, margin:'22px 0 13px' }}>Connect the extension</div>
        <Card>
          <Step n="1" title="Install the extension">Add Focus ASTU CP Hub from the Chrome or Firefox store.</Step>
          <Step n="2" title="Copy your API key">Use the key above — it authenticates the extension as you.</Step>
          <Step n="3" title="Paste it into the popup">Open the extension popup and paste the key. It’s stored locally in your browser.</Step>
          <Step n="4" title="You’re connected" last>The popup shows a green badge. Accepted solutions now post automatically.</Step>
        </Card>
      </div>
    </AppShell>
  );
}
Object.assign(window, { ScreenSettings });
