import { Link } from "react-router-dom";
import { useCart } from "../context/useCart.js";
import { formatPrice } from "../utils/formatPrice.js";

function ProductCard({ product }) {
  const { addItem } = useCart();

  function handleQuickAdd(e) {
    e.preventDefault(); // stop the <Link> from navigating
    e.stopPropagation();
    addItem(product);
  }

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-card-image">
        {product.badge && (
          <span className="product-card-badge">{product.badge}</span>
        )}
        {product.image && <img src={product.image} alt={product.name} />}

        <button className="product-card-quickadd" onClick={handleQuickAdd}>
          Quick Add
        </button>
      </div>

      <div className="product-card-info">
        <h3>{product.name}</h3>
        <p>{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}

export default ProductCard;