import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await loginUser(form);
      setUser(res.data);
      navigate("/");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <input placeholder="Email" style={styles.input}
        onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" style={styles.input}
        onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button onClick={handleSubmit} style={styles.btn}>Login</button>
      <p>No account? <Link to="/register">Register</Link></p>
    </div>
  );
};

const styles = {
  container: { maxWidth:"400px", margin:"80px auto", padding:"30px",
    boxShadow:"0 2px 12px rgba(0,0,0,0.1)", borderRadius:"10px" },
  input: { display:"block", width:"100%", padding:"10px", margin:"10px 0",
    borderRadius:"6px", border:"1px solid #ccc", fontSize:"1rem" },
  btn: { width:"100%", padding:"10px", background:"#1e3a5f", color:"white",
    border:"none", borderRadius:"6px", fontSize:"1rem", cursor:"pointer" },
};

export default Login;