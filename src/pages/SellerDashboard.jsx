import { useEffect, useState } from "react";

export default function SellerDashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
  name: "",
  price: "",
  category: "",
  image: ""
});

const [orders, setOrders] = useState([]);

const pending = orders.filter(
  (order) => order.status === "Pending"
).length;

const sales = orders.reduce(
  (sum, order) => sum + Number(order.total),
  0
);

  useEffect(() => {
  fetch("http://localhost:5000/api/products")
    .then((response) => response.json())
    .then((data) => {
      setProducts(data);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });

  fetch("http://localhost:5000/api/orders")
    .then((response) => response.json())
    .then((data) => {
      setOrders(data);
    })
    .catch((error) => {
      console.error("Error fetching orders:", error);
    });
}, []);
  const addProduct = async (e) => {
  e.preventDefault();

  if (!form.name || !form.price || !form.category) {
    alert("Name, price and category are required.");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:5000/api/products",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: form.name,
          price: Number(form.price),
          category: form.category,
          image: form.image
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to add product");
      return;
    }

    setProducts((currentProducts) => [
      ...currentProducts,
      data.product
    ]);

    setForm({
      name: "",
      price: "",
      category: "",
      image: ""
    });

    alert("Product added successfully!");
  } catch (error) {
    console.error("Add product error:", error);
    alert("Could not connect to the backend.");
  }
};

  const deleteProduct = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${id}`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete product");
        return;
      }

      setProducts((currentProducts) =>
        currentProducts.filter((product) => product.id !== id)
      );

      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Could not connect to the backend.");
    }
  };

  return (
    <section className="section page-section">
      <div className="container">

        <div className="page-header">
          <div>
            <span className="eyebrow">STORE OWNER</span>

            <h1>Seller Dashboard</h1>

            <p>
              Simple overview for the sports store.
            </p>
          </div>
        </div>

        <div className="dashboard-grid">

          <div className="dashboard-card">
            <span>Products</span>
            <strong>{products.length}</strong>
            <small>Active products</small>
          </div>

          <div className="dashboard-card">
            <span>Total Orders</span>
            <strong>{orders.length}</strong>
            <small>Customer orders</small>
          </div>

          <div className="dashboard-card">
            <span>Pending</span>
            <strong>{pending}</strong>
            <small>Need attention</small>
          </div>

          <div className="dashboard-card">
            <span>Sales</span>
            <strong>
              Rs. {sales.toLocaleString()}
            </strong>
            <small>Local demo total</small>
          </div>

        </div>
<div className="info-box large">
  <h2>Customer Orders</h2>

  <p>
    Orders received from customers through the DukaanDost store.
  </p>

  {orders.length === 0 ? (
    <p style={{ marginTop: "20px" }}>
      No orders found.
    </p>
  ) : (
    <div style={{ marginTop: "20px" }}>
      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            padding: "20px 0",
            borderBottom: "1px solid #ddd"
          }}
        >
          <h3>Order #{order.id}</h3>

          <p>
            <strong>Customer:</strong> {order.customerName}
          </p>

          <p>
            <strong>Phone:</strong> {order.phone}
          </p>

          <p>
            <strong>Address:</strong> {order.address}
          </p>

          <p>
            <strong>Total:</strong> Rs.{" "}
            {Number(order.total).toLocaleString()}
          </p>

          <p>
            <strong>Status:</strong> {order.status}
          </p>
<select
  value={order.status}
  onChange={async (e) => {
    const newStatus = e.target.value;

    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/${order.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            status: newStatus
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update order");
        return;
      }

      setOrders((currentOrders) =>
        currentOrders.map((currentOrder) =>
          currentOrder.id === order.id
            ? data.order
            : currentOrder
        )
      );
    } catch (error) {
      console.error("Update order error:", error);
      alert("Could not connect to the backend.");
    }
  }}
  style={{
    marginTop: "10px",
    padding: "8px"
  }}
>
  <option value="Pending">Pending</option>
  <option value="Confirmed">Confirmed</option>
  <option value="Shipped">Shipped</option>
  <option value="Delivered">Delivered</option>
</select>
          <div>
            <strong>Products:</strong>

            {order.items.map((item, index) => (
              <p key={index}>
                {item.name} × {item.quantity} — Rs.{" "}
                {Number(item.price).toLocaleString()}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  )}
</div>
        <div className="info-box large">
          <h2>Product Management</h2>

          <p>
            Manage the products currently stored in the Node.js backend.
          </p>
          <div style={{ marginTop: "20px" }}></div>
          <form onSubmit={addProduct} style={{ marginTop: "20px" }}>
  <h3>Add New Product</h3>

  <input
    type="text"
    placeholder="Product name"
    value={form.name}
    onChange={(e) =>
      setForm({ ...form, name: e.target.value })
    }
  />

  <input
    type="number"
    placeholder="Price"
    value={form.price}
    onChange={(e) =>
      setForm({ ...form, price: e.target.value })
    }
  />

  <input
    type="text"
    placeholder="Category"
    value={form.category}
    onChange={(e) =>
      setForm({ ...form, category: e.target.value })
    }
  />

  <input
    type="text"
    placeholder="Image URL (optional)"
    value={form.image}
    onChange={(e) =>
      setForm({ ...form, image: e.target.value })
    }
  />

  <button type="submit" className="primary-button">
    Add Product
  </button>
</form>

          <div style={{ marginTop: "20px" }}>

            {products.map((product) => (
              <div
                key={product.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "15px 0",
                  borderBottom: "1px solid #ddd"
                }}
              >
                <div>
                  <strong>{product.name}</strong>

                  <div>
                    Rs. {product.price.toLocaleString()}
                  </div>

                  <small>{product.category}</small>
                </div>

                <button
                  className="primary-button"
                  onClick={() => deleteProduct(product.id)}
                >
                  Delete
                </button>
              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}