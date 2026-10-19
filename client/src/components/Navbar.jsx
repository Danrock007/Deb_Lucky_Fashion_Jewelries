import { useEffect, useState } from "react";
import { useCart } from "../context/useCart.js";
import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";
import { formatPrice } from "../utils/formatPrice.js";
import {
  fetchCurrentAccount,
  loginAccount,
  logoutAccount,
  registerAccount,
  resendAccountVerification,
  updateAccountProfile,
} from "../utils/api.js";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    </svg>
  );
}

function IconBag() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

function IconMenu({ open }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [accountMode, setAccountMode] = useState("login");
  const [accountUser, setAccountUser] = useState(null);
  const [accountLoading, setAccountLoading] = useState(false);
  const [accountSubmitting, setAccountSubmitting] = useState(false);
  const [accountError, setAccountError] = useState("");
  const [accountNotice, setAccountNotice] = useState("");
  const [pendingEmail, setPendingEmail] = useState("");
  const [accountForm, setAccountForm] = useState({ name: "", email: "", password: "" });
  const { count, open } = useCart();

  useEffect(() => {
    if (!accountOpen) return undefined;
    let ignore = false;
    fetchCurrentAccount()
      .then((user) => {
        if (!ignore) {
          setAccountUser(user);
          if (user) setAccountForm((form) => ({ ...form, name: user.name }));
        }
      })
      .catch((error) => {
        if (!ignore) setAccountError(error.message);
      })
      .finally(() => {
        if (!ignore) setAccountLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, [accountOpen]);

  function openAccount() {
    setAccountOpen(true);
    setAccountLoading(true);
    setAccountMode("login");
    setAccountError("");
    setAccountNotice("");
  }

  function handleAccountFormChange(event) {
    const { name, value } = event.target;
    setAccountForm((form) => ({ ...form, [name]: value }));
  }

  async function handleAccountSubmit(event) {
    event.preventDefault();
    setAccountSubmitting(true);
    setAccountError("");
    setAccountNotice("");
    try {
      if (accountMode === "register") {
        const result = await registerAccount(accountForm);
        setPendingEmail(result.email);
        setAccountForm((form) => ({ ...form, password: "" }));
        setAccountMode("verify");
        setAccountNotice(result.detail);
      } else {
        const user = await loginAccount({
          email: accountForm.email,
          password: accountForm.password,
        });
        setAccountUser(user);
        setAccountForm((form) => ({ ...form, name: user.name, password: "" }));
      }
    } catch (error) {
      if (
        accountMode === "register" &&
        error.message.toLowerCase().includes("verification email")
      ) {
        setPendingEmail(accountForm.email);
        setAccountMode("verify");
        setAccountNotice(error.message);
      } else {
        setAccountError(error.message);
      }
    } finally {
      setAccountSubmitting(false);
    }
  }

  async function handleResendVerification() {
    setAccountSubmitting(true);
    setAccountError("");
    setAccountNotice("");
    try {
      const result = await resendAccountVerification(pendingEmail);
      setAccountNotice(result.detail);
    } catch (error) {
      setAccountError(error.message);
    } finally {
      setAccountSubmitting(false);
    }
  }

  async function handleProfileUpdate(event) {
    event.preventDefault();
    setAccountSubmitting(true);
    setAccountError("");
    setAccountNotice("");
    try {
      const user = await updateAccountProfile(accountForm.name);
      setAccountUser(user);
      setAccountNotice("Your profile has been updated.");
    } catch (error) {
      setAccountError(error.message);
    } finally {
      setAccountSubmitting(false);
    }
  }

  async function handleLogout() {
    setAccountSubmitting(true);
    setAccountError("");
    try {
      await logoutAccount();
      setAccountUser(null);
      setAccountMode("login");
      setAccountForm({ name: "", email: "", password: "" });
      setAccountNotice("You have signed out.");
    } catch (error) {
      setAccountError(error.message);
    } finally {
      setAccountSubmitting(false);
    }
  }

  return (
    <header className="navbar">
      <div className="navbar-announcement">
        Complimentary shipping &amp; returns on every order
      </div>

      <div className="navbar-main">
        <button
          className="navbar-menu-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <IconMenu open={menuOpen} />
        </button>

       <Link to="/" className="navbar-logo">
  <Logo size={44} color="#C9A227" />
</Link>

<nav className="navbar-links" aria-label="Primary">
  {NAV_LINKS.map((link) => (
    <Link key={link.label} to={link.href}>
      {link.label}
    </Link>
  ))}
</nav>

        <div className="navbar-actions">
          <button className="navbar-icon-btn" aria-label="Search">
            <IconSearch />
          </button>
          <button
            className="navbar-icon-btn"
            aria-label={accountUser ? "Your account" : "Account"}
            aria-haspopup="dialog"
            aria-expanded={accountOpen}
            onClick={openAccount}
          >
            <IconUser />
          </button>
          <button className="navbar-icon-btn navbar-bag" aria-label="Cart" onClick={open}>
            <IconBag />
            {count > 0 && <span className="navbar-bag-count">{count}</span>}
          </button>
        </div>
      </div>

      {accountOpen && (
        <div
          className="account-overlay"
          onClick={(event) => {
            if (event.target === event.currentTarget) setAccountOpen(false);
          }}
        >
          <section
            className="account-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="account-dialog-title"
            onKeyDown={(event) => {
              if (event.key === "Escape") setAccountOpen(false);
            }}
          >
            <button
              className="account-dialog-close"
              type="button"
              aria-label="Close account panel"
              onClick={() => setAccountOpen(false)}
              autoFocus
            >
              ×
            </button>
            <h2 id="account-dialog-title">Your Account</h2>
            {accountLoading ? (
              <p role="status">Loading your account...</p>
            ) : accountUser ? (
              <>
                <p>Signed in as {accountUser.email}</p>
                <form className="account-profile-form" onSubmit={handleProfileUpdate}>
                  <label>
                    Name
                    <input
                      type="text"
                      name="name"
                      value={accountForm.name}
                      onChange={handleAccountFormChange}
                      maxLength={150}
                      required
                    />
                  </label>
                  <button type="submit" disabled={accountSubmitting}>
                    {accountSubmitting ? "Saving..." : "Save profile"}
                  </button>
                </form>
                <h3>Order history</h3>
                {accountUser.orders.length === 0 ? (
                  <p>Orders placed using this email will appear here.</p>
                ) : (
                  <ul className="account-orders">
                    {accountUser.orders.map((order) => (
                      <li key={order.order_number}>
                        <strong>{order.order_number}</strong>
                        <span>
                          {order.status} · {formatPrice(Number(order.total_amount))}
                        </span>
                        <time dateTime={order.created_at}>
                          {new Date(order.created_at).toLocaleDateString()}
                        </time>
                        <ul>
                          {order.items.map((item, index) => (
                            <li key={`${order.order_number}-${index}`}>
                              {item.product_name} × {item.quantity}
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                )}
                <button
                  className="account-secondary-button"
                  type="button"
                  onClick={handleLogout}
                  disabled={accountSubmitting}
                >
                  Sign out
                </button>
              </>
            ) : accountMode === "verify" ? (
              <>
                <p>Check <strong>{pendingEmail}</strong> for a verification link. Your account activates after you verify your email.</p>
                {accountNotice && <p role="status">{accountNotice}</p>}
                <button
                  className="account-secondary-button"
                  type="button"
                  onClick={handleResendVerification}
                  disabled={accountSubmitting}
                >
                  {accountSubmitting ? "Sending..." : "Resend verification email"}
                </button>
                <button
                  className="account-link-button"
                  type="button"
                  onClick={() => {
                    setAccountMode("login");
                    setAccountNotice("");
                    setAccountError("");
                  }}
                >
                  Back to sign in
                </button>
              </>
            ) : (
              <>
                <div className="account-mode-switch" aria-label="Account action">
                  <button
                    type="button"
                    className={accountMode === "login" ? "is-active" : ""}
                    onClick={() => {
                      setAccountMode("login");
                      setAccountError("");
                    }}
                  >
                    Sign in
                  </button>
                  <button
                    type="button"
                    className={accountMode === "register" ? "is-active" : ""}
                    onClick={() => {
                      setAccountMode("register");
                      setAccountError("");
                    }}
                  >
                    Create account
                  </button>
                </div>
                <form className="account-auth-form" onSubmit={handleAccountSubmit}>
                  {accountMode === "register" && (
                    <label>
                      Name
                      <input
                        type="text"
                        name="name"
                        value={accountForm.name}
                        onChange={handleAccountFormChange}
                        maxLength={150}
                        autoComplete="name"
                        required
                      />
                    </label>
                  )}
                  <label>
                    Email
                    <input
                      type="email"
                      name="email"
                      value={accountForm.email}
                      onChange={handleAccountFormChange}
                      maxLength={150}
                      autoComplete="email"
                      required
                    />
                  </label>
                  <label>
                    Password
                    <input
                      type="password"
                      name="password"
                      value={accountForm.password}
                      onChange={handleAccountFormChange}
                      autoComplete={accountMode === "register" ? "new-password" : "current-password"}
                      minLength={accountMode === "register" ? 8 : undefined}
                      maxLength={128}
                      required
                    />
                  </label>
                  {accountMode === "register" && (
                    <p className="account-help">We’ll email you a verification link before activating your account.</p>
                  )}
                  <button type="submit" disabled={accountSubmitting}>
                    {accountSubmitting
                      ? "Please wait..."
                      : accountMode === "register"
                        ? "Create account"
                        : "Sign in"}
                  </button>
                </form>
              </>
            )}
            {accountError && <p className="account-error" role="alert">{accountError}</p>}
            {accountNotice && accountMode !== "verify" && (
              <p className="account-notice" role="status">{accountNotice}</p>
            )}
            {!accountUser && accountMode !== "verify" && (
              <p className="account-contact-prompt">
                Need help with an order? <Link to="/contact" onClick={() => setAccountOpen(false)}>Contact us</Link>
              </p>
            )}
          </section>
        </div>
      )}

      <div className={`navbar-drawer ${menuOpen ? "is-open" : ""}`}>
        <nav aria-label="Primary mobile">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;