import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// Get User Cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.find({ user: req.user._id })
      .populate("product");

    res.status(200).json(cart);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Add Product to Cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const existingItem = await Cart.findOne({
      user: req.user._id,
      product: productId,
    });

    // Check if product already exists
    if (existingItem) {
      return res.status(400).json({
        message: "Product already exists in cart.",
      });
    }

    const cartItem = await Cart.create({
      user: req.user._id,
      product: productId,
      quantity: quantity || 1,
    });

    res.status(201).json(cartItem);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Quantity
export const updateCart = async (req, res) => {

  try {

    const cart = await Cart.findById(req.params.id);

    if (!cart) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    cart.quantity = req.body.quantity;

    await cart.save();

    res.json(cart);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// Remove Item
export const removeCartItem = async (req, res) => {

  try {

    const cart = await Cart.findById(req.params.id);

    if (!cart) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    await cart.deleteOne();

    res.json({
      message: "Item removed successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// Clear Cart
export const clearCart = async (req, res) => {

  try {

    await Cart.deleteMany({
      user: req.user._id,
    });

    res.json({
      message: "Cart cleared successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};