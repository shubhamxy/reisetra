import * as mixpanel from './mixpanel'
import * as gtag from './gtag'
import * as logRocket from './logrocket'
import { UserProfile } from '../../api'
import { config, isBrowser } from '../../config'

function caller(fnName: string, ...params) {
    if (!isBrowser || !config.isProduction) {
        return
    }
    if (config.analytics.enableMixpanel) {
        mixpanel[fnName]?.(...params)
    }
    if (config.analytics.enableLogrocket) {
        logRocket[fnName]?.(...params)
    }
    if (config.analytics.enableGTag) {
        gtag[fnName]?.(...params)
    }
}

export function initialize() {
    try {
        caller('initialize')
    } catch (error) {
        console.error('analytics', error)
    }
}

export async function pageView(pathName: string) {
    if (!pathName) {
        return
    }
    try {
        caller('pageView', pathName)
    } catch (error) {
        console.error('analytics', error)
    }
}

export async function login() {
    try {
        caller('login')
    } catch (error) {
        console.error('analytics', error)
    }
}

export async function logout() {
    try {
        caller('logout')
    } catch (error) {
        console.error('analytics', error)
    }
}

export async function identify(user: Partial<UserProfile>) {
    if (!user) {
        return
    }
    try {
        caller('identify', user)
    } catch (error) {
        console.error('analytics', error)
    }
}
