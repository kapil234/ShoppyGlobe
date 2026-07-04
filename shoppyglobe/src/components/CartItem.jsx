
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import API from "../api/axios";

import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/cartSlice";

const CartItem = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  // ==========================
  // Increase Quantity
  // ==========================
  const handleIncrease = async (e) => {
    e.stopPropagation();

    try {
      await API.put(`/cart/${item.cartId}`, {
        quantity: item.quantity + 1,
      });

      dispatch(increaseQuantity(item._id));
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Unable to update quantity."
      );
    }
  };

  // ==========================
  // Decrease Quantity
  // ==========================
  const handleDecrease = async (e) => {
    e.stopPropagation();

    if (item.quantity === 1) return;

    try {
      await API.put(`/cart/${item.cartId}`, {
        quantity: item.quantity - 1,
      });

      dispatch(decreaseQuantity(item._id));
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Unable to update quantity."
      );
    }
  };

  // ==========================
  // Remove Item
  // ==========================
  const handleRemove = async (e) => {
    e.stopPropagation();

    try {
      await API.delete(`/cart/${item.cartId}`);

      dispatch(removeFromCart(item._id));

      toast.success("Item removed successfully.");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Unable to remove item."
      );
    }
  };

  return (
    <div
      onClick={() => navigate(`/product/${item._id}`)}
      className="bg-white rounded-xl shadow-md p-5 flex flex-col md:flex-row justify-between gap-6 cursor-pointer hover:shadow-xl transition"
    >
      <div className="flex gap-5">
        <img
          src={item.thumbnail}
          alt={item.title}
          loading="lazy"
          className="w-32 h-32 object-cover rounded-lg"
        />

        <div>
          <h2 className="text-xl font-bold">
            {item.title}
          </h2>

          <p className="text-gray-500 mt-2">
            ${item.price}
          </p>

          <button
            onClick={handleRemove}
            className="text-red-600 mt-4 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleDecrease}
          className="w-10 h-10 rounded-full bg-gray-200 text-xl"
        >
          -
        </button>

        <span className="text-xl font-bold">
          {item.quantity}
        </span>

        <button
          onClick={handleIncrease}
          className="w-10 h-10 rounded-full bg-gray-200 text-xl"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;