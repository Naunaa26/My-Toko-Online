import React, { useState } from "react";
import Card from "./daisyui/Card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/SupaClient";

const ProductList = () => {
  const [visibleProducts, setVisibleProducts] = useState(9);

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

  const loadMore = () => {
    setVisibleProducts((prevVisible) => prevVisible + 9);
  };

  return (
    <div className="px-4 md:px-8 py-8">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
        Produk Populer
      </h2>

      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-64 md:h-96">
          <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-t-transparent border-solid rounded-full animate-spin bg-gradient-to-r from-[#4878c7] to-[#2cce75] bg-clip-border"></div>
          <h2 className="mt-4 text-sm md:text-lg lg:text-xl font-bold bg-gradient-to-r from-[#4878c7] to-[#2cce75] bg-clip-text text-transparent">
            Loading...
          </h2>
        </div>
      ) : isError ? (
        <div className="text-center text-red-500">
          <p>Failed to load products: {error.message}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {products.slice(0, visibleProducts).map((item) => (
            <Card
              key={item.id}
              title={item.nama_barang}
              image={item.foto_barang}
              description={item.deskripsi}
              price={item.harga_barang}
              category={item.jenis_barang}
              rating={item.rating}
              className="shadow-lg hover:shadow-xl transition-shadow"
            />
          ))}
        </div>
      )}

      {!isLoading && !isError && visibleProducts < products.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMore}
            className="bg-gradient-to-r from-[#4878c7] to-[#2cce75] text-white px-6 py-2 rounded-full hover:from-[#2cce75] hover:to-[#4878c7] text-sm md:text-base lg:text-lg"
          >
            Lihat Selengkapnya
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
