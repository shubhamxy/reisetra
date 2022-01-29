import { useMutation, useQueryClient } from 'react-query'
import { QueryKeys } from '..'
import { updateTransaction } from '../api/transaction'
import { setAuthState, useAuthDispatch } from '../auth'
import { updateSnackBar, useGlobalDispatch } from '../global'

export const useUpdateTransaction = () => {
    const queryClient = useQueryClient()
    const dispatch = useAuthDispatch()
    const globalDispatch = useGlobalDispatch()
    return useMutation(updateTransaction, {
        onSuccess: () => {
            dispatch(setAuthState({ user: null }))
            queryClient.invalidateQueries(QueryKeys.cart)
            queryClient.invalidateQueries(QueryKeys.orders)
            globalDispatch(
                updateSnackBar({
                    message: 'Transaction Success',
                    type: 'success',
                    open: true,
                })
            )
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
