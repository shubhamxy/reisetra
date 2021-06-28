import { del, get, post, put } from "../../utils/http";
import pickBy from "lodash.pickby";
import identity from "lodash.identity";
const queryString = require("query-string");

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

export interface CreateCategoryDTO {
  label: string;
  value: string;
  styles: string[];
  images: {
    fileType: string;
    fileName: string;
    url: string;
    contentType: string;
    id: string;
  }[];
}

export interface CreateTagDTO {
  label: string;
  value: string;
  styles: string[];
  images: {
    fileType: string;
    fileName: string;
    url: string;
    contentType: string;
    id: string;
  }[];
}

export interface CreateOfferDTO {
  label: string;
  value: string;
  type: string;
}

export function getProduct({ queryKey }: { queryKey: [string, string] }) {
  return get(`product/${queryKey[1]}`);
}
export function getTags({ queryKey }) {
  const qs = queryString.stringify(pickBy(queryKey[1], identity));
  return get(`tags?${qs}`);
}

export function getCategories() {
  return get(`categories`);
}

export function createCategory(body: CreateCategoryDTO) {
  return post("category", body);
}

export function createTag(body: CreateTagDTO) {
  return post("tag", body);
}
export function createOffer(body: CreateOfferDTO[]) {
  return post("offers", body);
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

interface CreateReviewDTO {
  title: string;
  description: string;
  productId: string;
  images: {
    fileType: string;
    fileName: string;
    url: string;
    contentType: string;
  }[];
  tags: string[];
  rating: number;
}
export function createReview(body: CreateReviewDTO) {
  return post("review", body);
}

export function updateReview({
  id,
  body,
}: {
  id: string;
  body: CreateReviewDTO;
}) {
  return put(`review/${id}`, body);
}

export function deleteReview(id: string) {
  return del(`review/${id}`);
}
