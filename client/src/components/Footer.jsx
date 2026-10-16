import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";
import "./Footer.css";

const COPYRIGHT_YEAR = new Date().getFullYear();

const FOOTER_LINKS = [
  {
    heading: "Shop",
    links: [
      { label: "All Jewelry", href: "/shop" },
      { label: "Rings", href: "/shop" },
      { label: "Necklaces", href: "/shop" },
      { label: "Bracelets", href: "/shop" },
      { label: "Earrings", href: "/shop" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Shipping & Returns", href: "/shipping" },
      { label: "FAQ", href: "/faq" },
    ],
  },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Logo size={44} color="#C9A227" />
          <p>Fine jewelry, crafted to last a lifetime.</p>
        </div>

        <div className="footer-columns">
          {FOOTER_LINKS.map((col) => (
            <div key={col.heading} className="footer-column">
              <h3>{col.heading}</h3>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-newsletter">
          <h3>Stay in the Loop</h3>
          <p>New arrivals, private sales, and styling tips.</p>
          <p className="footer-newsletter-status">
            Newsletter sign-up will be available soon.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {COPYRIGHT_YEAR} Deb Lucky Fashion Jewelries. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;