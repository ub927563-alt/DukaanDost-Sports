import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => {
        const foundProduct = data.find(
          (item) => String(item.id) === String(id)
        );

        setProduct(foundProduct);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <section className="section page-section">
        <div className="container">
          <h2>Loading product...</h2>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="section page-section">
        <div className="container empty-state">
          <h2>Product not found</h2>

          <Link className="primary-button" to="/products">
            Back to products
          </Link>
        </div>
      </section>
    );
  }

  const productForCart = {
    ...product,
    title: product.name,
    stock: product.stock ?? 10,
    rating: product.rating ?? 4.5,
    emoji:
      product.category === "Football"
        ? "⚽"
        : product.category === "Cricket"
        ? "🏏"
        : product.category === "Tennis"
        ? "🎾"
        : "👟",
    description: `Quality ${product.category.toLowerCase()} equipment for sports and training.`
  };

  return (
    <section className="section page-section">
      <div className="container">

        <Link to="/products" className="back-link">
          ← Back to products
        </Link>

        <div className="detail-grid">

          <div className="detail-image">
            <span>{productForCart.emoji}</span>
            <small>{product.category}</small>
          </div>

          <div className="detail-copy">

            <span className="eyebrow">
              {product.category.toUpperCase()}
            </span>

            <h1>{product.name}</h1>

            <div className="detail-rating">
              ★ {productForCart.rating}
              <span>• {productForCart.stock} in stock</span>
            </div>

            <p className="detail-description">
              {productForCart.description}
            </p>

            <div className="detail-price">
              Rs. {product.price.toLocaleString()}
            </div>

            <div className="stock-note">
              ✓ In stock • Cash on Delivery available
            </div>

            <button
              className="primary-button wide"
              onClick={() => addToCart(productForCart)}
            >
              Add to Cart
            </button>

            <div className="info-box">
              <strong>Product reviews</strong>

              <p>
                Customers will see real reviews and sentiment badges here
                when the Node.js backend is connected.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}