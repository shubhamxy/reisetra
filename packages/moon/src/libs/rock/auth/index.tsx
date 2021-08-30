import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { storage } from '../utils/storage'
import { config } from '../config'
import { useRouter } from 'next/router'
import { UserProfile } from '../api/user'
import { analytics } from '../utils'
const AuthStateContext = createContext(null)
const AuthDispatchContext = createContext(null)
import qs from 'query-string'

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

const DEFAULT_AUTH_REDIRECT_URI =
    (config.clientUrl as string) + '/login/callback'
function useAuth() {
    const { query, replace } = useRouter()

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
                    const { refresh_token } = action.payload
                    const { redirect_uri = DEFAULT_AUTH_REDIRECT_URI } = query
                    const redirectTo = qs.parseUrl(redirect_uri as string)
                    replace({
                        pathname: redirectTo.url as string,
                        query: {
                            token: refresh_token,
                            ...redirectTo.query,
                        },
                    })
                    return state
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
                    console.error('authReducer.setAuthState', logout)
                    return state
                }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(authReducer, initialState)
    return {
        state,
        dispatch,
    }
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
