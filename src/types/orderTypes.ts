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

export interface khaltiResponse {
  pidx: string;
  payment_url: string;
  expires_at: string | Date;
  expires_in: number;
  user_fee: number;
}

export interface TransactionVerificationResponse {
  pidx: string;
  total_amount: number;
  status: string;
  transaction_id: TransactionStatus;
  fee: number;
  refunded: boolean;
}

export enum TransactionStatus {
  Completed = "Completed",
  Refunded = "Refunded",
  Pending = "Pending",
  Initiated = "Initiated",
}
