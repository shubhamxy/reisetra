import { useMutation } from 'react-query'
import { login, logout, useAuthDispatch } from '.'
import {
    refreshAuthToken,
    loginEmailForgotPassword,
    oauthGoogleVerify,
    loginEmail,
    signupEmail,
    loginEmailResetPassword,
} from '../api/auth'
import { updateSnackBar, useGlobalDispatch } from '../global'

export const useRefreshAuth = () => {
    const dispatch = useGlobalDispatch()
    const authDispatch = useAuthDispatch()
    return useMutation(refreshAuthToken, {
        onSuccess: ({ data }) => {
            if (!data.admin) {
                dispatch(
                    updateSnackBar({
                        message: 'Please login with an admin account.',
                        type: 'error',
                        open: true,
                    })
                )
                authDispatch(logout())
                return
            }
            dispatch(
                updateSnackBar({
                    message: 'Auth refreshed Successfully',
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
export const useVerifyGoogleLogin = () => {
    const dispatch = useGlobalDispatch()
    const authDispatch = useAuthDispatch()
    return useMutation(oauthGoogleVerify, {
        onSuccess: ({ data }) => {
            if (!data.admin) {
                dispatch(
                    updateSnackBar({
                        message: 'Please login with an admin account.',
                        type: 'error',
                        open: true,
                    })
                )
                authDispatch(logout())
                return
            }
            dispatch(
                updateSnackBar({
                    message: 'Google verification success',
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
export const useUserEmailLogin = () => {
    const dispatch = useGlobalDispatch()
    const authDispatch = useAuthDispatch()
    return useMutation(loginEmail, {
        onSuccess: ({ data }) => {
            if (!data.admin) {
                dispatch(
                    updateSnackBar({
                        message: 'Please login with an admin account.',
                        type: 'error',
                        open: true,
                    })
                )
                authDispatch(logout())
                return
            }
            dispatch(
                updateSnackBar({
                    message: 'Logged In Successfully',
                    type: 'success',
                    open: true,
                })
            )
            authDispatch(
                login({
                    access_token: data.access_token,
                    refresh_token: data.refresh_token,
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
export const useUserEmailForgotPassword = () => {
    const dispatch = useGlobalDispatch()
    return useMutation(loginEmailForgotPassword, {
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
export const useUserEmailResetPassword = () => {
    const dispatch = useGlobalDispatch()
    return useMutation(loginEmailResetPassword, {
        onSuccess: () => {
            dispatch(
                updateSnackBar({
                    message: 'Password Reset Successfull',
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

export const useUserEmailSignUp = () => {
    const dispatch = useGlobalDispatch()
    return useMutation(signupEmail, {
        onSuccess: ({ data }) => {
            dispatch(
                updateSnackBar({
                    message: 'Email Signup Success',
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
