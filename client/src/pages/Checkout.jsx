import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../context/useCart.js";
import { formatPrice } from "../utils/formatPrice.js";
import { prepareOrder, verifyOrderPayment } from "../utils/api.js";
import "./Checkout.css";

const SHIPPING_FLAT_RATE = 0; // complimentary shipping, per your announcement bar
const STEPS = ["Shipping", "Payment", "Review"];

function Checkout() {
  const {
    items,
    subtotal,
    discount,
    total,
    promo,
    promoError,
    applyPromoCode,
    removePromoCode,
    clearCart,
  } = useCart();

  const [step, setStep] = useState(0); // 0 = Shipping, 1 = Payment, 2 = Review
  const [placed, setPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);
  const [promoInput, setPromoInput] = useState("");
  const [stepError, setStepError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentEmail, setPaymentEmail] = useState("");
  const [searchParams] = useSearchParams();
  const paymentReference = searchParams.get("reference") || searchParams.get("trxref");

  const [shipping, setShipping] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  // Payment credentials are collected on Paystack's hosted checkout.
  const [paymentMethod, setPaymentMethod] = useState("card"); // "card" | "mobile_money"

  const amountDue = total + SHIPPING_FLAT_RATE;

  useEffect(() => {
    if (!paymentReference) return undefined;

    let ignore = false;
    verifyOrderPayment(paymentReference)
      .then((order) => {
        if (ignore) return;
        setOrderNumber(order.order_number);
        setPaymentEmail(order.customer_email || "");
        setPlaced(true);
        clearCart();
      })
      .catch((error) => {
        if (!ignore) {
          setStepError(error.message || "We couldn't verify your payment. Please contact support.");
        }
      });

    return () => {
      ignore = true;
    };
  }, [paymentReference, clearCart]);

  function handleShippingChange(e) {
    const { name, value } = e.target;
    setShipping((prev) => ({ ...prev, [name]: value }));
  }

  function handleApplyPromo(e) {
    e.preventDefault();
    if (!promoInput.trim()) return;
    applyPromoCode(promoInput);
  }

  function validateShipping() {
    const required = ["fullName", "email", "address", "city", "postalCode", "country"];
    return required.every((field) => shipping[field].trim() !== "");
  }

  function goNext() {
    if (step === 0 && !validateShipping()) {
      setStepError("Please fill in all shipping fields.");
      return;
    }
    setStepError(null);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function goBack() {
    setStepError(null);
    setStep((s) => Math.max(s - 1, 0));
  }

  async function handlePlaceOrder() {
    setStepError(null);
    setIsProcessing(true);

    try {
      const order = await prepareOrder({
        customer_name: shipping.fullName,
        customer_email: shipping.email,
        shipping_address: shipping.address,
        shipping_city: shipping.city,
        shipping_postal_code: shipping.postalCode,
        shipping_country: shipping.country,
        promo_code: promo?.label || "",
        payment_method: paymentMethod,
        items: items.map((item) => ({
          product: item.id,
          quantity: item.qty,
        })),
      });
      window.location.assign(order.authorization_url);
    } catch (error) {
      setStepError(error.message || "We couldn't prepare your order. Please try again.");
      setIsProcessing(false);
    }
  }

  if (placed) {
    return (
      <>
        <Navbar />
        <main className="checkout-confirmation">
          <h1>Thank you, your order is confirmed</h1>
          <p>Order number <strong>{orderNumber}</strong></p>
          <p>Your payment was verified successfully{paymentEmail ? ` for ${paymentEmail}` : ""}.</p>
          <Link to="/shop" className="checkout-back-link">Continue Shopping</Link>
        </main>
      </>
    );
  }

  if (paymentReference) {
    return (
      <>
        <Navbar />
        <main className="checkout-empty">
          <h1>{stepError ? "We couldn't verify your payment" : "Verifying your payment"}</h1>
          {stepError ? (
            <>
              <p>{stepError}</p>
              <p>If you were charged, contact support with payment reference {paymentReference}.</p>
              <button type="button" className="checkout-back-link" onClick={() => window.location.reload()}>
                Try verification again
              </button>
            </>
          ) : (
            <p>Please keep this page open while we confirm your order.</p>
          )}
        </main>
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="checkout-empty">
          <h1>Your cart is empty</h1>
          <p>Add a few pieces before checking out.</p>
          <Link to="/shop" className="checkout-back-link">Browse the Shop</Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="checkout">
        <h1>Checkout</h1>

        <ol className="checkout-stepper">
          {STEPS.map((label, i) => (
            <li
              key={label}
              className={
                i === step ? "is-active" : i < step ? "is-complete" : ""
              }
            >
              <span className="checkout-stepper-index">{i + 1}</span>
              <span className="checkout-stepper-label">{label}</span>
            </li>
          ))}
        </ol>

        <div className="checkout-layout">
          <div className="checkout-form">
            {step === 0 && (
              <>
                <h2>Shipping Details</h2>

                <label>
                  Full Name
                  <input
                    type="text"
                    name="fullName"
                    value={shipping.fullName}
                    onChange={handleShippingChange}
                  />
                </label>

                <label>
                  Email
                  <input
                    type="email"
                    name="email"
                    value={shipping.email}
                    onChange={handleShippingChange}
                  />
                </label>

                <label>
                  Address
                  <input
                    type="text"
                    name="address"
                    value={shipping.address}
                    onChange={handleShippingChange}
                  />
                </label>

                <div className="checkout-form-row">
                  <label>
                    City
                    <input
                      type="text"
                      name="city"
                      value={shipping.city}
                      onChange={handleShippingChange}
                    />
                  </label>

                  <label>
                    Postal Code
                    <input
                      type="text"
                      name="postalCode"
                      value={shipping.postalCode}
                      onChange={handleShippingChange}
                    />
                  </label>
                </div>

                <label>
                  Country
                  <input
                    type="text"
                    name="country"
                    value={shipping.country}
                    onChange={handleShippingChange}
                  />
                </label>
              </>
            )}

            {step === 1 && (
              <>
                <h2>Payment Method</h2>

                <div className="checkout-payment-methods">
                  <button
                    type="button"
                    className={paymentMethod === "card" ? "is-active" : ""}
                    onClick={() => setPaymentMethod("card")}
                  >
                    Card
                  </button>
                  <button
                    type="button"
                    className={paymentMethod === "mobile_money" ? "is-active" : ""}
                    onClick={() => setPaymentMethod("mobile_money")}
                  >
                    Mobile Money
                  </button>
                </div>

                <p className="checkout-payment-note">
                  You'll enter your {paymentMethod === "card" ? "card" : "mobile money"} details
                  on Paystack's secure checkout page — we never see or store that
                  information ourselves.
                </p>
              </>
            )}

            {step === 2 && (
              <>
                <h2>Review Your Order</h2>

                <div className="checkout-review-block">
                  <div className="checkout-review-header">
                    <h3>Shipping To</h3>
                    <button type="button" onClick={() => setStep(0)}>Edit</button>
                  </div>
                  <p>{shipping.fullName}</p>
                  <p>{shipping.address}, {shipping.city}, {shipping.postalCode}</p>
                  <p>{shipping.country}</p>
                  <p>{shipping.email}</p>
                </div>

                <div className="checkout-review-block">
                  <div className="checkout-review-header">
                    <h3>Payment</h3>
                    <button type="button" onClick={() => setStep(1)}>Edit</button>
                  </div>
                  <p>{paymentMethod === "card" ? "Card" : "Mobile Money"} via Paystack</p>
                </div>
              </>
            )}

            {stepError && <p className="checkout-step-error">{stepError}</p>}

            <div className="checkout-step-actions">
              {step > 0 && (
                <button type="button" className="checkout-back-btn" onClick={goBack} disabled={isProcessing}>
                  Back
                </button>
              )}
              {step < STEPS.length - 1 ? (
                <button type="button" className="checkout-place-order" onClick={goNext}>
                  Continue
                </button>
              ) : (
                <button
                  type="button"
                  className="checkout-place-order"
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : `Pay ${formatPrice(amountDue)}`}
                </button>
              )}
            </div>
          </div>

          <aside className="checkout-summary">
            <h2>Order Summary</h2>

            <ul className="checkout-summary-items">
              {items.map((item) => (
                <li key={item.id}>
                  <span className="checkout-summary-item-name">
                    {item.name} <span className="checkout-summary-item-qty">&times;{item.qty}</span>
                  </span>
                  <span>{formatPrice(item.price * item.qty)}</span>
                </li>
              ))}
            </ul>

            <div className="checkout-promo">
              {promo ? (
                <div className="checkout-promo-applied">
                  <span>
                    Code <strong>{promo.label}</strong> applied ({promo.percentOff}% off)
                  </span>
                  <button type="button" onClick={removePromoCode}>
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="checkout-promo-form">
                  <input
                    type="text"
                    placeholder="Promo code"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                  />
                  <button type="submit">Apply</button>
                </form>
              )}
              {promoError && <p className="checkout-promo-error">{promoError}</p>}
            </div>

            <div className="checkout-summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            {discount > 0 && (
              <div className="checkout-summary-row checkout-summary-discount">
                <span>Discount</span>
                <span>&minus;{formatPrice(discount)}</span>
              </div>
            )}

            <div className="checkout-summary-row">
              <span>Shipping</span>
              <span>{SHIPPING_FLAT_RATE === 0 ? "Free" : formatPrice(SHIPPING_FLAT_RATE)}</span>
            </div>

            <div className="checkout-summary-row checkout-summary-total">
              <span>Total</span>
              <span>{formatPrice(amountDue)}</span>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

export default Checkout;