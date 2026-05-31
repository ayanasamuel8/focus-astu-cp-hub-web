// screens/auth.jsx — Login · Signup · Invite · Complete Profile
const { useState: useStateA } = React;

function Field({ label, value, ph, icon, type, locked, hint, mono, right }) {
  return (
    <div style={{ marginBottom:16 }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:7 }}>
        <label style={{ fontFamily:T.fD, fontSize:12.5, fontWeight:500, color:T.text2 }}>{label}</label>
        {right}
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:10, background: locked?T.surface:T.surface,
        border:'1px solid '+(locked?T.borderSoft:T.border), borderRadius:9, padding:'11px 13px',
        opacity: locked?0.75:1 }}>
        {icon && <Icon name={icon} size={16} style={{ color:T.text3 }} />}
        <span style={{ fontFamily: mono?T.fM:T.fB, fontSize:14, color: value?T.text:T.text3, flex:1 }}>
          {type==='password' && value ? '••••••••••' : (value||ph)}
        </span>
        {locked && <Icon name="lock" size={14} style={{ color:T.text3 }} />}
      </div>
      {hint && <div style={{ fontFamily:T.fB, fontSize:11.5, color:T.text3, marginTop:6 }}>{hint}</div>}
    </div>
  );
}

function AuthShell({ children, title, sub, foot, wide }) {
  return (
    <div className="fa-app" style={{ background:T.bg, minHeight:'100%', display:'flex' }}>
      <FlameDef />
      {/* brand rail */}
      <div style={{ width:'42%', minWidth:380, position:'relative', overflow:'hidden',
        background:'linear-gradient(160deg,#0c1216,#080a0d)', borderRight:'1px solid '+T.border,
        padding:'40px 42px', display:'flex', flexDirection:'column' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(70% 60% at 20% 10%, rgba(37,214,193,0.10), transparent 60%)' }} />
        <div style={{ position:'relative' }}><Logo size={20} /></div>
        <div style={{ position:'relative', marginTop:'auto' }}>
          <div style={{ fontFamily:T.fS, fontStyle:'italic', fontSize:25, lineHeight:1.45, color:T.text, letterSpacing:-0.3 }}>
            “{VERSE.text}”
          </div>
          <div style={{ fontFamily:T.fD, fontSize:13.5, fontWeight:600, color:T.accentText, marginTop:16 }}>— {VERSE.ref}</div>
          <div style={{ marginTop:34, display:'flex', gap:18, fontFamily:T.fM, fontSize:11, color:T.text3 }}>
            <span>142 members</span><span>·</span><span>26 contests</span><span>·</span><span>Invite-only</span>
          </div>
        </div>
      </div>
      {/* form */}
      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'48px 56px' }}>
        <div style={{ width:'100%', maxWidth: wide?460:380 }}>
          <h1 style={{ margin:'0 0 6px', fontFamily:T.fD, fontSize:27, fontWeight:600, color:T.text, letterSpacing:-0.5 }}>{title}</h1>
          <p style={{ margin:'0 0 28px', fontFamily:T.fB, fontSize:14, color:T.text2, lineHeight:1.5 }}>{sub}</p>
          {children}
          {foot && <div style={{ marginTop:24, textAlign:'center', fontFamily:T.fB, fontSize:13, color:T.text3 }}>{foot}</div>}
        </div>
      </div>
    </div>
  );
}

function ScreenLogin() {
  return (
    <AuthShell title="Welcome back" sub="Sign in with a magic link — no password to remember."
      foot={<>Don’t have an invite? <span style={{ color:T.accentText, fontWeight:600 }}>Ask an admin</span></>}>
      <Field label="Email" value="abel.t@astu.edu.et" icon="mail" />
      <Btn kind="primary" full size="lg" iconR="arrow">Send magic link</Btn>
      <div style={{ display:'flex', alignItems:'center', gap:12, margin:'22px 0' }}>
        <span style={{ flex:1, height:1, background:T.border }} /><span style={{ fontFamily:T.fM, fontSize:11, color:T.text3 }}>OR</span><span style={{ flex:1, height:1, background:T.border }} />
      </div>
      <Btn kind="solid" full size="lg" icon="key">Sign in with password</Btn>
      <div style={{ marginTop:22, padding:'12px 14px', background:T.accentGhost, border:'1px solid '+T.accentLine,
        borderRadius:10, display:'flex', gap:10, alignItems:'flex-start' }}>
        <Icon name="mail" size={16} style={{ color:T.accent, marginTop:1 }} />
        <span style={{ fontFamily:T.fB, fontSize:12.5, color:T.text2, lineHeight:1.5 }}>We’ll email a one-time link. Click it and you’re in — handled securely by Supabase Auth.</span>
      </div>
    </AuthShell>
  );
}

function ScreenSignup() {
  return (
    <AuthShell title="Create your account" sub="Public signup is currently open. Join the Focus ASTU community."
      foot={<>Already a member? <span style={{ color:T.accentText, fontWeight:600 }}>Sign in</span></>}>
      <div style={{ marginBottom:18, padding:'9px 13px', borderRadius:9, background:'rgba(69,212,131,0.10)',
        border:'1px solid rgba(69,212,131,0.3)', display:'flex', alignItems:'center', gap:8 }}>
        <span style={{ width:7, height:7, borderRadius:5, background:T.gain }} />
        <span style={{ fontFamily:T.fM, fontSize:11.5, color:T.gain, letterSpacing:0.3 }}>SIGNUP_OPEN · enabled by Super Admin</span>
      </div>
      <Field label="Email" value="" ph="you@astu.edu.et" icon="mail" />
      <Field label="Password" value="secret" type="password" icon="lock" hint="At least 8 characters." />
      <Btn kind="primary" full size="lg" iconR="arrow">Create account</Btn>
      <div style={{ marginTop:18, fontFamily:T.fB, fontSize:12, color:T.text3, textAlign:'center', lineHeight:1.5 }}>
        New accounts start as <span style={{ color:T.text2 }}>Community</span> until an admin assigns a squad.
      </div>
    </AuthShell>
  );
}

function ScreenInvite() {
  return (
    <AuthShell title="You’re invited" sub="This invitation is locked to your email. Set a password to finish."
      foot={<span style={{ color:T.text3 }}>Tokens expire 72 hours after creation.</span>}>
      <div style={{ marginBottom:18, padding:'12px 14px', borderRadius:10, background:T.surface2, border:'1px solid '+T.border,
        display:'flex', alignItems:'center', gap:11 }}>
        <div style={{ width:34, height:34, borderRadius:8, background:'rgba(69,212,131,0.12)', display:'grid', placeItems:'center' }}>
          <Icon name="check" size={17} style={{ color:T.gain }} />
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:T.fD, fontSize:13, fontWeight:600, color:T.text }}>Invitation valid</div>
          <div style={{ fontFamily:T.fM, fontSize:11, color:T.text3 }}>token a3f9…c1d · expires in 71h</div>
        </div>
        <span style={{ fontFamily:T.fD, fontSize:11, color:T.gain }}>● Active</span>
      </div>
      <Field label="Email" value="naol.k@astu.edu.et" icon="mail" locked hint="Locked to the invited address — can’t be changed." />
      <Field label="Create password" value="secret123" type="password" icon="lock" />
      <Btn kind="primary" full size="lg" iconR="arrow">Accept invite &amp; continue</Btn>
    </AuthShell>
  );
}

function ScreenComplete() {
  return (
    <AuthShell wide title="Complete your profile" sub="Required before you can access the hub. You can edit handles later in Settings.">
      <div style={{ marginBottom:18, display:'flex', alignItems:'center', gap:10, fontFamily:T.fM, fontSize:11, color:T.text3 }}>
        <span style={{ color:T.accentText }}>● Step 2 of 2</span>
        <span style={{ flex:1, height:3, borderRadius:2, background:T.surface3, overflow:'hidden' }}>
          <span style={{ display:'block', width:'100%', height:'100%', background:T.accent }} /></span>
      </div>
      <Field label="Full name" value="Abel Tadesse" icon="profile" />
      <Field label="Telegram handle" value="abel_t" mono hint="Required — how your squad reaches you (no @)." right={<span style={{ fontFamily:T.fM, fontSize:10, color:T.loss }}>REQUIRED</span>} />
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
        <Field label="LeetCode" value="abel_t" mono />
        <Field label="Codeforces" value="abel_cf" mono hint="Used to match contest standings." />
      </div>
      <Field label="LinkedIn (optional)" value="" ph="linkedin.com/in/…" icon="link" />
      <Btn kind="primary" full size="lg" iconR="arrow">Finish &amp; enter the hub</Btn>
    </AuthShell>
  );
}

Object.assign(window, { ScreenLogin, ScreenSignup, ScreenInvite, ScreenComplete, AuthField:Field });
