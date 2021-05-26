import { Prisma, Product as ProductModel } from ".prisma/client";

export class Product implements ProductModel {
  id: string;
  title: string;
  description: string;
  brand: string;


  color: string[];

  size: string[];
  dimensions: number[];
  details: Prisma.JsonValue;

  published: boolean;
  price: number;

  mrp: number;
  tax: number;
  taxCode: string;
  inventoryId: string;

  active: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<ProductModel>) {
    Object.assign(this, partial);
  }

}
