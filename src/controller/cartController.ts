import { Request, Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import Cart from "../models/Cart";
import Product from "../models/productModel";
import Category from "../models/Category";

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
          include: [
            {
              model: Category,
              attributes: ["categoryName"],
            },
          ],
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

  public static async deleteCartItems(
    req: AuthRequest,
    res: Response
  ): Promise<void> {
    const userId = req.user?.id;
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({
        message: "Product not found",
      });
      return;
    }
    await Cart.destroy({
      where: {
        userId,
        id,
      },
    });
    res.status(200).json({
      message: "Product deleted successfully",
    });
  }

  public static async updateCartItems(
    req: AuthRequest,
    res: Response
  ): Promise<void> {
    const userId = req.user?.id;
    const { id: productId } = req.params;
    const { quantity } = req.body;
    if (!quantity || quantity < 1) {
      res.status(400).json({
        message: "Please enter valid quantity",
      });
    }
    const cartItem = await Cart.findOne({
      where: {
        userId,
        productId,
      },
    });

    if (!cartItem) {
      res.status(404).json({
        message: "Cart item not found",
      });
      return;
    }

    cartItem.quantity = quantity;
    await cartItem.save();
    res.status(200).json({
      message: "Cart item updated successfully",
      cartItem,
    });
  }
}

export default CartController;
