import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-brand">DukaanDost Sports</div>
          <p>Affordable sports accessories for students, players and fitness lovers across Pakistan.</p>
        </div>
        <div>
          <h4>Shop</h4>
          <Link to="/products">All Products</Link>
          <Link to="/products?category=Football">Football</Link>
          <Link to="/products?category=Cricket">Cricket</Link>
          <Link to="/products?category=Fitness">Fitness</Link>
        </div>
        <div>
          <h4>Support</h4>
          <span>Cash on Delivery</span>
          <span>Local Delivery</span>
          <span>WhatsApp Support</span>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 DukaanDost Sports</span>
        <span>Built as a student full-stack project</span>
      </div>
    </footer>
  );
}