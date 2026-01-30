import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductById } from "../api/products";

const PLACEHOLDER_IMAGE =
  "https://via.placeholder.com/800x500?text=No+Image";

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return <p style={{ padding: "2rem" }}>Loading product…</p>;
  }

  if (error) {
    return (
      <p style={{ padding: "2rem", color: "red" }}>
        {error}
      </p>
    );
  }

  if (!product) {
    return <p style={{ padding: "2rem" }}>Product not found</p>;
  }

  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0]
      : PLACEHOLDER_IMAGE;

  return (
    <div style={styles.container}>
      <Link to="/products" style={styles.back}>
        ← Back to products
      </Link>

      <h1>{product.name}</h1>

      <p style={styles.meta}>
        {product.brand && <span>{product.brand}</span>}
        {product.gender && <span> • {product.gender}</span>}
        {product.type && <span> • {product.type}</span>}
      </p>


      <img
        src={imageUrl}
        alt={product.name}
        style={styles.image}
      />

      <p style={styles.price}>£{product.price}</p>

      {product.description && (
        <p style={styles.description}>{product.description}</p>
      )}

      {/* Sizes, stock, add-to-cart come in Phase 3 */}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "2rem auto",
    padding: "2rem",
    background: "#fff",
    border: "1px solid #ddd",
  },
  back: {
    display: "inline-block",
    marginBottom: "1rem",
    textDecoration: "none",
    color: "#0070f3",
    fontSize: "0.9rem",
  },
  image: {
    width: "100%",
    maxHeight: "350px",
    objectFit: "contain",
    margin: "1.5rem 0",
    background: "#fafafa",
  },
  price: {
    fontSize: "1.25rem",
    fontWeight: 600,
    margin: "1rem 0",
  },
  description: {
    lineHeight: 1.6,
  },
  meta: {
  fontSize: "0.95rem",
  color: "#666",
  marginBottom: "1rem",
},
};

export default ProductDetail;
