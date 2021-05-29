import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import {
  addCartItem,
  removeCartItem,
  getCart,
  getCartItem,
  cartCheckout,
} from "../api/cart";
import { setAuthState, useAuthDispatch } from "../auth";
import { DataT, IErrorResponse, ISuccessResponse } from "../utils";

export const useAddCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation(addCartItem, {
    onSuccess: () => {
      queryClient.invalidateQueries("cart");
    },
  });
};
export const useDeleteCartItem = () => useMutation(removeCartItem);

export const useCartItem = (cartId: string, productId: string) =>
  useQuery(["cart", cartId, productId], getCartItem, {
    enabled: !!cartId && !!productId,
    onSuccess: () => {},
  });

export const useCartItems = (cartId: string) =>
  useQuery<ISuccessResponse<DataT>, IErrorResponse<DataT>>(
    ["cart", cartId],
    getCart,
    {
      initialData: {
        data: {
          items: [],
        },
      },
      enabled: !!cartId,
      getNextPageParam: (lastPage, _pages) => {
        return lastPage.meta.link?.next?.cursor;
      },
      onSuccess: () => {},
    }
  );

export const useCartCheckout = () => {

  return useMutation(cartCheckout, {
    onSuccess: () => {

    },
  });
};
