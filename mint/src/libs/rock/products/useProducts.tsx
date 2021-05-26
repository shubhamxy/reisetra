import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import { createProduct, getProduct, getProducts } from "../api/product";
import { DataT, IErrorResponse, ISuccessResponse } from "../utils";

export const useCreateProduct = () => useMutation(createProduct);
export const useProduct = (id: string) => useQuery(["product", id], getProduct, {
  enabled: !!id,
  onSuccess: () => {

  },
});
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
