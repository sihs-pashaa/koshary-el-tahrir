import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Contact.css"; // لو عندك تنسيقات خاصة
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 fw-bold" data-aos="fade-down">
        {t("contactForm.title")}
      </h2>

      <div className="row">
        <div className="col-md-7" data-aos="fade-left">
          <form
            onSubmit={handleSubmit}
            className="p-4 shadow rounded bg-light"
          >
            <div className="mb-3">
              <label className="form-label">{t("contactForm.name")}</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={form.name}
                onChange={handleChange}
                placeholder={t("contactForm.placeholder.name")}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">{t("contactForm.email")}</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={form.email}
                onChange={handleChange}
                placeholder={t("contactForm.placeholder.email")}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">{t("contactForm.phone")}</label>
              <input
                type="tel"
                name="phone"
                className="form-control"
                value={form.phone}
                onChange={handleChange}
                placeholder={t("contactForm.placeholder.phone")}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">{t("contactForm.message")}</label>
              <textarea
                name="message"
                rows="5"
                className="form-control"
                value={form.message}
                onChange={handleChange}
                placeholder={t("contactForm.placeholder.message")}
                required
              />
            </div>

            <button type="submit" className="btn btn-danger w-100 fancy-hover">
              {t("contactForm.send")}
            </button>

            {showSuccess && (
              <div className="alert alert-success mt-3" data-aos="zoom-in">
                {t("contactForm.success")}
              </div>
            )}
          </form>
        </div>

        <div
          className="col-md-5 d-flex flex-column justify-content-center"
          data-aos="fade-right"
        >
          <div className="p-4 bg-dark text-white rounded shadow mt-4 mt-md-0">
            <h5 className="mb-3">{t("contactForm.info.addressTitle")}</h5>
            <p>{t("contactForm.info.address")}</p>

            <h5 className="mb-3">{t("contactForm.info.phoneTitle")}</h5>
            <p>01234567890</p>

            <h5 className="mb-3">{t("contactForm.info.workingHoursTitle")}</h5>
            <p>{t("contactForm.info.workingHours")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
