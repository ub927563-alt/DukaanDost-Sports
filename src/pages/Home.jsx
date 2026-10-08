import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">
              SPORTS ACCESSORIES • PAKISTAN
            </span>

            <h1>
              Play hard.
              <br />
              <span>Train harder.</span>
            </h1>

            <p>
              Quality sports accessories at student-friendly prices.
              Find what you need for cricket, football, badminton and fitness.
            </p>

            <div className="hero-buttons">
              <Link className="primary-button" to="/products">
                Shop Products →
              </Link>

              <a className="text-button" href="#categories">
                Explore Categories
              </a>
            </div>

            <div className="hero-stats">
              <div>
                <strong>{products.length}+</strong>
                <span>Products</span>
              </div>

              <div>
                <strong>COD</strong>
                <span>Available</span>
              </div>

              <div>
                <strong>24/7</strong>
                <span>Assistant</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-ring"></div>

            <div className="sports-ball">⚽</div>

            <div className="floating-card card-one">
              🏏 <span>Cricket Gear</span>
            </div>

            <div className="floating-card card-two">
              🏸 <span>Badminton</span>
            </div>

            <div className="floating-card card-three">
              👟 <span>Fitness</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="categories">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">SHOP YOUR GAME</span>
              <h2>Popular Categories</h2>
            </div>

            <Link to="/products" className="text-button">
              View all →
            </Link>
          </div>

          <div className="category-grid">
            {[
              ["⚽", "Football", "Match & training gear"],
              ["🏏", "Cricket", "Bats, balls & gloves"],
              ["🎾", "Tennis", "Rackets & accessories"],
              ["👟", "Shoes", "Sports footwear"]
            ].map(([icon, title, text]) => (
              <Link
                to={`/products?category=${title}`}
                className="category-card"
                key={title}
              >
                <span className="category-icon">{icon}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <span className="arrow">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section products-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">STUDENT PICKS</span>
              <h2>Featured Products</h2>
            </div>

            <Link to="/products" className="outline-button">
              See all products
            </Link>
          </div>

          <div className="product-grid">
            {products.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={{
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
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="trust-section">
        <div className="container trust-grid">
          <div>
            <span className="eyebrow">WHY DUKAANDOST?</span>
            <h2>Simple shopping for everyday players.</h2>
          </div>

          <div className="trust-items">
            <div>
              <span>✓</span>
              <strong>Student-friendly prices</strong>
              <p>Useful gear without unnecessary cost.</p>
            </div>

            <div>
              <span>✓</span>
              <strong>Cash on Delivery</strong>
              <p>Order comfortably from home.</p>
            </div>

            <div>
              <span>✓</span>
              <strong>Real product information</strong>
              <p>Prices and stock come from the store.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}