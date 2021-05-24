import { useInfiniteQuery, useMutation } from "react-query";
import { createProduct, getProducts } from "../api/product";
import { DataT, IErrorResponse, ISuccessResponse } from "../utils";

export const useCreateProduct = () => useMutation(createProduct);
export const useProduct = () => useMutation(createProduct);
export const useUpdateProduct = () => useMutation(createProduct);
export const useDeleteProduct = () => useMutation(createProduct);
export const useProducts = () =>
  useInfiniteQuery<ISuccessResponse<DataT>, IErrorResponse<DataT>>(
    ["PRODUCTS"],
    ({ queryKey, pageParam = undefined }) =>
      getProducts({
        buttonNum: "4",
        size: "10",
        cursor: pageParam,
      }),
    {
      getNextPageParam: (lastPage, _pages) => {
        return lastPage.meta.link?.next?.cursor;
      },
      onSuccess: () => {},
    }
  );
