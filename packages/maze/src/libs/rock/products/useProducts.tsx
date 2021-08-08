import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "react-query";
import {
  createBrand,
  createCategory,
  createOffer,
  createProduct,
  createReview,
  createTag,
  deleteProduct,
  deleteReview,
  getBrands,
  getCategories,
  getProduct,
  getProducts,
  getReviews,
  getTags,
  updateProduct,
  updateReview,
} from "../api/product";
import { updateSnackBar, useGlobalDispatch } from "../global";
import { DataT, IErrorResponse, ISuccessResponse, QueryKeys } from "../utils";

export const useCreateProduct = () => {
  const globalDispatch = useGlobalDispatch();
  const queryClient = useQueryClient();
  return useMutation(createProduct, {
    onSuccess: () => {
      updateSnackBar({
        message:"Product added sucessfully",
        type: "info",
        open: true,
      })
      queryClient.invalidateQueries(QueryKeys.products)
    },
    onError: (error) => {
      globalDispatch(
        updateSnackBar({
          message: error["message"] || "Server Error",
          type: "error",
          open: true,
        })
      );
    },
  })
};
export const useProduct = (id: string) =>
  useQuery([QueryKeys.product, id], getProduct, {
    enabled: !!id,
    onSuccess: () => {},
  });

export const useUpdateProduct = () => useMutation(updateProduct);
export const useDeleteProduct = () => {
  const globalDispatch = useGlobalDispatch();
  const queryClient = useQueryClient();
  return useMutation(deleteProduct, {
    onSuccess: () => {
      updateSnackBar({
        message:"Product deleted sucessfully",
        type: "info",
        open: true,
      })
      queryClient.invalidateQueries(QueryKeys.products)
    },
    onError: (error) => {
      globalDispatch(
        updateSnackBar({
          message: error["message"] || "Server Error",
          type: "error",
          open: true,
        })
      );
    },
  })
};
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

export const useTags = (params = {}) =>
  useQuery([QueryKeys.tags, params], getTags, {
    onSuccess: () => {},
  });

  export const useBrands = (params = {}) =>
  useQuery([QueryKeys.brands, params], getBrands, {
    onSuccess: () => {},

  });

export const useCategories = (params = {}) =>
  useQuery([QueryKeys.categories, params], getCategories, {
    onSuccess: () => {},
  });

export const useCreateCategory = () => useMutation(createCategory);
export const useCreateBrand = () => useMutation(createBrand);
export const useCreateTag = () => useMutation(createTag);
export const useCreateOffer = () => useMutation(createOffer);

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

export const useCreateReview = () => {
  const globalDispatch = useGlobalDispatch();
  const queryClient = useQueryClient();
  return useMutation(createReview, {
    onSuccess: () => {
      queryClient.invalidateQueries("reviews")
    },
    onError: (error) => {
      globalDispatch(
        updateSnackBar({
          message: error["message"] || "Server Error",
          type: "error",
          open: true,
        })
      );
    },
  });
};

export const useUpdateReview = () => {
  const globalDispatch = useGlobalDispatch();
  const queryClient = useQueryClient();
  return useMutation(updateReview, {
    onSuccess: () => {
      queryClient.invalidateQueries("reviews")
    },
    onError: (error) => {
      globalDispatch(
        updateSnackBar({
          message: error["message"] || "Server Error",
          type: "error",
          open: true,
        })
      );
    },
  });
};

export const useDeleteReview = () => {
  const globalDispatch = useGlobalDispatch();
  const queryClient = useQueryClient();
  return useMutation(deleteReview, {
    onSuccess: () => {
      queryClient.invalidateQueries("reviews")
    },
    onError: (error) => {
      globalDispatch(
        updateSnackBar({
          message: error["message"] || "Server Error",
          type: "error",
          open: true,
        })
      );
    },
  });
};

export const useStories = (filters = {}, enabled = true) =>
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
