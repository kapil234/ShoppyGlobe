import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

// Place Order
export const placeOrder = async (req, res) => {
  try {
    const { shippingAddress } = req.body;

    const cartItems = await Cart.find({
      user: req.user._id,
    }).populate("product");

    if (cartItems.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    const items = cartItems.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
    }));

    const totalPrice = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: req.user._id,
      items,
      shippingAddress,
      totalPrice,
    });

    // Clear cart after placing order
    await Cart.deleteMany({
      user: req.user._id,
    });

    res.status(201).json(order);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get My Orders
export const getMyOrders = async (req, res) => {
  try {

    const orders = await Order.find({
      user: req.user._id,
    })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Order By ID
export const getOrderById = async (req, res) => {
  try {

    const order = await Order.findById(req.params.id)
      .populate("items.product");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};