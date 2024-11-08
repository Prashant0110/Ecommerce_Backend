import express, { Router } from "express";
import CategoryController from "../controller/categoryController";
import authMiddleware, { Role } from "../middleware/authMiddleware";
const router: Router = express.Router();

router
  .route("/category")
  .post(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.Admin),
    CategoryController.addCategory
  )
  .get(CategoryController.getCategories);

router
  .route("/category/:id")
  .delete(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.Admin),
    CategoryController.deleteCategory
  )
  .patch(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.Admin),
    CategoryController.updateCategory
  );

export default router;
