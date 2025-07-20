import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "animate.css";

const Menu = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const [activeSection, setActiveSection] = useState("koshary");
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get("http://localhost:3001/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // تصفية المنتجات حسب التصنيف
  const koshary = products.filter((p) => p.category === "كشري");
  const extras = products.filter((p) => p.category === "الإضافات");
  const drinks = products.filter((p) => p.category === "مشروبات");
  const sweets = products.filter((p) => p.category === "حلويات");

  const renderSection = (titleKey, items, id) => (
    <section id={id} className="my-5">
      <h2 className="text-center mb-4 animate__animated animate__fadeInDown">
        {t(`menu.categories.${titleKey}`)}
      </h2>
      <div className="row">
        {items.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card h-100 shadow animate__animated animate__fadeInUp">
              <Link to={`/product/${product.id}`}>
                <img
               src={`${process.env.PUBLIC_URL}/${product.image}`} 
                  className="card-img-top"
                  alt={product.name}
                  style={{
                    height: id === "drinks" ? "300px" : "35vh",
                    width: "100%",
                    objectFit: id === "drinks" ? "contain" : "cover",
                    padding: id === "drinks" ? "20px" : "0",
                  }}
                />
              </Link>
              <div className="card-body text-center">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text fw-bold">{product.price}</p>
                <button className="btn btn-danger" onClick={() => addToCart(product)}>
                  {t("menu.addToCart")}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["koshary", "extras", "drinks", "sweets"];
      for (let id of sections) {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="container-fluid mt-5 pt-3 px-4">
      <div className="d-flex justify-content-center gap-3 flex-wrap my-4">
        <a href="#koshary" className={`btn ${activeSection === "koshary" ? "btn-danger" : "btn-outline-danger"}`}>
          {t("menu.categories.koshary")}
        </a>
        <a href="#extras" className={`btn ${activeSection === "extras" ? "btn-danger" : "btn-outline-danger"}`}>
          {t("menu.categories.extras")}
        </a>
        <a href="#drinks" className={`btn ${activeSection === "drinks" ? "btn-danger" : "btn-outline-danger"}`}>
          {t("menu.categories.drinks")}
        </a>
        <a href="#sweets" className={`btn ${activeSection === "sweets" ? "btn-danger" : "btn-outline-danger"}`}>
          {t("menu.categories.sweets")}
        </a>
      </div>

      {renderSection("koshary", koshary, "koshary")}
      {renderSection("extras", extras, "extras")}
      {renderSection("drinks", drinks, "drinks")}
      {renderSection("sweets", sweets, "sweets")}
    </div>
  );
};

export default Menu;
