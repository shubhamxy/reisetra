import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import {
  createCategory,
  createOffer,
  createProduct,
  createTag,
  getCategories,
  getProduct,
  getProducts,
  getReviews,
  getTags,
  updateProduct,
} from "../api/product";
import { DataT, IErrorResponse, ISuccessResponse, QueryKeys } from "../utils";

export const useCreateProduct = () => useMutation(createProduct);
export const useProduct = (id: string) =>
  useQuery([QueryKeys.product, id], getProduct, {
    enabled: !!id,
    onSuccess: () => {},
  });

export const useUpdateProduct = () => useMutation(updateProduct);
export const useDeleteProduct = () => useMutation(createProduct);
export const useProducts = (filters = {}, enabled = true) =>
  useInfiniteQuery<ISuccessResponse<DataT>, IErrorResponse<DataT>>(
    [QueryKeys.products, filters],
    ({ queryKey, pageParam = undefined }) =>
      getProducts({
        ...filters,
        buttonNum: "4",
        size: "10",
        cursor: pageParam,
      }),
    {
      enabled,
      getNextPageParam: (lastPage, _pages) => {
        return lastPage.meta.link?.next?.cursor;
      },
    }
  );

export const useReviews = (id: string) =>
  useInfiniteQuery<ISuccessResponse<DataT>, IErrorResponse<DataT>>(
    [QueryKeys.reviews, id],
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

export const useTags = (params = {}) =>
  useQuery([QueryKeys.tags, params], getTags, {
    onSuccess: () => {},
  });

export const useCategories = (params = {}) =>
  useQuery([QueryKeys.categories, params], getCategories, {
    onSuccess: () => {},
  });

export const useCreateCategory = () => useMutation(createCategory);
export const useCreateTag = () => useMutation(createTag);
export const useCreateOffer = () => useMutation(createOffer);

