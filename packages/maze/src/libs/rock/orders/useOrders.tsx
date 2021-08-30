import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
} from 'react-query'
import {
    cancelOrder,
    getOrderInvoice,
    getOrders,
    updateOrder,
} from '../api/order'
import { getOrder } from '../api/order'

import { updateSnackBar, useGlobalDispatch } from '../global'
import { DataT, IErrorResponse, ISuccessResponse, QueryKeys } from '../utils'

export const useOrder = (id: string, { enabled, onSuccess }) =>
    useQuery([QueryKeys.order, id], getOrder, {
        enabled: !!id && enabled,
        onSuccess,
    })

export const useOrderInvoice = () => {
    const queryClient = useQueryClient()
    const dispatch = useGlobalDispatch()
    return useMutation(getOrderInvoice, {
        onSuccess: () => {
            dispatch(
                updateSnackBar({
                    message: 'Order Invoice requested successfully',
                    type: 'success',
                    open: true,
                })
            )
        },
        onError: (error) => {
            dispatch(
                updateSnackBar({
                    message:
                        error['message'] ||
                        'Order Invoice request unsuccessfull',
                    type: 'error',
                    open: true,
                })
            )
        },
    })
}

export const useOrders = (filters = {}) => {
    return useInfiniteQuery<ISuccessResponse<DataT>, IErrorResponse<DataT>>(
        [QueryKeys.orders, filters],
        ({ queryKey, pageParam = undefined }) =>
            getOrders({
                buttonNum: '4',
                size: '4',
                ...filters,
                cursor: pageParam,
            }),
        {
            getNextPageParam: (lastPage, _pages) => {
                return lastPage.meta.link?.next?.cursor
            },
            onSuccess: () => {},
        }
    )
}

export const useCancelOrder = () => {
    const queryClient = useQueryClient()
    const dispatch = useGlobalDispatch()
    return useMutation(cancelOrder, {
        onSuccess: () => {
            queryClient.invalidateQueries(QueryKeys.orders)
            queryClient.invalidateQueries(QueryKeys.order)
            dispatch(
                updateSnackBar({
                    message: 'Order cancellation requested successfully',
                    type: 'success',
                    open: true,
                })
            )
        },
        onError: (error) => {
            dispatch(
                updateSnackBar({
                    message:
                        error['message'] ||
                        'Order cancellation request unsuccessfull',
                    type: 'error',
                    open: true,
                })
            )
        },
    })
}

export const useUpdateOrder = () => {
    const queryClient = useQueryClient()
    const dispatch = useGlobalDispatch()
    return useMutation(updateOrder, {
        onSuccess: () => {
            queryClient.invalidateQueries(QueryKeys.orders)
            queryClient.invalidateQueries(QueryKeys.order)
            dispatch(
                updateSnackBar({
                    message: 'Order update requested successfully',
                    type: 'success',
                    open: true,
                })
            )
        },
        onError: (error) => {
            dispatch(
                updateSnackBar({
                    message:
                        error['message'] ||
                        'Order update request unsuccessfull',
                    type: 'error',
                    open: true,
                })
            )
        },
    })
}
