import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/buy.svg";
import { AnimatePresence, motion } from "framer-motion";

export function LetterPullUp({ text }) {
  const letters = text.split("");

  const pullupVariant = {
    initial: { y: 100, opacity: 0 },
    animate: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
      },
    }),
  };

  return (
    <div className="flex flex-wrap justify-center md:justify-start">
      {letters.map((letter, i) => (
        <motion.h1
          key={i}
          variants={pullupVariant}
          initial="initial"
          animate="animate"
          custom={i}
          className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-[-0.02em] drop-shadow-sm text-white"
        >
          {letter === " " ? <span>&nbsp;</span> : letter}
        </motion.h1>
      ))}
    </div>
  );
}

export function GradualSpacing({ text }) {
  const gradual = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="flex flex-wrap justify-center md:justify-start mt-6 ">
      <AnimatePresence>
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={gradual}
            transition={{ duration: 0.3, delay: i * 0.015 }}
            className="text-gray-300 text-sm sm:text-sm md:text-base font-normal  leading-relaxed"
          >
            {char === " " ? <span>&nbsp;</span> : char}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}

const Hero = () => {
  return (
    <section id="home" className="py-4 sm:py-6">
      <div className="bg-gradient-to-r from-[#0f2f63] to-[#2cce75] p-6 sm:p-10 rounded-lg shadow-lg flex flex-col md:flex-row items-center">
        {/* Text Section */}
        <div className="w-full md:w-2/3 space-y-3 sm:space-y-4 text-center md:text-left pr-0 md:pr-6">
          <motion.div
            initial="hidden"
            animate="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {/* LetterPullUp: Selamat Datang */}
            <LetterPullUp
              text="Selamat Datang Di BlueMoon Mart26"
              className="text-white"
            />

            {/* Subtitle */}
            <motion.h2
              className="text-lg sm:text-lg md:text-xl font-semibold text-white mt-2 sm:mt-2"
              variants={{
                hidden: { opacity: 0, y: -20 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 100, damping: 25 },
                },
              }}
            >
              Pusat Belanja Terbaik untuk Kualitas dan Kenyamanan Anda
            </motion.h2>

            {/* Deskripsi Panjang */}
            <GradualSpacing
              text="Di BlueMoon Mart26, kami berkomitmen untuk memberikan Anda pilihan produk terbaik yang berkualitas, dari kebutuhan sehari-hari hingga barang unik yang sulit ditemukan di tempat lain. Kami percaya bahwa berbelanja harus menjadi pengalaman yang menyenangkan dan memuaskan, sehingga kami selalu menghadirkan produk-produk yang terjamin mutu dan keasliannya."
              className="text-white"
            />

            {/* Tombol */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: -20 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 100, damping: 25 },
                },
              }}
              className="flex justify-center md:justify-start"
            >
              <Link
                to="/product"
                className="btn bg-gradient-to-r from-[#0f2f63] to-[#2cce75] hover:from-[#2cce75] hover:to-[#0f4f88] text-white font-semibold text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3 mt-4 sm:mt-6 rounded-full shadow-lg hover:shadow-xl transition duration-300"
              >
                Belanja Sekarang
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/3 flex justify-center mt-6 md:mt-0">
          <motion.img
            src={logo}
            alt="Logo"
            className="h-48 sm:h-[18rem] md:h-[22rem] object-contain transform scale-100 transition duration-300 ease-in-out hover:scale-105"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
