import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/axios";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);

  // Product passed from Order Now
  const buyNowProduct = location.state?.product;

 
  const items = buyNowProduct
    ? [{ ...buyNowProduct, quantity: 1 }]
    : cartItems;

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================
  // Place Order
  // ==========================
  const handleOrder = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const orderData = {
        items: items.map((item) => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price,
        })),

        shippingAddress: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        },

        totalAmount: total,
      };

      await API.post("/orders", orderData);

      toast.success("🎉 Order Placed Successfully!");

      // Clear Redux cart only if checkout came from Cart
      if (!buyNowProduct) {
        dispatch(clearCart());

        // Optional:
        // await API.delete("/cart/clear/all");
      }

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Unable to place order."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold mb-8">
        Checkout
      </h1>

      <div className="grid lg:grid-cols-2 gap-10">

        {/* Shipping Form */}
        <form
          onSubmit={handleOrder}
          className="bg-white p-6 rounded-xl shadow space-y-5"
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />

          <textarea
            name="address"
            rows="4"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold disabled:bg-gray-400"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </form>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-2xl font-bold mb-6">
            Order Summary
          </h2>

          {items.length === 0 ? (
            <p className="text-gray-500">
              No products available.
            </p>
          ) : (
            <>
              {items.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center border-b pb-4 mb-4"
                >
                  <div>
                    <h3 className="font-semibold">
                      {item.title}
                    </h3>

                    <p className="text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}

              <div className="flex justify-between mt-6 text-2xl font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
};

export default Checkout;