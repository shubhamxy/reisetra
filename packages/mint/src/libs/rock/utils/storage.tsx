import { isBrowser } from '../config'
import { analytics } from './analytics'

/**
 * @description LocalStorage keys
 */
enum LS_KEY {
    access_token = '@reisetra/access_token',
    refresh_token = '@reisetra/refresh_token',
    user_profile = '@reisetra/user_profile',
    dark_mode = '@reisetra/dark_mode',
}

export const storage = {
    put: {
        access_token: function access_token(access_token: string) {
            if (isBrowser) {
                try {
                    window?.sessionStorage?.setItem?.(
                        LS_KEY.access_token,
                        access_token
                    )
                    return true
                } catch (error) {
                    console.error('storage', error)
                    return false
                }
            }
            return false
        },
        refresh_token: function refresh_token(refresh_token: string) {
            if (isBrowser) {
                try {
                    window?.localStorage?.setItem?.(
                        LS_KEY.refresh_token,
                        refresh_token
                    )
                    return true
                } catch (error) {
                    console.error('storage', error)
                    return false
                }
            }
            return false
        },
        user_profile: function user_profile(user_profile: any) {
            if (isBrowser) {
                try {
                    window?.sessionStorage?.setItem?.(
                        LS_KEY.user_profile,
                        JSON.stringify(user_profile)
                    )
                    return true
                } catch (error) {
                    console.error('storage', error)
                    return false
                }
            }
            return false
        },
        dark_mode: function dark_mode(darkmode: boolean) {
            if (isBrowser) {
                try {
                    window?.localStorage?.setItem?.(
                        LS_KEY.dark_mode,
                        darkmode ? '1' : '0'
                    )
                    return true
                } catch (error) {
                    console.error('storage', error)
                    return false
                }
            }
            return false
        },
    },
    get: {
        access_token: function access_token() {
            if (isBrowser) {
                return window?.sessionStorage.getItem(LS_KEY.access_token)
            }
        },
        refresh_token: function refresh_token() {
            if (isBrowser) {
                return window?.localStorage.getItem(LS_KEY.refresh_token)
            }
        },
        user_profile: function user_profile() {
            if (isBrowser) {
                try {
                    const data = window?.sessionStorage?.getItem?.(
                        LS_KEY.user_profile
                    )
                    return JSON.parse(data)
                } catch (error) {
                    console.error('storage', error)
                    return null
                }
            }
            return null
        },
        dark_mode: function dark_mode(): string | undefined {
            if (isBrowser) {
                try {
                    return window?.localStorage?.getItem?.(LS_KEY.dark_mode)
                } catch (error) {
                    console.error('storage', error)
                    return '0'
                }
            }
            return '0'
        },
    },
    remove: {
        access_token: function access_token() {
            if (isBrowser) {
                window?.sessionStorage?.removeItem?.(LS_KEY.access_token)
            }
        },
        refresh_token: function refresh_token() {
            if (isBrowser) {
                window?.localStorage?.removeItem?.(LS_KEY.refresh_token)
            }
        },
        user_profile: function user_profile() {
            if (isBrowser) {
                window?.sessionStorage?.removeItem?.(LS_KEY.user_profile)
            }
        },
        dark_mode: function dark_Mode() {
            if (isBrowser) {
                window?.localStorage?.removeItem?.(LS_KEY.dark_mode)
            }
        },
    },
    clear: function () {
        if (isBrowser) {
            window?.sessionStorage?.clear()
            window?.localStorage?.clear()
            analytics.logout()
        }
    },
}
