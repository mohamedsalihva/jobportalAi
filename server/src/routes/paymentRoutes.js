import express from "express";
import {
  createOrder,
  verifyPayment,
} from "../controllers/paymentController.js";

import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.post("/razorpay/order", AuthMiddleware, createOrder);
router.post("/razorpay/verify", AuthMiddleware, verifyPayment);

export default router;
