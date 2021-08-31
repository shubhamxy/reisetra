import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
} from 'react-query'
import { cancelOrder, getOrder, getOrders } from '../api'

import { updateSnackBar, useGlobalDispatch } from '../global'
import { DataT, IErrorResponse, ISuccessResponse, QueryKeys } from '../utils'

export const useOrder = (id: string, { enabled, onSuccess }) =>
    useQuery([QueryKeys.orders, id], getOrder, {
        enabled: !!id && enabled,
        onSuccess,
    })

export const useOrders = (filters = {}) => {
    return useInfiniteQuery<ISuccessResponse<DataT>, IErrorResponse<DataT>>(
        [QueryKeys.orders, filters],
        ({ queryKey, pageParam = undefined }) =>
            getOrders({
                buttonNum: '4',
                size: '10',
                ...filters,
                cursor: pageParam,
            }),
        {
            getNextPageParam: (lastPage, _pages) => {
                return lastPage.meta.link?.next?.cursor
            },
        }
    )
}

export const useCancelOrder = () => {
    const queryClient = useQueryClient()
    const dispatch = useGlobalDispatch()
    return useMutation(cancelOrder, {
        onSuccess: () => {
            queryClient.invalidateQueries(QueryKeys.orders)
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
