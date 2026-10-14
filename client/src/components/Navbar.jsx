import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";
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
  const { count, open } = useCart();

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
          <button className="navbar-icon-btn" aria-label="Account">
            <IconUser />
          </button>
          <button className="navbar-icon-btn navbar-bag" aria-label="Bag" onClick={open}>
            <IconBag />
            {count > 0 && <span className="navbar-bag-count">{count}</span>}
          </button>
        </div>
      </div>

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