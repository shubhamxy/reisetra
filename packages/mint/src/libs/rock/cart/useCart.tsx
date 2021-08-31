import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
    addCartItem,
    cartCheckout,
    getCart,
    removeCartItem,
} from '../api/carts'
import { updateSnackBar, useGlobalDispatch } from '../global'
import { DataT, IErrorResponse, ISuccessResponse, QueryKeys } from '../utils'

export const useAddCartItem = () => {
    const dispatch = useGlobalDispatch()
    const queryClient = useQueryClient()
    return useMutation(addCartItem, {
        onSuccess: () => {
            queryClient.invalidateQueries(QueryKeys.carts)
            dispatch(
                updateSnackBar({
                    message: 'Product added to carts successfully',
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
            queryClient.invalidateQueries(QueryKeys.carts)
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
export const useCartItems = (cartId: string, promo: string) => {
    const dispatch = useGlobalDispatch()
    return useQuery<ISuccessResponse<DataT>, IErrorResponse<DataT>>(
        [QueryKeys.carts, { cartId, promo }],
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
