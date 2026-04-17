import SavedRoutes from "../components/SavedRoutes";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  return (
    <div style={{ maxWidth:"800px", margin:"40px auto", padding:"0 20px" }}>
      <h2>📋 My Saved Routes</h2>
      <SavedRoutes />
    </div>
  );
};

export default Dashboard;