import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { isBrowser } from '../../config'
import { pageView } from './analytics'
import NProgress from 'nprogress'

export const useRouteAnalytics = () => {
    const router = useRouter()
    useEffect(() => {
        const handleRouteChangeComplete = (url: string) => {
            if (isBrowser) {
                NProgress.done()
                pageView(url)
            }
        }
        const handleRouteChangeError = () => {
            NProgress.start()
        }
        const handleRouteChangeStart = () => {
            NProgress.start()
        }
        router.events.on('routeChangeStart', handleRouteChangeStart)
        router.events.on('routeChangeError', handleRouteChangeError)
        router.events.on('routeChangeComplete', handleRouteChangeComplete)
        return () => {
            router.events.off('routeChangeStart', handleRouteChangeStart)
            router.events.off('routeChangeError', handleRouteChangeError)
            router.events.off('routeChangeComplete', handleRouteChangeComplete)
        }
    }, [router.events])
}
