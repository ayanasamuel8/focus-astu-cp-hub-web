// screens/editorial.jsx — read & write Markdown editorials
const ED_MD = `## Intuition
Brute force checks every pair in O(n²). We can do better by
remembering what we've already seen.

## Approach
Walk the array once. For each value, the **complement** we need
is \`target - nums[i]\`. Keep a hashmap of value → index:

- if the complement is already in the map, we found the pair
- otherwise store the current value and continue

## Complexity
- **Time:** O(n) — one pass, O(1) map lookups
- **Space:** O(n) — the hashmap`;

function MDPreview({ small }) {
  const H = ({ children }) => <h3 style={{ fontFamily:T.fD, fontSize: small?15:18, fontWeight:600, color:T.text, margin:'22px 0 10px', letterSpacing:-0.2 }}>{children}</h3>;
  const P = ({ children }) => <p style={{ fontFamily:T.fB, fontSize: small?13:14.5, lineHeight:1.65, color:T.text2, margin:'0 0 12px' }}>{children}</p>;
  const code = (t)=><span className="mono" style={{ fontSize:'0.88em', color:T.accentText, background:T.accentGhost, borderRadius:4, padding:'1px 5px' }}>{t}</span>;
  return (
    <div>
      <H>Intuition</H>
      <P>Brute force checks every pair in O(n²). We can do better by remembering what we’ve already seen.</P>
      <H>Approach</H>
      <P>Walk the array once. For each value, the <strong style={{ color:T.text }}>complement</strong> we need is {code('target - nums[i]')}. Keep a hashmap of value → index:</P>
      <ul style={{ margin:'0 0 14px', paddingLeft:20, fontFamily:T.fB, fontSize: small?13:14.5, lineHeight:1.7, color:T.text2 }}>
        <li>if the complement is already in the map, we found the pair</li>
        <li>otherwise store the current value and continue</li>
      </ul>
      <div style={{ borderRadius:10, overflow:'hidden', border:'1px solid '+T.border, margin:'4px 0 16px' }}>
        <CodeBlock theme="focus" fontSize={small?11.5:12.5} code={`for (int i = 0; i < n; i++) {\n    int need = target - nums[i];\n    if (seen.count(need)) return {seen[need], i};\n    seen[nums[i]] = i;\n}`} />
      </div>
      <H>Complexity</H>
      <ul style={{ margin:0, paddingLeft:20, fontFamily:T.fB, fontSize: small?13:14.5, lineHeight:1.7, color:T.text2 }}>
        <li><strong style={{ color:T.text }}>Time:</strong> O(n) — one pass, O(1) map lookups</li>
        <li><strong style={{ color:T.text }}>Space:</strong> O(n) — the hashmap</li>
      </ul>
    </div>
  );
}

function ScreenEditorial({ mode='read' }) {
  const user = ME;
  const write = mode==='write';
  return (
    <AppShell active="problems" role={user.role} user={user} scroll={true}
      header={<AppHeader title="Editorial" crumbs="Problems / Two Sum / Editorials" role={user.role} user={user}
        right={write ? <div style={{ display:'flex', gap:9 }}><Btn kind="ghost" size="sm">Cancel</Btn><Btn kind="primary" size="sm" icon="check">Publish</Btn></div>
                     : <Btn kind="accentGhost" size="sm" icon="plus">Write editorial</Btn>} />}>
      <div style={{ maxWidth:write?1000:760, margin:'0 auto' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:write?14:22 }}>
          <PlatformBadge p="LEETCODE" full />
          <h1 style={{ margin:0, fontFamily:T.fD, fontSize:24, fontWeight:600, color:T.text, letterSpacing:-0.5 }}>Two Sum</h1>
          <span style={{ fontFamily:T.fM, fontSize:11, color:T.text3 }}>· 3 editorials</span>
        </div>

        {write ? (
          <div>
            {/* toolbar */}
            <div style={{ display:'flex', alignItems:'center', gap:4, padding:'8px 10px', background:T.surface2,
              border:'1px solid '+T.border, borderTopLeftRadius:12, borderTopRightRadius:12 }}>
              {['H','B','i','“','</>','•','🔗'].map((b,i)=>(
                <span key={i} style={{ width:30, height:30, borderRadius:7, display:'grid', placeItems:'center',
                  fontFamily: b==='</>'?T.fM:T.fD, fontSize:13, fontWeight:600, color:T.text2, background:T.surface3, cursor:'pointer' }}>{b}</span>
              ))}
              <span style={{ marginLeft:'auto', fontFamily:T.fM, fontSize:10.5, color:T.text3 }}>Markdown · live preview →</span>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', border:'1px solid '+T.border, borderTop:'none',
              borderBottomLeftRadius:12, borderBottomRightRadius:12, overflow:'hidden', minHeight:560 }}>
              <div className="mono" style={{ fontSize:12.5, lineHeight:1.7, color:T.text2, padding:'18px 20px',
                background:T.surface, borderRight:'1px solid '+T.border, whiteSpace:'pre-wrap' }}>{ED_MD}<span className="fa-caret" /></div>
              <div style={{ padding:'18px 22px', background:T.bg, overflow:'hidden' }}><MDPreview small /></div>
            </div>
          </div>
        ) : (
          <article>
            <div style={{ display:'flex', alignItems:'center', gap:11, padding:'12px 16px', background:T.surface2,
              border:'1px solid '+T.border, borderRadius:12, marginBottom:24 }}>
              <Avatar name="Naol Kebede" size={36} />
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <span style={{ fontFamily:T.fD, fontSize:13.5, fontWeight:600, color:T.text }}>Naol Kebede</span>
                  <RoleBadge role="SQUAD_LEAD" size="sm" />
                </div>
                <div style={{ fontFamily:T.fM, fontSize:11, color:T.text3, marginTop:2 }}>Editorial · 2 days ago</div>
              </div>
              <Btn kind="ghost" size="sm" icon="copy">Share</Btn>
            </div>
            <MDPreview />
          </article>
        )}
      </div>
    </AppShell>
  );
}
Object.assign(window, { ScreenEditorial });
