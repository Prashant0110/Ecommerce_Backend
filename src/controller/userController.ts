import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {
  public static async registerUser(req: Request, res: Response): Promise<void> {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password || !role) {
      res.status(400).json({
        message: "please enter credentials",
      });
      return;
    }

    await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, 10),
      role: role && role,
    });
    res.status(200).json({
      message: "user registered successfully",
    });
  }

  public static async LoginUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        message: "please enter credentials",
      });
      return;
    }
    const [data] = await User.findAll({
      where: {
        email: email,
      },
    });
    if (!data) {
      res.status(400).json({
        message: "user not found",
      });
      return;
    }

    //check password

    const isMatched = bcrypt.compareSync(password, data.password);
    if (isMatched) {
      //generate token to send user
      const token = jwt.sign(
        { id: data.id, role: data.role },
        process.env.SECRET_KEY as string,
        {
          expiresIn: "20d",
        }
      );
      console.log("Generated Token:", data.role);

      res.status(200).json({
        message: "logged in successfully",
        data: token,
      });
    } else {
      res.status(403).json({
        message: "Either Invalid email or Password",
      });
    }
  }
}

export default AuthController;
