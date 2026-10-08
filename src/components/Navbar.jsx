import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const signOut = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand">
          <span className="brand-mark">D</span>
          <span>DukaanDost <b>Sports</b></span>
        </Link>

        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          {user && <NavLink to="/orders">My Orders</NavLink>}
          {user?.role === "seller" && <NavLink to="/seller">Seller</NavLink>}
        </nav>

        <div className="nav-actions">
          <Link to="/cart" className="cart-button" aria-label="Shopping cart">
            🛒 <span>{totalItems}</span>
          </Link>
          {user ? (
            <button className="outline-button small" onClick={signOut}>Logout</button>
          ) : (
            <>
              <Link className="outline-button small hide-mobile" to="/login">Login</Link>
              <Link className="primary-button small" to="/register">Join</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}