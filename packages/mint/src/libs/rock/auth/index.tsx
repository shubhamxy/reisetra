import React, { createContext, useContext, useEffect, useReducer } from 'react'
import {
    analytics,
    AUTH_ROUTES,
    PRIVATE_ROUTES,
    ROUTES,
    storage,
} from '../utils'
import { config } from '../config'
import { useRefreshAuth } from './useAuth'
import { useUserProfile } from '../users'
import { useRouter } from 'next/router'
import { UserProfile } from '../api'

export const initialState = {
    isHydrated: false,
    isAuthenticated: false,
    user: null,
}

export interface State {
    isHydrated: boolean
    isAuthenticated: boolean
    user: Partial<UserProfile>
    access_token?: string
    refresh_token?: string
}

enum ActionKind {
    hydrate = 'hydrate',
    login = 'login',
    logout = 'logout',
    setAuthState = 'setAuthState',
}

export type Action = {
    type: ActionKind
    payload?: any
}

type LoginPayload = { access_token?: string; refresh_token?: string }

export const logout = (): Action => ({ type: ActionKind.logout })
export const login = (payload: LoginPayload): Action => ({
    type: ActionKind.login,
    payload,
})
export const setAuthState = (payload): Action => ({
    type: ActionKind.setAuthState,
    payload,
})

export const hydrate = (payload) => ({
    type: ActionKind.hydrate,
    payload,
})

const authReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionKind.hydrate:
            try {
                return {
                    ...state,
                    ...action.payload,
                    isHydrated: true,
                }
            } catch (error) {
                console.error('authReducer.hydrate', error)
                return state
            }
        case ActionKind.login:
            try {
                const hasPutAccessToken = storage.put.access_token(
                    action.payload.access_token
                )
                const hasPutRefreshToken = storage.put.refresh_token(
                    action.payload.refresh_token
                )
                return {
                    ...state,
                    isAuthenticated: Boolean(
                        hasPutAccessToken && hasPutRefreshToken
                    ),
                }
            } catch (error) {
                console.error('authReducer.login', error)
                return state
            }
        case ActionKind.logout:
            try {
                storage.clear()
                return {
                    ...initialState,
                    isHydrated: true,
                }
            } catch (error) {
                console.error('authReducer.logout', error)
                return state
            }

        case ActionKind.setAuthState:
            try {
                const update = {
                    ...state,
                    ...action.payload,
                }
                analytics.identify(update.user)
                return update
            } catch (error) {
                console.error('authReducer.setAuthState', error)
                return state
            }
        default:
            return state
    }
}

function useAuth() {
    const { route, query, isReady, replace, asPath } = useRouter()
    const fetchUserProfile = useUserProfile()
    const fetchRefreshToken = useRefreshAuth()

    const [state, dispatch] = useReducer(authReducer, initialState)

    useEffect(() => {
        if (!isReady || !state.isHydrated) return
        if (state.isAuthenticated) {
            if (AUTH_ROUTES.has(route as ROUTES)) {
                replace((query.redirect_route as string) || '/')
            } else if (route === '/login/callback') {
                replace((query.redirect_route as string) || '/')
            }
        } else {
            if (AUTH_ROUTES.has(route as ROUTES)) {
                replace(
                    {
                        pathname: config.authUrl,
                        query: {
                            ...query,
                            client_id: config.clientId,
                            redirect_uri: config.callbackUrl,
                        },
                    },
                    config.authUrl,
                    { shallow: true }
                )
            } else if (PRIVATE_ROUTES.has(route as ROUTES)) {
                replace({
                    pathname: config.authUrl,
                    query: {
                        ...query,
                        client_id: config.clientId,
                        redirect_uri: config.callbackUrl,
                    },
                })
            }
        }
    }, [
        route,
        isReady,
        state.isAuthenticated,
        state.isHydrated,
        query,
        replace,
    ])

    useEffect(() => {
        async function hydrateAsync() {
            try {
                const hasAccessToken = storage.get.access_token()
                if (hasAccessToken) {
                    const userProfile = storage.get.user_profile()
                    dispatch(
                        hydrate({ isAuthenticated: true, user: userProfile })
                    )
                } else {
                    const hasRefreshToken = storage.get.refresh_token()
                    if (hasRefreshToken) {
                        try {
                            const response =
                                await fetchRefreshToken.mutateAsync({
                                    token: hasRefreshToken,
                                })
                            dispatch(
                                login({
                                    access_token: response.data.access_token,
                                    refresh_token: response.data.refresh_token,
                                })
                            )
                        } catch (error) {
                            console.error(
                                'hydrateAsync.hasrefresh_token',
                                error
                            )
                            // not valid maybe?
                            dispatch(logout())
                        }
                    } else {
                        // has no refresh or access token
                    }
                }
            } catch (error) {
                console.error('hydrateAsync', error)
            } finally {
                dispatch(setAuthState({ isHydrated: true }))
            }
        }

        if (state.isHydrated === false) {
            hydrateAsync()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        async function getProfileAsync() {
            try {
                const response = await fetchUserProfile.mutateAsync()
                storage.put.user_profile(response.data)
                dispatch(setAuthState({ user: response.data }))
            } catch (error) {
                console.error('getProfileAsync', error)
                dispatch(logout())
            }
        }

        if (state.isHydrated && state.isAuthenticated && state.user === null) {
            getProfileAsync()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.isAuthenticated, state.isHydrated, state.user])

    return {
        state,
        dispatch,
    }
}

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

export const AuthProvider = ({ children }) => {
    const { state, dispatch } = useAuth()
    return (
        <AuthStateContext.Provider value={state}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    )
}

export * from './useAuth'
