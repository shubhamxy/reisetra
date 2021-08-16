import * as React from 'react'
import { useState } from 'react'
import {
    Box,
    Card,
    CardContent,
    createStyles,
    makeStyles,
    Typography,
    Button,
    CardActions,
    fade,
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
            boxShadow: '2px 2px 7px rgba(15, 15, 15, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 320,

            // [theme.breakpoints.down("sm")]: {
            //   // backgroundPosition: "center",
            // },
        },
        content: {
            display: 'flex',
            textAlign: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: 620,
            color: theme.palette.common.white,
            [theme.breakpoints.down('sm')]: {
                maxWidth: 400,
            },
            zIndex: 10,
        },
        title: {
            color: theme.palette.common.white,
            ...theme.typography.h3,
            textAlign: 'center',
            [theme.breakpoints.down('sm')]: {
                // ...theme.typography.h4,
            },
        },
        subtitle: {
            color: theme.palette.common.white,
            ...theme.typography.caption,
            fontSize: 16,
            textAlign: 'center',
        },
        description: {
            color: theme.palette.common.white,
            ...theme.typography.body1,
            textAlign: 'center',
            [theme.breakpoints.down('sm')]: {
                ...theme.typography.body1,
            },
        },
        actionsContainer: {},
        imageContainer: {
            width: '100%',
            height: '100%',
            background: '#0f0f0f4f',
            backdropFilter: 'blur(2px)',
            zIndex: 4,
            top: 0,
            bottom: 0,
            position: 'absolute',
        },
        image: {
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
        }
    }>
) {
    const router = useRouter()
    const classes = useStyles()
    const [showModal, setShowModal] = useState(false)
    const [activeQuizIndex, setActiveQuizIndex] = useState(0)
    const quizStep = () => {
        setActiveQuizIndex(activeQuizIndex + 1)
    }
    const {
        title = 'Get better recommendations',
        subtitle = '',
        description = '',
        backgroundImage,
    } = props.data || {}

    return (
        <Card className={classes.root}>
            <Box className={classes.imageContainer} />
            <Image
                objectPosition="center"
                objectFit={'cover'}
                className={classes.image}
                src={backgroundImage || '/images/hero.jpeg'}
                layout="fill"
            />
            <NextSeo
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
                {title && (
                    <Typography
                        style={{ textTransform: 'uppercase' }}
                        className={classes.title}
                    >
                        {title}
                    </Typography>
                )}
                {subtitle && (
                    <Typography
                        className={classes.subtitle}
                        variant={'caption'}
                    >
                        {subtitle}
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
                {props.actions && <CardActions>{props.actions}</CardActions>}
            </CardContent>
        </Card>
    )
})
