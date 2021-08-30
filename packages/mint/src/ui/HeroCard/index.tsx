/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react'
import {
    Box,
    Card,
    CardContent,
    createStyles,
    makeStyles,
    Typography,
    CardActions,
} from '@material-ui/core'
import { NextSeo } from 'next-seo'
import { config } from '../../libs'
import { useRouter } from 'next/router'
import Image from 'next/image'

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            boxShadow: '0 1px 4px 0 rgb(0 0 0 / 10%)',
            background: '#d8dbdf',
        },
        content: {
            display: 'flex',
            textAlign: 'left',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            [theme.breakpoints.down('sm')]: {
                maxWidth: 400,
            },
            height: 320,
            zIndex: 10,
        },
        title: {
            width: '100%',
            color: '#303336',
            ...theme.typography.h3,
            fontSize: 22,
            textAlign: 'left',
        },
        subtitle: {
            width: '100%',
            color: '#535b62',
            ...theme.typography.caption,
            fontSize: 14,
            textAlign: 'left',
        },
        description: {
            width: '100%',
            color: '#535b62',
            ...theme.typography.body1,
            textAlign: 'center',
        },
        actionsContainer: {
            width: '100%',
        },
        imageContainer: {
            width: '100%',
            height: '100%',
            // background: "#0f0f0f4f",
            // backdropFilter: "blur(2px)",
            zIndex: 4,
            top: 0,
            bottom: 0,
            position: 'absolute',
        },
        image: {
            zIndex: 1,
            transition: 'all ease-in 2s',
        },
        illustration1: {
            maxWidth: 200,
            zIndex: 1,
            transition: 'all ease-in 2s',
        },
        illustration2: {
            maxWidth: 200,
            zIndex: 1,
            transition: 'all ease-in 2s',
        },
    })
)

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
