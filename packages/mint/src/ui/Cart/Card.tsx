/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { Box, IconButton, Typography, Grid } from '@material-ui/core'
import { useStyles } from './styles'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { CloseOutlined } from '@material-ui/icons'
import { useDeleteCartItem } from '../../libs'

function useHelper({ slug, data }) {
    const router = useRouter()
    const removeCartItem = useDeleteCartItem()
    function handleClick(e) {
        e.preventDefault()
        e.stopPropagation()
        router.push(`/product/${slug}`)
    }

    function handleRemove(e) {
        e.preventDefault()
        e.stopPropagation()
        removeCartItem.mutate({
            cartId: data.cartId,
            productId: data.productId,
        })
    }

    return {
        handleClick,
        handleRemove,
    }
}

export function Card({ data }) {
    const { slug, title, price, mrp, images } = data.product
    const { handleClick, handleRemove } = useHelper({
        slug,
        data,
    })

    const classes = useStyles()
    return (
        <Grid
            container
            item
            xs={12}
            className={classes.root}
            onClick={handleClick}
            direction="row"
        >
            <Grid item className={classes.cover}>
                <Box
                    borderRadius="12px"
                    overflow="hidden"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    bgcolor="#FFFFFF"
                    width="62px"
                    height="62px"
                >
                    {images?.length > 0 ? (
                        <Image
                            src={images[0]?.url || '/images/fallback.png'}
                            alt={''}
                            height={62}
                            width={62}
                            className={classes.img}
                        />
                    ) : (
                        <Image src="/icons/file.svg" width={24} height={24} />
                    )}
                </Box>
            </Grid>
            <Grid
                container
                item
                xs
                className={classes.content}
                direction="column"
            >
                <Grid
                    container
                    item
                    xs={12}
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <Typography
                        className={classes.title}
                        variant="body1"
                        color="textPrimary"
                        component="p"
                    >
                        {title}
                    </Typography>
                    <IconButton aria-label="delete" onClick={handleRemove}>
                        <CloseOutlined color="primary" />
                    </IconButton>
                </Grid>
                <Grid container item xs direction="column">
                    <Grid
                        item
                        xs={12}
                        style={{ display: 'flex' }}
                        direction="row"
                    >
                        {data.quantity && (
                            <Typography
                                className={classes.subText}
                                variant="body1"
                                color="textPrimary"
                                component="span"
                            >
                                Qty: {data.quantity}
                            </Typography>
                        )}

                        {data.color && (
                            <Typography
                                className={classes.subText}
                                variant="body1"
                                color="textPrimary"
                                component="span"
                            >
                                Color: {data.color}
                            </Typography>
                        )}

                        {data.size && (
                            <Typography
                                className={classes.subText}
                                variant="body1"
                                color="textPrimary"
                                component="span"
                            >
                                size: {data.size}
                            </Typography>
                        )}
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        style={{ display: 'flex' }}
                        direction="row"
                    >
                        <Typography
                            className={classes.subText}
                            variant="body1"
                            color="textPrimary"
                            component="span"
                            style={{
                                paddingRight: 4,
                                textDecoration: 'line-through',
                            }}
                        >
                            {`₹ ${Math.ceil(mrp) || 1}`}
                        </Typography>
                        <Typography
                            className={classes.subText}
                            variant="body1"
                            color="textPrimary"
                            component="span"
                        >
                            {`₹ ${Math.ceil(price) || 1}`}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
