import { get, post, put } from "../../utils/http";
import pickBy from "lodash.pickby";
import identity from "lodash.identity";
const queryString = require('query-string');

export interface CreateProductDTO {
  mrp: number;
  tax: number;
  price: number;
  published: boolean;
  sizes: string[];
  dimensions?: string[];
  details?: {
    label: string;
    value: string;
  }[];
  colors: string[];
  brand: string;
  title: string;
  description: string;
  inventory: {
    stockQuantity: number;
    sku: string;
  };
  categories: string[];
  tags: string[];
  images: {
    fileType: string;
    fileName: string;
    url: string;
    contentType: string;
  }[];
}

export function getProduct({ queryKey }: { queryKey: [string, string] }) {
  return get(`product/${queryKey[1]}`);
}
export function getTags() {
  return get(`tags`);
}

export function getCategories() {
  return get(`categories`);
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
  const qs = queryString.stringify(pickBy(params, identity));
  console.log({qs});
  return get(`products?${qs}`);
}

export function getReviews({
  id,
  params,
}: {
  id: string;
  params: PaginationParams;
}) {
  const qs = queryString.stringify(pickBy(params, identity));
  return get(`reviews/${id}?${qs}`);
}
