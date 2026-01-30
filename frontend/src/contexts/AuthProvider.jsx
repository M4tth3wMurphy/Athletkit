import { useState } from "react";
import { AuthContext } from "./AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

const getInitialAuthState = () => {
  try {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user && token) {
      return JSON.parse(user);
    }
  } catch (err) {
    console.error("Failed to restore auth state", err);
  }

  return null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getInitialAuthState);

  const login = async (email, password) => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error("Invalid login credentials");
    }

    const data = await res.json();

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
