/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react'
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    Typography,
} from '@material-ui/core'
import { NextSeo } from 'next-seo'
import { config, ROUTES, useCategories, useInterval } from '../../libs'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useStyles } from './useStyles'
import { Catalogs } from '../../modules'
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

export function HeadShowCase(props: HeroCardParams) {
    const router = useRouter()
    const classes = useStyles()
    const categories = useCategories();

    console.log(categories?.data?.data);

    const [data, setData] = React.useState({
        index: -1,
        title: config.title,
        subtitle: config.name,
        description: config.description,
        backgroundImage: '/images/hero2.jpeg',
        objectFit: 'contain',
    })
    useInterval(
        () => {
            const item = categories?.data?.data[(data.index + 1) % categories?.data?.data?.length]
            setData({
                index: +(data.index + 1) % categories?.data?.data?.length,
                backgroundImage: item.images[0].url,
                description: '',
                objectFit: 'cover',
                subtitle: '',
                title: item.label
            })
        },
        10000
    )
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
                    {data.subtitle && (
                        <Typography
                            className={classes.subtitle}
                            variant={'caption'}
                        >
                            {data.subtitle}
                        </Typography>
                    )}
                    {data.title && (
                        <Typography
                            style={{ textTransform: 'uppercase' }}
                            className={classes.title}
                        >
                            {data.title}
                        </Typography>
                    )}

                    {data.description && (
                        <Typography
                            className={classes.description}
                            variant={'body1'}
                        >
                            {data.description}
                        </Typography>
                    )}
                    <CardActions className={classes.actionsContainer}>
                        {data.index > -1 && <Box className={classes.seeAll} onClick={() => {
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
                        }}>
                            <Typography children={'See details'} className={classes.subtitle} variant="caption" />
                        </Box>}
                    </CardActions>
                </Grid>
            </CardContent>

            <Grid item container className={classes.categoriesContainer}>
                {data.index > -1 && <Carousal key={data.index} selected={data.index} data={categories?.data?.data}/>}
            </Grid>
        </Card>
    )
}
