import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/api";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await registerUser(form);
      setUser(res.data);
      navigate("/");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>
      <input placeholder="Name" style={styles.input}
        onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" style={styles.input}
        onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" style={styles.input}
        onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button onClick={handleSubmit} style={styles.btn}>Register</button>
      <p>Already have an account? <Link to="/login">Login</Link></p>
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

export default Register;