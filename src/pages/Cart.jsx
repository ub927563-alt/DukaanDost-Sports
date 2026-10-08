import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, totalAmount } = useCart();

  if (!cart.length) {
    return <section className="section page-section"><div className="container empty-state"><div className="empty-icon">🛒</div><h1>Your cart is empty</h1><p>Add some sports gear to get started.</p><Link className="primary-button" to="/products">Shop Products</Link></div></section>;
  }

  return (
    <section className="section page-section">
      <div className="container">
        <div className="page-header"><div><span className="eyebrow">YOUR BAG</span><h1>Shopping Cart</h1></div></div>
        <div className="cart-layout">
          <div className="cart-list">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-thumb">{item.emoji}</div>
                <div className="cart-item-main">
                  <span className="mini-label">{item.category}</span>
                  <h3>{item.title}</h3>
                  <strong>Rs. {item.price.toLocaleString()}</strong>
                </div>
                <div className="quantity">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, Math.min(item.quantity + 1, item.stock))}>+</button>
                </div>
                <button className="remove-button" onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            ))}
          </div>
          <aside className="summary-card">
            <h3>Order Summary</h3>
            <div><span>Subtotal</span><strong>Rs. {totalAmount.toLocaleString()}</strong></div>
            <div><span>Delivery</span><strong>Calculated at checkout</strong></div>
            <hr />
            <div className="summary-total"><span>Total</span><strong>Rs. {totalAmount.toLocaleString()}</strong></div>
            <Link className="primary-button wide" to="/checkout">Proceed to Checkout</Link>
            <small>Payment method: Cash on Delivery</small>
          </aside>
        </div>
      </div>
    </section>
  );
}