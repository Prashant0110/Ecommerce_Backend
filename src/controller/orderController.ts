import { AuthRequest } from "../middleware/authMiddleware";
import Order from "../models/Order";
import OrderDetails from "../models/orderDetails";
import Payment from "../models/Payment";
import { OrderData, PaymentMethod } from "../types/orderTypes";
import { Response, Request } from "express";

class OrderController {
  async createOrder(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.user?.id;
    const {
      phoneNumber,
      shippingAdress,
      totalAmount,
      paymentDetails,
      items,
    }: OrderData = req.body;

    if (
      !phoneNumber ||
      !shippingAdress ||
      !totalAmount ||
      !paymentDetails ||
      !paymentDetails.paymentMethod ||
      items.length === 0
    ) {
      res.status(400).json({
        message: "Please enter all the required fields",
      });
      return;
    }

    const orderData = await Order.create({
      phoneNumber,
      shippingAdress,
      totalAmount,
      userId,
    });

    await Payment.create({
      paymentMethod: paymentDetails.paymentMethod,
    });
    for (const item of items) {
      await OrderDetails.create({
        quantity: item.quantity,
        productId: item.productId,
        orderId: orderData.id,
      });
    }

    if (paymentDetails.paymentMethod === PaymentMethod.khalti) {
      //khalti Integration
    } else {
      res.status(200).json({
        message: "order placed successfully",
      });
    }
  }
}

export default OrderController;
