import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();

  if (pathname === "/") return null;

  const bg     = dark ? "rgba(6,13,26,0.97)"  : "#ffffff";
  const border = dark ? "rgba(255,255,255,0.08)" : "#e5e7eb";
  const text   = dark ? "#e8eaf0"              : "#111827";
  const muted  = dark ? "rgba(255,255,255,0.45)" : "#6b7280";

  return (
    <nav style={{
      display:"flex", alignItems:"center", justifyContent:"space-between",
      padding:"14px 32px", background:bg,
      borderBottom:`1px solid ${border}`,
      position:"sticky", top:0, zIndex:100,
      backdropFilter:"blur(16px)",
      fontFamily:"'DM Sans',sans-serif",
    }}>
      {/* Logo */}
      <Link to="/" style={{
        fontFamily:"'Syne',sans-serif", fontWeight:800,
        fontSize:"19px", color:text, textDecoration:"none",
        display:"flex", alignItems:"center", gap:"8px",
      }}>
        <span style={{
          width:"28px", height:"28px",
          background:"linear-gradient(135deg,#3d7eff,#7b4fff)",
          borderRadius:"7px", display:"flex",
          alignItems:"center", justifyContent:"center", fontSize:"14px",
        }}>✈</span>
        Sky<span style={{color:"#3d7eff"}}>Route</span>
      </Link>

      {/* Nav Links */}
      <div style={{display:"flex", gap:"4px"}}>
        {[
          { label:"Home",               to:"/"          },
          { label:"Dijkstra Visualizer",to:"/dijkstra"  },
          ...(user ? [{ label:"My Bookings", to:"/dashboard" }] : []),
        ].map(({ label, to }) => (
          <Link key={to} to={to} style={{
            color: pathname === to ? "#3d7eff" : muted,
            fontSize:"13px", padding:"6px 14px",
            borderRadius:"20px", textDecoration:"none",
            background: pathname === to
              ? "rgba(61,126,255,0.12)" : "transparent",
            fontWeight: pathname === to ? 500 : 400,
            transition:"all 0.2s",
          }}>
            {label}
          </Link>
        ))}
      </div>

      {/* Right Side */}
      <div style={{display:"flex", alignItems:"center", gap:"10px"}}>

        {/* Theme Toggle */}
        <button onClick={toggle} style={{
          background: dark ? "rgba(255,255,255,0.06)" : "#f3f4f6",
          border:`1px solid ${border}`,
          color:text, borderRadius:"20px",
          padding:"6px 14px", fontSize:"13px",
          cursor:"pointer", fontFamily:"'DM Sans',sans-serif",
          display:"flex", alignItems:"center", gap:"6px",
          transition:"all 0.2s",
        }}>
          {dark ? "☀️ Light" : "🌙 Dark"}
        </button>

        {/* Auth Buttons */}
        {user ? (
          <button onClick={async () => { await logout(); navigate("/login"); }}
            style={{
              background:"rgba(239,68,68,0.1)",
              border:"1px solid rgba(239,68,68,0.25)",
              color:"#ef4444", padding:"7px 18px",
              borderRadius:"20px", fontSize:"13px",
              cursor:"pointer", fontFamily:"'DM Sans',sans-serif",
            }}>
            Logout
          </button>
        ) : (
          <>
            <button onClick={() => navigate("/register")} style={{
              background:"#3d7eff", border:"none", color:"#fff",
              padding:"7px 18px", borderRadius:"8px", fontSize:"13px",
              cursor:"pointer", fontFamily:"'DM Sans',sans-serif",
              fontWeight:500,
            }}>
              Sign Up
            </button>
            <button onClick={() => navigate("/login")} style={{
              background:"transparent", border:`1px solid ${border}`,
              color:text, padding:"7px 18px", borderRadius:"8px",
              fontSize:"13px", cursor:"pointer",
              fontFamily:"'DM Sans',sans-serif",
            }}>
              Login
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;