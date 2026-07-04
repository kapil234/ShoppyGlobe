import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import API from "../api/axios";
import { addToCart } from "../redux/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showImage, setShowImage] = useState(false);

  // ===========================
  // Fetch Product
  // ===========================

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const { data } = await API.get(`/products/${id}`);

      setProduct(data);
      setSelectedImage(data.images?.[0] || data.thumbnail);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message || "Unable to load product."
      );
    } finally {
      setLoading(false);
    }
  };

  // ===========================
  // Add To Cart
  // ===========================

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login first!");
      navigate("/login");
      return;
    }

    try {
      // Save to MongoDB
      await API.post("/cart/add", {
        productId: product._id,
        quantity: 1,
      });

      // Save to Redux
      dispatch(addToCart(product));

      toast.success("Product added to cart!");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Unable to add product."
      );
    }
  };

  // ===========================
  // Order Now
  // ===========================

  const handleOrderNow = () => {
    if (!user) {
      toast.error("Please login first!");
      navigate("/login");
      return;
    }

    navigate("/checkout", {
      state: { product },
    });
  };

  // ===========================
  // Rating Stars
  // ===========================

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {"★".repeat(fullStars)}
        {halfStar && "☆"}
        {"✩".repeat(emptyStars)}
      </>
    );
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-100">
        <div className="h-14 w-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  // Error

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl font-bold text-red-600">
          {error}
        </h2>
      </div>
    );
  }


  // Product Not Found

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl font-bold">
          Product Not Found
        </h2>
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-slate-100 py-6 px-4 sm:px-4">
  <div className="max-w-screen-2xl mx-auto">

    {/* Back Button */}
    <Link
      to="/"
      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-6"
    >
      ← Back to Products
    </Link>

    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-10 p-6 lg:p-10">

        {/* LEFT SIDE */}
        <div>

          {/* Main Image */}
          <div className="relative bg-slate-100 rounded-2xl h-112.5 flex items-center justify-center overflow-hidden">

            <span className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              {Math.round(product.discountPercentage)}% OFF
            </span>

            <img
              src={selectedImage}
              alt={product.title}
              loading="lazy"
              onClick={() => setShowImage(true)}
              className="max-h-full max-w-full object-contain cursor-zoom-in transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-3 mt-4">
            {product.images?.map((image, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(image)}
                className={`cursor-pointer rounded-xl overflow-hidden border-2 ${
                  selectedImage === image
                    ? "border-blue-500"
                    : "border-gray-200"
                }`}
              >
                <img
                  src={image}
                  alt={product.title}
                  loading="lazy"
                  className="h-20 w-full object-cover"
                />
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col justify-start">

          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium w-fit">
            {product.category}
          </span>

          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mt-4">
            {product.title}
          </h1>

          <p className="text-gray-600 mt-5 leading-relaxed">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex flex-wrap items-center gap-3 mt-5">
            <span className="text-yellow-500 text-2xl">
              {renderStars(product.rating)}
            </span>

            <span className="font-medium text-gray-700">
              ({product.rating}/5)
            </span>
          </div>

          {/* Price */}
          <div className="mt-6">
            <h2 className="text-5xl font-bold text-blue-600">
              ${product.price}
            </h2>
          </div>

          {/* Stock */}
          <div className="mt-4">
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                product.stock > 0
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.stock > 0
                ? "✓ In Stock"
                : "✕ Out of Stock"}
            </span>
          </div>

          {/* Product Info */}
          <div className="grid sm:grid-cols-2 gap-4 mt-8">

            <div className="bg-slate-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500">Brand</p>
              <p className="font-semibold">{product.brand}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500">Category</p>
              <p className="font-semibold">{product.category}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500">Rating</p>
              <p className="font-semibold">{product.rating}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500">Stock</p>
              <p className="font-semibold">{product.stock}</p>
            </div>

          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4 mt-8 w-full">

            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition"
            >
              Add to Cart
            </button>

            <button
              onClick={handleOrderNow}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold transition"
            >
              Order Now
            </button>

          </div>

        </div>

      </div>
    </div>
  </div>
        {/* Image Modal */}
      {showImage && (
        <div
          onClick={() => setShowImage(false)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl p-6 shadow-2xl"
          >
            <button
              onClick={() => setShowImage(false)}
              className="absolute top-2 right-3 text-3xl font-bold text-gray-700 hover:text-red-500"
            >
              ×
            </button>

            <img
              src={selectedImage}
              alt={product.title}
              className="max-w-[80vw] max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
