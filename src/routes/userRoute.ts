import express, { Router } from "express";
import AuthController from "../controller/userController";
import errorHandler from "../services/catchAsyncError";
const router: Router = express.Router();

router.route("/register").post(errorHandler(AuthController.registerUser));

router.route("/login").post(errorHandler(AuthController.LoginUser));

export default router;
