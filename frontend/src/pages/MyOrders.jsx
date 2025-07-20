// src/pages/MyOrders.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

const MyOrders = () => {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:3001/orders?email=${user.email}`)
        .then((res) => setOrders(res.data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">{t("ordersPage.title")}</h2>

      {orders.length === 0 ? (
        <p className="text-center">{t("ordersPage.noOrders")}</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>{t("ordersPage.orderId")}</th>
                <th>{t("ordersPage.date")}</th>
                <th>{t("ordersPage.products")}</th>
                <th>{t("ordersPage.total")}</th>
                <th>{t("ordersPage.status")}</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.date}</td>
                  <td>
                    <ul className="mb-0">
                      {order.items.map((item, idx) => (
                        <li key={idx}>
                          {item.name} × {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    {order.total} {t("ordersPage.currency")}
                  </td>
                  <td>{order.status || t("ordersPage.pending")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
