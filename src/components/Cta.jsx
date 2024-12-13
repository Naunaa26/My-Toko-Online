import React from "react";

const Cta = () => {
  return (
    <section
      id="cta"
      className="relative bg-cover bg-center text-white py-16 px-8 text-center rounded-md overflow-hidden"
      style={{
        backgroundImage:
          "url('https://wallpapers.com/images/featured/supermarket-brhr0v0zqqxvtafp.jpg')",
      }}
    >
      {/* Overlay untuk efek gelap transparan */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      {/* Konten Utama */}
      <div className="relative z-10 max-w-4xl mx-auto rounded-md">
        {/* Heading dengan warna yang lebih gelap */}
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-100">
          Siap Menjelajahi Penawaran Terbaik?
        </h2>

        {/* Deskripsi dengan gaya menarik */}
        <p className="text-lg md:text-xl mb-6 text-gray-300">
          Jangan lewatkan penawaran luar biasa! Temukan produk terbaik yang
          dirancang khusus untuk Anda.
        </p>

        {/* Tombol Call-to-Action */}
        <a
          href="/product"
          className="inline-block bg-gradient-to-r from-blue-700 to-green-600 hover:from-green-600 hover:to-blue-700 text-white text-lg font-semibold py-3 px-8 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-110 hover:shadow-2xl"
        >
          Belanja Sekarang
        </a>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-blue-700 rounded-full opacity-50 blur-xl"></div>
      <div className="absolute -top-6 -right-6 w-28 h-28 bg-green-700 rounded-full opacity-50 blur-2xl"></div>
    </section>
  );
};

export default Cta;
