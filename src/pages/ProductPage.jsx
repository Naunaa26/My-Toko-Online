import React, { useState } from "react";
import Header from "../components/tailus/Header";
import Footer from "../components/tailus/Footer";
import AllProduct from "../product/AllProduct";
import Sidebar from "../product/Sidebar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/SupaClient";

const ProductPage = () => {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const { data, error } = await supabase.from("barang").select();
      if (error) throw new Error(error.message);
      return data;
    },
  });

  const [sortOption, setSortOption] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [rating, setRating] = useState(0);
  const [alphabeticalSort, setAlphabeticalSort] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const famousCities = ["Jakarta", "Surabaya", "Bali", "Bandung", "Yogyakarta"];
  const allCities = [
    "Jakarta",
    "Surabaya",
    "Bali",
    "Bandung",
    "Yogyakarta",
    "Selengkapnya",
  ];

  const filteredProducts = products
    .filter((product) => {
      if (
        selectedCategory.length > 0 &&
        !selectedCategory.includes(product.jenis_barang)
      ) {
        return false;
      }
      if (
        product.harga_barang < priceRange[0] ||
        product.harga_barang > priceRange[1]
      ) {
        return false;
      }
      if (product.rating < rating) {
        return false;
      }
      if (
        selectedLocation &&
        product.lokasi !== selectedLocation &&
        selectedLocation !== "Selengkapnya"
      ) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortOption === "lowToHigh") {
        return a.harga_barang - b.harga_barang;
      }
      if (sortOption === "highToLow") {
        return b.harga_barang - a.harga_barang;
      }
      if (alphabeticalSort === "AtoZ") {
        return a.nama_barang.localeCompare(b.nama_barang);
      }
      if (alphabeticalSort === "ZtoA") {
        return b.nama_barang.localeCompare(a.nama_barang);
      }
      return 0;
    });

  return (
    <>
      <Header />
      <div className="m-4 max-lg:mt-20 flex flex-col md:flex-row">
        {/* Sidebar with filters */}
        <Sidebar
          onSortChange={setSortOption}
          onCategoryChange={setSelectedCategory}
          onPriceChange={setPriceRange}
          onRatingChange={setRating}
          onAlphabeticalChange={setAlphabeticalSort}
          onLocationChange={setSelectedLocation}
          selectedCategory={selectedCategory}
          famousCities={famousCities}
          allCities={allCities}
        />
        {/* Product list */}
        {isLoading ? (
          <div className="flex flex-col justify-center items-center w-full h-96">
            <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-t-transparent border-solid rounded-full animate-spin bg-gradient-to-r from-[#4878c7] to-[#2cce75] bg-clip-border"></div>
            <h2 className="mt-4 text-lg md:text-xl font-bold bg-gradient-to-r from-[#4878c7] to-[#2cce75] bg-clip-text text-transparent">
              Loading products...
            </h2>
          </div>
        ) : isError ? (
          <div className="text-center text-red-500">
            <p>Failed to load products: {error.message}</p>
          </div>
        ) : (
          <AllProduct products={filteredProducts} isLoading={isLoading} />
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
