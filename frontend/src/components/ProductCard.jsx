import { Link } from "react-router-dom";

const ProductCard = ({ product, onFilterSelect }) => {
  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0]
      : "https://via.placeholder.com/400x300?text=No+Image";

  return (
    <div style={styles.card}>
      <img
        src={imageUrl}
        alt={product.name}
        style={styles.image}
      />

      <h3 style={styles.name}>{product.name}</h3>

      <div style={styles.meta}>
        {product.brand && (
          <button
            type="button"
            style={styles.pill}
            onClick={() => onFilterSelect(product.brand)}
          >
            {product.brand}
          </button>
        )}

        {product.gender && (
          <button
            type="button"
            style={styles.pill}
            onClick={() => onFilterSelect(product.gender)}
          >
            {product.gender}
          </button>
        )}

        {product.type && (
          <button
            type="button"
            style={styles.pill}
            onClick={() => onFilterSelect(product.type)}
          >
            {product.type}
          </button>
        )}
      </div>

      <p style={styles.price}>£{product.price}</p>

      <Link to={`/products/${product._id}`} style={styles.link}>
        View details
      </Link>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    padding: "1rem",
    background: "#fff",
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "contain",
    marginBottom: "0.75rem",
    background: "#fafafa",
  },
  name: {
    margin: "0 0 0.5rem 0",
    fontSize: "1rem",
  },
  meta: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    marginBottom: "0.75rem",
  },
  pill: {
    border: "1px solid #ccc",
    borderRadius: "999px",
    padding: "0.25rem 0.6rem",
    background: "#f5f5f5",
    fontSize: "0.75rem",
    cursor: "pointer",
  },
  price: {
    margin: "0 0 0.75rem 0",
    fontWeight: 600,
  },
  link: {
    textDecoration: "none",
    color: "#0070f3",
    fontSize: "0.9rem",
  },
};

export default ProductCard;
