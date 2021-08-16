import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
} from 'react-query'
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
    getFiles,
    getOffers,
    getProduct,
    getProducts,
    getReviews,
    getTags,
    updateCategory,
    updateProduct,
    updateReview,
} from '../api/product'
import { updateSnackBar, useGlobalDispatch } from '../global'
import { DataT, IErrorResponse, ISuccessResponse, QueryKeys } from '../utils'

export const useCreateProduct = () => {
    const globalDispatch = useGlobalDispatch()
    const queryClient = useQueryClient()
    return useMutation(createProduct, {
        onSuccess: () => {
            updateSnackBar({
                message: 'Product added sucessfully',
                type: 'info',
                open: true,
            })
            queryClient.invalidateQueries(QueryKeys.products)
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
export const useProduct = (id: string) =>
    useQuery([QueryKeys.product, id], getProduct, {
        enabled: !!id,
        onSuccess: () => { },
    })

export const useUpdateProduct = () => useMutation(updateProduct)
export const useDeleteProduct = () => {
    const globalDispatch = useGlobalDispatch()
    const queryClient = useQueryClient()
    return useMutation(deleteProduct, {
        onSuccess: () => {
            updateSnackBar({
                message: 'Product deleted sucessfully',
                type: 'info',
                open: true,
            })
            queryClient.invalidateQueries(QueryKeys.products)
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
export const useProducts = (filters = {}, enabled = true) =>
    useInfiniteQuery<ISuccessResponse<DataT>, IErrorResponse<DataT>>(
        [QueryKeys.products, filters],
        ({ queryKey, pageParam = undefined }) =>
            getProducts({
                ...filters,
                buttonNum: '4',
                size: '10',
                cursor: pageParam,
            }),
        {
            enabled,
            getNextPageParam: (lastPage, _pages) => {
                return lastPage.meta.link?.next?.cursor
            },
        }
    )

export const useTags = (params = {}) =>
    useInfiniteQuery<ISuccessResponse<DataT>, IErrorResponse<DataT>>(
        [QueryKeys.tags, params],
        ({ queryKey, pageParam = undefined }) =>
            getTags({
                params: {
                    buttonNum: '4',
                    size: '10',
                    cursor: pageParam,
                },
            }),
        {
            enabled: true,
            getNextPageParam: (lastPage, _pages) => {
                return lastPage?.meta?.link?.next?.cursor
            },
            onSuccess: () => { },
        }
    )

export const useBrands = (params = {}) =>
    useInfiniteQuery<ISuccessResponse<DataT>, IErrorResponse<DataT>>(
        [QueryKeys.brands, params],
        ({ queryKey, pageParam = undefined }) =>
            getBrands({
                params: {
                    buttonNum: '4',
                    size: '10',
                    cursor: pageParam,
                },
            }),
        {
            enabled: true,
            getNextPageParam: (lastPage, _pages) => {
                return lastPage?.meta?.link?.next?.cursor
            },
            onSuccess: () => { },
        }
    )

export const useCategories = (params = {}) =>
    useInfiniteQuery<ISuccessResponse<DataT>, IErrorResponse<DataT>>(
        [QueryKeys.categories, params],
        ({ queryKey, pageParam = undefined }) =>
            getCategories({
                params: {
                    buttonNum: '4',
                    size: '10',
                    cursor: pageParam,
                },
            }),
        {
            enabled: true,
            getNextPageParam: (lastPage, _pages) => {
                return lastPage?.meta?.link?.next?.cursor
            },
            onSuccess: () => { },
        }
    )

export const useOffers = (params = {}) =>
    useInfiniteQuery<ISuccessResponse<DataT>, IErrorResponse<DataT>>(
        [QueryKeys.offers, params],
        ({ queryKey, pageParam = undefined }) =>
            getOffers({
                params: {
                    buttonNum: '4',
                    size: '10',
                    cursor: pageParam,
                },
            }),
        {
            enabled: true,
            getNextPageParam: (lastPage, _pages) => {
                return lastPage?.meta?.link?.next?.cursor
            },
            onSuccess: () => { },
            select: (data) => {
                if (!Array.isArray(data.pages[0].data)) {
                    data.pages[0].data = [data.pages[0].data]
                }
                return data
            },
        }
    )

export const useCreateCategory = () => useMutation(createCategory)
export const useUpdateCategory = () => useMutation(updateCategory)
export const useCreateBrand = () => useMutation(createBrand)
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
            onSuccess: () => { },
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

export const useFiles = (params = {}) =>
    useInfiniteQuery<ISuccessResponse<DataT>, IErrorResponse<DataT>>(
        [QueryKeys.files, params],
        ({ queryKey, pageParam = undefined }) =>
            getFiles({
                params: {
                    buttonNum: 4,
                    size: 10,
                    cursor: pageParam,
                },
            }),
        {
            enabled: true,
            getNextPageParam: (lastPage, _pages) => {
                return lastPage.meta.link?.next?.cursor;
            },
            onSuccess: () => { },
        }
    )
