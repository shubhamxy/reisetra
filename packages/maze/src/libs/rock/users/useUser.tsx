import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
    UseQueryOptions,
} from 'react-query'
import {
    createAddress,
    deleteAddress,
    getAddreses,
    getMe,
    updateAddress,
    updateMe,
} from '../api/user'
import { useAuthDispatch, setAuthState, logout } from '../auth'
import { updateSnackBar, useGlobalDispatch } from '../global'
import {
    DataT,
    IErrorResponse,
    ISuccessResponse,
    QueryKeys,
    storage,
} from '../utils'

export const useUserProfile = () =>
    useMutation(getMe, {
        mutationKey: [QueryKeys.user],
    })

export const useUpdateUserProfile = () => {
    const dispatch = useAuthDispatch()
    const dispatchGlobal = useGlobalDispatch()
    return useMutation(updateMe, {
        onSuccess: () => {
            dispatch(setAuthState({ user: null }))
            dispatchGlobal(
                updateSnackBar({
                    message: 'User updated successfully',
                    type: 'success',
                    open: true,
                })
            )
        },
    })
}

export const useCreateAddress = () => {
    const queryClient = useQueryClient()
    const dispatch = useGlobalDispatch()
    return useMutation(createAddress, {
        onSuccess: () => {
            queryClient.invalidateQueries(QueryKeys.addresses)
            dispatch(
                updateSnackBar({
                    message: 'Address created successfully',
                    type: 'success',
                    open: true,
                })
            )
        },
        onError: (error) => {
            dispatch(
                updateSnackBar({
                    message: error['message'] || 'Failed to create address',
                    type: 'error',
                    open: true,
                })
            )
        },
    })
}
export const useUpdateAddress = () => {
    const queryClient = useQueryClient()
    const dispatch = useGlobalDispatch()

    return useMutation(updateAddress, {
        onSuccess: () => {
            queryClient.invalidateQueries(QueryKeys.addresses)
            dispatch(
                updateSnackBar({
                    message: 'Address created successfully',
                    type: 'success',
                    open: true,
                })
            )
        },
        onError: (error) => {
            dispatch(
                updateSnackBar({
                    message: error['message'] || 'Failed to create address',
                    type: 'error',
                    open: true,
                })
            )
        },
    })
}
export const useDeleteAddress = () => {
    const queryClient = useQueryClient()
    const dispatch = useGlobalDispatch()

    return useMutation(deleteAddress, {
        onSuccess: () => {
            queryClient.invalidateQueries(QueryKeys.addresses)
            dispatch(
                updateSnackBar({
                    message: 'Address deleted successfully',
                    type: 'success',
                    open: true,
                })
            )
        },
        onError: (error) => {
            dispatch(
                updateSnackBar({
                    message: error['message'] || 'Failed to delete address',
                    type: 'error',
                    open: true,
                })
            )
        },
    })
}

export const useAddresses = (filters = {}, { onSuccess }) => {
    return useInfiniteQuery<ISuccessResponse<DataT>, IErrorResponse<DataT>>(
        [QueryKeys.addresses, filters],
        ({ queryKey, pageParam = undefined }) =>
            getAddreses({
                ...filters,
                buttonNum: '4',
                size: '4',
                cursor: pageParam,
            }),
        {
            getNextPageParam: (lastPage, _pages) => {
                return lastPage.meta.link?.next?.cursor
            },
            onSuccess,
        }
    )
}
