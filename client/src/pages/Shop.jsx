import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Shop.css";
import ProductGrid from "../components/ProductGrid";
import { fetchCategories, fetchProducts } from "../utils/api.js";

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [isLoading, setIsLoading] = useState(true);
  const [catalogError, setCatalogError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadCatalog() {
      try {
        const [catalogProducts, catalogCategories] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);

        if (!ignore) {
          setProducts(catalogProducts);
          setCategories(catalogCategories);
        }
      } catch (error) {
        if (!ignore) setCatalogError(error.message || "The catalog is temporarily unavailable.");
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadCatalog();

    return () => {
      ignore = true;
    };
  }, []);

  const categoryFromUrl = searchParams.get("category");
  const activeCategory = categories.includes(categoryFromUrl) ? categoryFromUrl : "All";

  function handleCategoryClick(category) {
    if (category === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  }

  return (
    <>
      <Navbar />

      <main className="shop-page">
        <h1>Discover Your Piece</h1>
        <p>Explore our collection of timeless jewelry.</p>

        <div className="category-filter">
          {categories.map((category) => (
            <button
              key={category}
              className={category === activeCategory ? "is-active" : ""}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {isLoading ? (
          <p className="product-grid-empty">Loading products...</p>
        ) : catalogError ? (
          <p className="product-grid-empty">{catalogError}</p>
        ) : (
          <ProductGrid products={products} activeCategory={activeCategory} />
        )}
      </main>
    </>
  );
}

export default Shop;