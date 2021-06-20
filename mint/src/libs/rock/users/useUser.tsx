import { useInfiniteQuery, useMutation, useQuery, useQueryClient, UseQueryOptions } from "react-query";
import { createAddress, deleteAddress, getAddreses, getMe, updateAddress, updateMe, UserProfile } from "../api/user";
import { useAuthDispatch, setAuthState, logout } from "../auth";
import { DataT, IErrorResponse, ISuccessResponse, storage } from "../utils";

export const useUserProfile = () => useMutation(getMe, {
  mutationKey: ["user"],
});

export const useUpdateUserProfile = () => {
  const dispatch = useAuthDispatch();
  return useMutation(updateMe, {
    onSuccess: () => {
      dispatch(setAuthState({user: null}));
    }
  })
};

export const useCreateAddress = () => {
  const queryClient = useQueryClient();
  return useMutation(createAddress, {
    onSuccess: () => {
      queryClient.invalidateQueries('ADDRESSES');
    }
  })
};
export const useUpdateAddress = () => {
  const queryClient = useQueryClient();
  return useMutation(updateAddress, {
    onSuccess: () => {
      queryClient.invalidateQueries('ADDRESSES');
    }
  })
};
export const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteAddress, {
    onSuccess: () => {
      queryClient.invalidateQueries('ADDRESSES');
    }
  })
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
      onSuccess: () => {

      },
    }
  );
  }
