import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import "../styles/Navbar.css";
import { FaLock, FaUnlock, FaMoon, FaSun } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Check if we are on login or signup page
  const hideNavItems = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <nav className="navbar">
      <Link to="/home" className="logo-container">
        <FaLock className="logo-icon" />
        <span className="logo-text">EncryptoBox</span>
      </Link>

      {!hideNavItems && (
        <div className="nav-links">
          {role === "admin" && (
            <Link to="/admin" className="nav-link">Admin</Link>
          )}
          <Link to="/encrypt" className="nav-link">
            <FaLock /> Encrypt
          </Link>
          <Link to="/decrypt" className="nav-link">
            <FaUnlock /> Decrypt
          </Link>
          <button onClick={handleLogout} className="nav-link logout-btn">
            Logout
          </button>
        </div>
      )}

      <button className="dark-mode-btn" onClick={toggleDarkMode}>
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
    </nav>
  );
};

export default Navbar;
