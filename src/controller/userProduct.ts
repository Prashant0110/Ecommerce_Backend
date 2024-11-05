import { Request, Response } from "express";
import Product from "../models/productModel";
import { AuthRequest } from "../middleware/authMiddleware";
import User from "../models/userModel";
import Category from "../models/Category";

class ProductController {
  public static async registerProduct(
    req: AuthRequest,
    res: Response
  ): Promise<void> {
    const userId = req.user?.id;
    const { description, quantity, price, productName, categoryId } = req.body;
    let fileName;
    if (fileName) {
      fileName = req.file?.filename;
    } else {
      fileName =
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHBob25lfGVufDB8fDB8fHww";
    }

    if (!description || !quantity || !price || !productName || !categoryId) {
      res.status(400).json({
        message: "Please enter description,quantity productName and price",
      });
      return;
    }

    await Product.create({
      productName,
      description,
      price,
      quantity,
      imagePath: fileName,
      userId,
      categoryId,
    });
    console.log(req.file);
    res.status(200).json({
      message: "Response has been recorded successfully",
    });
  }

  public static async getAllProducts(
    req: Request,
    res: Response
  ): Promise<void> {
    const data = await Product.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "email", "username"],
        },
        {
          model: Category,
          attributes: ["categoryName", "id"],
        },
      ],
    });
    res.status(200).json({
      message: "Products fetched successfully",
      data,
    });
  }

  public static async getSingleProduct(
    req: Request,
    res: Response
  ): Promise<void> {
    const id = req.params.id;
    const data = await Product.findAll({
      where: {
        id: id,
      },
      include: [
        {
          model: User,
          attributes: ["id", "email", "username"],
        },
        {
          model: Category,
          attributes: ["categoryName", "id"],
        },
      ],
    });
    if (data.length == 0) {
      res.status(404).json({
        message: "No product with that id",
      });
    } else {
      res.status(200).json({
        message: "Prodcut Fetched Successfully",
        data,
      });
    }
  }

  public static async deleteProduct(
    req: Request,
    res: Response
  ): Promise<void> {
    const { id } = req.params;
    const data = await Product.findAll({
      where: {
        id: id,
      },
    });
    if (data.length > 0) {
      await Product.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({
        message: "Product Deleted Successfully",
      });
    } else {
      res.status(400).json({
        message: "Couldn't delete the product with that Id",
      });
    }
  }

  public static async updateProduct(
    req: Request,
    res: Response
  ): Promise<void> {
    const { id } = req.params;
    const { description, quantity, price, productName, categoryId } = req.body;
    if (!description || !quantity || !price || !productName || !categoryId) {
      res.status(400).json({
        message:
          "Please enter description,quantity,categoryId,productName and price",
      });
      return;
    }
    try {
      // Check if the product exists
      const existingProduct = await Product.findOne({
        where: { id },
      });

      if (!existingProduct) {
        res.status(404).json({
          message: "Product not found",
        });
        return;
      }

      const data = await Product.update(
        {
          productName,
          description,
          price,
          quantity,
          categoryId,
        },
        {
          where: {
            id,
          },
        }
      );
      res.status(200).json({
        message: "Product Updated Successfully",
        data,
      });
    } catch (error: unknown) {
      // Handle potential errors
      res.status(500).json({
        message: "An error occurred while updating the product",
        error: (error as Error).message,
      });
    }
  }
}
export default ProductController;
