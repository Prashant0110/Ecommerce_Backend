export interface OrderData {
  phoneNumber: string;
  shippingAdress: string;
  totalAmount: number;
  paymentDetails: {
    paymentMethod:
      | PaymentMethod.khalti
      | PaymentMethod.COD
      | PaymentMethod.Esewa;
    paymentStatus?: PaymentStatus.paid | PaymentStatus.unpaid; //optional
    pidx?: string;
  };
  items: OrderDetails[];
}

export interface OrderDetails {
  quantity: number;
  productId: string;
}

export enum PaymentMethod {
  COD = "COD",
  khalti = "khalti",
  Esewa = "Esewa",
}

enum PaymentStatus {
  paid = "paid",
  unpaid = "unpaid",
}
