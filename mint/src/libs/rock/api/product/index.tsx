import { get, post, put } from "../../utils/http";

export interface CreateProductDTO {
  title: string;
  description: string;
  brand: string;
  size: string;
  color: string;
  extra: Record<string, string>;
  published: boolean;
  price: number;
  mrp: number;
  tax: number;
  inventory: {
    stockQuantity: number,
    sku: string,
  }
  images?: {
    key: string,
    url: string,
  }[]
}

export function getProduct(productId: string) {
  return get(`product/${productId}`);
}

export function createProduct(body: CreateProductDTO) {
  return post("product", body);
}

export function updateProduct({
  productId,
  body,
}: {
  productId: string;
  body: CreateProductDTO;
}) {
  return put(`product/${productId}`, body);
}
