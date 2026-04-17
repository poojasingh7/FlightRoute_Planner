import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const graph = {
  DEL: { BOM:1150, BLR:1740, CCU:1305, JAI:260,  AMD:940,  LKO:510  },
  BOM: { DEL:1150, BLR:845,  HYD:620,  GOI:450                        },
  BLR: { DEL:1740, BOM:845,  MAA:280,  HYD:500,  COK:360              },
  CCU: { DEL:1305, PAT:490,  GAU:900                                   },
  HYD: { BOM:620,  BLR:500,  MAA:520                                   },
  MAA: { BLR:280,  HYD:520,  COK:530                                   },
  JAI: { DEL:260,  AMD:680,  JDH:320                                   },
  AMD: { DEL:940,  BOM:530,  JAI:680                                   },
  LKO: { DEL:510,  PAT:260,  VNS:290                                   },
  GOI: { BOM:450,  BLR:580                                             },
  COK: { BLR:360,  MAA:530                                             },
  PAT: { CCU:490,  LKO:260,  VNS:250                                   },
  GAU: { CCU:900                                                        },
  VNS: { LKO:290,  PAT:250                                             },
  JDH: { JAI:320                                                        },
};

const airports = Object.keys(graph);

function runDijkstra(start, end) {
  const dist  = {};
  const prev  = {};
  const visited = new Set();
  const steps = [];

  airports.forEach(n => (dist[n] = Infinity));
  dist[start] = 0;

  while (true) {
    const unvisited = airports.filter(n => !visited.has(n));
    if (!unvisited.length) break;
    const current = unvisited.reduce((a, b) =>
      dist[a] < dist[b] ? a : b
    );
    if (dist[current] === Infinity || current === end) break;

    visited.add(current);
    steps.push({
      visiting: current,
      distances: { ...dist },
      visited: new Set(visited),
    });

    for (const neighbor in graph[current]) {
      const newDist = dist[current] + graph[current][neighbor];
      if (newDist < dist[neighbor]) {
        dist[neighbor] = newDist;
        prev[neighbor] = current;
      }
    }
  }

  const path = [];
  let curr = end;
  while (curr) { path.unshift(curr); curr = prev[curr]; }
  if (path[0] !== start) return { path: [], steps, dist };
  return { path, steps, dist };
}

export default function DijkstraPage() {
  const { dark } = useTheme();
  const [from,   setFrom]   = useState("DEL");
  const [to,     setTo]     = useState("BOM");
  const [result, setResult] = useState(null);
  const [step,   setStep]   = useState(0);
  const [running,setRunning]= useState(false);

  // Theme tokens
  const bg     = dark ? "#060d1a"                  : "#f0f4ff";
  const card   = dark ? "rgba(255,255,255,0.04)"   : "#ffffff";
  const border = dark ? "rgba(255,255,255,0.08)"   : "#e2e8f0";
  const text   = dark ? "#e8eaf0"                  : "#111827";
  const muted  = dark ? "rgba(255,255,255,0.38)"   : "#6b7280";
  const inputBg= dark ? "rgba(255,255,255,0.06)"   : "#f8fafc";

  const calculate = () => {
    const res = runDijkstra(from, to);
    setResult(res);
    setStep(0);
  };

  const animate = async () => {
    if (!result) return;
    setRunning(true);
    for (let i = 0; i <= result.steps.length; i++) {
      setStep(i);
      await new Promise(r => setTimeout(r, 550));
    }
    setRunning(false);
  };

  const curStep   = result?.steps[Math.min(step, result.steps.length - 1)];
  const finalPath = result?.path || [];
  const done      = result && step >= result.steps.length;

  const nodeColor = (node) => {
    if (!result) return card;
    if (done && finalPath.includes(node))
      return dark ? "rgba(61,126,255,0.25)" : "#dbeafe";
    if (curStep?.visiting === node)
      return dark ? "rgba(249,115,22,0.25)" : "#ffedd5";
    if (curStep?.visited?.has(node))
      return dark ? "rgba(34,197,94,0.18)"  : "#dcfce7";
    return card;
  };

  const nodeBorder = (node) => {
    if (!result) return border;
    if (done && finalPath.includes(node)) return "#3d7eff";
    if (curStep?.visiting === node)        return "#f97316";
    if (curStep?.visited?.has(node))       return "#22c55e";
    return border;
  };

  const sel = {
    background: inputBg,
    border: `1px solid ${border}`,
    borderRadius:"9px",
    color: text,
    padding:"10px 14px",
    fontSize:"13px",
    fontFamily:"'DM Sans',sans-serif",
    outline:"none",
    cursor:"pointer",
  };

  return (
    <div style={{ background:bg, minHeight:"100vh", padding:"36px 24px",
      fontFamily:"'DM Sans',sans-serif", color:text }}>
      <div style={{ maxWidth:"1000px", margin:"0 auto" }}>

        {/* ── Header ── */}
        <div style={{ marginBottom:"28px" }}>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:"30px",
            fontWeight:800, marginBottom:"6px", letterSpacing:"-0.5px" }}>
            ✦ Dijkstra Visualizer
          </h1>
          <p style={{ color:muted, fontSize:"14px" }}>
            Step-by-step shortest path across Indian airports
          </p>
        </div>

        {/* ── Controls ── */}
        <div style={{ background:card, border:`1px solid ${border}`,
          borderRadius:"14px", padding:"20px 24px", marginBottom:"24px",
          display:"flex", gap:"12px", flexWrap:"wrap", alignItems:"flex-end" }}>

          <div>
            <div style={{ fontSize:"10px", color:muted,
              letterSpacing:"1px", textTransform:"uppercase", marginBottom:"5px" }}>
              From
            </div>
            <select value={from} onChange={e => setFrom(e.target.value)} style={sel}>
              {airports.map(a => <option key={a}>{a}</option>)}
            </select>
          </div>

          <div style={{ fontSize:"20px", color:muted, paddingBottom:"8px" }}>→</div>

          <div>
            <div style={{ fontSize:"10px", color:muted,
              letterSpacing:"1px", textTransform:"uppercase", marginBottom:"5px" }}>
              To
            </div>
            <select value={to} onChange={e => setTo(e.target.value)} style={sel}>
              {airports.map(a => <option key={a}>{a}</option>)}
            </select>
          </div>

          <button onClick={calculate} style={{
            background:"#3d7eff", border:"none", color:"#fff",
            padding:"10px 22px", borderRadius:"9px", fontSize:"14px",
            cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontWeight:500,
          }}>
            Calculate
          </button>

          {result && (
            <button onClick={animate} disabled={running} style={{
              background: dark ? "rgba(255,255,255,0.06)" : "#f1f5f9",
              border:`1px solid ${border}`, color:text,
              padding:"10px 22px", borderRadius:"9px", fontSize:"14px",
              cursor:"pointer", fontFamily:"'DM Sans',sans-serif",
              opacity: running ? 0.6 : 1,
            }}>
              {running ? "⏳ Running..." : "▶ Animate"}
            </button>
          )}

          {result && (
            <button onClick={() => { setResult(null); setStep(0); }} style={{
              background:"transparent", border:`1px solid ${border}`,
              color:muted, padding:"10px 18px", borderRadius:"9px",
              fontSize:"13px", cursor:"pointer",
              fontFamily:"'DM Sans',sans-serif",
            }}>
              Reset
            </button>
          )}
        </div>

        {/* ── Step Slider ── */}
        {result && (
          <div style={{ background:card, border:`1px solid ${border}`,
            borderRadius:"12px", padding:"16px 20px", marginBottom:"20px" }}>
            <div style={{ display:"flex", justifyContent:"space-between",
              marginBottom:"10px" }}>
              <span style={{ fontSize:"13px", color:muted }}>
                Step {Math.min(step, result.steps.length)} of {result.steps.length}
              </span>
              {curStep && (
                <span style={{ fontSize:"13px" }}>
                  Visiting:{" "}
                  <strong style={{ color:"#f97316" }}>{curStep.visiting}</strong>
                </span>
              )}
              {done && (
                <span style={{ fontSize:"13px", color:"#3d7eff", fontWeight:600 }}>
                  ✓ Done!
                </span>
              )}
            </div>
            <input type="range" min={0} max={result.steps.length}
              value={step} onChange={e => setStep(+e.target.value)}
              style={{ width:"100%", accentColor:"#3d7eff" }} />
          </div>
        )}

        {/* ── Legend ── */}
        <div style={{ display:"flex", gap:"20px", marginBottom:"18px",
          flexWrap:"wrap" }}>
          {[
            { color:"#f97316", label:"Currently visiting" },
            { color:"#22c55e", label:"Already visited"    },
            { color:"#3d7eff", label:"Final shortest path"},
            { color: dark ? "rgba(255,255,255,0.06)" : "#f1f5f9",
              label:"Not yet visited", bordered:true },
          ].map(({ color, label, bordered }) => (
            <div key={label} style={{ display:"flex", alignItems:"center", gap:"7px" }}>
              <div style={{
                width:"14px", height:"14px", borderRadius:"4px",
                background:color,
                border: bordered ? `1px solid ${border}` : "none",
              }} />
              <span style={{ fontSize:"12px", color:muted }}>{label}</span>
            </div>
          ))}
        </div>

        {/* ── Node Grid ── */}
        <div style={{ display:"grid",
          gridTemplateColumns:"repeat(auto-fill, minmax(140px, 1fr))",
          gap:"10px", marginBottom:"24px" }}>
          {airports.map(node => {
            const dist = curStep?.distances?.[node] ?? result?.dist?.[node];
            return (
              <div key={node} style={{
                background: nodeColor(node),
                border:`1px solid ${nodeBorder(node)}`,
                borderRadius:"11px", padding:"14px",
                transition:"all 0.35s ease",
                position:"relative",
              }}>
                {/* Airport code */}
                <div style={{ fontFamily:"'Syne',sans-serif",
                  fontWeight:800, fontSize:"16px", marginBottom:"6px" }}>
                  {node}
                </div>

                {/* Distance */}
                <div style={{ fontSize:"11px", color:muted, marginBottom:"3px" }}>
                  Distance
                </div>
                <div style={{ fontSize:"14px", fontWeight:600,
                  color: dist === Infinity || dist == null ? muted : text }}>
                  {dist === Infinity || dist == null ? "∞" : `${dist} km`}
                </div>

                {/* Neighbors */}
                <div style={{ fontSize:"10px", color:muted, marginTop:"6px" }}>
                  {Object.keys(graph[node]).join(", ")}
                </div>

                {/* Active indicator */}
                {curStep?.visiting === node && (
                  <div style={{
                    position:"absolute", top:"8px", right:"8px",
                    width:"8px", height:"8px", borderRadius:"50%",
                    background:"#f97316",
                  }} />
                )}
                {done && finalPath.includes(node) && (
                  <div style={{
                    position:"absolute", top:"8px", right:"8px",
                    width:"8px", height:"8px", borderRadius:"50%",
                    background:"#3d7eff",
                  }} />
                )}
              </div>
            );
          })}
        </div>

        {/* ── Distance Table ── */}
        {result && (
          <div style={{ background:card, border:`1px solid ${border}`,
            borderRadius:"14px", padding:"20px 24px", marginBottom:"24px" }}>
            <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700,
              fontSize:"15px", marginBottom:"14px" }}>
              Distance Table
            </div>
            <div style={{ display:"grid",
              gridTemplateColumns:"repeat(auto-fill, minmax(130px, 1fr))",
              gap:"8px" }}>
              {airports.map(node => {
                const d = curStep?.distances?.[node] ?? result.dist[node];
                const inPath = done && finalPath.includes(node);
                return (
                  <div key={node} style={{
                    display:"flex", justifyContent:"space-between",
                    alignItems:"center",
                    padding:"8px 12px", borderRadius:"8px",
                    background: inPath
                      ? dark ? "rgba(61,126,255,0.12)" : "#eff6ff"
                      : dark ? "rgba(255,255,255,0.03)" : "#f8fafc",
                    border:`1px solid ${inPath ? "#3d7eff" : border}`,
                  }}>
                    <span style={{ fontWeight:600, fontSize:"13px" }}>{node}</span>
                    <span style={{ fontSize:"13px", color: d === Infinity ? muted : "#3d7eff" }}>
                      {d === Infinity ? "∞" : d}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Final Result ── */}
        {done && finalPath.length > 0 && (
          <div style={{
            background: dark ? "rgba(61,126,255,0.1)" : "#eff6ff",
            border:"1px solid rgba(61,126,255,0.35)",
            borderRadius:"14px", padding:"24px",
          }}>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"20px",
              fontWeight:800, color:"#3d7eff", marginBottom:"10px" }}>
              ✈ Shortest Path Found!
            </div>
            <div style={{ display:"flex", gap:"8px", flexWrap:"wrap",
              alignItems:"center", marginBottom:"12px" }}>
              {finalPath.map((node, i) => (
                <div key={node} style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                  <div style={{
                    background: dark ? "rgba(61,126,255,0.2)" : "#dbeafe",
                    border:"1px solid rgba(61,126,255,0.4)",
                    borderRadius:"8px", padding:"6px 14px",
                    fontFamily:"'Syne',sans-serif",
                    fontWeight:700, fontSize:"15px", color:"#3d7eff",
                  }}>
                    {node}
                  </div>
                  {i < finalPath.length - 1 && (
                    <span style={{ color:"#3d7eff", fontSize:"18px" }}>→</span>
                  )}
                </div>
              ))}
            </div>
            <div style={{ fontSize:"15px", color:muted }}>
              Total distance:{" "}
              <strong style={{ color:text, fontSize:"18px" }}>
                {result.dist[to]} km
              </strong>
              {"  ·  "}
              {finalPath.length - 1} stop{finalPath.length - 1 !== 1 ? "s" : ""}
            </div>
          </div>
        )}

        {done && finalPath.length === 0 && (
          <div style={{
            background: dark ? "rgba(239,68,68,0.08)" : "#fef2f2",
            border:"1px solid rgba(239,68,68,0.3)",
            borderRadius:"12px", padding:"18px 22px", color:"#ef4444",
          }}>
            No path found between {from} and {to}
          </div>
        )}
      </div>
    </div>
  );
}