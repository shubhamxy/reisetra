/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    Typography,
} from '@material-ui/core'
import { config, ROUTES, useCategories, useInterval } from '../../libs'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useStyles } from './useStyles'
import { Carousal } from '../../modules/Carousal'

interface HeroCardData {
    title?: string
    subtitle?: string
    description?: string
    backgroundImage?: string
    objectFit?: string
}

interface HeroCardParams {
    actions?: React.ReactChild
    data?: HeroCardData
}
const slideWidth = 30

const sleep = (ms = 0) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export function HeadShowCase(props: HeroCardParams) {
    const router = useRouter()
    const classes = useStyles()
    const categories = useCategories()
    const [items, setItems] = useState([])
    const [data, setData] = useState({
        index: -1,
        title: config.title,
        subtitle: config.name,
        description: config.description,
        backgroundImage: '/images/hero2.jpeg',
        objectFit: 'contain',
    })
    useEffect(() => {
        if (!categories.isLoading && categories?.data?.data) {
            setItems(categories?.data?.data)
        }
    }, [categories?.data?.data, categories.isLoading])

    const [isTicking, setIsTicking] = useState(false)
    const [activeIdx, setActiveIdx] = useState(0)
    const bigLength = items.length

    const prevClick = (jump = 1) => {
        if (!isTicking) {
            setIsTicking(true)
            setActiveIdx((idx) => (idx - jump + bigLength) % bigLength)
            setItems((prev) => {
                return prev.map((_, i) => prev[(i + jump) % bigLength])
            })
        }
    }

    const nextClick = (jump = 1) => {
        if (!isTicking) {
            setIsTicking(true)
            setActiveIdx((idx) => (idx + jump) % bigLength)
            setItems((prev) => {
                return prev.map(
                    (_, i) => prev[(i - jump + bigLength) % bigLength]
                )
            })
        }
    }

    useEffect(() => {
        if (isTicking) sleep(5000).then(() => setIsTicking(false))
    }, [isTicking])

    useEffect(() => {
        if (items.length > 0) {
            const item = items[0]
            setData({
                index: 0,
                backgroundImage: item.images[0]?.url,
                description: '',
                objectFit: 'cover',
                subtitle: '',
                title: item.label,
            })
        }
    }, [items])

    return (
        <Card className={classes.root}>
            <Box className={classes.imageContainer} />
            {data.backgroundImage && (
                <Image
                    objectPosition="center"
                    objectFit={data.objectFit as any}
                    className={classes.image}
                    src={data.backgroundImage}
                    layout="fill"
                />
            )}

            <CardContent className={classes.content}>
                <Grid container className={classes.titleContainer}>
                    {/* {data.subtitle && (
                        <Typography
                            className={classes.subtitle}
                            variant={'caption'}
                        >
                            {data.subtitle}
                        </Typography>
                    )} */}
                    {/* {data.title && (
                        <Typography
                            style={{ textTransform: 'uppercase' }}
                            className={classes.title}
                        >
                            {data.title}
                        </Typography>
                    )} */}

                    {/* {data.description && (
                        <Typography
                            className={classes.description}
                            variant={'body1'}
                        >
                            {data.description}
                        </Typography>
                    )} */}
                    {/* <CardActions className={classes.actionsContainer}>
                        {data.index > -1 && (
                            <Box
                                className={classes.seeAll}
                                onClick={() => {
                                    const item = {
                                        pathname: ROUTES.products,
                                        query: router.query,
                                    }
                                    if (!data.title) {
                                        delete item.query.category
                                    } else {
                                        // @ts-ignore
                                        item.query.category = data.title
                                    }
                                    router.push(item)
                                }}
                            >
                                <Typography
                                    children={'See details'}
                                    className={classes.subtitle}
                                    variant="caption"
                                />
                            </Box>
                        )}
                    </CardActions> */}
                </Grid>
            </CardContent>

            <Grid item container className={classes.categoriesContainer}>
                {activeIdx > -1 && (
                    <Carousal
                        key={activeIdx}
                        active={activeIdx}
                        prevClick={prevClick}
                        nextClick={nextClick}
                        data={items?.map((item) => ({
                            ...item,
                            // illustration: `/images/tags/${item.value}.jpeg`,
                            variant: 'dark',
                            title: item?.label,
                            styles: item?.styles,
                            images: item?.images,
                        }))}
                    />
                )}
            </Grid>
        </Card>
    )
}
