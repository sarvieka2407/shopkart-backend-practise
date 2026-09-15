import React from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/customers/logout");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Fallback redirect to login
      navigate("/login");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/home" className="navbar-logo">
          <span className="logo-icon">🛒</span>
          <span className="logo-text">ShopKart</span>
        </Link>
        <div className="navbar-menu">
          <Link to="/home" className="nav-link">
            Home
          </Link>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
