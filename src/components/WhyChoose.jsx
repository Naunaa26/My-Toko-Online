import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import logo1 from "../assets/1.svg";
import logo2 from "../assets/2.svg";
import logo3 from "../assets/3.svg";
import logo4 from "../assets/4.svg";
import logo5 from "../assets/5.svg";
import logo6 from "../assets/6.svg";

const WhyChoose = () => {
  const reasons = [
    {
      title: "Produk Berkualitas Tinggi",
      description: "Produk kami terjamin kualitasnya.",
      imgSrc: logo1,
      points: [
        "Bahan berkualitas",
        "Diproduksi dengan teliti",
        "Standar internasional",
      ],
    },
    {
      title: "Harga Bersaing",
      description: "Kami menawarkan harga terbaik untuk Anda.",
      imgSrc: logo2,
      points: [
        "Harga terjangkau",
        "Promo menarik",
        "Nilai terbaik di kelasnya",
      ],
    },
    {
      title: "Layanan Pelanggan 24/7",
      description: "Tim kami siap melayani Anda kapan saja.",
      imgSrc: logo5,
      points: ["Respon cepat", "Dukungan profesional", "Layanan multibahasa"],
    },
    {
      title: "Pengiriman Cepat dan Aman",
      description: "Pengiriman cepat dengan kemasan aman.",
      imgSrc: logo4,
      points: [
        "Pengemasan aman",
        "Pengiriman dalam 24 jam",
        "Bekerja sama dengan kurir terpercaya",
      ],
    },
    {
      title: "Garansi Uang Kembali",
      description: "Kami menjamin pengembalian uang 100%.",
      imgSrc: logo3,
      points: [
        "Kebijakan pengembalian mudah",
        "Proses cepat",
        "Dukungan pengembalian produk",
      ],
    },
    {
      title: "Kemudahan Berbelanja Online",
      description: "Berbelanja dengan mudah dari mana saja.",
      imgSrc: logo6,
      points: [
        "Antarmuka yang ramah pengguna",
        "Sistem pembayaran aman",
        "Akses dari berbagai perangkat",
      ],
    },
  ];

  return (
    <div className="px-4 md:px-8 lg:px-16 py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
        Kenapa Memilih Kami
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((reason, index) => (
          <CardMe
            key={index}
            title={reason.title}
            description={reason.description}
            imgSrc={reason.imgSrc}
            points={reason.points}
          />
        ))}
      </div>
    </div>
  );
};

const CardMe = ({ title, description, imgSrc, points }) => {
  return (
    <div className="p-6 w-full bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <img src={imgSrc} alt={title} className="w-20 h-20 mx-auto mb-4" />
      <h3 className="text-lg md:text-xl font-bold mb-2 text-center">{title}</h3>
      <p className="text-sm md:text-base mb-4 text-center">{description}</p>
      <ul className="space-y-2 text-sm md:text-base">
        {points.map((point, index) => (
          <li
            key={index}
            className="flex items-center justify-center md:justify-start"
          >
            <FaCheckCircle className="text-green-500 mr-2" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WhyChoose;
