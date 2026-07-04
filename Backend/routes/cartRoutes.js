import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  getCart,
  addToCart,
  updateCart,
  removeCartItem,
  clearCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/", protect, getCart);

router.post("/add", protect, addToCart);

router.put("/:id", protect, updateCart);

router.delete("/:id", protect, removeCartItem);

router.delete("/clear/all", protect, clearCart);

export default router;