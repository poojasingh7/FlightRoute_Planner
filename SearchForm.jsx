const airports = [
  "DEL", "BOM", "BLR", "CCU", "HYD", "MAA", "BBI",
  "JAI", "AMD", "LKO", "GOI", "COK", "TRV", "PAT",
  "GAU", "NAG", "BHO", "VNS", "JDH", "UDR", "IXM",
  "VTZ", "ATQ", "IXC", "PNQ", "STV", "MYQ", "IXE", "IXB", "VGA"
];

const SearchForm = ({ from, setFrom, to, setTo, mode, setMode, onSearch, loading }) => {
  return (
    <div style={styles.form}>
      <select value={from} onChange={(e) => setFrom(e.target.value)} style={styles.select}>
        <option value="">From</option>
        {airports.map((a) => <option key={a}>{a}</option>)}
      </select>

      <select value={to} onChange={(e) => setTo(e.target.value)} style={styles.select}>
        <option value="">To</option>
        {airports.map((a) => <option key={a}>{a}</option>)}
      </select>

      <select value={mode} onChange={(e) => setMode(e.target.value)} style={styles.select}>
        <option value="distance">Distance (km)</option>
        <option value="cost">Cost (₹)</option>
        <option value="time">Time (min)</option>
      </select>

      <button onClick={onSearch} style={styles.btn} disabled={loading}>
        {loading ? "Searching..." : "Search Route"}
      </button>
    </div>
  );
};

const styles = {
  form: { display:"flex", gap:"12px", flexWrap:"wrap", margin:"20px 0" },
  select: { padding:"10px", borderRadius:"6px", border:"1px solid #ccc", fontSize:"1rem" },
  btn: { padding:"10px 20px", background:"#1e3a5f", color:"white",
    border:"none", borderRadius:"6px", cursor:"pointer", fontSize:"1rem" },
};

export default SearchForm;