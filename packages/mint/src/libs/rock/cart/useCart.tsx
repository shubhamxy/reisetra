import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
    addCartItem,
    removeCartItem,
    getCart,
    getCartItem,
    cartCheckout,
} from '../api/cart'
import { updateSnackBar, useGlobalDispatch } from '../global'
import { DataT, IErrorResponse, ISuccessResponse, QueryKeys } from '../utils'

export const useAddCartItem = () => {
    const dispatch = useGlobalDispatch()
    const queryClient = useQueryClient()
    return useMutation(addCartItem, {
        onSuccess: () => {
            queryClient.invalidateQueries(QueryKeys.cart)
            dispatch(
                updateSnackBar({
                    message: 'Product added to cart successfully',
                    type: 'success',
                    open: true,
                })
            )
        },
        onError: (error) => {
            dispatch(
                updateSnackBar({
                    message: error['message'] || 'Server Error',
                    type: 'error',
                    open: true,
                })
            )
        },
    })
}

export const useDeleteCartItem = () => {
    const dispatch = useGlobalDispatch()
    const queryClient = useQueryClient()
    return useMutation(removeCartItem, {
        onSuccess: () => {
            queryClient.invalidateQueries(QueryKeys.cart)
        },
        onError: (error) => {
            dispatch(
                updateSnackBar({
                    message: error['message'] || 'Server Error',
                    type: 'error',
                    open: true,
                })
            )
        },
    })
}

export const useCartItem = (cartId: string, productId: string) => {
    const dispatch = useGlobalDispatch()
    return useQuery([QueryKeys.cart, cartId, productId], getCartItem, {
        enabled: !!(cartId && productId),
        onSuccess: () => {},
        onError: (error) => {
            dispatch(
                updateSnackBar({
                    message: error['message'] || 'Server Error',
                    type: 'error',
                    open: true,
                })
            )
        },
    })
}

export const useCartItems = (cartId: string, promo: string) => {
    const dispatch = useGlobalDispatch()
    return useQuery<ISuccessResponse<DataT>, IErrorResponse<DataT>>(
        [QueryKeys.cart, { cartId, promo }],
        getCart,
        {
            initialData: {
                data: {
                    items: [],
                },
            },
            enabled: Boolean(cartId),
            getNextPageParam: (lastPage, _pages) => {
                return lastPage.meta.link?.next?.cursor
            },
            onSuccess: () => {},
            onError: (error) => {
                dispatch(
                    updateSnackBar({
                        message: error['message'] || 'Server Error',
                        type: 'error',
                        open: true,
                    })
                )
            },
        }
    )
}
export const useCartCheckout = () => {
    const dispatch = useGlobalDispatch()
    return useMutation(cartCheckout, {
        onSuccess: () => {},
        onError: (error) => {
            dispatch(
                updateSnackBar({
                    message: error['message'] || 'Server Error',
                    type: 'error',
                    open: true,
                })
            )
        },
    })
}
