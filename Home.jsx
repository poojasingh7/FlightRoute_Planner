import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FlightCard from "../components/FlightCard";
import RouteMap from "../components/RouteMap";
import { searchFlight } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const airports = [
  {code:"DEL",name:"New Delhi"},{code:"BOM",name:"Mumbai"},
  {code:"BLR",name:"Bengaluru"},{code:"CCU",name:"Kolkata"},
  {code:"HYD",name:"Hyderabad"},{code:"MAA",name:"Chennai"},
  {code:"JAI",name:"Jaipur"},{code:"AMD",name:"Ahmedabad"},
  {code:"COK",name:"Kochi"},{code:"GOI",name:"Goa"},
  {code:"LKO",name:"Lucknow"},{code:"TRV",name:"Trivandrum"},
  {code:"PAT",name:"Patna"},{code:"NAG",name:"Nagpur"},
  {code:"VNS",name:"Varanasi"},{code:"BBI",name:"Bhubaneswar"},
  {code:"ATQ",name:"Amritsar"},{code:"IXC",name:"Chandigarh"},
  {code:"JDH",name:"Jodhpur"},{code:"UDR",name:"Udaipur"},
];

const ads = [
  {
    city:"City of Dreams",
    name:"Mumbai",
    tag:"Business hubs & Marine Drive",
    price:"From ₹2,200",
    route:"DEL→BOM",
    img:"https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1200&q=80",
    icon:"🏙",
    miniIcon:"🏙",
    miniLabel:"Mumbai",
  },
  {
    city:"Land of Buddha",
    name:"Bodh Gaya",
    tag:"Sacred temples, peace & enlightenment",
    price:"From ₹1,200",
    route:"DEL→PAT",
    img:"https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1200&q=80",
    icon:"🛕",
    miniIcon:"🛕",
    miniLabel:"Bodh Gaya",
  },
 {
    city:"Ancient Capital",
    name:"Patna",
    tag:"History, Ganga ghats & Sonepur fair",
    price:"From ₹1,100",
    route:"DEL→PAT",
    img:"https://www.bihartrip.com/pub/media/destination/patna/bihartrip.com-77.jpg",
    icon:"🏛",
    miniIcon:"🏛",
    miniLabel:"Patna",
  },
 {
    city:"Spiritual Bihar",
    name:"Vaishali",
    tag:"Birthplace of Lord Mahavira & Buddha",
    price:"From ₹1,300",
    route:"DEL→PAT",
    img:"https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80",
    icon:"☸️",
    miniIcon:"☸️",
    miniLabel:"Vaishali",
  },
  {
    city:"Pink City",
    name:"Jaipur",
    tag:"Forts, palaces & royal cuisine",
    price:"From ₹1,500",
    route:"DEL→JAI",
    img:"https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200&q=80",
    icon:"🏯",
    miniIcon:"🏯",
    miniLabel:"Jaipur",
  },
  {
    city:"God's Own Country",
    name:"Kerala",
    tag:"Backwaters & serene beaches",
    price:"From ₹1,800",
    route:"BLR→COK",
    img:"https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&q=80",
    icon:"🌴",
    miniIcon:"🌴",
    miniLabel:"Kerala",
  },
  {
    city:"Sun & Sand",
    name:"Goa",
    tag:"Beaches, nightlife & seafood",
    price:"From ₹2,500",
    route:"DEL→GOI",
    img:"https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80",
    icon:"🏖",
    miniIcon:"🏖",
    miniLabel:"Goa",
  },
];

export default function Home() {
  const { dark, toggle } = useTheme();
  const [from,    setFrom]    = useState("");
  const [to,      setTo]      = useState("");
  const [mode,    setMode]    = useState("cost");
  const [tab,     setTab]     = useState("One Way");
  const [result,  setResult]  = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const [adIdx,   setAdIdx]   = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();

 useEffect(() => {
  const t = setInterval(() => setAdIdx(i => (i + 1) % ads.length), 4000);
  return () => clearInterval(t);
}, []);

  const handleSearch = async () => {
    if (!from || !to) return setError("Please select From and To airports");
    if (from === to)  return setError("From and To cannot be the same");
    setError(""); setLoading(true);
    try {
      const res = await searchFlight(from, to, mode);
      setResult(res.data);
    } catch { setError("No route found between these airports"); }
    setLoading(false);
  };

  const ad = ads[adIdx];

  // ── Theme tokens ──
  const bg      = dark ? "#060d1a"                  : "#f0f4ff";
  const navBg   = dark ? "rgba(6,13,26,0.95)"       : "rgba(255,255,255,0.95)";
  const navBdr  = dark ? "rgba(255,255,255,0.08)"   : "#e2e8f0";
  const txt     = dark ? "#e8eaf0"                  : "#111827";
  const muted   = dark ? "rgba(255,255,255,0.45)"   : "#6b7280";
  const cardBg  = dark ? "rgba(255,255,255,0.05)"   : "#ffffff";
  const cardBdr = dark ? "rgba(255,255,255,0.1)"    : "#e2e8f0";
  const inputBg = dark ? "rgba(255,255,255,0.06)"   : "#f8fafc";
  const panelBg = dark ? "rgba(8,15,28,0.97)"       : "#ffffff";
  const tabsBg  = dark ? "rgba(0,0,0,0.3)"          : "#f1f5f9";
  const optBg   = dark ? "rgba(255,255,255,0.04)"   : "#f8fafc";

  return (
    <div style={{
      background: bg, minHeight:"100vh",
      color: txt, fontFamily:"'DM Sans',sans-serif",
      transition:"background 0.3s, color 0.3s",
    }}>

      {/* ══════════════════════════════
          NAV
      ══════════════════════════════ */}
      <nav style={{
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"16px 36px", background: navBg,
        backdropFilter:"blur(16px)",
        borderBottom:`1px solid ${navBdr}`,
        position:"sticky", top:0, zIndex:100,
      }}>
        {/* Logo */}
        <div style={{
          fontFamily:"'Syne',sans-serif", fontWeight:800,
          fontSize:"19px", color:txt,
          display:"flex", alignItems:"center", gap:"8px",
        }}>
          <div style={{
            width:"30px", height:"30px",
            background:"linear-gradient(135deg,#3d7eff,#7b4fff)",
            borderRadius:"8px", display:"flex",
            alignItems:"center", justifyContent:"center", fontSize:"15px",
          }}>✈</div>
          Sky<span style={{color:"#3d7eff"}}>Route</span>
        </div>

        {/* Nav links */}
        <div style={{display:"flex", gap:"4px"}}>
          {["Home","Reservations","My Bookings","Admin"].map(l => (
            <button key={l} style={{
              fontSize:"13px", color:muted, cursor:"pointer",
              border:"none", background:"none",
              fontFamily:"'DM Sans',sans-serif",
              padding:"4px 12px", borderRadius:"20px",
            }}>{l}</button>
          ))}
          <button onClick={() => navigate("/dijkstra")} style={{
            fontSize:"13px", color:"#3d7eff", cursor:"pointer",
            border:"1px solid rgba(61,126,255,0.3)",
            background:"rgba(61,126,255,0.08)",
            fontFamily:"'DM Sans',sans-serif",
            padding:"4px 14px", borderRadius:"20px",
          }}>Dijkstra ✦</button>
        </div>

        {/* Right: theme + auth */}
        <div style={{display:"flex", alignItems:"center", gap:"8px"}}>
          <button onClick={toggle} style={{
            background: dark ? "rgba(255,255,255,0.08)" : "#f1f5f9",
            border:`1px solid ${navBdr}`, color:txt,
            borderRadius:"20px", padding:"6px 14px", fontSize:"13px",
            cursor:"pointer", fontFamily:"'DM Sans',sans-serif",
            display:"flex", alignItems:"center", gap:"6px",
            transition:"all 0.2s",
          }}>
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>

          {user ? (
            <button onClick={() => navigate("/dashboard")} style={{
              background:"rgba(61,126,255,0.15)",
              border:"1px solid rgba(61,126,255,0.3)",
              color:"#3d7eff", padding:"7px 18px", borderRadius:"8px",
              fontSize:"13px", cursor:"pointer",
              fontFamily:"'DM Sans',sans-serif",
            }}>My Bookings</button>
          ) : (
            <>
              <button onClick={() => navigate("/register")} style={{
                background:"#3d7eff", border:"none", color:"#fff",
                padding:"7px 18px", borderRadius:"8px", fontSize:"13px",
                cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontWeight:500,
              }}>Sign Up</button>
              <button onClick={() => navigate("/login")} style={{
                background:"transparent", border:`1px solid ${navBdr}`,
                color:txt, padding:"7px 18px", borderRadius:"8px",
                fontSize:"13px", cursor:"pointer",
                fontFamily:"'DM Sans',sans-serif",
              }}>Login</button>
            </>
          )}
        </div>
      </nav>

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <div style={{
        display:"grid", gridTemplateColumns:"1fr 400px",
        minHeight:"580px", position:"relative",
      }}>

        {/* ── LEFT AD PANEL ── */}
        <div style={{
          position:"relative", overflow:"hidden",
          backgroundImage:`url(${ad.img})`,
          backgroundSize:"cover",
          backgroundPosition:"center",
          transition:"background-image 0.8s ease",
        }}>

          {/* Dark overlay for readability */}
          <div style={{
            position:"absolute", inset:0, zIndex:1,
            background: dark
              ? "linear-gradient(135deg,rgba(6,13,26,0.6) 0%,rgba(6,13,26,0.25) 50%,rgba(6,13,26,0.15) 100%)"
              : "linear-gradient(135deg,rgba(0,0,0,0.45) 0%,rgba(0,0,0,0.2) 50%,rgba(0,0,0,0.1) 100%)",
          }} />

          {/* Bottom gradient for text readability */}
          <div style={{
            position:"absolute", bottom:0, left:0, right:"80px",
            height:"280px", zIndex:2,
            background:"linear-gradient(to top,rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.4) 60%,transparent 100%)",
          }} />

          {/* Slide counter */}
          <div style={{
            position:"absolute", top:"20px", left:"20px", zIndex:5,
            background:"rgba(0,0,0,0.45)",
            border:"1px solid rgba(255,255,255,0.15)",
            borderRadius:"8px", padding:"5px 12px",
            fontSize:"12px", color:"rgba(255,255,255,0.7)",
            backdropFilter:"blur(8px)",
          }}>{adIdx + 1} / {ads.length}</div>

          {/* Dot indicators */}
          <div style={{
            position:"absolute", bottom:"110px", right:"90px",
            display:"flex", flexDirection:"column", gap:"6px", zIndex:5,
          }}>
            {ads.map((_,i) => (
              <div key={i} onClick={() => setAdIdx(i)} style={{
                width:"6px",
                height: i===adIdx ? "20px" : "6px",
                borderRadius:"3px", cursor:"pointer",
                background: i===adIdx
                  ? "#3d7eff"
                  : "rgba(255,255,255,0.3)",
                transition:"all 0.3s",
              }} />
            ))}
          </div>

          {/* Mini ads strip */}
          <div style={{
            position:"absolute", right:0, top:0, bottom:0, width:"80px",
            background:"rgba(0,0,0,0.45)",
            borderLeft:"1px solid rgba(255,255,255,0.08)",
            display:"flex", flexDirection:"column", zIndex:4,
            backdropFilter:"blur(12px)",
          }}>
            {ads.map((a,i) => (
              <div key={i} onClick={() => setAdIdx(i)} style={{
                flex:1, cursor:"pointer",
                display:"flex", alignItems:"center",
                justifyContent:"center", flexDirection:"column", gap:"4px",
                borderBottom:"1px solid rgba(255,255,255,0.06)",
                padding:"8px 4px",
                background: i===adIdx
                  ? "rgba(61,126,255,0.25)"
                  : "transparent",
                borderRight: i===adIdx ? "2px solid #3d7eff" : "2px solid transparent",
                transition:"all 0.2s",
              }}>
                <span style={{fontSize:"22px"}}>{a.miniIcon}</span>
                <span style={{
                  fontSize:"9px",
                  color: i===adIdx ? "#fff" : "rgba(255,255,255,0.4)",
                  textAlign:"center", lineHeight:1.2,
                }}>{a.miniLabel}</span>
              </div>
            ))}
          </div>

          {/* Ad Content */}
          <div style={{
            position:"absolute", bottom:0, left:0,
            right:"80px", zIndex:3,
            padding:"36px 36px 32px",
          }}>
            {/* Tag badge */}
            <div style={{
              display:"inline-flex", alignItems:"center", gap:"6px",
              background:"rgba(61,126,255,0.25)",
              border:"1px solid rgba(61,126,255,0.4)",
              color:"#7aadff", fontSize:"11px",
              padding:"4px 12px", borderRadius:"100px",
              marginBottom:"12px",
              backdropFilter:"blur(8px)",
            }}>✦ {ad.city}</div>

            {/* City name */}
            <div style={{
              fontFamily:"'Syne',sans-serif",
              fontSize:"42px", fontWeight:800,
              color:"#ffffff",
              lineHeight:1.0, letterSpacing:"-1.5px",
              marginBottom:"8px",
              textShadow:"0 2px 20px rgba(0,0,0,0.5)",
            }}>{ad.name}</div>

            {/* Tagline */}
            <div style={{
              fontSize:"14px",
              color:"rgba(255,255,255,0.7)",
              marginBottom:"20px",
            }}>{ad.tag}</div>

            {/* Price row */}
            <div style={{
              display:"flex", alignItems:"center", gap:"12px",
            }}>
              <div>
                <div style={{
                  fontFamily:"'Syne',sans-serif",
                  fontSize:"28px", fontWeight:700, color:"#ffffff",
                  textShadow:"0 2px 10px rgba(0,0,0,0.4)",
                }}>{ad.price}</div>
                <div style={{
                  fontSize:"12px",
                  color:"rgba(255,255,255,0.5)",
                }}>{ad.route} · One way</div>
              </div>
              <button style={{
                background:"#3d7eff", color:"#fff", border:"none",
                padding:"10px 22px", borderRadius:"8px", fontSize:"13px",
                fontFamily:"'DM Sans',sans-serif", fontWeight:500,
                cursor:"pointer", marginLeft:"auto",
                boxShadow:"0 4px 16px rgba(61,126,255,0.4)",
              }}>Book Now →</button>
            </div>
          </div>
        </div>

        {/* ── RIGHT SEARCH PANEL ── */}
        <div style={{
          background: panelBg,
          borderLeft:`1px solid ${cardBdr}`,
          padding:"32px 28px",
          display:"flex", flexDirection:"column",
          justifyContent:"center",
          transition:"background 0.3s",
        }}>
          <div style={{
            fontFamily:"'Syne',sans-serif", fontSize:"22px",
            fontWeight:700, color:txt, marginBottom:"4px",
            letterSpacing:"-0.5px",
          }}>Find Your Flight</div>
          <div style={{
            fontSize:"13px", color:muted, marginBottom:"24px",
          }}>30 Indian airports · Dijkstra routing</div>

          {/* Tabs */}
          <div style={{
            display:"flex", gap:"4px", marginBottom:"20px",
            background:tabsBg, borderRadius:"10px", padding:"4px",
          }}>
            {["One Way","Round Trip","Multi-City"].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                flex:1,
                background: tab===t ? "#3d7eff" : "transparent",
                border:"none",
                color: tab===t ? "#fff" : muted,
                padding:"7px 10px", borderRadius:"7px", fontSize:"12px",
                fontFamily:"'DM Sans',sans-serif", cursor:"pointer",
                transition:"all 0.2s",
              }}>{t}</button>
            ))}
          </div>

          {/* FROM */}
          <div style={{marginBottom:"14px"}}>
            <div style={{
              fontSize:"10px", color:muted,
              textTransform:"uppercase", letterSpacing:"1px",
              marginBottom:"5px",
            }}>FROM</div>
            <select value={from} onChange={e => setFrom(e.target.value)} style={{
              background:inputBg, border:`1px solid ${cardBdr}`,
              borderRadius:"9px", padding:"11px 13px", color:txt,
              fontSize:"14px", fontFamily:"'DM Sans',sans-serif",
              width:"100%", outline:"none", appearance:"none",
              cursor:"pointer",
            }}>
              <option value="">Select origin</option>
              {airports.map(a =>
                <option key={a.code} value={a.code}>
                  {a.code} — {a.name}
                </option>
              )}
            </select>
          </div>

          {/* TO */}
          <div style={{marginBottom:"14px"}}>
            <div style={{
              fontSize:"10px", color:muted,
              textTransform:"uppercase", letterSpacing:"1px",
              marginBottom:"5px",
            }}>TO</div>
            <select value={to} onChange={e => setTo(e.target.value)} style={{
              background:inputBg, border:`1px solid ${cardBdr}`,
              borderRadius:"9px", padding:"11px 13px", color:txt,
              fontSize:"14px", fontFamily:"'DM Sans',sans-serif",
              width:"100%", outline:"none", appearance:"none",
              cursor:"pointer",
            }}>
              <option value="">Select destination</option>
              {airports.map(a =>
                <option key={a.code} value={a.code}>
                  {a.code} — {a.name}
                </option>
              )}
            </select>
          </div>

          {/* OPTIMISE */}
          <div style={{
            fontSize:"10px", color:muted,
            textTransform:"uppercase", letterSpacing:"1px",
            marginBottom:"8px",
          }}>OPTIMISE FOR</div>
          <div style={{display:"flex", gap:"6px", marginBottom:"18px"}}>
            {[
              ["cost","💸","Cheapest"],
              ["time","⚡","Fastest"],
              ["distance","📍","Shortest"],
            ].map(([val,icon,lbl]) => (
              <button key={val} onClick={() => setMode(val)} style={{
                flex:1,
                background: mode===val
                  ? dark ? "rgba(61,126,255,0.15)" : "rgba(61,126,255,0.1)"
                  : optBg,
                border: mode===val
                  ? "1px solid rgba(61,126,255,0.4)"
                  : `1px solid ${cardBdr}`,
                color: mode===val ? "#7aadff" : muted,
                padding:"8px 6px", borderRadius:"8px", fontSize:"11px",
                fontFamily:"'DM Sans',sans-serif", cursor:"pointer",
                transition:"all 0.2s", textAlign:"center",
              }}>{icon} {lbl}</button>
            ))}
          </div>

          {error && (
            <p style={{color:"#ef4444", fontSize:"12px", marginBottom:"10px"}}>
              {error}
            </p>
          )}

          {/* Search Button */}
          <button onClick={handleSearch} style={{
            width:"100%", background:"#3d7eff",
            color:"#fff", border:"none",
            borderRadius:"10px", padding:"13px", fontSize:"15px",
            fontFamily:"'Syne',sans-serif", fontWeight:700,
            cursor:"pointer", transition:"background 0.2s",
            boxShadow:"0 4px 16px rgba(61,126,255,0.3)",
          }}>
            {loading ? "Searching..." : "Search Flights →"}
          </button>

          {/* Promo strip */}
          <div style={{display:"flex", gap:"8px", marginTop:"16px"}}>
            {[
              ["30+","Airports"],
              ["No fees","Free booking"],
              ["Instant","Routes"],
            ].map(([s,l]) => (
              <div key={s} style={{
                flex:1,
                background: dark ? "rgba(255,255,255,0.03)" : "#f8fafc",
                border:`1px solid ${cardBdr}`,
                borderRadius:"8px", padding:"8px 10px",
                fontSize:"11px", color:muted,
                textAlign:"center", lineHeight:1.3,
              }}>
                <strong style={{
                  display:"block",
                  color: dark ? "rgba(255,255,255,0.7)" : "#374151",
                  fontSize:"12px", marginBottom:"2px",
                }}>{s}</strong>
                {l}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════
          RESULTS SECTION
      ══════════════════════════════ */}
      {result && (
        <div style={{
          maxWidth:"900px", margin:"32px auto",
          padding:"0 24px",
        }}>
          <FlightCard result={result} mode={mode} />
          <RouteMap path={result.path} />
        </div>
      )}
    </div>
  );
}