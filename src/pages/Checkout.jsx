import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Checkout() {
  const { cart, totalAmount, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: "",
    city: "Faisalabad",
    address: ""
  });

  const [error, setError] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);

  if (!cart.length) {
    return (
      <section className="section page-section">
        <div className="container empty-state">
          <h2>Your cart is empty.</h2>

          <Link
            className="primary-button"
            to="/products"
          >
            Shop Products
          </Link>
        </div>
      </section>
    );
  }

  const submit = async (e) => {
    e.preventDefault();

    setError("");
    setPlacingOrder(true);

    if (!/^03\d{9}$/.test(form.phone)) {
      setError(
        "Enter a valid Pakistani mobile number in the format 03XXXXXXXXX."
      );
      setPlacingOrder(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            customerName: form.name,
            phone: form.phone,
            address: `${form.address}, ${form.city}`,
            items: cart.map((item) => ({
              name: item.title,
              price: item.price,
              quantity: item.quantity
            })),
            total: totalAmount
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to place order.");
        setPlacingOrder(false);
        return;
      }

      clearCart();

      navigate("/orders");
    } catch (error) {
      console.error("Place order error:", error);

      setError(
        "Could not connect to the backend. Make sure the backend server is running."
      );

      setPlacingOrder(false);
    }
  };

  return (
    <section className="section page-section">
      <div className="container">

        <div className="page-header">
          <div>
            <span className="eyebrow">CHECKOUT</span>
            <h1>Delivery Details</h1>
          </div>
        </div>

        <div className="checkout-layout">

          <form
            className="form-card"
            onSubmit={submit}
          >
            <h2>Where should we deliver?</h2>

            {error && (
              <div className="form-error">
                {error}
              </div>
            )}

            <label>
              Full name

              <input
                required
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value
                  })
                }
              />
            </label>

            <label>
              Phone number

              <input
                required
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value
                  })
                }
                placeholder="03XXXXXXXXX"
              />
            </label>

            <label>
              City

              <input
                required
                value={form.city}
                onChange={(e) =>
                  setForm({
                    ...form,
                    city: e.target.value
                  })
                }
              />
            </label>

            <label>
              Complete address

              <textarea
                required
                rows="4"
                value={form.address}
                onChange={(e) =>
                  setForm({
                    ...form,
                    address: e.target.value
                  })
                }
              />
            </label>

            <div className="cod-box">
              <span>💵</span>

              <div>
                <strong>Cash on Delivery</strong>

                <p>
                  Pay when your order arrives.
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="primary-button wide"
              disabled={placingOrder}
            >
              {placingOrder
                ? "Placing Order..."
                : "Place Order"}
            </button>

          </form>

          <aside className="summary-card">

            <h3>Your Items</h3>

            {cart.map((item) => (
              <div
                className="checkout-item"
                key={item.id}
              >
                <span>
                  {item.emoji} {item.title} × {item.quantity}
                </span>

                <strong>
                  Rs.{" "}
                  {(item.price * item.quantity).toLocaleString()}
                </strong>
              </div>
            ))}

            <hr />

            <div className="summary-total">
              <span>Total</span>

              <strong>
                Rs. {totalAmount.toLocaleString()}
              </strong>
            </div>

          </aside>

        </div>
      </div>
    </section>
  );
}