import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-image">
        <span>{product.emoji}</span>
        <small>{product.category}</small>
      </Link>
      <div className="product-info">
        <div className="rating">★ {product.rating}</div>
        <Link to={`/products/${product.id}`} className="product-title">{product.title}</Link>
        <p>{product.description}</p>
        <div className="product-bottom">
          <strong>Rs. {product.price.toLocaleString()}</strong>
          <button className="add-button" onClick={() => addToCart(product)}>+ Cart</button>
        </div>
      </div>
    </article>
  );
}