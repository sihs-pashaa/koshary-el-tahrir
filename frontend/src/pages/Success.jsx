import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Success = () => {
  const { t } = useTranslation();

  return (
    <div className="container text-center my-5">
      <h2 className="text-success mb-4">
        ✅ {t("orderSuccess.successTitle")}
      </h2>
      <p>{t("orderSuccess.successMessage")}</p>
      <Link to="/" className="btn btn-primary mt-3">
        {t("orderSuccess.backToHome")}
      </Link>
    </div>
  );
};

export default Success;
