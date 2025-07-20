import React, { useContext, useState } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Cart = () => {
  const {
    cartItems,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useContext(CartContext);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [success, setSuccess] = useState(false);

  const isLoggedIn = Boolean(localStorage.getItem("user"));

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.quantity * parseFloat(item.price);
  }, 0);

  const handleOrder = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (!name || !phone || !address) {
      alert(t("cartPage.errors.fillAllFields"));
      return;
    }

    try {
      await axios.post("http://localhost:3001/orders", {
        name,
        phone,
        address,
        items: cartItems,
      });

      setSuccess(true);
      clearCart();
      setName("");
      setPhone("");
      setAddress("");
    } catch (error) {
      console.error("Order failed:", error);
      alert(t("cartPage.errors.serverError"));
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">{t("cartPage.title")}</h2>

      {cartItems.length === 0 ? (
        <p>{t("cartPage.emptyCart")}</p>
      ) : (
        <>
          <ul className="list-group mb-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{item.name}</strong> <br />
                  <span>{t("cartPage.quantity")}: {item.quantity}</span>
                </div>
                <div>
                  <button
                    className="btn btn-sm btn-secondary me-2"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    -
                  </button>
                  <button
                    className="btn btn-sm btn-secondary me-2"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => removeFromCart(item.id)}
                  >
                    {t("cartPage.remove")}
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <h5 className="text-end mt-3">
            {t("cartPage.total")}: {totalPrice.toFixed(2)} {t("cartPage.currency")}
          </h5>

          <h4 className="mb-3 mt-4">{t("cartPage.customerInfo")}</h4>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder={t("cartPage.placeholders.name")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isLoggedIn}
            />
          </div>
          <div className="mb-3">
            <input
              type="tel"
              className="form-control"
              placeholder={t("cartPage.placeholders.phone")}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={!isLoggedIn}
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder={t("cartPage.placeholders.address")}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={!isLoggedIn}
            />
          </div>

          <button
            className="btn btn-success w-100"
            onClick={handleOrder}
            disabled={!isLoggedIn}
          >
            {t("cartPage.confirmOrder")}
          </button>

          {!isLoggedIn && (
            <div className="alert alert-warning mt-3">
              {t("cartPage.loginFirst")}
              <br />
              <button
                className="btn btn-link p-0"
                onClick={() => navigate("/login")}
              >
                {t("cartPage.loginHere")}
              </button>
            </div>
          )}

          {success && (
            <div className="alert alert-success mt-3">
              {t("cartPage.success")}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
