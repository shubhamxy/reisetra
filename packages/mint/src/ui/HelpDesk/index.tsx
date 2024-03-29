/* eslint-disable no-unused-expressions */
// @ts-nocheck
import { useEffect } from 'react'
import { config, isBrowser, useAuthState } from '../../libs'

const HelpDesk = () => {
    const authState = useAuthState()
    const { user } = authState || {}

    useEffect(() => {
        if (!isBrowser || !config.freshchat.enableFreshChat || !user) {
            return
        }

        function initFreshChat() {
            window.fcWidget.init({
                token: config.freshchat.token,
                host: config.freshchat.host,
            })

            window.fcWidget.setExternalId(user.id)
            // To set users name
            window.fcWidget.user.setFirstName(user.name)

            // To set users email
            window.fcWidget.user.setEmail(user.email)

            // To set users properties
            window.fcWidget.user.setProperties({
                roles: user.roles, // meta property 1
            })
        }

        function initialize(i, t) {
            let e
            i.getElementById(t)
                ? initFreshChat()
                : (((e = i.createElement('script')).id = t),
                  (e.async = !0),
                  (e.src = 'https://wchat.in.freshchat.com/js/widget.js'),
                  (e.onload = initFreshChat),
                  i.head.appendChild(e))
        }

        function initiateCall() {
            initialize(document, 'Freshdesk Messaging-js-sdk')
        }

        window.addEventListener
            ? window.addEventListener('load', initiateCall, !1)
            : window.attachEvent('load', initiateCall, !1)
    }, [user])

    return null
}

export { HelpDesk }
