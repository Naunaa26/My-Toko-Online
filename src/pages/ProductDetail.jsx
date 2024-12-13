import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/SupaClient";
import {
  FaShoppingCart,
  FaPlus,
  FaMinus,
  FaStar,
  FaClock,
  FaMapMarkerAlt,
  FaCartPlus,
  FaShippingFast,
  FaTimes,
  FaBox,
} from "react-icons/fa";
import Header from "../components/tailus/Header";
import { ulasan } from "../utils/ulasan";

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [countdown, setCountdown] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const {
    data: product,
    isLoading: isLoadingProduct,
    isError: isErrorProduct,
    error: errorProduct,
  } = useQuery({
    queryKey: ["productDetail", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("barang")
        .select()
        .eq("id", id)
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
  });

  const {
    data: relatedProducts,
    isLoading: isLoadingRelated,
    isError: isErrorRelated,
    error: errorRelated,
  } = useQuery({
    queryKey: ["relatedProducts", product?.jenis_barang],
    queryFn: async () => {
      if (!product?.jenis_barang) return [];
      const { data, error } = await supabase
        .from("barang")
        .select()
        .eq("jenis_barang", product.jenis_barang)
        .neq("id", id)
        .limit(4);
      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!product?.jenis_barang,
  });

  useEffect(() => {
    if (product) {
      const randomDuration = Math.floor(Math.random() * 86400);
      startCountdown(randomDuration);
    }
  }, [product]);

  const startCountdown = (durationInSeconds) => {
    const endTime = Date.now() + durationInSeconds * 1000;

    const updateCountdown = () => {
      const remainingTime = Math.max(0, endTime - Date.now());
      const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
      const seconds = Math.floor((remainingTime / 1000) % 60);

      setCountdown({ hours, minutes, seconds });

      if (remainingTime <= 0) clearInterval(interval);
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();
  };

  const handleQuantityChange = (type) => {
    setQuantity((prev) =>
      type === "increment" ? prev + 1 : Math.max(prev - 1, 1)
    );
  };

  const toggleModal = () => setModalOpen((prev) => !prev);

  if (isLoadingProduct)
    return (
      <div className="flex flex-col justify-center items-center h-64 md:h-96">
        <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-t-transparent border-solid rounded-full animate-spin bg-gradient-to-r from-[#4878c7] to-[#2cce75] bg-clip-border"></div>
        <h2 className="mt-4 text-lg md:text-xl font-bold bg-gradient-to-r from-[#4878c7] to-[#2cce75] bg-clip-text text-transparent">
          Loading...
        </h2>
      </div>
    );
  if (isErrorProduct)
    return (
      <p className="text-center text-red-600 mt-8">
        Error: {errorProduct.message}
      </p>
    );

  const {
    nama_barang,
    harga_barang,
    jenis_barang,
    stok,
    deskripsi,
    foto_barang,
    lokasi,
  } = product;

  return (
    <>
      <Header />

      <div
        className={`${theme} bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen max-lg:mt-20`}
      >
        {/* Product Section */}
        <div className="p-8 max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-md shadow-md mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Image */}
            <div className="flex justify-center">
              <img
                src={foto_barang}
                alt={nama_barang}
                className="w-full h-auto rounded-md border border-gray-200 dark:border-gray-700"
              />
            </div>
            {/* Product Details */}
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                {nama_barang}
              </h1>

              {/* Rating, Penilaian, and Terjual */}
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-500" />
                  <span>{product.rating || 0}/5</span>
                </div>
                <span className="mx-2">|</span>
                <span>{product.penilaian || 0} Penilaian</span>
                <span className="mx-2">|</span>
                <span>{product.terjual || 0} Terjual</span>
              </div>

              {/* Lokasi and Pengiriman sections aligned to the right */}
              <div className="flex items-center justify-between md:justify-start mt-2">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-gray-600 dark:text-gray-400" />
                  <span className="text-lg text-gray-600 dark:text-gray-400">
                    {lokasi || "Tidak tersedia"}
                  </span>
                </div>
                <div className="flex items-center gap-2 ml-6">
                  <FaShippingFast className="text-gray-600 dark:text-gray-400" />
                  <span className="text-lg text-gray-600 dark:text-gray-400">
                    Pengiriman: Jakarta
                  </span>
                </div>
              </div>

              <p className="text-lg mt-2">
                <span className="font-semibold">Jenis:</span> {jenis_barang}
              </p>
              <p className="text-lg mt-2">
                <span className="font-semibold">Stok:</span> {stok}
              </p>

              {/* Price Section */}
              <div className="flex items-center mt-4">
                <p className="text-xl font-semibold text-green-600">
                  Rp {(harga_barang * quantity).toLocaleString("id-ID")}
                </p>
                <p className="text-sm text-gray-500 line-through ml-4">
                  Rp {harga_barang.toLocaleString("id-ID")}
                </p>
              </div>

              {/* Flash Sale Section */}
              <div className="mt-4 flex items-center bg-red-600 text-white p-2 rounded-md shadow-lg text-sm">
                <FaClock className="mr-2 text-lg" />
                <span className="font-semibold">Flash Sale!</span>
                <span className="ml-auto font-semibold text-lg text-yellow-300">
                  Ends in:{" "}
                  {`${countdown.hours
                    .toString()
                    .padStart(2, "0")}:${countdown.minutes
                    .toString()
                    .padStart(2, "0")}:${countdown.seconds
                    .toString()
                    .padStart(2, "0")}`}
                </span>
              </div>

              <p className="text-gray-800 dark:text-gray-300 mt-4">
                {deskripsi}
              </p>

              {/* Quantity Selector and Action Buttons in the same row */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
                {/* Quantity Selector */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleQuantityChange("decrement")}
                    className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    <FaMinus />
                  </button>
                  <span className="text-lg font-semibold">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange("increment")}
                    className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    <FaPlus />
                  </button>
                </div>

                {/* Action Buttons */}
                <button
                  onClick={toggleModal}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700"
                >
                  <FaCartPlus /> Tambah ke Keranjang
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700">
                  <FaShoppingCart /> Beli Sekarang
                </button>
              </div>

              {/* Modal */}
              {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold">
                        Produk Ditambahkan
                      </h2>
                      <button
                        onClick={toggleModal}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTimes />
                      </button>
                    </div>
                    <p className="mt-4">
                      {nama_barang} telah ditambahkan ke keranjang Anda.
                    </p>
                    <div className="mt-4 flex justify-end gap-4">
                      <button
                        onClick={toggleModal}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                      >
                        Lanjutkan Belanja
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Pergi ke Keranjang
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Ulasan Section */}
        <div className="p-8 max-w-6xl mx-auto mt-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Ulasan Pelanggan</h2>
            <div className="space-y-4">
              {ulasan.slice(0, 3).map((review) => (
                <div
                  key={review.id}
                  className="p-4 border rounded-md shadow-md dark:border-gray-700"
                >
                  <div className="flex items-center gap-2">
                    <FaStar className="text-yellow-500" />
                    <span className="font-semibold">{review.rating}/5</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {review.komentar}
                  </p>
                  <p className="mt-1 text-right text-xs text-gray-500">
                    - {review.nama}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Produk Lainnya Section */}
        <div className="p-6 max-w-6xl mx-auto mt-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Produk Lainnya</h2>
            {isLoadingRelated ? (
              <div className="flex flex-col justify-center items-center h-64 md:h-96">
                <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-t-transparent border-solid rounded-full animate-spin bg-gradient-to-r from-[#4878c7] to-[#2cce75] bg-clip-border"></div>
                <h2 className="mt-4 text-lg md:text-xl font-bold bg-gradient-to-r from-[#4878c7] to-[#2cce75] bg-clip-text text-transparent">
                  Loading...
                </h2>
              </div>
            ) : isErrorRelated ? (
              <p className="text-center text-red-600 mt-8">
                Error: {errorRelated.message}
              </p>
            ) : (
              <div className="grid p-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <div
                    key={relatedProduct.id}
                    onClick={() => handleProductClick(relatedProduct.id)}
                    className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform transition-all hover:scale-105 flex flex-col cursor-pointer"
                  >
                    <img
                      src={relatedProduct.foto_barang}
                      alt={relatedProduct.nama_barang}
                      className="w-full h-40 object-cover"
                    />
                    <div className="flex flex-col p-4 flex-grow">
                      <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200 truncate">
                        {relatedProduct.nama_barang}
                      </h2>
                      <p className="text-green-600 dark:text-green-400 font-bold mt-1 text-lg mb-3">
                        Rp {relatedProduct.harga_barang.toLocaleString("id-ID")}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-[3px]">
                        <FaBox className="inline mr-2" />
                        {relatedProduct.jenis_barang}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        <FaMapMarkerAlt className="inline mr-2" />
                        Lokasi: {relatedProduct.lokasi || "Tidak Diketahui"}
                      </p>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 space-x-2 mt-2">
                        <div className="flex items-center text-yellow-500">
                          <FaStar className="mr-1" />
                          <span>{relatedProduct.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
