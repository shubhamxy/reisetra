import { makeStyles } from '@material-ui/core'
import React from 'react'
import { MainLayout } from '../../layouts/MainLayout'
import { AppHeader } from '../../ui/Header'
import { Footer } from '../../ui/Footer'
import { Product } from '../../modules/Product'
import { NextSeo } from 'next-seo'

import { useRouter } from 'next/router'
import { config, useProduct } from '../../libs'

const useStyles = makeStyles((theme) => ({
    content: {
        marginBottom: 48,
        display: 'flex',
        flexDirection: 'column',
    },
    left: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    right: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
}))

const ProductPage = () => {
    const classes = useStyles()
    const router = useRouter()
    const { id } = router.query
    const { data } = useProduct(id as string)
    return (
        <MainLayout
            classes={{
                left: classes.left,
                right: classes.right,
            }}
            top={
                <NextSeo
                    title={
                        (data?.data?.title ? data?.data?.title + ' - ' : '') +
                        config.name
                    }
                    description={data?.data?.description || ''}
                    openGraph={{
                        type: 'website',
                        locale: 'en_IE',
                        url: router.asPath,
                        title:
                            (data?.data?.title
                                ? data?.data?.title + ' - '
                                : '') + config.name,
                        description: config.description,
                        images: data?.data?.images.map((image) => {
                            return {
                                url: image.url,
                                width: 800,
                                height: 600,
                                alt: config.title,
                            }
                        }),
                        site_name: config.name,
                    }}
                />
            }
            header={<AppHeader />}
            footer={<Footer />}
        >
            <Product data={data?.data} />
        </MainLayout>
    )
}

export default ProductPage
