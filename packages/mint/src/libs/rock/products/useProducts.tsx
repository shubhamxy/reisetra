import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
} from 'react-query'
import {
    createCategory,
    createOffer,
    createProduct,
    createReview,
    createTag,
    deleteReview,
    getBrands,
    getCategories,
    getProduct,
    getProducts,
    getRecommendations,
    getReviews,
    getTags,
    updateProduct,
    updateReview,
} from '../api/product'
import { updateSnackBar, useGlobalDispatch } from '../global'
import { DataT, IErrorResponse, ISuccessResponse, QueryKeys } from '../utils'

export const useCreateProduct = () => useMutation(createProduct)
export const useProduct = (id: string) =>
    useQuery([QueryKeys.product, id], getProduct, {
        enabled: !!id,
        onSuccess: () => {},
    })

export const useProductMutation = () => useMutation(getProduct)

export const useUpdateProduct = () => useMutation(updateProduct)
export const useDeleteProduct = () => useMutation(createProduct)
export const useProducts = (filters = {}, enabled = true) =>
    useInfiniteQuery<ISuccessResponse<DataT>, IErrorResponse<DataT>>(
        [QueryKeys.products, filters],
        ({ queryKey, pageParam = undefined }) =>
            getProducts({
                buttonNum: '4',
                size: '10',
                cursor: pageParam,
                ...filters,
            }),
        {
            enabled,
            getNextPageParam: (lastPage, _pages) => {
                return lastPage.meta.link?.next?.cursor
            },
        }
    )

export const useRecommendations = (filters = {}, enabled = true) =>
    useInfiniteQuery<ISuccessResponse<DataT>, IErrorResponse<DataT>>(
        [QueryKeys.recommendations, filters],
        ({ queryKey, pageParam = undefined }) =>
            getRecommendations({
                buttonNum: '4',
                size: '10',
                cursor: pageParam,
                ...filters,
            }),
        {
            enabled,
            getNextPageParam: (lastPage, _pages) => {
                return lastPage.meta.link?.next?.cursor
            },
        }
    )

export const useTags = (params = {}) =>
    useQuery([QueryKeys.tags, params], getTags, {
        onSuccess: () => {},
    })

export const useBrands = (params = {}) =>
    useQuery([QueryKeys.brands, params], getBrands, {
        onSuccess: () => {},
    })

export const useCategories = (params = {}) =>
    useQuery([QueryKeys.categories, params], getCategories, {
        onSuccess: () => {},
    })

export const useCreateCategory = () => useMutation(createCategory)
export const useCreateTag = () => useMutation(createTag)
export const useCreateOffer = () => useMutation(createOffer)

export const useReviews = (id: string) =>
    useInfiniteQuery<ISuccessResponse<DataT>, IErrorResponse<DataT>>(
        [QueryKeys.reviews, id],
        ({ queryKey, pageParam = undefined }) =>
            getReviews({
                id,
                params: {
                    buttonNum: '4',
                    size: '10',
                    cursor: pageParam,
                },
            }),
        {
            enabled: !!id,
            getNextPageParam: (lastPage, _pages) => {
                return lastPage.meta.link?.next?.cursor
            },
            onSuccess: () => {},
        }
    )

export const useCreateReview = () => {
    const globalDispatch = useGlobalDispatch()
    const queryClient = useQueryClient()
    return useMutation(createReview, {
        onSuccess: () => {
            queryClient.invalidateQueries('reviews')
        },
        onError: (error) => {
            globalDispatch(
                updateSnackBar({
                    message: error['message'] || 'Server Error',
                    type: 'error',
                    open: true,
                })
            )
        },
    })
}

export const useUpdateReview = () => {
    const globalDispatch = useGlobalDispatch()
    const queryClient = useQueryClient()
    return useMutation(updateReview, {
        onSuccess: () => {
            queryClient.invalidateQueries('reviews')
        },
        onError: (error) => {
            globalDispatch(
                updateSnackBar({
                    message: error['message'] || 'Server Error',
                    type: 'error',
                    open: true,
                })
            )
        },
    })
}

export const useDeleteReview = () => {
    const globalDispatch = useGlobalDispatch()
    const queryClient = useQueryClient()
    return useMutation(deleteReview, {
        onSuccess: () => {
            queryClient.invalidateQueries('reviews')
        },
        onError: (error) => {
            globalDispatch(
                updateSnackBar({
                    message: error['message'] || 'Server Error',
                    type: 'error',
                    open: true,
                })
            )
        },
    })
}
