import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";

export default function Products() {
  const [params, setParams] = useSearchParams();

  const initial = params.get("category") || "All";

  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(initial);
  const [search, setSearch] = useState("");

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

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category))
  ];

  const changeCategory = (category) => {
    setSelected(category);

    if (category === "All") {
      setParams({});
    } else {
      setParams({ category });
    }
  };

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selected === "All" || product.category === selected;

      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [products, selected, search]);

  return (
    <section className="section page-section">
      <div className="container">

        <div className="page-header">
          <div>
            <span className="eyebrow">OUR STORE</span>
            <h1>Sports Accessories</h1>
            <p>Choose your game and find the gear you need.</p>
          </div>

          <input
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
          />
        </div>

        <CategoryFilter
          categories={categories}
          selected={selected}
          onChange={changeCategory}
        />

        <div className="results-line">
          <span>{filtered.length} products found</span>
          <span>Prices in PKR</span>
        </div>

        <div className="product-grid">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                ...product,
                title: product.name,
                stock: product.stock ?? 10,
                rating: product.rating ?? 4.5,
                emoji: product.category === "Football"
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

        {filtered.length === 0 && (
          <div className="empty-state">
            <h3>No products found</h3>
            <p>Try another category or search term.</p>
          </div>
        )}

      </div>
    </section>
  );
}