import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { FaArrowRight, FaCheck } from "react-icons/fa";
import { FaUtensils, FaHamburger, FaPizzaSlice } from "react-icons/fa";
import Cookies from "js-cookie";

const Tutorial = () => {
  const [hasSeenTutorial, setHasSeenTutorial] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const tutorialSteps = [
    {
      message: "Selamat datang di situs kami! Mari kami pandu. 🍕",
      position: "top",
      icon: <FaPizzaSlice className="text-xl mb-2" />,
    },
    {
      message:
        "Ini adalah sidebar. Kamu bisa memfilter dan mengurutkan produk di sini. 🍔",
      position: "left",
      icon: <FaHamburger className="text-xl mb-2" />,
    },
    {
      message: "Klik produk apapun untuk melihat detailnya. 🍴",
      position: "right",
      icon: <FaUtensils className="text-xl mb-2" />,
    },
    {
      message: "Gulir untuk melihat lebih banyak produk. 🥗",
      position: "bottom",
      icon: <FaHamburger className="text-xl mb-2" />,
    },
  ];

  useEffect(() => {
    const seenTutorial = Cookies.get("hasSeenTutorial");
    if (seenTutorial && seenTutorial !== "cancelled") {
      setHasSeenTutorial(true);
    }

    const userDarkModePreference = localStorage.getItem("darkMode");
    if (userDarkModePreference) {
      setIsDarkMode(userDarkModePreference === "true");
    } else {
      setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }

    if (!hasSeenTutorial) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [hasSeenTutorial]);

  const handleNextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleCloseTutorial();
    }
  };

  const handleCloseTutorial = () => {
    setHasSeenTutorial(true);
    Cookies.set("hasSeenTutorial", "true", { expires: 365 });
  };

  const handleCancelTutorial = () => {
    setHasSeenTutorial(true);
    Cookies.set("hasSeenTutorial", "cancelled", { expires: 365 });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("darkMode", !isDarkMode ? "true" : "false");
  };

  if (hasSeenTutorial) return null;

  return (
    <Transition
      show={!hasSeenTutorial}
      enter="transition-opacity duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-500"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 ${
          isDarkMode ? "bg-black bg-opacity-70" : "bg-white bg-opacity-60"
        } flex justify-center items-center z-50`}
      >
        <div
          className={`${
            isDarkMode
              ? "bg-gradient-to-r from-gray-700 to-gray-900 text-white"
              : "bg-gradient-to-r from-yellow-400 to-red-500 text-white"
          } p-8 rounded-2xl shadow-2xl w-96 relative max-w-full`}
        >
          {/* Tooltip Arrow */}
          <div
            className={`absolute ${
              tutorialSteps[currentStep].position === "top" ? "top-[-10px]" : ""
            } ${
              tutorialSteps[currentStep].position === "bottom"
                ? "bottom-[-10px]"
                : ""
            } ${
              tutorialSteps[currentStep].position === "left"
                ? "left-[-10px]"
                : ""
            } ${
              tutorialSteps[currentStep].position === "right"
                ? "right-[-10px]"
                : ""
            } w-6 h-6 bg-white rotate-45 shadow-md`}
          />

          <h2 className="text-3xl font-semibold mb-4 flex justify-center items-center">
            {tutorialSteps[currentStep].icon}
            <span className="ml-2">Langkah {currentStep + 1}</span>
          </h2>
          <p className="text-lg mb-6">{tutorialSteps[currentStep].message}</p>
          <div className="flex justify-between space-x-4">
            <button
              onClick={handleCancelTutorial}
              className={`w-1/2 ${
                isDarkMode ? "bg-red-600 text-white" : "bg-red-500 text-white"
              } font-bold py-2 rounded-md shadow-md hover:bg-red-700 stransition-all duration-200`}
            >
              Batal
            </button>
            <button
              onClick={handleNextStep}
              className={`w-1/2 ${
                isDarkMode ? "bg-white text-black" : "bg-white text-yellow-600"
              } font-bold py-2 rounded-md shadow-md hover:bg-blue-200 transition-all duration-200`}
            >
              {currentStep === tutorialSteps.length - 1 ? (
                <span>
                  <FaCheck className="inline mr-2" /> Selesai!
                </span>
              ) : (
                <span>
                  <FaArrowRight className="inline mr-2" /> Lanjut
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default Tutorial;
