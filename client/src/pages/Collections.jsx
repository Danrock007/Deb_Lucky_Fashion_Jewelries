import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { fetchCategories, fetchProducts } from "../utils/api.js";
import "./Collections.css";

const DEFAULT_COLLECTIONS = [
  { name: "Rings", tagline: "Solitaires, bands, and stacking rings" },
  { name: "Necklaces", tagline: "Pendants, chains, and chokers" },
  { name: "Bracelets", tagline: "Cuffs, chains, and tennis bracelets" },
  { name: "Watches", tagline: "Classic, modern, and luxury timepieces" },
  { name: "Bottles", tagline: "Insulated and everyday carry hydration" },
  { name: "Diaries", tagline: "Elegant planning essentials and gift sets" },
];

function Collections() {
  const [collections, setCollections] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadData() {
      try {
        const [catalogProducts, categories] = await Promise.all([fetchProducts(), fetchCategories()]);
        if (ignore) return;
        const categoryNames = categories.filter((category) => category !== "All");
        const nextCollections = categoryNames.map((name) => {
          const matched = DEFAULT_COLLECTIONS.find((item) => item.name === name);
          return matched || { name, tagline: `Curated ${name.toLowerCase()} selection` };
        });

        setCollections(nextCollections);
        setProducts(catalogProducts);
      } catch (error) {
        if (!ignore) setLoadError(error.message || "Collections are temporarily unavailable.");
      }
    }

    loadData();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <Navbar />

      <main className="collections-page">
        <h1>Our Collections</h1>
        <p>Browse by category to find your perfect piece.</p>

        {loadError ? (
          <p>{loadError}</p>
        ) : (
          <div className="collections-grid">
            {collections.map((collection) => {
              const itemCount = products.filter(
                (p) => p.category === collection.name
              ).length;

              return (
                <Link
                  key={collection.name}
                  to={`/shop?category=${encodeURIComponent(collection.name)}`}
                  className="collection-card"
                >
                  <div className="collection-card-image">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75">
                      <circle cx="12" cy="12" r="7" />
                      <circle cx="12" cy="12" r="2.5" />
                    </svg>
                  </div>
                  <div className="collection-card-info">
                    <h2>{collection.name}</h2>
                    <p>{collection.tagline}</p>
                    <span className="collection-card-count">
                      {itemCount} {itemCount === 1 ? "piece" : "pieces"}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}

export default Collections;