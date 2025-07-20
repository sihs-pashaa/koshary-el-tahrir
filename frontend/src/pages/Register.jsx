import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, address, password, confirmPassword } = formData;

    if (!name || !email || !address || !password || !confirmPassword) {
      setError(t("registerPage.errors.fillAllFields"));
      return;
    }

    if (password !== confirmPassword) {
      setError(t("registerPage.errors.passwordMismatch"));
      return;
    }

    try {
      const res = await axios.post("http://localhost:4000/users", {
        name,
        email,
        address,
        password,
      });

      setSuccessMsg(t("registerPage.success"));
      setError("");
      setFormData({
        name: "",
        email: "",
        address: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      if (err.response?.status === 409) {
        setError(t("registerPage.errors.emailExists"));
      } else {
        setError(t("registerPage.errors.serverError"));
      }
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">{t("registerPage.title")}</h2>

      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "500px" }}>
        <div className="mb-3">
          <label className="form-label">{t("registerPage.name")}</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            placeholder={t("registerPage.namePlaceholder")}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">{t("registerPage.email")}</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            placeholder={t("registerPage.emailPlaceholder")}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">{t("registerPage.address")}</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={formData.address}
            placeholder={t("registerPage.addressPlaceholder")}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">{t("registerPage.password")}</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            placeholder={t("registerPage.passwordPlaceholder")}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">{t("registerPage.confirmPassword")}</label>
          <input
            type="password"
            className="form-control"
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder={t("registerPage.confirmPasswordPlaceholder")}
            onChange={handleChange}
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {successMsg && <div className="alert alert-success">{successMsg}</div>}

        <button type="submit" className="btn btn-primary w-100">
          {t("registerPage.submit")}
        </button>
      </form>
    </div>
  );
};

export default Register;
