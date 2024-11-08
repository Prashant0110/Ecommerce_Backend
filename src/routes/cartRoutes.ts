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

// router
//   .route("/category/:id")
//   .delete(
//     authMiddleware.isAuthenticated,
//     authMiddleware.restrictTo(Role.Admin),
//     CategoryController.deleteCategory
//   )
//   .patch(
//     authMiddleware.isAuthenticated,
//     authMiddleware.restrictTo(Role.Admin),
//     CategoryController.updateCategory
//   );

export default router;
