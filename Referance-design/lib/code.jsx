// lib/code.jsx — lightweight syntax highlighter + code viewer chrome
// No code execution; display only. Tokenizer handles C++ / Python well enough
// for a dignified dark viewer. Themeable for the variation board.

const CODE_THEMES = {
  // signature — teal-keyed, calm
  focus: { name:'Focus Teal', bg:'#0c0f14', gutter:'#566', line:'#0e1219',
    kw:'#5fd0ff', fn:'#25d6c1', str:'#e3b341', num:'#ff9d6b', cmt:'#5a6472',
    type:'#a78bfa', punc:'#8a93a3', def:'#e9ebf0', op:'#7fd1c4' },
  // muted earthy — gentle on the eyes
  graphite: { name:'Graphite', bg:'#101216', gutter:'#4a525e', line:'#15181e',
    kw:'#c4b5fd', fn:'#7fd1c4', str:'#9bd07a', num:'#e9a86b', cmt:'#535b67',
    type:'#7fb3e3', punc:'#868d99', def:'#dfe3ea', op:'#aab2bd' },
  // high-contrast amber/cyan — "terminal"
  terminal: { name:'Terminal', bg:'#07090c', gutter:'#3f4a52', line:'#0b0f13',
    kw:'#ffb454', fn:'#36e0ce', str:'#aad94c', num:'#ff8f73', cmt:'#4d5763',
    type:'#73d0ff', punc:'#7a8694', def:'#e6e9ef', op:'#36e0ce' },
};

const KW = new Set(('int long double float char bool void auto const static return if else for while do break continue struct class public private template typename using namespace include define vector string pair map set unordered_map unordered_set queue stack priority_queue sort cin cout endl push_back size begin end true false nullptr new delete sizeof typedef enum switch case default def class import from as with lambda not and or in is None True False elif try except finally raise yield global print range len').split(' '));
const TYPES = new Set('int long double float char bool void auto vector string pair map set queue stack size_t ll ull'.split(' '));

function tokenizeLine(line, th) {
  // returns array of {t, c}
  const out = [];
  const re = /(\/\/.*$|#.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\b\d+\.?\d*\b)|([A-Za-z_]\w*)|(\s+)|([{}()\[\];,.])|([+\-*/%=<>!&|:?~^]+)/g;
  let m, last=0;
  while ((m = re.exec(line))) {
    if (m.index > last) out.push({ t: line.slice(last, m.index), c: th.def });
    last = re.lastIndex;
    if (m[1]) out.push({ t:m[1], c:th.cmt });
    else if (m[2]) out.push({ t:m[2], c:th.str });
    else if (m[3]) out.push({ t:m[3], c:th.num });
    else if (m[4]) {
      const w=m[4];
      const after = line.slice(re.lastIndex).match(/^\s*\(/);
      if (KW.has(w) && !TYPES.has(w)) out.push({ t:w, c:th.kw });
      else if (TYPES.has(w)) out.push({ t:w, c:th.type });
      else if (after) out.push({ t:w, c:th.fn });
      else out.push({ t:w, c:th.def });
    }
    else if (m[5]) out.push({ t:m[5], c:th.def });
    else if (m[6]) out.push({ t:m[6], c:th.punc });
    else if (m[7]) out.push({ t:m[7], c:th.op });
  }
  if (last < line.length) out.push({ t: line.slice(last), c: th.def });
  return out;
}

function CodeBlock({ code, theme='focus', startLine=1, highlight=[], fontSize=12.5, maxLines }) {
  const th = CODE_THEMES[theme] || CODE_THEMES.focus;
  let lines = code.replace(/\t/g,'  ').split('\n');
  if (maxLines) lines = lines.slice(0, maxLines);
  return (
    <div className="mono" style={{ background:th.bg, fontSize, lineHeight:1.65, overflow:'hidden' }}>
      {lines.map((ln, i) => {
        const hl = highlight.includes(startLine+i);
        return (
          <div key={i} style={{ display:'flex', background: hl?'rgba(243,181,60,0.07)':'transparent',
            boxShadow: hl?'inset 2px 0 0 '+th.kw:'none' }}>
            <span style={{ width:44, flexShrink:0, textAlign:'right', padding:'0 14px 0 0',
              color:th.gutter, userSelect:'none', background:th.line }}>{startLine+i}</span>
            <code style={{ padding:'0 16px', whiteSpace:'pre', flex:1 }}>
              {tokenizeLine(ln, th).map((tok,j)=>(<span key={j} style={{ color:tok.c }}>{tok.t}</span>))}
            </code>
          </div>
        );
      })}
    </div>
  );
}

// full viewer with chrome (file tab, copy button)
function CodeViewer({ code, lang='C++', file='solution.cpp', theme='focus', highlight=[], meta }) {
  const th = CODE_THEMES[theme] || CODE_THEMES.focus;
  return (
    <div style={{ borderRadius:12, overflow:'hidden', border:'1px solid '+T.border, background:th.bg }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px',
        borderBottom:'1px solid '+T.border, background:'rgba(255,255,255,0.02)' }}>
        <div style={{ display:'flex', gap:6 }}>
          {['#ff5f56','#ffbd2e','#27c93f'].map(c=>(<span key={c} style={{ width:10, height:10, borderRadius:5, background:c, opacity:0.85 }} />))}
        </div>
        <span className="mono" style={{ fontSize:12, color:T.text2, marginLeft:6 }}>{file}</span>
        <span style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:12 }}>
          {meta}
          <span className="mono" style={{ fontSize:11, color:T.text3 }}>{lang}</span>
          <button style={{ display:'inline-flex', alignItems:'center', gap:5, background:T.surface3,
            border:'1px solid '+T.border, color:T.text2, fontFamily:T.fM, fontSize:11, padding:'4px 9px',
            borderRadius:6, cursor:'pointer' }}><Icon name="copy" size={12} />Copy</button>
        </span>
      </div>
      <CodeBlock code={code} theme={theme} highlight={highlight} />
    </div>
  );
}

const SAMPLE_CPP = `#include <bits/stdc++.h>
using namespace std;

// Two Sum — hashmap, O(n)
vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int,int> seen;
    for (int i = 0; i < nums.size(); i++) {
        int need = target - nums[i];
        if (seen.count(need))
            return {seen[need], i};
        seen[nums[i]] = i;
    }
    return {};
}

int main() {
    int n, target;
    cin >> n >> target;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    auto r = twoSum(a, target);
    cout << r[0] << " " << r[1] << endl;
}`;

const SAMPLE_PY = `from collections import defaultdict

# Dijkstra — adjacency list, O(E log V)
def dijkstra(graph, src):
    dist = defaultdict(lambda: float('inf'))
    dist[src] = 0
    pq = [(0, src)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue
        for v, w in graph[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                heapq.heappush(pq, (dist[v], v))
    return dist`;

Object.assign(window, { CODE_THEMES, CodeBlock, CodeViewer, SAMPLE_CPP, SAMPLE_PY });
