// app.jsx — assembles every screen onto the design canvas
const { useState } = React;

// render window[name] if built, else a placeholder card
function R(name, props) {
  const C = window[name];
  if (C) return <C {...props} />;
  return <div className="fa-app" style={{ background:T.bg, height:'100%', display:'grid', placeItems:'center', color:T.text3, fontFamily:T.fM, fontSize:13 }}>{name}</div>;
}

function App() {
  return (
    <DesignCanvas>
      <DCSection id="foundations" title="Foundations" subtitle="Type, color, badges & components — the system everything is built from">
        <DCArtboard id="type" label="Type scale" width={1140} height={900} style={{ background:T.bg }}>{R('FoundationType')}</DCArtboard>
        <DCArtboard id="color" label="Color" width={1040} height={720} style={{ background:T.bg }}>{R('FoundationColor')}</DCArtboard>
        <DCArtboard id="badges" label="Badges & status" width={900} height={640} style={{ background:T.bg }}>{R('FoundationBadges')}</DCArtboard>
        <DCArtboard id="components" label="Components" width={1000} height={840} style={{ background:T.bg }}>{R('FoundationComponents')}</DCArtboard>
      </DCSection>

      <DCSection id="landing" title="Landing — Public Shell" subtitle="Hero · daily verse · global announcements · community stats. Three hero/verse compositions.">
        <DCArtboard id="land-band" label="A · Verse band (recommended)" width={1440} height={2360} style={{ background:T.bg }}>{R('LandingPage',{variant:'band'})}</DCArtboard>
        <DCArtboard id="land-split" label="B · Verse beside hero" width={1440} height={1980} style={{ background:T.bg }}>{R('LandingPage',{variant:'split'})}</DCArtboard>
        <DCArtboard id="land-feat" label="C · Featured verse card" width={1440} height={2420} style={{ background:T.bg }}>{R('LandingPage',{variant:'featured'})}</DCArtboard>
      </DCSection>

      <DCSection id="auth" title="Auth flow — Public Shell" subtitle="Login · Signup · Invite · Complete Profile">
        <DCArtboard id="login" label="Login (magic link)" width={1080} height={760} style={{ background:T.bg }}>{R('ScreenLogin')}</DCArtboard>
        <DCArtboard id="signup" label="Signup" width={1080} height={760} style={{ background:T.bg }}>{R('ScreenSignup')}</DCArtboard>
        <DCArtboard id="invite" label="Invite (locked email)" width={1080} height={760} style={{ background:T.bg }}>{R('ScreenInvite')}</DCArtboard>
        <DCArtboard id="complete" label="Complete profile" width={1080} height={920} style={{ background:T.bg }}>{R('ScreenComplete')}</DCArtboard>
      </DCSection>

      <DCSection id="appshell" title="App Shell — role-aware navigation" subtitle="The sidebar changes by role. Switch roles live to see gating.">
        <DCArtboard id="shell" label="App Shell · live role switcher" width={1440} height={940} style={{ background:T.bg }}>{R('ScreenAppShell')}</DCArtboard>
      </DCSection>

      <DCSection id="dashboard" title="Dashboard" subtitle="Personal home — stats, recent submissions, announcement previews, quick links">
        <DCArtboard id="dash" label="Dashboard" width={1440} height={1080} style={{ background:T.bg }}>{R('ScreenDashboard')}</DCArtboard>
      </DCSection>

      <DCSection id="problems" title="Problems" subtitle="Filterable table · platform badges · expandable submission accordion">
        <DCArtboard id="prob" label="Problems list" width={1440} height={1040} style={{ background:T.bg }}>{R('ScreenProblems')}</DCArtboard>
      </DCSection>

      <DCSection id="submission" title="Submission view" subtitle="Syntax-highlighted code viewer — three theme options">
        <DCArtboard id="sub-focus" label="A · Focus Teal" width={1180} height={920} style={{ background:T.bg }}>{R('ScreenSubmission',{theme:'focus'})}</DCArtboard>
        <DCArtboard id="sub-graphite" label="B · Graphite" width={1180} height={920} style={{ background:T.bg }}>{R('ScreenSubmission',{theme:'graphite'})}</DCArtboard>
        <DCArtboard id="sub-terminal" label="C · Terminal" width={1180} height={920} style={{ background:T.bg }}>{R('ScreenSubmission',{theme:'terminal'})}</DCArtboard>
      </DCSection>

      <DCSection id="editorial" title="Editorial" subtitle="Read & write Markdown editorials">
        <DCArtboard id="ed-read" label="Read" width={1180} height={1000} style={{ background:T.bg }}>{R('ScreenEditorial',{mode:'read'})}</DCArtboard>
        <DCArtboard id="ed-write" label="Write" width={1180} height={1000} style={{ background:T.bg }}>{R('ScreenEditorial',{mode:'write'})}</DCArtboard>
      </DCSection>

      <DCSection id="contests" title="Contests" subtitle="Synced contest list · standings with rating deltas · upsolve urgency">
        <DCArtboard id="con-list" label="Contest list" width={1440} height={920} style={{ background:T.bg }}>{R('ScreenContests')}</DCArtboard>
        <DCArtboard id="con-detail" label="Contest detail · standings" width={1440} height={1080} style={{ background:T.bg }}>{R('ScreenContestDetail')}</DCArtboard>
      </DCSection>

      <DCSection id="upsolve" title="Upsolve urgency" subtitle="Unsolved contest problems need a visual nudge — three treatments">
        <DCArtboard id="up-pulse" label="A · Pulse ring" width={760} height={560} style={{ background:T.bg }}>{R('UpsolveVariant',{variant:'pulse'})}</DCArtboard>
        <DCArtboard id="up-stripe" label="B · Warning stripe" width={760} height={560} style={{ background:T.bg }}>{R('UpsolveVariant',{variant:'stripe'})}</DCArtboard>
        <DCArtboard id="up-glow" label="C · Glow row" width={760} height={560} style={{ background:T.bg }}>{R('UpsolveVariant',{variant:'glow'})}</DCArtboard>
      </DCSection>

      <DCSection id="profile" title="Profile" subtitle="Role & squad badges · platform handles · streak · recent submissions">
        <DCArtboard id="prof" label="Profile" width={1440} height={1060} style={{ background:T.bg }}>{R('ScreenProfile')}</DCArtboard>
      </DCSection>

      <DCSection id="squad" title="My Squad" subtitle="Curriculum tree — Track → Topic → Problem, expandable">
        <DCArtboard id="sq" label="Squad curriculum" width={1440} height={1040} style={{ background:T.bg }}>{R('ScreenSquad')}</DCArtboard>
      </DCSection>

      <DCSection id="announcements" title="Announcements" subtitle="Same route, dual view — public (global only) vs authenticated (global + squad)">
        <DCArtboard id="ann-pub" label="Public view" width={1180} height={1140} style={{ background:T.bg }}>{R('ScreenAnnouncements',{authed:false})}</DCArtboard>
        <DCArtboard id="ann-auth" label="Authenticated (Squad Lead)" width={1440} height={980} style={{ background:T.bg }}>{R('ScreenAnnouncements',{authed:true})}</DCArtboard>
      </DCSection>

      <DCSection id="admin" title="Admin & Settings" subtitle="User management, roles, bans, invites, contest sync · API key for the extension">
        <DCArtboard id="admin" label="Admin dashboard" width={1440} height={1080} style={{ background:T.bg }}>{R('ScreenAdmin')}</DCArtboard>
        <DCArtboard id="settings" label="Settings · extension key" width={1180} height={900} style={{ background:T.bg }}>{R('ScreenSettings')}</DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
