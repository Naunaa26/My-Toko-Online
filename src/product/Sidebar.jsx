import React, { useState } from "react";
import {
  FaHamburger,
  FaBeer,
  FaHome,
  FaCar,
  FaTv,
  FaBook,
  FaTshirt,
  FaMicroscope,
  FaPuzzlePiece,
  FaUtensils,
  FaSortAmountDownAlt,
  FaSortAmountUpAlt,
  FaStar,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaBars,
} from "react-icons/fa";

const Sidebar = ({
  onSortChange,
  onPriceChange,
  onCategoryChange,
  selectedCategory,
  onRatingChange,
  onAlphabeticalChange,
  onLocationChange,
}) => {
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [rating, setRating] = useState(0);
  const [alphabeticalSort, setAlphabeticalSort] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setPriceRange([0, value]);
    onPriceChange([0, value]);
  };

  const handleRatingChange = (e) => {
    const value = Number(e.target.value);
    setRating(value);
    onRatingChange(value);
  };

  const handleCategoryChange = (category) => {
    if (selectedCategory.includes(category)) {
      onCategoryChange(selectedCategory.filter((item) => item !== category));
    } else {
      onCategoryChange([...selectedCategory, category]);
    }
  };

  const handleAlphabeticalSort = (value) => {
    setAlphabeticalSort(value);
    onAlphabeticalChange(value);
  };

  const handleLocationChange = (e) => {
    const location = e.target.value;
    setSelectedLocation(location);
    onLocationChange(location);
  };

  const resetFilters = () => {
    setPriceRange([0, 10000000]);
    setRating(0);
    setAlphabeticalSort("");
    setSelectedLocation("");
    onPriceChange([0, 10000000]);
    onRatingChange(0);
    onSortChange("");
    onCategoryChange([]);
    onAlphabeticalChange("");
    onLocationChange("");
  };

  const categories = [
    { name: "makanan", icon: <FaHamburger /> },
    { name: "minuman", icon: <FaBeer /> },
    { name: "peralatan rumah tangga", icon: <FaHome /> },
    { name: "bahan bangunan", icon: <FaPuzzlePiece /> },
    { name: "otomotif", icon: <FaCar /> },
    { name: "kosmetik dan perawatan diri", icon: <FaMicroscope /> },
    { name: "mainan", icon: <FaPuzzlePiece /> },
    { name: "buku dan alat tulis", icon: <FaBook /> },
    { name: "pakaian", icon: <FaTshirt /> },
    { name: "elektronik", icon: <FaTv /> },
  ];

  const cities = [
    "Jakarta",
    "Surabaya",
    "Bali",
    "Bandung",
    "Yogyakarta",
    "Selengkapnya",
  ];

  return (
    <aside className="w-full lg:w-1/4 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
        Filter Produk
      </h2>

      {/* Mobile Dropdown Button */}
      <button
        className="lg:hidden text-gray-800 dark:text-gray-100 mb-6"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="flex items-center">
          <FaBars size={24} />
          <h2 className="text-2xl font-semibold ml-2">Filter Barang</h2>
        </div>
      </button>

      {/* Dropdown Content (Visible on Mobile) */}
      {isDropdownOpen && (
        <div className="block lg:hidden">
          {/* Sort By Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
              Urutkan Berdasarkan
            </h3>
            <div>
              <label className="flex items-center gap-2 my-2">
                <input
                  type="radio"
                  name="sort-option"
                  value="lowToHigh"
                  onChange={() => onSortChange("lowToHigh")}
                  className="radio radio-primary"
                />
                <FaSortAmountUpAlt /> Harga Terendah
              </label>
              <label className="flex items-center gap-2 my-2">
                <input
                  type="radio"
                  name="sort-option"
                  value="highToLow"
                  onChange={() => onSortChange("highToLow")}
                  className="radio radio-primary"
                />
                <FaSortAmountDownAlt /> Harga Termahal
              </label>
            </div>
          </div>

          {/* Category Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
              Kategori
            </h3>
            <div>
              {categories.map((category, index) => (
                <label key={index} className="flex items-center gap-2 my-2">
                  <input
                    type="checkbox"
                    name="category-option"
                    value={category.name}
                    onChange={() => handleCategoryChange(category.name)}
                    checked={selectedCategory.includes(category.name)}
                    className="checkbox checkbox-primary"
                  />
                  {category.icon}
                  <span>
                    {category.name.charAt(0).toUpperCase() +
                      category.name.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Location Filter Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
              Lokasi
            </h3>
            <div>
              <select
                value={selectedLocation}
                onChange={handleLocationChange}
                className="w-full bg-white dark:bg-gray-800 border  border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 p-2 rounded-md"
              >
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price Range Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
              Rentang Harga
            </h3>
            <div className="flex items-center gap-2">
              <FaUtensils />
              <input
                type="range"
                min="0"
                max="10000000"
                step="10000"
                value={priceRange[1]}
                onChange={handlePriceChange}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
              <span>Rp {priceRange[0].toLocaleString()}</span>
              <span>Rp {priceRange[1].toLocaleString()}</span>
            </div>
          </div>

          {/* Rating Section with Slider */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
              Minimal Rating
            </h3>
            <div className="flex items-center gap-2">
              <FaStar size={20} className="text-yellow-500" />
              <input
                type="range"
                min="0"
                max="5"
                step="0.5"
                value={rating}
                onChange={handleRatingChange}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
              <span>{rating} Stars</span>
            </div>
          </div>

          {/* Alphabetical Sort Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
              Urutkan Berdasarkan Nama
            </h3>
            <div>
              <label className="flex items-center gap-2 my-2">
                <input
                  type="radio"
                  name="alphabetical-sort"
                  value="AtoZ"
                  onChange={() => handleAlphabeticalSort("AtoZ")}
                  checked={alphabeticalSort === "AtoZ"}
                  className="radio radio-primary"
                />
                A-Z
              </label>
              <label className="flex items-center gap-2 my-2">
                <input
                  type="radio"
                  name="alphabetical-sort"
                  value="ZtoA"
                  onChange={() => handleAlphabeticalSort("ZtoA")}
                  checked={alphabeticalSort === "ZtoA"}
                  className="radio radio-primary"
                />
                Z-A
              </label>
            </div>
          </div>

          {/* Reset Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={resetFilters}
              className="bg-gradient-to-r from-[#4878c7] to-[#2cce75] text-white px-6 py-2 rounded-full hover:from-[#2cce75] hover:to-[#4878c7] text-sm md:text-base"
            >
              Reset Filter
            </button>
          </div>
        </div>
      )}

      {/* Desktop Sidebar Content */}
      <div className="hidden lg:block">
        {/* Sort By Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
            Urutkan Berdasarkan
          </h3>
          <div>
            <label className="flex items-center gap-2 my-2">
              <input
                type="radio"
                name="sort-option"
                value="lowToHigh"
                onChange={() => onSortChange("lowToHigh")}
                className="radio radio-primary"
              />
              <FaSortAmountUpAlt /> Harga Terendah
            </label>
            <label className="flex items-center gap-2 my-2">
              <input
                type="radio"
                name="sort-option"
                value="highToLow"
                onChange={() => onSortChange("highToLow")}
                className="radio radio-primary"
              />
              <FaSortAmountDownAlt /> Harga Termahal
            </label>
          </div>
        </div>

        {/* Category Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
            Kategori
          </h3>
          <div>
            {categories.map((category, index) => (
              <label key={index} className="flex items-center gap-2 my-2">
                <input
                  type="checkbox"
                  name="category-option"
                  value={category.name}
                  onChange={() => handleCategoryChange(category.name)}
                  checked={selectedCategory.includes(category.name)}
                  className="checkbox checkbox-primary"
                />
                {category.icon}
                <span>
                  {category.name.charAt(0).toUpperCase() +
                    category.name.slice(1)}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Location Filter Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
            Lokasi
          </h3>
          <div>
            <select
              value={selectedLocation}
              onChange={handleLocationChange}
              className="w-full bg-white dark:bg-gray-800 border  border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 p-2 rounded-md"
            >
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Price Range Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
            Rentang Harga
          </h3>
          <div className="flex items-center gap-2">
            <FaUtensils />
            <input
              type="range"
              min="0"
              max="10000000"
              step="10000"
              value={priceRange[1]}
              onChange={handlePriceChange}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
            <span>Rp {priceRange[0].toLocaleString()}</span>
            <span>Rp {priceRange[1].toLocaleString()}</span>
          </div>
        </div>

        {/* Rating Section with Slider */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
            Minimal Rating
          </h3>
          <div className="flex items-center gap-2">
            <FaStar size={20} className="text-yellow-500" />
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={rating}
              onChange={handleRatingChange}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
            <span>{rating} Stars</span>
          </div>
        </div>

        {/* Alphabetical Sort Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
            Urutkan Berdasarkan Nama
          </h3>
          <div>
            <label className="flex items-center gap-2 my-2">
              <input
                type="radio"
                name="alphabetical-sort"
                value="AtoZ"
                onChange={() => handleAlphabeticalSort("AtoZ")}
                checked={alphabeticalSort === "AtoZ"}
                className="radio radio-primary"
              />
              A-Z
            </label>
            <label className="flex items-center gap-2 my-2">
              <input
                type="radio"
                name="alphabetical-sort"
                value="ZtoA"
                onChange={() => handleAlphabeticalSort("ZtoA")}
                checked={alphabeticalSort === "ZtoA"}
                className="radio radio-primary"
              />
              Z-A
            </label>
          </div>
        </div>

        {/* Reset Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={resetFilters}
            className="bg-gradient-to-r from-[#4878c7] to-[#2cce75] text-white px-6 py-2 rounded-full hover:from-[#2cce75] hover:to-[#4878c7] text-sm md:text-base"
          >
            Reset Filter
          </button>
        </div>
      </div>

      {/* Follow Us Section */}
      <div className="mt-8 text-center">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-400">
          Follow Us
        </h4>
        <div className="flex justify-center gap-6 mt-4">
          <a href="#" className="text-blue-600">
            <FaFacebookF size={24} />
          </a>
          <a href="#" className="text-blue-500">
            <FaTwitter size={24} />
          </a>
          <a href="#" className="text-pink-600">
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
