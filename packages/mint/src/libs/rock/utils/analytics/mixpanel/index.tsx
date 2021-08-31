import mixpanel, { Dict } from 'mixpanel-browser'
import { UserProfile } from '../../../api/users'
import { config } from '../../../config'
import {
    Events,
    mapUserProperties,
    Properties,
    User,
    UserState,
} from '../types'

export function initialize() {
    mixpanel.init(config.analytics.mixpanelToken, {
        debug: !config.isProduction,
        autotrack: true,
        ignore_dnt: true,
        batch_requests: true,
        batch_flush_interval_ms: 1000,
    })
}

export function pageView(pathName: string) {
    mixpanel.track(Events.page_loaded, {
        [Properties.page_viewed]: pathName,
    })
}

export async function login() {
    mixpanel.people.set(
        { [User.user_state]: UserState.logged_in },
        function () {
            mixpanel.track(Events.login)
        }
    )
}

export async function logout() {
    mixpanel.people.set(
        { [User.user_state]: UserState.logged_out },
        function () {
            mixpanel.track(Events.logout, {}, function () {
                mixpanel.reset()
            })
        }
    )
}

export async function identify(user: Partial<UserProfile>) {
    if (user.id) {
        mixpanel.identify(user.id)
        mixpanel.people.set(mapUserProperties(user))
    }
}

export async function metrics(data: Dict) {
    mixpanel.track(Events.metrics, data)
}
