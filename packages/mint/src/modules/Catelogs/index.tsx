/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Card, CardContent, Typography } from '@material-ui/core'
import GridList from '../../ui/List/GridList'
import { useInterval, useTags } from '../../libs'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useGridItemStyles, colors } from './useStyles'

export function GridItem({
    colorIndex = 0,
    title,
    description,
    styles,
    images,
    onClick,
}) {
    const classes = useGridItemStyles({ colorIndex, styles })
    const [image, setImage] = useState(0)
    useInterval(
        () => {
            setImage((image + 1) % images?.length)
        },
        image > 0 && images.length > 0 ? 2000 : null
    )
    return (
        <Card
            elevation={0}
            className={classes.root}
            onMouseEnter={() =>
                images?.length > 0 ? setImage((image + 1) % images.length) : ''
            }
            onMouseLeave={() => setImage(0)}
            onClick={onClick}
        >
            <Image
                objectPosition="center"
                objectFit={styles && styles[2] ? styles[2] : 'cover'}
                className={classes.image}
                src={
                    images?.[image % images.length]?.url ||
                    '/images/fallback.png'
                }
                layout="fill"
            />
            <Box className={classes.titleContainer}>
                <Typography
                    className={classes.title}
                    variant="subtitle2"
                    title={title}
                >
                    {title}
                </Typography>
            </Box>
            {description && (
                <CardContent className={classes.card}>
                    <Typography
                        className={classes.description}
                        variant="body2"
                        title={description}
                    >
                        {description}
                    </Typography>
                </CardContent>
            )}
            <Box className={classes.seeAll}>
                <Typography children={'View'} variant="caption" />
            </Box>
        </Card>
    )
}

const useGridStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        display: 'grid',
        width: '100%',
        height: '100%',
        rowGap: 8,
        columnGap: 8,
        overflow: 'hidden',
        padding: theme.spacing(2.2, 2.2, 2.2, 2.2),
        gridTemplateColumns: 'repeat(3, 1fr)',
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: 'repeat(2, 1fr)',
        },
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: '1fr',
            alignItems: 'center',
        },
    },
}))

export function Grid({ children, ...rest }) {
    const classes = useGridStyles()
    return (
        <Box className={classes.root} {...rest}>
            {children}
        </Box>
    )
}

export const Catelogs = ({ filters = {}, variant = 'default' }) => {
    const query = useTags(filters)
    const router = useRouter()

    if (variant === 'infinite') {
        return (
            <GridList
                query={query}
                renderItem={({ item, index }) => (
                    <GridItem
                        {...item}
                        key={index}
                        colorIndex={index % colors.length}
                    />
                )}
            />
        )
    }
    const catelogs =
        query?.data?.data?.map((item) => ({
            ...item,
            // illustration: `/images/tags/${item.value}.jpeg`,
            variant: 'dark',
            title: item.label,
            styles: item.styles,
            images: item.images,
        })) || []
    return (
        <Grid>
            {catelogs.map((item, index) => (
                <GridItem
                    {...item}
                    key={index}
                    colorIndex={index % colors.length}
                    onClick={() => {
                        const data = {
                            pathname: '/products',
                            query: router.query,
                        }
                        if (!item.title) {
                            delete data.query['tags']
                        } else {
                            // @ts-ignore
                            data.query['tags'] = item.title
                        }
                        router.push(data)
                    }}
                />
            ))}
        </Grid>
    )
}
