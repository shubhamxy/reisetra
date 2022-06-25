/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
    Box,
    Button,
    Card,
    CardContent,
    Fade,
    Grid,
    Typography,
} from '@material-ui/core'
import { GridList } from '../../ui'
import { ROUTES, useInterval, useTags } from '../../libs'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { colors, useGridItemStyles } from './useStyles'
import clsx from 'clsx'
import { ArrowLeft, ArrowRight } from '@material-ui/icons'

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
            className={
                selected ? clsx(classes.root, classes.selected) : classes.root
            }
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

const useGridStyles = makeStyles<any, any>((theme) => ({
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
        transition: 'all ease-in 0.4s',
        transform: 'scale(0.98)',
    },
    arrowLeft: {
        position: 'absolute',
        left: -24,
        zIndex: 11,
        transition: 'all ease-in 0.4s',
        opacity: 0.1,
        '&:hover': {
            opacity: 0.8,
        },
    },
    arrowRight: {
        position: 'absolute',
        right: -24,
        zIndex: 11,
        opacity: 0.1,
        transition: 'all ease-in 0.4s',
        '&:hover': {
            opacity: 0.8,
        },
    },
    dots: {
        display: 'inline-block',
        left: '50%',
        marginTop: 2,
        position: 'absolute',
        bottom: -36,
        transform: 'translateX(-50%)',
    },
    dot: ({ active }) => ({
        border: 0,
        cursor: 'pointer',
        marginRight: 4,
        outline: 'none',
        transform: 'scale(0.5)',
        background: colors[active].background,
        borderRadius: '50%',
        height: 18,
        width: 18,
        opacity: 0.3,
        transition: 'all ease-in 0.4s',
        '&:hover': {
            opacity: 0.8,
        },
    }),
    dotActive: ({ active }) => ({
        border: 0,
        outline: 'none',
        borderRadius: 24,
        height: 18,
        width: 52,
        cursor: 'pointer',
        marginRight: 4,
        transform: 'scale(0.5)',
        background: colors[active].background,
        opacity: 0.8,
        transition: 'all ease-in 0.4s',
        '&:hover': {
            opacity: 1,
        },
    }),
}))

export function CatalogGrid({
    children,
    active,
    items,
    nextClick,
    prevClick,
    ...rest
}) {
    const classes = useGridStyles({ active: active % colors.length })
    const handleDotClick = (idx) => {
        if (idx < active) prevClick(active - idx)
        if (idx > active) nextClick(idx - active)
    }
    return (
        <>
            <Button
                variant="text"
                onClick={() => {
                    prevClick(1)
                }}
                className={classes.arrowLeft}
            >
                <ArrowLeft style={{ width: 32, height: 32 }} />
            </Button>
            <Box className={classes.root} {...rest}>
                {children}
            </Box>

            <Button
                onClick={() => {
                    nextClick(1)
                }}
                className={classes.arrowRight}
            >
                <ArrowRight style={{ width: 32, height: 32 }} />
            </Button>
            <Box className={classes.dots}>
                {items.map((pos, i) => (
                    <button
                        key={i}
                        onClick={() => handleDotClick(i)}
                        className={
                            i === active ? classes.dotActive : classes.dot
                        }
                    />
                ))}
            </Box>
        </>
    )
}

export const Carousal = ({ data = [], active = 0, nextClick, prevClick }) => {
    const router = useRouter()

    useInterval(() => {
        nextClick(1)
    }, 5000)

    return (
        <CatalogGrid
            active={active}
            items={data}
            nextClick={nextClick}
            prevClick={prevClick}
        >
            {data.map((item, index) => (
                <Fade key={index}>
                    <CatalogGridItem
                        {...item}
                        key={item.id}
                        selected={index === active}
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
                </Fade>
            ))}
        </CatalogGrid>
    )
}
