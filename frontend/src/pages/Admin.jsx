import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Admin = () => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  const handleDelete = (orderId) => {
    if (window.confirm(t("admin.confirmDelete"))) {
      axios
        .delete(`http://localhost:3001/orders/${orderId}`)
        .then(() => {
          setOrders((prev) => prev.filter((order) => order.id !== orderId));
        })
        .catch((err) => {
          console.error("❌ Error deleting order:", err);
        });
    }
  };

  const handleConfirm = (orderId) => {
    alert(`${t("admin.orderConfirmed")} ${orderId}`);
  };

  const handlePrint = (order) => {
    const printContent = `
      <h2>${t("admin.invoice")} ${order.id}</h2>
      <p><strong>${t("admin.name")}:</strong> ${order.name}</p>
      <p><strong>${t("admin.phone")}:</strong> ${order.phone}</p>
      <p><strong>${t("admin.address")}:</strong> ${order.address}</p>
      <h4>${t("admin.products")}:</h4>
      <ul>
        ${order.items
          .map((item) => `<li>${item.name} - ${t("admin.quantity")}: ${item.quantity}</li>`)
          .join("")}
      </ul>
    `;
    const newWin = window.open("", "_blank");
    newWin.document.write(printContent);
    newWin.document.close();
    newWin.print();
  };

  const filteredOrders = orders.filter((order) => {
    const search = searchTerm.toLowerCase();
    return (
      order.name.toLowerCase().includes(search) ||
      order.phone.toLowerCase().includes(search)
    );
  });

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📋 {t("admin.title")}</h2>

      <input
        type="text"
        className="form-control mb-4"
        placeholder={t("admin.searchPlaceholder")}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredOrders.length === 0 ? (
        <p>{t("admin.noOrders")}</p>
      ) : (
        filteredOrders.map((order) => (
          <div key={order.id} className="card mb-3 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{t("admin.orderNumber")} {order.id}</h5>
              <p><strong>{t("admin.name")}:</strong> {order.name}</p>
              <p><strong>{t("admin.phone")}:</strong> {order.phone}</p>
              <p><strong>{t("admin.address")}:</strong> {order.address}</p>

              <h6 className="mt-3">🛒 {t("admin.products")}:</h6>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.name} - {t("admin.quantity")}: {item.quantity}
                  </li>
                ))}
              </ul>

              <div className="mt-3 d-flex gap-2 flex-wrap">
                <button
                  className="btn btn-success"
                  onClick={() => handleConfirm(order.id)}
                >
                  ✅ {t("admin.confirmOrder")}
                </button>

                <button
                  className="btn btn-primary"
                  onClick={() => handlePrint(order)}
                >
                  🖨️ {t("admin.printInvoice")}
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(order.id)}
                >
                  ❌ {t("admin.cancelOrder")}
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Admin;
