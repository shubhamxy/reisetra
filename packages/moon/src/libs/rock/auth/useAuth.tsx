/* eslint-disable dot-notation */
import { useMutation } from 'react-query'
import { login, useAuthDispatch } from '.'
import {
    refreshAuthToken,
    loginEmailForgotPassword,
    oauthGoogleVerify,
    loginEmail,
    signupEmail,
    loginEmailResetPassword,
    emailResendVerification,
    userPasswordUpdate,
    loginPhone,
    sendOTP,
} from '../api/auth'
import { updateSnackBar, useGlobalDispatch } from '../global'
import { analytics } from '../utils'

export const useRefreshAuth = () => {
    const dispatch = useGlobalDispatch()
    return useMutation(refreshAuthToken, {
        onSuccess: () => {
            dispatch(
                updateSnackBar({
                    message: 'Auth refreshed Successfully',
                    type: 'success',
                    open: true,
                })
            )
            analytics.login()
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
    return useMutation(oauthGoogleVerify, {
        onSuccess: () => {
            dispatch(
                updateSnackBar({
                    message: 'Google verification success',
                    type: 'success',
                    open: true,
                })
            )
            analytics.login()
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
            analytics.login()
        },
        onError: (error) => {
            console.log(error)
            dispatch(
                updateSnackBar({
                    message:
                        (error['errors'] && error['errors'][0]['message']) ||
                        error['message'] ||
                        'Server Error',
                    type: 'error',
                    open: true,
                })
            )
        },
    })
}

export const useUserPhoneLogin = () => {
    const dispatch = useGlobalDispatch()
    const authDispatch = useAuthDispatch()
    return useMutation(loginPhone, {
        onSuccess: ({ data }) => {
            console.log(data)
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
            analytics.login()
        },
        onError: (error) => {
            dispatch(
                updateSnackBar({
                    message:
                        (error['errors'] && error['errors'][0]['message']) ||
                        error['message'] ||
                        'Server Error',
                    type: 'error',
                    open: true,
                })
            )
        },
    })
}

export const useSendPhoneOTP = () => {
    const dispatch = useGlobalDispatch()
    return useMutation(sendOTP, {
        onSuccess: ({ data }) => {},
        onError: (error) => {
            dispatch(
                updateSnackBar({
                    message:
                        (error['errors'] &&
                            error['errors'].length > 0 &&
                            error['errors'][0]['message']) ||
                        error['message'] ||
                        'Server Error',
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
            analytics.login()
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
        onSuccess: () => {
            dispatch(
                updateSnackBar({
                    message: 'Email Signup Success',
                    type: 'success',
                    open: true,
                })
            )
            analytics.login()
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
