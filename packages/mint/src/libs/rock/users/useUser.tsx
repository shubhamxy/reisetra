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
  createSupportTicket,
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
import { DataT, IErrorResponse, ISuccessResponse, QueryKeys, storage } from "../utils";

export const useUserProfile = () =>
  useMutation(getMe, {
    mutationKey: [QueryKeys.user],
  });

export const useUpdateUserProfile = () => {
  const dispatch = useAuthDispatch();
  const dispatchGlobal = useGlobalDispatch();
  return useMutation(updateMe, {
    onSuccess: () => {
      dispatch(setAuthState({ user: null }));
      dispatchGlobal(updateSnackBar({
        message: 'User updated successfully',
        type: "success",
        open: true,
      }));
    },
  });
};

export const useCreateAddress = () => {
  const queryClient = useQueryClient();
  const dispatch = useGlobalDispatch();
  return useMutation(createAddress, {
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKeys.addresses);
      dispatch(updateSnackBar({
        message: 'Address created successfully',
        type: "success",
        open: true,
      }));
    },
    onError: (error) => {
      dispatch(updateSnackBar({
        message: error['message'] || 'Failed to create address',
        type: "error",
        open: true,
      }));
    }
  });
};
export const useUpdateAddress = () => {
  const queryClient = useQueryClient();
  const dispatch = useGlobalDispatch();

  return useMutation(updateAddress, {
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKeys.addresses);
      dispatch(updateSnackBar({
        message: 'Address created successfully',
        type: "success",
        open: true,
      }));
    },
    onError: (error) => {
      dispatch(updateSnackBar({
        message: error['message'] || 'Failed to create address',
        type: "error",
        open: true,
      }));
    }
  });
};
export const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  const dispatch = useGlobalDispatch();

  return useMutation(deleteAddress, {
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKeys.addresses);
      dispatch(updateSnackBar({
        message: 'Address deleted successfully',
        type: "success",
        open: true,
      }));
    },
    onError: (error) => {
      dispatch(updateSnackBar({
        message: error['message'] || 'Failed to delete address',
        type: "error",
        open: true,
      }));
    }
  });
};

export const useAddresses = (filters = {}, {
  onSuccess,
}) => {
  return useInfiniteQuery<ISuccessResponse<DataT>, IErrorResponse<DataT>>(
    [QueryKeys.addresses, filters],
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
      onSuccess,
    }
  );
};

export const useOrders = (filters = {}) => {
  return useInfiniteQuery<ISuccessResponse<DataT>, IErrorResponse<DataT>>(
    [QueryKeys.orders, filters],
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
      queryClient.invalidateQueries(QueryKeys.orders);
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
      queryClient.invalidateQueries(QueryKeys.orders);
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

export const useCreateSupportTicket = () => {
  const queryClient = useQueryClient();
  const dispatch = useGlobalDispatch();
  return useMutation(createSupportTicket, {
    onSuccess: () => {
      dispatch(updateSnackBar({
        message:'Support ticket created',
        type: "success",
        open: true,
      }));
    },
    onError: (error) => {
      dispatch(updateSnackBar({
        message: error['message'] || 'Failed to create support ticket',
        type: "error",
        open: true,
      }));
    }
  });
};
