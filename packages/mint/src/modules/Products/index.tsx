/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react'
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Typography,
} from '@material-ui/core'
import { useInterval, useProducts } from '../../libs'
import { GridList } from '../../ui'
import { useRouter } from 'next/router'
import { ShoppingCart } from '@material-ui/icons'
import { Rating } from '@material-ui/lab'
import Image from 'next/image'
import { styles, useGridItemStyles } from './styles'

export type TStyles = {
    background: string
    color: string
}[]

export function ProductGridItem({
    styleIndex = 0,
    title,
    description,
    ratingsCount,
    rating,
    price,
    mrp,
    images,
    styles: colors,
    onClick,
    showDescription = false,
}: {
    styleIndex: number
    title: string
    description: string
    rating: number | string
    ratingsCount: number | string
    mrp: string
    price: string
    images: { url: string }[]
    styles: string[]
    onClick: () => any
    showDescription: boolean
}) {
    const classes = useGridItemStyles({ styleIndex, colors })
    const [image, setImage] = useState(0)
    const [addToCartVisible, setAddToCartVisible] = useState(false)
    useInterval(
        () => {
            setImage((image + 1) % images.length)
        },
        image > 0 ? 4000 : null
    )
    return (
        <Card className={classes.root} onClick={onClick}>
            <CardMedia
                className={classes.media}
                onMouseEnter={() => setImage(image + 1)}
                onMouseLeave={() => setImage(0)}
                title={title}
            >
                <Image
                    objectFit="contain"
                    className={classes.image}
                    src={
                        images?.[image % images.length]?.url ||
                        '/images/fallback.png'
                    }
                    layout="fill"
                />
            </CardMedia>
            <CardContent
                className={classes.card}
                onMouseEnter={() => setAddToCartVisible(true)}
                onMouseLeave={() => setAddToCartVisible(false)}
            >
                <Box display={'flex'} flexDirection="column">
                    <Typography
                        className={classes.title}
                        variant="h4"
                        title={title}
                    >
                        {title}
                    </Typography>
                    {description && showDescription && (
                        <Typography
                            className={classes.description}
                            variant="subtitle2"
                            title={description}
                        >
                            {description}
                        </Typography>
                    )}
                </Box>
                <Box display="flex" flexDirection="column">
                    <Box className={classes.costContainer}>
                        <Box>
                            <Typography
                                className={classes.cost}
                                children={`₹ ${price}`}
                                variant="subtitle2"
                            />
                        </Box>
                        <Box>
                            <Typography
                                children={`MRP`}
                                variant="caption"
                                style={{ fontSize: 10 }}
                            />
                            <Typography
                                children={`₹${mrp}`}
                                variant="caption"
                                style={{
                                    fontSize: 10,
                                    marginLeft: 4,
                                    textDecoration: 'line-through',
                                }}
                            />
                            <Typography
                                children={`(${
                                    (((+mrp - +price) / +mrp) * 100) | 0
                                }% off)`}
                                variant="caption"
                                style={{ fontSize: 10, marginLeft: 4 }}
                            />
                        </Box>
                        <Box display="flex">
                            <Rating
                                size="small"
                                value={+rating || 5}
                                disabled={!ratingsCount}
                                readOnly
                            />
                            {+ratingsCount > 0 && (
                                <Box>
                                    <Typography
                                        children={`(${
                                            +ratingsCount || 1
                                        } review${
                                            +ratingsCount > 1 ? 's' : ''
                                        })`}
                                        variant="caption"
                                        style={{ fontSize: 12, marginLeft: 4 }}
                                    />
                                </Box>
                            )}
                        </Box>
                    </Box>
                    <Box className={classes.addToCartContainer} mt={1.4}>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            style={{ opacity: addToCartVisible ? 1 : 0.88 }}
                            className={classes.button}
                            startIcon={
                                <ShoppingCart
                                    style={{ width: 14, height: 14 }}
                                />
                            }
                        >
                            Add to Cart
                        </Button>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}

export function Products({ filters, enabled = true }) {
    const query = useProducts(filters, enabled)
    const router = useRouter()
    return (
        <GridList
            query={query}
            emptyListCaption={`No products found in this category / filters. please check again later or select a different category / filters.`}
            renderItem={({ item, index }) => (
                <ProductGridItem
                    {...item}
                    onClick={() => {
                        router.push(`/product/${item.slug}`)
                    }}
                    key={item.id}
                    styleIndex={index % styles.length}
                />
            )}
        />
    )
}
