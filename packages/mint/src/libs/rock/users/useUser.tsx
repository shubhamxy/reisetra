import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query'
import {
    createAddress,
    createSupportTicket,
    deleteAddress,
    getAddresses,
    getCountries,
    getLocalities,
    getMe,
    getStates,
    updateAddress,
    updateMe,
} from '../api'
import { setAuthState, useAuthDispatch } from '../auth'
import { updateSnackBar, useGlobalDispatch } from '../global'
import { DataT, IErrorResponse, ISuccessResponse, QueryKeys } from '../utils'

export const useUserProfile = () =>
    useMutation(getMe, {
        mutationKey: [QueryKeys.users],
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
            getAddresses({
                ...filters,
                buttonNum: '4',
                size: '400',
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

export const useLocalities = (filters = {}) => {
    return useInfiniteQuery<ISuccessResponse<DataT>, IErrorResponse<DataT>>(
        [QueryKeys.localities, filters],
        ({ queryKey, pageParam = undefined }) =>
            getLocalities({
                ...filters,
                cursor: pageParam,
            }),
        {
            enabled:
                !!filters?.['name'] ||
                !!(filters['countryCode'] && filters['stateCode']),
            getNextPageParam: (lastPage, _pages) => {
                return lastPage.meta.link?.next?.cursor
            },
        }
    )
}

export const useStates = (filters = {}) => {
    return useInfiniteQuery<ISuccessResponse<DataT>, IErrorResponse<DataT>>(
        [QueryKeys.states, filters],
        ({ queryKey, pageParam = undefined }) =>
            getStates({
                ...filters,
                cursor: pageParam,
            }),
        {
            enabled: !!filters?.['name'] || !!filters?.['countryCode'],
            getNextPageParam: (lastPage, _pages) => {
                return lastPage.meta.link?.next?.cursor
            },
        }
    )
}

export const useCountries = (filters = {}) => {
    return useInfiniteQuery<ISuccessResponse<DataT>, IErrorResponse<DataT>>(
        [QueryKeys.countries, filters],
        ({ queryKey, pageParam = undefined }) =>
            getCountries({
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

export const useCreateSupportTicket = () => {
    const dispatch = useGlobalDispatch()
    return useMutation(createSupportTicket, {
        onSuccess: () => {
            dispatch(
                updateSnackBar({
                    message: 'Support ticket created',
                    type: 'success',
                    open: true,
                })
            )
        },
        onError: (error) => {
            dispatch(
                updateSnackBar({
                    message:
                        error['message'] || 'Failed to create support ticket',
                    type: 'error',
                    open: true,
                })
            )
        },
    })
}
