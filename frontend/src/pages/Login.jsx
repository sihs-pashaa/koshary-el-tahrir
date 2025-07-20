import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.get(
        `http://localhost:3001/users?email=${email}&password=${password}`
      );

      if (res.data.length > 0) {
        const userData = res.data[0];
        localStorage.setItem("loggedInUser", JSON.stringify(userData));
        login(userData);
        navigate("/admin");
      } else {
        setError(t("loginPage.invalidCredentials"));
      }
    } catch (err) {
      console.error(err);
      setError(t("loginPage.error"));
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="mb-4 text-center">{t("loginPage.title")}</h2>

        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              {t("loginPage.email")}
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="admin@koshary.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              {t("loginPage.password")}
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {t("loginPage.loginBtn")}
          </button>
        </form>

        <div className="text-center mt-3">
          <p>
            {t("loginPage.noAccount")}{" "}
            <Link to="/register" className="btn btn-link p-0">
              {t("loginPage.registerLink")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
