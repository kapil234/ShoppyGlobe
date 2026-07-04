import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  placeOrder,
  getMyOrders,
  getOrderById,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", protect, placeOrder);

router.get("/", protect, getMyOrders);

router.get("/:id", protect, getOrderById);

export default router;