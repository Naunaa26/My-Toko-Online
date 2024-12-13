import { useNavigate } from "react-router-dom";

const ProductCard = ({
  title,
  image,
  description,
  price,
  rating,
  category,
}) => {
  const navigate = useNavigate();

  const formatDescription = (text) => {
    if (!text) return "No description available.";

    const minLength = 100;
    let result = text;

    while (result.length < minLength) {
      result += ` ${text}`;
    }

    return result.length > minLength
      ? result.slice(0, minLength) + "..."
      : result;
  };

  const formatCategory = (category) => {
    if (!category) return "";
    const words = category.split(" ");
    return words.slice(0, 2).join(" ");
  };

  const handleBuyNowClick = () => {
    navigate(`/product`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <div className="relative w-full h-36 sm:h-40 md:h-48">
        {image ? (
          <img
            src={image}
            alt={title || "Product Image"}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-500 dark:text-gray-400">
            No Image
          </div>
        )}
      </div>
      <div className="p-3 md:p-4 flex flex-col flex-1">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate sm:text-base md:text-lg">
          {title || "Untitled"}
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 sm:text-sm md:text-base">
          {formatDescription(description)}
        </p>
        <div className="mt-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {price && (
                <span className="text-sm font-semibold text-green-600 dark:text-green-400 sm:text-base md:text-lg">
                  ${price}
                </span>
              )}
              {rating && (
                <div className="flex items-center text-yellow-500 ml-1 sm:ml-2">
                  <span>⭐</span>
                  <span className="ml-1 text-xs sm:text-sm md:text-base">
                    {rating}
                  </span>
                </div>
              )}
            </div>
            {category && (
              <span className="text-xs text-blue-600 dark:text-blue-400 sm:text-sm md:text-base">
                {formatCategory(category)}
              </span>
            )}
          </div>
          <button
            onClick={handleBuyNowClick}
            className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-xs sm:text-sm md:text-base"
          >
            Beli Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
