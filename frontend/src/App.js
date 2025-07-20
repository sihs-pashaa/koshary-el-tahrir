import React, { useContext } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // ✅ استيراد الفوتر

// الصفحات
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import ProductDetails from "./pages/ProductDetails";
import MyOrders from "./pages/MyOrders"; // ✅ جديد
import "./i18n";

import { CartProvider } from "./context/CartContext";
import { AuthProvider, AuthContext } from "./context/AuthContext";

// استايلات
import "animate.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// ✅ حماية الصفحات الخاصة بالمستخدم
function RequireAuth({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <Router>
          <Navbar />

          {/* ✅ تغليف المحتوى والفوتر بـ app-wrapper */}
          <div className="app-wrapper">
            <div className="container mt-4 flex-grow-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/admin"
                  element={
                    <RequireAuth>
                      <Admin />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/my-orders"
                  element={
                    <RequireAuth>
                      <MyOrders />
                    </RequireAuth>
                  }
                />
                <Route path="/cart" element={<Cart />} />
                <Route path="/success" element={<Success />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>

            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
