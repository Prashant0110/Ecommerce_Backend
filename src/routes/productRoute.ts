import express, { Router } from "express";
import ProductController from "../controller/userProduct";
import { multer, storage } from "../middleware/multer";
import authMiddleware, { Role } from "../middleware/authMiddleware";
const router: Router = express.Router();

const upload = multer({ storage: storage });
router
  .route("")
  .post(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.Admin),
    upload.single("image"),
    ProductController.registerProduct
  )
  .get(ProductController.getAllProducts);

router
  .route("/:id")
  .get(ProductController.getSingleProduct)
  .delete(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.Admin),
    ProductController.deleteProduct
  );

router
  .route("/update/:id")
  .patch(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.Admin),
    ProductController.updateProduct
  );

export default router;
