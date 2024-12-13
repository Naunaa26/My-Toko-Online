import React from "react";
import Header from "../components/tailus/Header";
import Footer from "../components/tailus/Footer";
import about from "../../src/assets/about.svg";

const AboutPage = () => {
  return (
    <>
      <Header />
      <div className="max-lg:mt-20">
        <main className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">
          {/* Hero Section */}
          <div className="relative">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-64 w-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl text-white font-extrabold shadow-md animate__animated animate__pulse">
                Tentang Kami
              </h1>
            </div>
          </div>

          {/* Siapa Kami Section */}
          <section className="container mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="transition-transform transform hover:scale-105">
                <img
                  src={about}
                  alt="Tentang Kami"
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-indigo-600 dark:text-indigo-300">
                  Siapa Kami?
                </h2>
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  Kami adalah platform toko online terpercaya yang berdedikasi
                  untuk memberikan pengalaman belanja terbaik. Kami menyediakan
                  produk berkualitas, layanan pelanggan yang cepat, dan
                  pengiriman tepat waktu untuk kebutuhan Anda.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  Sejak 2024, kami telah menjadi pilihan utama bagi ribuan
                  pelanggan di seluruh Indonesia kami juga menyediakan website
                  yang sudah dilengkapi dengan bantuan untuk kemudahan anda
                  belanja. Visi kami adalah menciptakan ekosistem belanja online
                  yang inovatif dan dapat diandalkan dan juga menjadi tempat
                  yang menyenangkan untuk berbelanja.
                </p>
              </div>
            </div>
          </section>

          {/* Keunggulan Kami Section */}
          <section className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 py-16">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-6">
                Apa Keunggulan Kami ?
              </h2>
              <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
                Kami memberikan pengalaman belanja terbaik dengan berbagai
                keunggulan yang tidak dapat Anda temukan di tempat lain.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
                {[
                  {
                    icon: "🚀",
                    title: "Pengiriman Cepat",
                    description:
                      "Pesanan Anda akan sampai di tangan Anda dengan cepat dan aman.",
                  },
                  {
                    icon: "✅",
                    title: "Produk Berkualitas",
                    description:
                      "Kami hanya menawarkan produk dengan kualitas terbaik dan garansi asli.",
                  },
                  {
                    icon: "💬",
                    title: "Layanan Pelanggan 24/7",
                    description:
                      "Tim kami selalu siap membantu kebutuhan Anda kapan saja.",
                  },
                ].map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center bg-white dark:bg-gray-700 shadow-md rounded-lg p-6 text-center transition-all transform hover:scale-105"
                  >
                    <div className="text-6xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 text-indigo-600 dark:text-indigo-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimoni Pelanggan Section */}
          <section className="container mx-auto px-6 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-indigo-600 dark:text-indigo-300 mb-6">
                Apa Kata Pelanggan Kami?
              </h2>
              <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
                Kami bangga telah melayani ribuan pelanggan yang puas dengan
                layanan kami.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
                {[
                  {
                    name: "Siti Nurhaliza",
                    feedback:
                      "Belanja di sini sangat mudah dan cepat! Produk berkualitas dan pengirimannya super cepat.",
                  },
                  {
                    name: "Rahmat Hidayat",
                    feedback:
                      "Layanan pelanggan sangat membantu. Saya akan merekomendasikan toko ini kepada teman-teman saya.",
                  },
                  {
                    name: "Indra Wijaya",
                    feedback:
                      "Produk original dan harganya sangat bersaing. Pengalaman belanja terbaik sejauh ini!",
                  },
                ].map((testimonial, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-6 text-center"
                  >
                    <p className="italic text-gray-600 dark:text-gray-300 mb-4">
                      "{testimonial.feedback}"
                    </p>
                    <h3 className="font-bold text-indigo-600 dark:text-indigo-300">
                      {testimonial.name}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Misi dan Visi Kami Section */}
          <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 py-16">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-4xl sm:text-5xl font-bold text-white dark:text-gray-100 animate-pulse">
                  Misi dan Visi Kami
                </h2>
                <p className="mt-4 text-lg text-gray-100 dark:text-gray-300">
                  Menjadi toko online yang dipercaya oleh setiap pelanggan kami
                  dengan layanan inovatif dan terpercaya.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 text-lg text-gray-100 dark:text-gray-300">
                {/* Misi Kami */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
                  <h3 className="text-2xl font-semibold mb-6 text-indigo-600 dark:text-indigo-300">
                    Misi Kami
                  </h3>
                  <ul className="list-disc list-inside space-y-4 dark:text-white text-black">
                    <li>
                      Menyediakan produk berkualitas tinggi dengan harga
                      terbaik.
                    </li>
                    <li>
                      Memastikan setiap pelanggan mendapatkan pengalaman belanja
                      yang luar biasa.
                    </li>
                    <li>
                      Memberikan layanan pelanggan responsif dan efektif untuk
                      solusi yang cepat.
                    </li>
                  </ul>
                </div>

                {/* Visi Kami */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
                  <h3 className="text-2xl font-semibold mb-6 text-indigo-600 dark:text-indigo-300">
                    Visi Kami
                  </h3>
                  <p className="leading-relaxed dark:text-white text-black">
                    Menjadi pemimpin dalam industri e-commerce yang mengutamakan
                    kepercayaan pelanggan, dengan inovasi yang tidak hanya
                    memenuhi harapan tetapi juga melampaui ekspektasi mereka.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default AboutPage;
