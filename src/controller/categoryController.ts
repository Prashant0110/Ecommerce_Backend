import Category from "../models/Category";
import { Request, Response } from "express";
import Product from "../models/productModel";

class CategoryController {
  categoryData = [
    {
      categoryName: "Electronics",
    },
    {
      categoryName: "Groceries",
    },
    {
      categoryName: "Food/Beverages",
    },
    {
      categoryName: "Automobiles",
    },
    {
      categoryName: "Kids",
    },
    {
      categoryName: "Adults",
    },
  ];
  async seedCategory(): Promise<void> {
    const datas = await Category.findAll();
    if (datas.length == 0) {
      const data = await Category.bulkCreate(this.categoryData);
      console.log("categories seeded successfully");
    } else {
      console.log("Categories already seeded");
    }
  }

  public static async addCategory(req: Request, res: Response): Promise<void> {
    const { categoryName } = req.body;
    if (!categoryName) {
      res.status(400).json({
        message: "please enter category name",
      });
    }
    await Category.create({
      categoryName,
    });
    res.status(200).json({
      message: "Category added successfully",
    });
  }

  public static async getCategories(
    req: Request,
    res: Response
  ): Promise<void> {
    const data = await Category.findAll();
    res.status(200).json({
      message: "Categories fetched successfully",
      data,
    });
  }

  public static async deleteCategory(
    req: Request,
    res: Response
  ): Promise<void> {
    const { id } = req.params;
    const data = await Category.findAll({
      where: {
        id,
      },
    });
    if (data.length == 0) {
      res.status(404).json({
        message: "No category with that id",
      });
    }
    await Category.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({
      message: "Category deleted successfully",
    });
  }

  public static async updateCategory(
    req: Request,
    res: Response
  ): Promise<void> {
    const { id } = req.params;
    const { categoryName } = req.body;
    if (!categoryName) {
      res.status(400).json({
        message: "please enter category name",
      });
    }
    const data = await Category.findAll({
      where: {
        id,
      },
    });
    if (data.length == 0) {
      res.status(404).json({
        message: "No category with that id",
      });
    }
    await Category.update(
      { categoryName },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).json({
      message: "Category updated successfully",
    });
  }
}

export default new CategoryController();
