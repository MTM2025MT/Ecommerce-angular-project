// Removed incorrect deep import from node_modules which caused build errors.
// Use a simple alias for Float instead of importing internal type definitions.
export type Float = number;
import { payment } from './User.type';
import { Cart } from './CartElement.type';
export  type order={
      id:number,
      order_number:number ,
      user_id:number,
      cart_id:string,
      address_id:string,
      status:"pending"|  "processing"  | "shipped"| "delivered" | "cancelled"  | "refunded",
      total:number,
      currency: "USD"|"REl"|"ERU",
      payment_method: "credit_card"|"cash",
      saved_payment:string,
      payment_detiles?:payment,
      Note:string,
      created_at: string,
      card:Cart

}
/** "order_statuses": {
    "pending": "Order created, waiting for payment",
    "paid": "Payment successful, order confirmed",
    "processing": "Preparing your order for shipment",
    "shipped": "Order is on the way to you",
    "delivered": "Order successfully delivered",
    "cancelled": "Order was cancelled",
    "refunded": "Money returned to customer"
  },

  "payment_statuses": {
    "pending": "Payment not completed yet",
    "completed": "Payment successful",
    "failed": "Payment failed",
    "refunded": "Payment refunded"
  }, */
