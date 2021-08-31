/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { useStyles } from './styles'
import Image from 'next/image'
import { useRouter } from 'next/router'

function useHelper({ slug }) {
    const router = useRouter()

    function handleClick(e) {
        e.preventDefault()
        e.stopPropagation()
        router.push({
            pathname: `/product/${slug}`,
            query: {
                ref: router.asPath,
            },
        })
    }

    return {
        handleClick,
    }
}

export function CheckoutCard({ data }) {
    const { slug, title, price, images } = data.product
    const { handleClick } = useHelper({
        slug,
    })

    const classes = useStyles()
    return (
        <Box className={classes.root} onClick={handleClick}>
            <Box className={classes.cover}>
                <Box
                    borderRadius="12px"
                    overflow="hidden"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    bgcolor="#ffffff"
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
                            objectFit="contain"
                        />
                    ) : (
                        <Image
                            src="/images/fallback.png"
                            className={classes.img}
                            height={62}
                            width={62}
                            objectFit="contain"
                        />
                    )}
                </Box>
            </Box>
            <Box className={classes.content} ml={1.2}>
                <Typography
                    className={classes.contentText}
                    variant="body1"
                    color="textPrimary"
                    component="p"
                >
                    {title}
                </Typography>
                <Box display="flex" flexDirection="column">
                    <Box className={classes.costContainer}>
                        <Box>
                            <Typography
                                children={`Qty.`}
                                variant="caption"
                                style={{ fontSize: 10 }}
                            />
                            <Typography
                                children={`${data.quantity}`}
                                variant="caption"
                                style={{ fontSize: 10, marginLeft: 4 }}
                            />
                        </Box>
                        <Box>
                            <Typography
                                className={classes.cost}
                                children={`₹ ${price * data.quantity}`}
                                variant="subtitle2"
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
