import axios from "axios";
import { AuthRequest } from "../middleware/authMiddleware";
import Order from "../models/Order";
import OrderDetails from "../models/orderDetails";
import Payment from "../models/Payment";
import { khaltiResponse, OrderData, PaymentMethod } from "../types/orderTypes";
import { Response, Request } from "express";

class OrderController {
  public static async createOrder(
    req: AuthRequest,
    res: Response
  ): Promise<void> {
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

    const paymentData = await Payment.create({
      paymentMethod: paymentDetails.paymentMethod,
    });
    const orderData = await Order.create({
      phoneNumber,
      shippingAdress,
      totalAmount,
      userId,
      paymentId: paymentData.id,
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
      const data = {
        return_url: "https://localhost:3000/success",
        purchase_order_id: orderData.id,
        amount: totalAmount * 100,
        website_url: "http://localhost:3000",
        purchase_order_name: "orderName_" + orderData.id,
      };
      const response = await axios.post(
        "https://a.khalti.com/api/v2/epayment/initiate/",
        data,
        {
          headers: {
            Authorization: "Key 272920d8e3ad4a2e9a31ed54a7383109",
          },
        }
      );
      const khaltiResponse: khaltiResponse = response.data;
      paymentData.pidx = khaltiResponse.pidx;
      await paymentData.save();
      res.status(200).json({
        message: "order placed successfully",
        url: khaltiResponse.payment_url,
      });
    } else {
      res.status(200).json({
        message: "order placed successfully",
      });
    }
  }
}

export default OrderController;
