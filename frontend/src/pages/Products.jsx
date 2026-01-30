import { useEffect, useState } from "react";
import { fetchProducts } from "../api/products";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = filter
    ? products.filter(
        (product) =>
          product.brand === filter ||
          product.gender === filter ||
          product.type === filter
      )
    : products;

  if (loading) {
    return <p style={{ padding: "2rem" }}>Loading products…</p>;
  }

  if (error) {
    return <p style={{ padding: "2rem", color: "red" }}>{error}</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Products</h1>

      {filter && (
        <button
          onClick={() => setFilter(null)}
          style={{ margin: "1rem 0" }}
        >
          Clear filter
        </button>
      )}

      <div style={styles.list}>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onFilterSelect={setFilter}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  list: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "1.5rem",
    marginTop: "1.5rem",
  },
};

export default Products;
