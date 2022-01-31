/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react'
import {
    Box,
    Card,
    CardContent,
    Typography,
    CardActions,
} from '@material-ui/core'
import { NextSeo } from 'next-seo'
import { config } from '../../libs'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useStyles } from './useStyles'

export default React.memo(function HeroCard(
    props: Partial<{
        actions: React.ReactChild
        data: {
            title: string
            subtitle?: string
            description?: string
            backgroundImage?: string
            objectFit?: string
        }
    }>
) {
    const router = useRouter()
    const classes = useStyles()
    const {
        title = 'Get better recommendations',
        subtitle = '',
        description = '',
        backgroundImage = '/images/hero.jpeg',
        objectFit = 'cover',
    } = props.data || {}

    return (
        <Card className={classes.root}>
            <Box className={classes.imageContainer} />
            {backgroundImage && (
                <Image
                    objectPosition="center"
                    objectFit={objectFit as any}
                    className={classes.image}
                    src={backgroundImage}
                    layout="fill"
                />
            )}

            <NextSeo
                title={title + ' - ' + config.name}
                description={description}
                openGraph={{
                    type: 'website',
                    locale: 'en_IE',
                    url: router.asPath,
                    title: title + ' - ' + config.name,
                    description: config.description,
                    images: [
                        {
                            url: backgroundImage,
                            width: 800,
                            height: 600,
                            alt: config.title,
                        },
                    ],
                    site_name: config.name,
                }}
            />
            <CardContent className={classes.content}>
                {subtitle && (
                    <Typography
                        className={classes.subtitle}
                        variant={'caption'}
                    >
                        {subtitle}
                    </Typography>
                )}
                {title && (
                    <Typography
                        style={{ textTransform: 'uppercase' }}
                        className={classes.title}
                    >
                        {title}
                    </Typography>
                )}

                {description && (
                    <Typography
                        className={classes.description}
                        variant={'body1'}
                    >
                        {description}
                    </Typography>
                )}
                {props.actions && (
                    <CardActions className={classes.actionsContainer}>
                        {props.actions}
                    </CardActions>
                )}
            </CardContent>
        </Card>
    )
})
