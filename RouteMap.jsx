import { useState } from "react";
import { MapContainer, TileLayer, Polyline, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useTheme } from "../context/ThemeContext";

const airportCoords = {
  DEL:[28.5665,77.1031], BOM:[19.0896,72.8656], BLR:[13.1986,77.7066],
  CCU:[22.6520,88.4463], HYD:[17.2403,78.4294], MAA:[12.9941,80.1709],
  BBI:[20.2444,85.8176], JAI:[26.8242,75.8122], AMD:[23.0771,72.6341],
  LKO:[26.7606,80.8893], GOI:[15.3808,73.8314], COK:[10.1520,76.4019],
  TRV:[8.4821,76.9198],  PAT:[25.5913,85.0875], GAU:[26.1061,91.5859],
  NAG:[21.0922,79.0472], BHO:[23.2876,77.3372], VNS:[25.4524,82.8593],
  JDH:[26.2511,73.0489], UDR:[24.6177,73.8961], IXM:[9.8346,78.0934],
  VTZ:[17.7210,83.2245], ATQ:[31.7096,74.7973], IXC:[30.6735,76.7885],
  PNQ:[18.5822,73.9197], STV:[21.1141,72.7411], MYQ:[12.3008,76.6547],
  IXE:[12.9611,74.8900], IXB:[26.6812,88.3286], VGA:[16.5304,80.7972],
};

const tiles = {
  dark: {
    url:"https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    label:"🌙 Dark",
  },
  light: {
    url:"https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    label:"☀️ Light",
  },
  satellite: {
    url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    label:"🛰 Satellite",
  },
  terrain: {
    url:"https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    label:"🏔 Terrain",
  },
};

export default function RouteMap({ path }) {
  const { dark } = useTheme();
  const [mapStyle, setMapStyle] = useState(dark ? "dark" : "light");

  if (!path || path.length === 0) return null;
  const positions = path.map(c => airportCoords[c]).filter(Boolean);
  if (positions.length < 2) return null;
  const center = positions[Math.floor(positions.length / 2)];

  const cardBg  = dark ? "rgba(255,255,255,0.04)" : "#ffffff";
  const cardBdr = dark ? "rgba(255,255,255,0.1)"  : "#e2e8f0";
  const txt     = dark ? "#e8eaf0"                : "#111827";
  const muted   = dark ? "rgba(255,255,255,0.4)"  : "#6b7280";

  return (
    <div style={{ marginTop:"20px" }}>
      {/* Map Style Selector */}
      <div style={{
        display:"flex", alignItems:"center", justifyContent:"space-between",
        marginBottom:"12px", flexWrap:"wrap", gap:"10px",
      }}>
        <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700,
          fontSize:"15px", color:txt }}>
          🗺 Flight Path Map
        </div>
        <div style={{ display:"flex", gap:"6px" }}>
          {Object.entries(tiles).map(([key, val]) => (
            <button key={key} onClick={() => setMapStyle(key)} style={{
              padding:"6px 14px", borderRadius:"20px", fontSize:"12px",
              cursor:"pointer", fontFamily:"'DM Sans',sans-serif",
              border: mapStyle===key
                ? "1px solid #3d7eff"
                : `1px solid ${cardBdr}`,
              background: mapStyle===key
                ? dark ? "rgba(61,126,255,0.2)" : "rgba(61,126,255,0.1)"
                : cardBg,
              color: mapStyle===key ? "#3d7eff" : muted,
              transition:"all 0.2s",
            }}>{val.label}</button>
          ))}
        </div>
      </div>

      {/* Map */}
      <div style={{
        borderRadius:"14px", overflow:"hidden",
        border:`1px solid ${cardBdr}`,
        boxShadow: dark
          ? "0 4px 24px rgba(0,0,0,0.4)"
          : "0 4px 24px rgba(0,0,0,0.08)",
      }}>
        <MapContainer center={center} zoom={5}
          style={{ height:"420px", width:"100%" }}
          scrollWheelZoom={false}>
          <TileLayer
            key={mapStyle}
            url={tiles[mapStyle].url}
            attribution="&copy; CartoDB / ESRI / OpenTopoMap"
            maxZoom={19}
          />

          {/* Route polyline */}
          <Polyline positions={positions} pathOptions={{
            color:"#3d7eff", weight:3,
            opacity:0.9, dashArray:"8,6",
          }} />

          {/* Airport markers */}
          {path.map((code, i) => {
            const coords = airportCoords[code];
            if (!coords) return null;
            const isEndpoint = i === 0 || i === path.length - 1;
            return (
              <CircleMarker key={code} center={coords}
                radius={isEndpoint ? 10 : 7}
                pathOptions={{
                  color: isEndpoint ? "#3d7eff" : "#7aadff",
                  fillColor: isEndpoint ? "#3d7eff" : "#060d1a",
                  fillOpacity:1, weight:2,
                }}>
                <Tooltip permanent direction="top" offset={[0,-10]}>
                  <span style={{ fontSize:"11px", fontWeight:600 }}>{code}</span>
                </Tooltip>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </div>

      {/* Path summary below map */}
      <div style={{
        display:"flex", gap:"8px", marginTop:"12px",
        flexWrap:"wrap", alignItems:"center",
      }}>
        {path.map((code, i) => (
          <div key={code} style={{display:"flex", alignItems:"center", gap:"8px"}}>
            <div style={{
              background: i===0 || i===path.length-1
                ? dark ? "rgba(61,126,255,0.2)" : "#dbeafe"
                : dark ? "rgba(255,255,255,0.06)" : "#f1f5f9",
              border: i===0 || i===path.length-1
                ? "1px solid rgba(61,126,255,0.4)"
                : `1px solid ${cardBdr}`,
              borderRadius:"8px", padding:"5px 12px",
              fontFamily:"'Syne',sans-serif",
              fontWeight:700, fontSize:"13px",
              color: i===0 || i===path.length-1 ? "#3d7eff" : txt,
            }}>{code}</div>
            {i < path.length-1 && (
              <span style={{color:"#3d7eff", fontSize:"16px"}}>→</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}