import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductGrid from "../components/ProductGrid";
import { useCart } from "../context/useCart.js";
import { formatPrice } from "../utils/formatPrice.js";
import { fetchProducts } from "../utils/api.js";
import "./ProductDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const { addItem, open } = useCart();
  const [qty, setQty] = useState(1);
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadProduct() {
      try {
        const products = await fetchProducts();
        if (ignore) return;

        const match = products.find((item) => String(item.id) === String(id));
        setProduct(match || null);

        if (match) {
          const similar = products
            .filter((item) => item.category === match.category && item.id !== match.id)
            .slice(0, 4);
          setRelated(similar);
        } else {
          setRelated([]);
        }
      } catch (error) {
        if (!ignore) setLoadError(error.message || "This product is temporarily unavailable.");
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadProduct();
    return () => {
      ignore = true;
    };
  }, [id]);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="product-detail-not-found">
          <h1>Loading item...</h1>
        </main>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="product-detail-not-found">
          <h1>{loadError ? "Product unavailable" : "Piece not found"}</h1>
          <p>{loadError || "The item you're looking for may have been moved or sold out."}</p>
          <Link to="/shop" className="cta-button">Back to Shop</Link>
        </main>
      </>
    );
  }

  function handleAddToCart() {
    for (let i = 0; i < qty; i++) addItem(product);
    open();
  }

  return (
    <>
      <Navbar />

      <main className="product-detail">
        <nav className="product-detail-breadcrumb" aria-label="Breadcrumb">
          <Link to="/shop">Shop</Link>
          <span> / </span>
          <span>{product.category}</span>
          <span> / </span>
          <span>{product.name}</span>
        </nav>

        <div className="product-detail-layout">
          <div className="product-detail-image">
            {product.badge && (
              <span className="product-detail-badge">{product.badge}</span>
            )}
            {product.image && <img src={product.image} alt={product.name} />}
          </div>

          <div className="product-detail-info">
            <p className="product-detail-category">{product.category}</p>
            <h1>{product.name}</h1>
            <p className="product-detail-price">{formatPrice(product.price)}</p>
            <p className="product-detail-description">{product.description}</p>

            <div className="product-detail-qty">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">
                +
              </button>
            </div>

            <button className="product-detail-add" onClick={handleAddToCart}>
              Add to Cart
            </button>

            <ul className="product-detail-meta">
              <li>Complimentary shipping &amp; returns</li>
              <li>Handcrafted, ships in 2–4 business days</li>
            </ul>
          </div>
        </div>

        {related.length > 0 && (
          <section className="product-detail-related">
            <h2>You May Also Like</h2>
            <ProductGrid products={related} activeCategory="All" />
          </section>
        )}
      </main>
    </>
  );
}

export default ProductDetail;