import * as React from 'react'
import { QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import { ReactQueryDevtools } from 'react-query/devtools'
import { queryClient } from './api'
import { GlobalProvider } from './global'
import { config } from './config'
import { useRouteAnalytics } from './utils'
import { DefaultSeo } from 'next-seo'

export function RocksProvider({ children, pageProps }) {
    useRouteAnalytics()
    return (
        <QueryClientProvider client={queryClient}>
            <DefaultSeo
                title={config.title + ' - ' + config.name}
                description={config.description}
                twitter={{
                    handle: config.twitter.handle,
                    site: config.twitter.site,
                    cardType: 'summary_large_image',
                }}
                facebook={{
                    appId: config.fb.appId,
                }}
                openGraph={{
                    type: 'website',
                    locale: 'en_IE',
                    url: config.clientUrl,
                    title: config.title + ' - ' + config.name,
                    description: config.description,
                    images: [
                        {
                            url: `${config.cdnUrl}/ckqcmj00j00022qp8cqw5v390/images/aR42QoNn66FRM8PJbrfC2.jpg`,
                            width: 800,
                            height: 600,
                            alt: config.title,
                        },
                    ],
                    site_name: config.name,
                }}
            />
            <Hydrate state={pageProps?.dehydratedState}>
                <GlobalProvider>{children}</GlobalProvider>
            </Hydrate>
            <ReactQueryDevtools
                initialIsOpen={false}
                position="bottom-left"
                containerElement="span"
            />
        </QueryClientProvider>
    )
}

export * from './utils'
export * from './config'
export * from './api'
export * from './auth'
export * from './global'
export * from './users'
export * from './theme'
