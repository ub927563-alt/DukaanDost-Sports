import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    try {
      const logged = login(email, password);
      navigate(logged.role === "seller" ? "/seller" : "/");
    } catch (err) {
      setError(err.message);
    }
  };

  return <section className="auth-section"><div className="auth-card"><div className="auth-logo">🏆</div><span className="eyebrow">WELCOME BACK</span><h1>Login to DukaanDost</h1><p>Manage your orders and keep shopping.</p>{error && <div className="form-error">{error}</div>}<form onSubmit={submit}><label>Email<input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></label><label>Password<input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} /></label><button className="primary-button wide">Login</button></form><p className="auth-footer">New here? <Link to="/register">Create an account</Link></p><small className="demo-note">Seller demo: seller@test.com / Test@1234</small></div></section>;
}