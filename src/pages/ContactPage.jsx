import Header from "../components/tailus/Header";
import Footer from "../components/tailus/Footer";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";

const ContactPage = () => {
  const position = [-6.2088, 106.8456];

  return (
    <>
      <Header />
      <div className="max-lg:mt-20">
        <main className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen  ">
          {/* Hero Section */}
          <div className="relative">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-64 w-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-4xl md:text-5xl text-white font-bold animate-pulse">
                Hubungi Kami
              </h1>
            </div>
          </div>

          {/* Contact Info Section */}
          <section className="container mx-auto px-6 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-indigo-600 dark:text-indigo-300">
                Informasi Kontak
              </h2>
              <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
                Kami senang mendengar dari Anda! Jika Anda memiliki pertanyaan
                atau saran, jangan ragu untuk menghubungi kami.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center bg-white dark:bg-gray-700 shadow-md rounded-lg p-6 transition-all hover:scale-105">
                <div className="text-6xl mb-4">📞</div>
                <h3 className="text-xl font-semibold mb-2 text-indigo-600 dark:text-indigo-300">
                  Telepon
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  +62 21 2345 6789
                </p>
              </div>
              <div className="flex flex-col items-center bg-white dark:bg-gray-700 shadow-md rounded-lg p-6 transition-all hover:scale-105">
                <div className="text-6xl mb-4">📧</div>
                <h3 className="text-xl font-semibold mb-2 text-indigo-600 dark:text-indigo-300">
                  Email
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  support@onlinestore.com
                </p>
              </div>
              <div className="flex flex-col items-center bg-white dark:bg-gray-700 shadow-md rounded-lg p-6 transition-all hover:scale-105">
                <div className="text-6xl mb-4">🌍</div>
                <h3 className="text-xl font-semibold mb-2 text-indigo-600 dark:text-indigo-300">
                  Alamat
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Jl. Raya No. 1, Jakarta, Indonesia
                </p>
              </div>
            </div>
          </section>

          {/* Contact Form Section */}
          <section className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 py-16">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                  Kirim Pesan
                </h2>
                <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
                  Kami akan segera merespons pesan Anda secepat mungkin.
                </p>
              </div>
              <form
                className="max-w-lg mx-auto bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md"
                action="#"
              >
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 dark:text-gray-300 font-semibold"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Nama Anda"
                    className="w-full mt-2 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 dark:text-gray-300 font-semibold"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email Anda"
                    className="w-full mt-2 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="block text-gray-700 dark:text-gray-300 font-semibold"
                  >
                    Pesan
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    placeholder="Tulis pesan Anda"
                    className="w-full mt-2 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg transition-all hover:bg-indigo-700"
                >
                  Kirim Pesan
                </button>
              </form>
            </div>
          </section>

          {/* Map Section */}
          <section className="container mx-auto px-6 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-indigo-600 dark:text-indigo-300">
                Temukan Kami
              </h2>
              <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
                Kunjungi kami di lokasi fisik kami di bawah ini.
              </p>
            </div>
            <div className="w-full h-96 bg-gray-300 dark:bg-gray-700 rounded-lg shadow-md">
              <MapContainer
                center={position}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                  <Popup>
                    Kami berada di sini! <br /> Jl. Raya No. 1, Jakarta,
                    Indonesia.
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </section>

          {/* Testimonial Section */}
          <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 py-16">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Apa Kata Pengunjung Kami?
              </h2>
              <div className="flex flex-wrap justify-center gap-6">
                {[
                  {
                    name: "Dwi Ananta",
                    feedback:
                      "Proses kontak yang mudah dan respons cepat. Layanan yang luar biasa!",
                  },
                  {
                    name: "Mira Suhartini",
                    feedback:
                      "Sangat membantu dan pelayanan sangat ramah. Sangat puas dengan pengalaman ini.",
                  },
                  {
                    name: "Joni Pratama",
                    feedback:
                      "Tanggapan yang cepat dan informatif. Sangat mudah untuk menghubungi mereka.",
                  },
                ].map((testimonial, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-6 text-center w-64"
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
        </main>
      </div>

      <Footer />
    </>
  );
};

export default ContactPage;
