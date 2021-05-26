import { get, post, put } from "../../utils/http";
import pickBy from "lodash.pickby";
import identity from "lodash.identity";

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
    stockQuantity: number;
    sku: string;
  };
  images?: {
    key: string;
    url: string;
  }[];
}

export function getProduct({ queryKey }: { queryKey: [string, string] }) {
  return get(`product/${queryKey[1]}`);
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
interface PaginationParams {
  [key: string]: string;
  size?: string;
  buttonNum?: string;
  cursor?: string;
  orderBy?: string;
  orderDirection?: "desc" | "asc";
}

export function getProducts(params: PaginationParams) {
  console.log({ params });
  const qs = new URLSearchParams(pickBy(params, identity)).toString();
  console.log({ qs });
  return get(`products?${qs}`);
}
