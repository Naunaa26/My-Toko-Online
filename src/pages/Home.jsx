import React, { useState, useEffect } from "react";
import Header from "../components/tailus/Header";
import Hero from "../components/Hero";
import ProductList from "../components/ProductList";
import WhyChoose from "../components/WhyChoose";
import SupportPayment from "../components/SupportPayment";
import Cta from "../components/Cta";
import Footer from "../components/tailus/Footer";
import Tutorial from "../components/Tutorial.jsx";

const Home = () => {
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("hasVisited")) {
      setShowTutorial(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  const handleCloseTutorial = () => {
    setShowTutorial(false);
  };

  return (
    <>
      <Header />
      <div className="m-4 max-lg:mt-24">
        <Hero />
        <ProductList />
        <WhyChoose />
        <SupportPayment />
        <Cta />
      </div>
      <Footer />
      {showTutorial && <Tutorial onClose={handleCloseTutorial} />}
    </>
  );
};

export default Home;
