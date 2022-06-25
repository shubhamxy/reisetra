/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable camelcase */
import { useRouter } from 'next/router'
import qs from 'query-string'
import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { UserProfile } from '../api/user'
import { config } from '../config'
import { updateSnackBar, useGlobalDispatch } from '../global'

const AuthStateContext = createContext(null)
const AuthDispatchContext = createContext(null)

export function useAuthState() {
    const context = useContext(AuthStateContext)
    if (context === undefined) {
        throw new Error('useAuthState must be used within a AuthProvider')
    }
    return context
}

export function useAuthDispatch() {
    const context = useContext(AuthDispatchContext)
    if (context === undefined) {
        throw new Error('useAuthDispatch must be used within a AuthProvider')
    }
    return context
}

export interface State {
    isHydrated: boolean
    isAuthenticated: boolean
    user: Partial<UserProfile>
    access_token?: string
    refresh_token?: string
}

export const initialState = {
    isHydrated: false,
    isAuthenticated: false,
    user: null,
}

export enum ActionKind {
    login = 'login',
}

export type Action = {
    type: ActionKind
    payload?: any
}

type LoginPayload = { access_token?: string; refresh_token?: string }

export const login = (payload: LoginPayload): Action => ({
    type: ActionKind.login,
    payload,
})

const PERMITTED_DOMAINS = [config.clientUrl, config.cmsUrl]
const DEFAULT_AUTH_REDIRECT_URI =
    (config.clientUrl as string) + '/login/callback'
function useAuth() {
    const dispatchGlobal = useGlobalDispatch()
    const { query, replace, isReady } = useRouter()
    const {
        redirect_uri = DEFAULT_AUTH_REDIRECT_URI,
        client_id = config.clientId,
        ...other
    } = query
    function postCrossDomainMessage(data) {
        console.log(
            postCrossDomainMessage.name,
            data,
            config.cmsUrl,
            config.clientUrl
        )
        const iframe = document.getElementById(
            'client_iframe'
        ) as HTMLIFrameElement
        if (client_id === config.cmsClientId) {
            iframe.contentWindow.postMessage(data, config.cmsUrl)
        } else {
            iframe.contentWindow.postMessage(data, config.clientUrl)
        }
    }
    const authReducer = (state: State, action: Action): State => {
        switch (action.type) {
            case ActionKind.login:
                try {
                    const { refresh_token } = action.payload
                    const redirectTo = qs.parseUrl(redirect_uri as string)
                    postCrossDomainMessage({
                        ...other,
                        ...redirectTo.query,
                        type: 'login',
                        token: refresh_token,
                    })
                    return state
                } catch (error) {
                    console.error('authReducer.login', error)
                    return state
                }
            default:
                return state
        }
    }

    useEffect(() => {
        if (!isReady) return
        function handlePostMessage(event) {
            console.log(event)
            if (PERMITTED_DOMAINS.includes(event.origin)) {
                if (event.data && event.data.type) {
                    switch (event.data.type) {
                        case 'redirect': {
                            const redirectTo = qs.parseUrl(
                                redirect_uri as string
                            )
                            replace(
                                {
                                    pathname: redirectTo.url as string,
                                    query: {
                                        ...other,
                                        ...redirectTo.query,
                                    },
                                },
                                redirectTo.url
                            )
                            break
                        }
                        case 'error': {
                            dispatchGlobal(
                                updateSnackBar({
                                    message:
                                        event.data.error ||
                                        'Error Authorization.',
                                    type: 'error',
                                    open: true,
                                })
                            )
                            console.error('handlePostMessage', event)
                        }
                    }
                }
            }
        }
        window.addEventListener('message', handlePostMessage)
        return () => {
            window.removeEventListener('message', handlePostMessage)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, isReady])
    const [state, dispatch] = useReducer(authReducer, initialState)
    return {
        state,
        dispatch,
        redirect_uri,
    }
}

export const AuthProvider = ({ children }) => {
    const { state, dispatch, redirect_uri } = useAuth()
    return (
        <AuthStateContext.Provider value={state}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
                <iframe
                    style={{ display: 'flex' }}
                    src={`${redirect_uri}`}
                    id="client_iframe"
                ></iframe>
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    )
}

export * from './useAuth'
