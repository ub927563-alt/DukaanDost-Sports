import { Link } from "react-router-dom";

export default function NotFound() {
  return <section className="section page-section"><div className="container empty-state"><div className="empty-icon">🏟️</div><h1>Page not found</h1><p>Looks like this page left the field.</p><Link className="primary-button" to="/">Go Home</Link></div></section>;
}