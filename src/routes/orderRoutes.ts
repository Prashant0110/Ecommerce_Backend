import express, { Router } from "express";
import authMiddleware, { Role } from "../middleware/authMiddleware";
import errorHandler from "../services/catchAsyncError";
import OrderController from "../controller/orderController";
import Order from "../models/Order";
const router: Router = express.Router();

router
  .route("")
  .post(authMiddleware.isAuthenticated, OrderController.createOrder);

export default router;
