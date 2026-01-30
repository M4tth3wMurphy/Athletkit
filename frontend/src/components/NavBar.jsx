import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>
        <Link to="/" style={styles.logoLink}>
          Athletkit
        </Link>
      </h2>

      <div style={styles.links}>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>

        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {user && (
          <>
            <span style={styles.user}>{user.email}</span>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    background: "#fff",
    borderBottom: "1px solid #ddd",
  },
  logo: {
    margin: 0,
    fontWeight: 700,
  },
  logoLink: {
    textDecoration: "none",
    color: "#000",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "1.2rem",
  },
  user: {
    fontSize: "0.9rem",
    color: "#555",
  },
  logoutBtn: {
    background: "none",
    border: "1px solid #ccc",
    padding: "0.4rem 0.7rem",
    cursor: "pointer",
  },
};

export default NavBar;
