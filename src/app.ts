import express, { Application, Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
dotenv.config();
import "./database/connection";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import adminSeeder from "./adminSeeder";
import categoryController from "./controller/categoryController";
import categoryRoute from "./routes/categoryRoute";
import cartRoute from "./routes/cartRoutes";

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 3000; // Use PORT from env or fallback to 3000

app.use(express.json());

// Admin seeder
adminSeeder().catch((error) => {
  console.error("Error during admin seeding:", error);
});

categoryController.seedCategory();
// Define routes
app.use("", userRoute);
app.use("/admin/product", productRoute);
app.use("/admin", categoryRoute);
app.use("/customer/cart", cartRoute);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server has started at port ${PORT}`);
});
