import { useMutation } from 'react-query'
import {
    emailResendVerification,
    refreshAuthToken,
    userPasswordUpdate,
} from '../api'
import { updateSnackBar, useGlobalDispatch } from '../global'
import { analytics } from '../utils'

export const useRefreshAuth = () => {
    const dispatch = useGlobalDispatch()
    return useMutation(refreshAuthToken, {
        onSuccess: () => {
            dispatch(
                updateSnackBar({
                    message: 'Authentication Successfull',
                    type: 'success',
                    open: true,
                })
            )
            analytics.login()
        },
        onError: (error) => {
            console.error(error['message'] || 'Server Error')
            dispatch(
                updateSnackBar({
                    message: 'Authentication Failed',
                    type: 'error',
                    open: true,
                })
            )
        },
    })
}
export const useUserEmailResendVerification = () => {
    const dispatch = useGlobalDispatch()
    return useMutation(emailResendVerification, {
        onSuccess: () => {
            dispatch(
                updateSnackBar({
                    message: 'Success',
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

export const useUserPasswordUpdate = () => {
    const dispatch = useGlobalDispatch()
    return useMutation(userPasswordUpdate, {
        onSuccess: () => {
            dispatch(
                updateSnackBar({
                    message: 'Success',
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
