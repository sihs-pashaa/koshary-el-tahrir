import React, { useContext } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

function Navbar() {
  const { cartItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isHomePage = location.pathname === "/";

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    // ❌ مش هنغير اتجاه الصفحة عشان الترتيب مايتشقلبش
  };

  return (
    <>
      <style>{`
        .nav-link {
          transition: color 0.3s ease, background-color 0.3s ease;
        }
        .nav-link:hover {
          color: #fff !important;
          background-color: #dc3545 !important;
          border-radius: 5px;
        }
        .cart-button:hover {
          background-color: #dc3545 !important;
          color: #fff !important;
        }
      `}</style>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 fixed-top">
        <RouterLink className="navbar-brand fw-bold" to="/">
          {t("kosharyTitle") || "كشري التحرير"}
        </RouterLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">

            {isHomePage ? (
              <>
                <li className="nav-item">
                  <ScrollLink to="home" smooth={true} duration={500} offset={-70} className="nav-link">
                    {t("home")}
                  </ScrollLink>
                </li>
                <li className="nav-item">
                  <ScrollLink to="menu" smooth={true} duration={500} offset={-70} className="nav-link">
                    {t("menuTitle")}
                  </ScrollLink>
                </li>
                <li className="nav-item">
                  <ScrollLink to="contact" smooth={true} duration={500} offset={-70} className="nav-link">
                    {t("contact")}
                  </ScrollLink>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <RouterLink className="nav-link" to="/">
                  {t("home")}
                </RouterLink>
              </li>
            )}

            {!user && (
              <>
                <li className="nav-item">
                  <RouterLink className="nav-link" to="/login">
                    {t("login")}
                  </RouterLink>
                </li>
                <li className="nav-item">
                  <RouterLink className="nav-link" to="/register">
                    {t("register")}
                  </RouterLink>
                </li>
              </>
            )}

            {user && (
              <>
                <li className="nav-item">
                  <RouterLink className="nav-link text-warning" to="/admin">
                    {t("adminPanel")}
                  </RouterLink>
                </li>
                <li className="nav-item">
                  <RouterLink className="nav-link" to="/my-orders">
                    {t("myOrders")}
                  </RouterLink>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light ms-3" onClick={handleLogout}>
                    {t("logout")}
                  </button>
                </li>
              </>
            )}

            <li className="nav-item">
              <RouterLink className="nav-link btn btn-outline-light ms-2 cart-button" to="/cart">
                🛒 {t("cart")} ({cartItems.length})
              </RouterLink>
            </li>

            {/* ✅ زر تغيير اللغة */}
            <li className="nav-item ms-2">
              <button className="btn btn-sm btn-outline-warning" onClick={toggleLanguage}>
                {i18n.language === "en" ? "🇸🇦 عربي" : "🇬🇧 English"}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
