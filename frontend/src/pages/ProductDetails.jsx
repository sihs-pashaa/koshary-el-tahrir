import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { useTranslation } from "react-i18next";
import "animate.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false);
  const { addToCart } = useContext(CartContext);
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/products/${id}`)
      .then((res) => {
        if (res.data && res.data.id) {
          setProduct(res.data);
        } else {
          setError(true);
        }
      })
      .catch((err) => {
        console.error("❌ Error fetching product:", err);
        setError(true);
      });
  }, [id]);

  if (!product && !error) {
    return <div className="text-center mt-5">{t("product.loading")}</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-5 text-danger">
        {t("product.notFound")}
        <br />
        <Link to="/menu" className="btn btn-secondary mt-3">
          {t("product.backToMenu")}
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 animate__animated animate__fadeIn">
          <div className="card shadow p-4 text-center">
            <img
             src={`${process.env.PUBLIC_URL}${product.image}`}
              alt={product.name}
              className="img-fluid mb-4 w-100"
              style={{
                maxHeight: "510px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
            <h2>{product.name}</h2>
            <p className="fw-bold">{product.price}</p>
            <p>{product.description}</p>

            <button
              className="btn btn-danger mt-3"
              onClick={() => addToCart(product)}
            >
              {t("product.addToCart")} 🛒
            </button>

            <Link to="/menu" className="btn btn-outline-secondary mt-3 ms-2">
              {t("product.backToMenu")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
