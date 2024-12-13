import React, { useState } from "react";
import {
  FaStar,
  FaSearch,
  FaCartPlus,
  FaMapMarkerAlt,
  FaBox,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Fuse from "fuse.js";

const AllProduct = ({ products, isError, error }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const productsPerPage = 8;
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const fuse = new Fuse(products, {
    keys: ["nama_barang"],
    includeScore: true,
    threshold: 0.3,
  });

  const filteredProducts = searchQuery
    ? fuse.search(searchQuery).map((result) => result.item)
    : products;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim() !== "") {
      setSuggestions(
        fuse
          .search(e.target.value)
          .slice(0, 5)
          .map((result) => result.item)
      );
    } else {
      setSuggestions([]);
    }
    setCurrentPage(1);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.nama_barang);
    setSuggestions([]);
  };

  const pageNumbers = () => {
    const pages = [];
    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 2) pages.push("...");

      if (currentPage > 1) pages.push(currentPage);

      if (currentPage < totalPages - 1) pages.push("...");

      if (currentPage !== totalPages) pages.push(totalPages);
    }
    return pages;
  };

  const handlePageClick = (pageNumber) => {
    if (pageNumber === "...") return;
    setCurrentPage(pageNumber);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <section id="all-product" className="px-0 lg:px-4 py-10 w-full md:w-4/5">
      <h1 className="text-3xl font-bold text-center mb-8 dark:text-white text-gray-800">
        Produk Kami
      </h1>
      {isError ? (
        <div className="text-center text-red-500">
          <p>Failed to load products: {error.message}</p>
        </div>
      ) : (
        <>
          {/* Search Controls */}
          <div className="relative w-full lg:w-1/2 mb-6 mx-auto">
            <input
              type="text"
              placeholder="Cari Produk..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-300"
            />
            <FaSearch className="absolute top-3 right-4 text-gray-500 dark:text-gray-300" />
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white shadow-lg mt-2 rounded-md dark:bg-gray-800 dark:text-white z-50">
                <ul>
                  {suggestions.map((suggestion) => (
                    <li
                      key={suggestion.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700"
                      onClick={() => handleProductClick(suggestion.id)}
                    >
                      {suggestion.nama_barang}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform transition-all hover:scale-105 flex flex-col cursor-pointer"
              >
                <img
                  src={product.foto_barang}
                  alt={product.nama_barang}
                  className="w-full h-44 object-cover"
                />
                <div className="flex flex-col p-5 flex-grow">
                  <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200 truncate">
                    {product.nama_barang}
                  </h2>
                  <p className="text-green-600 dark:text-green-400 font-bold mt-1 text-xl mb-4">
                    Rp {product.harga_barang.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-[3px]">
                    <FaBox className="inline mr-2" />
                    {product.jenis_barang}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    <FaMapMarkerAlt className="inline mr-2" />
                    Lokasi: {product.lokasi || "Tidak Diketahui"}
                  </p>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 space-x-2 mt-2">
                    <div className="flex items-center text-yellow-500">
                      <FaStar className="mr-1" />
                      <span>{product.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-8">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 mx-2 rounded-lg transition-colors duration-200 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            <div className="flex items-center space-x-2">
              {pageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() => handlePageClick(page)}
                  className={`px-4 py-2 rounded-lg ${
                    page === currentPage
                      ? "bg-blue-500 text-white dark:bg-blue-600"
                      : "bg-gray-200 text-gray-700 hover:bg-blue-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-blue-600"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 mx-2 rounded-lg transition-colors duration-200 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default AllProduct;
