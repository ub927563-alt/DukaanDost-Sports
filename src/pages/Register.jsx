import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    try {
      register(form);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return <section className="auth-section"><div className="auth-card"><div className="auth-logo">🏆</div><span className="eyebrow">JOIN THE STORE</span><h1>Create your account</h1><p>Register as a customer and start shopping.</p>{error && <div className="form-error">{error}</div>}<form onSubmit={submit}><label>Full name<input required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} /></label><label>Email<input type="email" required value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} /></label><label>Phone<input required value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} placeholder="03XXXXXXXXX" /></label><label>Password<input type="password" minLength="6" required value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} /></label><button className="primary-button wide">Create Account</button></form><p className="auth-footer">Already have an account? <Link to="/login">Login</Link></p></div></section>;
}