import React from 'react'
import { Container } from '@material-ui/core'
import { NextSeo } from 'next-seo'
import { config } from '../../libs'
import { useRouter } from 'next/router'
import { Markdown } from '../Markdown'

export function Story({ data }) {
    const { asPath } = useRouter()
    if (!data) {
        return null
    }
    return (
        <Container maxWidth="md">
            <NextSeo
                title={data.title + ' - ' + config.name}
                description={data.description}
                openGraph={{
                    type: 'website',
                    locale: 'en_IE',
                    url: config.clientUrl + asPath,
                    title: data.title + ' - ' + config.name,
                    description: config.description,
                    images: data?.images?.map((item) => ({
                        url: item?.url || '/images/fallback.jpg',
                        width: 800,
                        height: 600,
                        alt: config.title,
                    })),
                    site_name: config.name,
                }}
            />
            <Markdown children={data?.body?.markdown} />
        </Container>
    )
}
