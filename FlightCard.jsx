import { useState } from "react";
import { saveRoute } from "../services/api";
import { useAuth } from "../context/AuthContext";

const FlightCard = ({ result, mode: initialMode }) => {
  const { user } = useAuth();
  const [activeMode, setActiveMode] = useState(initialMode);

  const units = { distance: "km", cost: "₹", time: "min" };
  const icons = { distance: "📍", cost: "💸", time: "⚡" };
  const labels = { distance: "Shortest", cost: "Cheapest", time: "Fastest" };

  const handleSave = async () => {
    try {
      await saveRoute({
        from: result.path[0],
        to: result.path[result.path.length - 1],
        path: result.path,
        totalWeight: result.totalWeight,
        mode: activeMode,
      });
      alert("Route saved!");
    } catch {
      alert("Login to save routes");
    }
  };

  return (
    <div style={s.card}>
      {/* Header */}
      <div style={s.header}>
        <div>
          <div style={s.routeTitle}>
            {result.path[0]} → {result.path[result.path.length - 1]}
          </div>
          <div style={s.pathStops}>
            via {result.path.join(" → ")}
          </div>
        </div>
        {user && (
          <button onClick={handleSave} style={s.saveBtn}>
            💾 Save Route
          </button>
        )}
      </div>

      {/* Mode Switcher */}
      <div style={s.modeSwitcher}>
        {["distance", "cost", "time"].map((m) => (
          <button
            key={m}
            onClick={() => setActiveMode(m)}
            style={{
              ...s.modeBtn,
              ...(activeMode === m ? s.modeBtnActive : {}),
            }}
          >
            <span style={{ fontSize: "18px" }}>{icons[m]}</span>
            <span style={s.modeLbl}>{labels[m]}</span>
            <span style={{
              ...s.modeVal,
              color: activeMode === m ? "#3d7eff" : "rgba(255,255,255,0.4)"
            }}>
              {activeMode === m
                ? `${result.totalWeight} ${units[m]}`
                : "—"}
            </span>
          </button>
        ))}
      </div>

      {/* Active Result */}
      <div style={s.resultRow}>
        <div style={s.resultIcon}>{icons[activeMode]}</div>
        <div>
          <div style={s.resultLabel}>
            {labels[activeMode]} Route
          </div>
          <div style={s.resultValue}>
            {result.totalWeight}{" "}
            <span style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)" }}>
              {units[activeMode]}
            </span>
          </div>
        </div>
        <div style={s.stops}>
          {result.path.length - 1} stop{result.path.length - 1 !== 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
};

const s = {
  card: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    padding: "24px",
    marginTop: "24px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "20px",
  },
  routeTitle: {
    fontFamily: "'Syne',sans-serif",
    fontSize: "22px",
    fontWeight: 800,
    color: "#fff",
    marginBottom: "4px",
  },
  pathStops: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.35)",
  },
  saveBtn: {
    background: "rgba(61,126,255,0.15)",
    border: "1px solid rgba(61,126,255,0.3)",
    color: "#7aadff",
    padding: "8px 16px",
    borderRadius: "8px",
    fontSize: "13px",
    cursor: "pointer",
    fontFamily: "'DM Sans',sans-serif",
  },
  modeSwitcher: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "10px",
    marginBottom: "20px",
  },
  modeBtn: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "10px",
    padding: "14px 10px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
    transition: "all 0.2s",
    fontFamily: "'DM Sans',sans-serif",
  },
  modeBtnActive: {
    background: "rgba(61,126,255,0.12)",
    border: "1px solid rgba(61,126,255,0.4)",
  },
  modeLbl: {
    fontSize: "11px",
    color: "rgba(255,255,255,0.5)",
  },
  modeVal: {
    fontSize: "13px",
    fontWeight: 600,
  },
  resultRow: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    background: "rgba(61,126,255,0.08)",
    border: "1px solid rgba(61,126,255,0.2)",
    borderRadius: "10px",
    padding: "16px 20px",
  },
  resultIcon: {
    fontSize: "28px",
  },
  resultLabel: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.4)",
    marginBottom: "2px",
  },
  resultValue: {
    fontFamily: "'Syne',sans-serif",
    fontSize: "26px",
    fontWeight: 800,
    color: "#fff",
  },
  stops: {
    marginLeft: "auto",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "20px",
    padding: "4px 14px",
    fontSize: "12px",
    color: "rgba(255,255,255,0.5)",
  },
};

export default FlightCard;