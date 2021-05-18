import { CartItem as CartItemModel } from "@prisma/client";

export type CartItemRO = Partial<CartItemModel>;

export type CartRO = Partial<CartItemModel>[];
