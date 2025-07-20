import React from "react";
import { FaArrowDown, FaShoppingCart } from "react-icons/fa";
import Menu from "./Menu";
import Contact from "./Contact";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div>
      {/* سكشن الهيرو */}
      <section
        id="home"
        className="hero-section position-relative text-white d-flex align-items-center animate__animated animate__fadeIn"
        style={{
          height: "100vh",
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/hero.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="overlay position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1 }}
        ></div>

        <div className="container text-center position-relative" style={{ zIndex: 2 }}>
          <h1 className="display-4 fw-bold animate__animated animate__fadeInDown">
            {t("hero.title")}
          </h1>
          <p className="lead mt-3 animate__animated animate__fadeInUp">
            {t("hero.subtitle")}
          </p>
          <a href="#menu" className="btn btn-danger btn-lg mt-4">
            <FaShoppingCart className="me-2" />
            {t("hero.orderNow")}
          </a>
        </div>

        <div
          className="scroll-down position-absolute start-50 translate-middle-x text-white"
          style={{ bottom: "40px", zIndex: 2 }}
        >
          <FaArrowDown size={28} className="bounce" />
        </div>
      </section>

      {/* سكشن المنيو */}
      <section id="menu" className="py-5 bg-light animate__animated animate__fadeInUp">
        <div className="container">
          <h2 className="text-center mb-4">{t("menuTitle")}</h2>
          <Menu />
        </div>
      </section>

      {/* سكشن اتصل بنا */}
      <section id="contact" className="py-5 animate__animated animate__fadeInUp">
        <div className="container">
          <h2 className="text-center mb-4">{t("contactTitle")}</h2>
          <Contact />
        </div>
      </section>
    </div>
  );
};

export default Home;
