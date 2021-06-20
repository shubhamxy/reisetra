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
import { updateSnackBar, useGlobalDispatch } from "../global";
import { DataT, IErrorResponse, ISuccessResponse } from "../utils";


export const useAddCartItem = () => {
  const dispatch = useGlobalDispatch();
  const queryClient = useQueryClient();
  return useMutation(addCartItem, {
    onSuccess: () => {
      queryClient.invalidateQueries("cart");
      dispatch(updateSnackBar({
        message: 'Product added to cart successfully',
        type: "success",
        open: true,
      }));
    },
    onError: (error) => {
      dispatch(updateSnackBar({
        message: error['message'] || 'Server Error',
        type: "error",
        open: true,
      }));
    }
  });
};
export const useDeleteCartItem = () => {
  const dispatch = useGlobalDispatch();
  const queryClient = useQueryClient();
  return useMutation(removeCartItem, {
    onSuccess: () => {
      queryClient.invalidateQueries("cart");
    },
    onError: (error) => {
      dispatch(updateSnackBar({
        message: error['message'] || 'Server Error',
        type: "error",
        open: true,
      }));
    }
  });
};

export const useCartItem = (cartId: string, productId: string) => {
  const dispatch = useGlobalDispatch();
  return useQuery(["cart", cartId, productId], getCartItem, {
    enabled: !!cartId && !!productId,
    onSuccess: () => {},
    onError: (error) => {
      dispatch(updateSnackBar({
        message: error['message'] || 'Server Error',
        type: "error",
        open: true,
      }));
    }
  });
}
export const useCartItems = (cartId: string, promo: string) =>
  useQuery<ISuccessResponse<DataT>, IErrorResponse<DataT>>(
    ["cart", cartId || '', promo || ''],
    getCart,
    {
      initialData: {
        data: {
          items: [],
        },
      },
      enabled: Boolean(cartId),
      getNextPageParam: (lastPage, _pages) => {
        return lastPage.meta.link?.next?.cursor;
      },
      onSuccess: () => {},
    }
  );

export const useCartCheckout = () => {
  const dispatch = useGlobalDispatch();
  return useMutation(cartCheckout, {
    onSuccess: () => {
      dispatch(updateSnackBar({
        message: 'Cart Successfully checked out',
        type: "success",
        open: true,
      }));
    },
    onError: (error) => {
      dispatch(updateSnackBar({
        message: error['message'] || 'Server Error',
        type: "error",
        open: true,
      }));
    }
  });
};
