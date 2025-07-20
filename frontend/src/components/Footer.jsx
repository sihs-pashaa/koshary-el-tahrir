import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaWhatsapp, FaFacebook } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer bg-dark text-light py-5 mt-5">
      <div className="container">
        <div className="row">

          {/* اسم المحل */}
          <div className="col-md-4 mb-4 fade-in">
            <h4 className="text-warning">{t("kosharyTitle")}</h4>
            <p className="text-light">{t("footer.about")}</p>
          </div>

          {/* روابط سريعة */}
          <div className="col-md-4 mb-4 fade-in">
            <h5 className="text-warning">{t("footer.quickLinks")}</h5>
            <ul className="list-unstyled">
              <li>
                <Link className="text-light text-decoration-none" to="/">
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link className="text-light text-decoration-none" to="/menu">
                  {t("menuTitle")}
                </Link>
              </li>
              <li>
                <Link className="text-light text-decoration-none" to="/contact">
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* تواصل اجتماعي */}
          <div className="col-md-4 mb-4 fade-in">
            <h5 className="text-warning">{t("footer.followUs")}</h5>
            <p className="text-light">📞 0100-123-4567</p>
            <div className="d-flex gap-3">
              <a href="https://wa.me/201001234567" target="_blank" rel="noreferrer">
                <FaWhatsapp size={24} color="#25D366" />
              </a>
              <a href="https://instagram.com/kosharyeltahrir" target="_blank" rel="noreferrer">
                <FaInstagram size={24} color="#E1306C" />
              </a>
              <a href="https://facebook.com/kosharyeltahrir" target="_blank" rel="noreferrer">
                <FaFacebook size={24} color="#1877F2" />
              </a>
            </div>
          </div>
        </div>

        <hr className="border-secondary" />

        {/* الحقوق والتصميم */}
        <div className="text-center mt-3">
          <p className="text-white fw-bold mb-1">
            &copy; {new Date().getFullYear()} {t("footer.rights")}
          </p>
          <p className="text-white fw-bold mb-0">
            {t("footer.designedBy")}
          </p>
        </div>
      </div>

      <style>
        {`
          .fade-in {
            opacity: 0;
            transform: translateY(20px);
            animation: fadeIn 1s ease forwards;
          }

          @keyframes fadeIn {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .footer a:hover {
            text-decoration: underline;
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
