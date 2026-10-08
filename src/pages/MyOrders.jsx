import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="section page-section">
        <div className="container">
          <h2>Loading orders...</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="section page-section">
      <div className="container">

        <div className="page-header">
          <div>
            <span className="eyebrow">CUSTOMER AREA</span>
            <h1>My Orders</h1>
            <p>Track your orders and delivery status.</p>
          </div>
        </div>

        {!orders.length ? (
          <div className="empty-state">
            <div className="empty-icon">📦</div>

            <h2>No orders yet</h2>

            <p>
              Your placed orders will appear here.
            </p>

            <Link
              className="primary-button"
              to="/products"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="orders-list">

            {orders.map((order) => (
              <div
                className="order-card"
                key={order.id}
              >

                <div className="order-top">

                  <div>
                    <strong>
                      Order #{order.id}
                    </strong>

                    <small>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </small>
                  </div>

                  <span className="status">
                    {order.status}
                  </span>
<div className="order-progress">
  {["Pending", "Confirmed", "Shipped", "Delivered"].map(
    (status, index) => {
      const statuses = [
        "Pending",
        "Confirmed",
        "Shipped",
        "Delivered"
      ];

      const currentIndex = statuses.indexOf(order.status);

      return (
        <div
          key={status}
          className={
            index <= currentIndex
              ? "progress-step active"
              : "progress-step"
          }
        >
          <span className="progress-number">
            {index + 1}
          </span>

          <small>{status}</small>
        </div>
      );
    }
  )}
</div>
                </div>

                <div className="order-items">

                  {order.items.map((item, index) => (
                    <span key={index}>
                      {item.name} × {item.quantity}
                    </span>
                  ))}

                </div>

                <div className="order-bottom">

                  <span>
                    Delivery: {order.address}
                  </span>

                  <strong>
                    Rs. {Number(order.total).toLocaleString()}
                  </strong>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}