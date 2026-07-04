import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import API from "../api/axios";
import { setCart } from "../redux/cartSlice";
import CartItem from "./CartItem";

const Cart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await API.get("/cart");

        const formattedCart = data.map((item) => ({
          ...item.product,
          quantity: item.quantity,
          cartId: item._id,
        }));

        dispatch(setCart(formattedCart));
      } catch (err) {
        console.error(err);
      }
    };

    fetchCart();
  }, [dispatch]);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-2xl font-semibold">
            Your cart is empty
          </h2>

          <Link
            to="/"
            className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <CartItem
                key={item._id}
                item={item}
              />
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white rounded-xl shadow-md p-6 h-fit">
            <h2 className="text-2xl font-bold mb-6">
              Order Summary
            </h2>

            <div className="flex justify-between mb-4">
              <span>Total Items</span>
              <span>{cartItems.length}</span>
            </div>

            <div className="flex justify-between mb-6">
              <span>Total Price</span>

              <span className="font-bold">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <Link
              to="/checkout"
              className="block text-center bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
            >
              Proceed to Checkout
            </Link>
          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;