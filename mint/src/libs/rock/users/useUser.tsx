import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "react-query";
import {
  cancelOrder,
  createAddress,
  deleteAddress,
  getAddreses,
  getMe,
  getOrders,
  updateAddress,
  updateMe,
  updateOrder,
  UserProfile,
} from "../api/user";
import { useAuthDispatch, setAuthState, logout } from "../auth";
import { updateSnackBar, useGlobalDispatch } from "../global";
import { DataT, IErrorResponse, ISuccessResponse, storage } from "../utils";

export const useUserProfile = () =>
  useMutation(getMe, {
    mutationKey: ["user"],
  });

export const useUpdateUserProfile = () => {
  const dispatch = useAuthDispatch();
  return useMutation(updateMe, {
    onSuccess: () => {
      dispatch(setAuthState({ user: null }));
    },
  });
};

export const useCreateAddress = () => {
  const queryClient = useQueryClient();
  return useMutation(createAddress, {
    onSuccess: () => {
      queryClient.invalidateQueries("ADDRESSES");
    },
  });
};
export const useUpdateAddress = () => {
  const queryClient = useQueryClient();
  return useMutation(updateAddress, {
    onSuccess: () => {
      queryClient.invalidateQueries("ADDRESSES");
    },
  });
};
export const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteAddress, {
    onSuccess: () => {
      queryClient.invalidateQueries("ADDRESSES");
    },
  });
};

export const useAddresses = (filters = {}) => {
  return useInfiniteQuery<ISuccessResponse<DataT>, IErrorResponse<DataT>>(
    ["ADDRESSES", filters],
    ({ queryKey, pageParam = undefined }) =>
      getAddreses({
        ...filters,
        buttonNum: "4",
        size: "4",
        cursor: pageParam,
      }),
    {
      getNextPageParam: (lastPage, _pages) => {
        return lastPage.meta.link?.next?.cursor;
      },
      onSuccess: () => {},
    }
  );
};

export const useOrders = (filters = {}) => {
  return useInfiniteQuery<ISuccessResponse<DataT>, IErrorResponse<DataT>>(
    ["ORDERS", filters],
    ({ queryKey, pageParam = undefined }) =>
      getOrders({
        ...filters,
        buttonNum: "4",
        size: "4",
        cursor: pageParam,
      }),
    {
      getNextPageParam: (lastPage, _pages) => {
        return lastPage.meta.link?.next?.cursor;
      },
      onSuccess: () => {},
    }
  );
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();
  const dispatch = useGlobalDispatch();
  return useMutation(cancelOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries("ORDERS");
      dispatch(updateSnackBar({
        message: 'Order cancellation requested successfully',
        type: "success",
        open: true,
      }));
    },
    onError: (error) => {
      dispatch(updateSnackBar({
        message: error['message'] || 'Order cancellation request unsuccessfull',
        type: "error",
        open: true,
      }));
    },
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  const dispatch = useGlobalDispatch();
  return useMutation(updateOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries("ORDERS");
      dispatch(updateSnackBar({
        message: 'Order cancellation requested successfully',
        type: "success",
        open: true,
      }));
    },
    onError: (error) => {
      dispatch(updateSnackBar({
        message: error['message'] || 'Order cancellation request unsuccessfull',
        type: "error",
        open: true,
      }));
    },
  });
};
