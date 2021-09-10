/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Card, CardContent, Typography } from '@material-ui/core'
import { GridList } from '../../ui'
import { ROUTES, useInterval, useTags } from '../../libs'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { colors, useGridItemStyles } from './useStyles'
import clsx from 'clsx'

export function CatalogGridItem({
    colorIndex = 0,
    title,
    description,
    styles,
    images,
    onClick,
    selected,
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
            className={selected ? clsx(classes.root, classes.selected) : classes.root}
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
            <Box className={classes.content}>
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
                {/* <Box className={classes.seeAll}>
                    <Typography children={'View'} variant="caption" />
                </Box> */}
            </Box>
        </Card>
    )
}

const useGridStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gridTemplateRows: '1fr',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'flex-start',
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: 'repeat(4, 1fr)',
        },
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: 'repeat(3, 1fr)',
            alignItems: 'center',
        },
        flex: 1,
        overflow: 'hidden',
        width: '100%',
        height: '200px',
        rowGap: 8,
        columnGap: 8,
        padding: theme.spacing(2.2, 0, 2.2, 0),
        marginLeft: 24,
        marginRight: 24,
    },
}))

export function CatalogGrid({ children, ...rest }) {
    const classes = useGridStyles()
    return (
        <Box className={classes.root} {...rest}>
            {children}
        </Box>
    )
}

export const Carousal = ({ data = [], selected = 0 }) => {
    const router = useRouter()

    let catalogs =
        data?.map((item) => ({
            ...item,
            // illustration: `/images/tags/${item.value}.jpeg`,
            variant: 'dark',
            title: item.label,
            styles: item.styles,
            images: item.images,
        })) || []
    catalogs = catalogs.slice(selected).concat(catalogs.slice(0, selected))
    return (
        <CatalogGrid>
            {catalogs.map((item, index) => (
                <CatalogGridItem
                    {...item}
                    key={index}
                    selected={index === 0}
                    colorIndex={index % colors.length}
                    onClick={() => {
                        const data = {
                            pathname: ROUTES.products,
                            query: router.query,
                        }
                        if (!item.title) {
                            delete data.query.category
                        } else {
                            // @ts-ignore
                            data.query.category = item.title
                        }
                        router.push(data)
                    }}
                />
            ))}
        </CatalogGrid>
    )
}
