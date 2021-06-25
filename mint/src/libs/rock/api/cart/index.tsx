import { del, get, post, put } from "../../utils/http";
import pickBy from "lodash.pickby";
import identity from "lodash.identity";

export function getCartItem({ queryKey }: { queryKey: [string, string, string] }) {
  return get(`cart/${queryKey[1]}`);
}

export function addCartItem({cartId, productId, body}) {
  return put(`cart/${cartId}/${productId}`, body);
}

export function removeCartItem({cartId, productId}: {cartId: string, productId: string}) {
  return del(`cart/${cartId}/${productId}`);
}

interface PaginationParams {
  [key: string]: string;
  size?: string;
  buttonNum?: string;
  cursor?: string;
  orderBy?: string;
  orderDirection?: "desc" | "asc";
}

export function getCart({ queryKey }: {queryKey: [string, string, string]}) {
  return get(`cart/${queryKey[1]}${queryKey[2] ? `?promo=${queryKey[2]}`: ''}`);
}

export function cartCheckout(body) {
  return post("cart/checkout", body);
}
