import { useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart.js";
import { formatPrice } from "../utils/formatPrice.js";
import "./CartDrawer.css";

function CartDrawer() {
  const { items, subtotal, isOpen, close, updateQty, removeItem } = useCart();
  const navigate = useNavigate();

  function handleCheckout() {
    close();
    navigate("/checkout");
  }

  return (
    <>
      <div
        className={`cart-overlay ${isOpen ? "is-open" : ""}`}
        onClick={close}
        aria-hidden="true"
      />
      <aside className={`cart-drawer ${isOpen ? "is-open" : ""}`} aria-label="Shopping cart">
        <div className="cart-drawer-header">
          <h2>Your Cart</h2>
          <button className="cart-drawer-close" onClick={close} aria-label="Close cart">
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <p className="cart-drawer-empty">Your cart is empty.</p>
        ) : (
          <>
            <ul className="cart-drawer-items">
              {items.map((item) => (
                <li key={item.id} className="cart-drawer-item">
                  <div className="cart-drawer-item-thumb">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <circle cx="12" cy="12" r="7" />
                      <circle cx="12" cy="12" r="2.5" />
                    </svg>
                  </div>

                  <div className="cart-drawer-item-info">
                    <h3>{item.name}</h3>
                    <p>{formatPrice(item.price)}</p>

                    <div className="cart-drawer-item-qty">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} aria-label="Decrease quantity">
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} aria-label="Increase quantity">
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    className="cart-drawer-item-remove"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>

            <div className="cart-drawer-footer">
              <div className="cart-drawer-subtotal">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <button className="cart-drawer-checkout" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export default CartDrawer;