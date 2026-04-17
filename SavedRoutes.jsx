import { useEffect, useState } from "react";
import { getSavedRoutes, deleteRoute } from "../services/api";

const SavedRoutes = () => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    getSavedRoutes().then((res) => setRoutes(res.data)).catch(() => {});
  }, []);

  const handleDelete = async (id) => {
    await deleteRoute(id);
    setRoutes(routes.filter((r) => r._id !== id));
  };

  if (routes.length === 0) return <p>No saved routes yet.</p>;

  return (
    <div>
      {routes.map((r) => (
        <div key={r._id} style={styles.card}>
          <p><strong>{r.from} → {r.to}</strong> via {r.path.join(" → ")}</p>
          <p>Mode: {r.mode} | Total: {r.totalWeight}</p>
          <button onClick={() => handleDelete(r._id)} style={styles.btn}>🗑 Delete</button>
        </div>
      ))}
    </div>
  );
};

const styles = {
  card: { background:"#fff", border:"1px solid #ddd", padding:"14px",
    borderRadius:"8px", marginBottom:"12px" },
  btn: { padding:"6px 14px", background:"#e74c3c", color:"white",
    border:"none", borderRadius:"4px", cursor:"pointer" },
};

export default SavedRoutes;