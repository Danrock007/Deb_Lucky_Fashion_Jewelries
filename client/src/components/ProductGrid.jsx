import ProductCard from "./ProductCard";
import "./ProductGrid.css";

function ProductGrid({ products, activeCategory }) {
  const filtered =
    activeCategory && activeCategory !== "All"
      ? products.filter((p) => p.category === activeCategory)
      : products;

  if (filtered.length === 0) {
    return <p className="product-grid-empty">No pieces found in this category yet.</p>;
  }

  return (
    <div className="product-grid">
      {filtered.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;