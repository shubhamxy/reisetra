import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import {
  createProduct,
  getCategories,
  getProduct,
  getProducts,
  getReviews,
  getTags,
} from "../api/product";
import { DataT, IErrorResponse, ISuccessResponse } from "../utils";

export const useCreateProduct = () => useMutation(createProduct);
export const useProduct = (id: string) =>
  useQuery(["product", id], getProduct, {
    enabled: !!id,
    onSuccess: () => {},
  });

export const useUpdateProduct = () => useMutation(createProduct);
export const useDeleteProduct = () => useMutation(createProduct);
export const useProducts = (filters = {}) =>
  useInfiniteQuery<ISuccessResponse<DataT>, IErrorResponse<DataT>>(
    ["PRODUCTS", filters],
    ({ queryKey, pageParam = undefined }) =>
      getProducts({
        ...filters,
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

export const useReviews = (id: string) =>
  useInfiniteQuery<ISuccessResponse<DataT>, IErrorResponse<DataT>>(
    ["REVIEWS", id],
    ({ queryKey, pageParam = undefined }) =>
      getReviews({
        id,
        params: {
          buttonNum: "4",
          size: "10",
          cursor: pageParam,
        },
      }),
    {
      enabled: !!id,
      getNextPageParam: (lastPage, _pages) => {
        return lastPage.meta.link?.next?.cursor;
      },
      onSuccess: () => {},
    }
  );

export const useTags = () =>
  useQuery(["tags"], getTags, {
    onSuccess: () => {},
  });

export const useCategories = () =>
  useQuery(["categories"], getCategories, {
    onSuccess: () => {},
  });
