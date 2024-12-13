import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import ProductDetail from "./pages/ProductDetail.jsx";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import FakeCaptcha from "./components/FakeCaptcha";
import Header from "./components/tailus/Header";

const App = () => {
  const [captchaVerified, setCaptchaVerified] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("captchaVerified") === "true") {
      setCaptchaVerified(true);
    }
  }, []);

  const handleCaptchaVerified = () => {
    setCaptchaVerified(true);
    localStorage.setItem("captchaVerified", "true");
  };

  return (
    <BrowserRouter>
      {!captchaVerified ? (
        <>
          <Header />
          <div className="captcha-container mt-4 dark:text-white text-black">
            <FakeCaptcha onVerified={handleCaptchaVerified} />
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
