import express, { Router } from "express";
import CartController from "../controller/cartController";
import authMiddleware, { Role } from "../middleware/authMiddleware";
const router: Router = express.Router();

router
  .route("")
  .post(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.Admin),
    CartController.addToCart
  )
  .get(authMiddleware.isAuthenticated, CartController.getMyCart);

router
  .route("/:productId")
  .patch(authMiddleware.isAuthenticated, CartController.updateCartItems)
  .delete(authMiddleware.isAuthenticated, CartController.deleteCartItems);

export default router;
