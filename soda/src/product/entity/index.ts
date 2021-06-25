import { Prisma, Product as ProductModel, Category as CategoryModel, Tag as TagModel } from ".prisma/client";

export class Product implements ProductModel {
  constructor(partial: Partial<ProductModel>) {
    Object.assign(this, partial);
  }

  id: string;
  title: string;
  description: string;
  brand: string;
  colors: string[];
  sizes: string[];

  dimensions: string[];
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
  rating: number;
  styles: string[];
}

export class Category implements CategoryModel {
  constructor(partial: Partial<ProductModel>) {
    Object.assign(this, partial);
  }
  label: string;
  value: string;
  styles: string[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Tag implements TagModel {
  constructor(partial: Partial<ProductModel>) {
    Object.assign(this, partial);
  }
  styles: string[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  label: string;
  value: string;
}
