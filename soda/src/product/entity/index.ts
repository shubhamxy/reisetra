import { Prisma, Product as ProductModel } from '.prisma/client';

export class Product implements ProductModel {
  id: string;
  title: string;
  description: string;
  brand: string;
  size: string;
  color: string;
  extra: Prisma.JsonValue;
  published: boolean;
  price: number;

  mrp: number;
  tax: number;

  inventoryId: string;

  active: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<ProductModel>) {
    Object.assign(this, partial);
  }
}
