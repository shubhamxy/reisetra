import { CartItem as CartItemModel, Cart as CartModel } from ".prisma/client";

export class CartItem implements CartItemModel {
  constructor(partial: Partial<CartItemModel>) {
    Object.assign(this, partial);
  }
  id: string;
  userId: string;
  quantity: number;
  price: number;
  cartId: string;
  productId: string;
  orderId: string;

  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Cart implements CartModel {
  constructor(partial: Partial<CartItemModel>) {
    Object.assign(this, partial);
  }
  id: string;
  subTotal: number;
  itemDiscount: number;
  tax: number;
  shipping: number;
  total: number;
  promo: string;
  discount: string;
  grandTotal: number;
  createdAt: Date;
  updatedAt: Date;
  checkedOut: boolean;
}
