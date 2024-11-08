import { Request, Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import Cart from "../models/Cart";
import Product from "../models/productModel";

class CartController {
  public static async addToCart(
    req: AuthRequest,
    res: Response
  ): Promise<void> {
    const userId = req.user?.id;
    const { quantity, productId } = req.body;

    if (!quantity || !productId) {
      res.status(400).json({
        message: "Please enter quantity and productId",
      });
      return;
    }

    // Check if the product already exists in the cart
    let cartItem = await Cart.findOne({
      where: {
        productId,
        userId,
      },
    });

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      // Create a new cart item if it doesn't exist
      cartItem = await Cart.create({
        productId,
        userId,
        quantity,
      });
    }

    await cartItem.save();
    res.status(200).json({
      message: "Product added to cart successfully",
      cartItem,
    });
  }

  public static async getMyCart(req: Request, res: Response): Promise<void> {
    const userId = req.params.userId;
    const cartItems = await Cart.findAll({
      where: {
        userId,
      },
      include: [
        {
          model: Product,
          attributes: ["productName", "price", "imagePath"],
        },
      ],
    });
    if (cartItems.length == 0) {
      res.status(200).json({
        message: "Cart is empty",
      });
    } else {
      res.status(200).json({
        message: "Cart fetched successfully",
        cartItems,
      });
    }
  }
}

export default CartController;
