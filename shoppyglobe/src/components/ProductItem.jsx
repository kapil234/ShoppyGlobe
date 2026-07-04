import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const ProductItem = ({ product }) => {
  const navigate=useNavigate();
  return (
    <div 
      onClick={() => navigate(`/product/${product._id}`)} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
      <img
        src={product.thumbnail}
        alt={product.title}
        loading="lazy"
        className="h-52 w-full object-cover"
        loading="lazy"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold">
          {product.title}
        </h2>

        <p className="text-gray-500 mt-2 line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-blue-600 font-bold text-xl">
            ${product.price}
          </span>

             <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${product._id}`);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;