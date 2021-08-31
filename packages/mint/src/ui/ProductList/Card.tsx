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
        router.push(`/product/${slug}`)
    }

    return {
        handleClick,
    }
}

export function ProductCard({ data }) {
    const { slug, title, price, images } = data?.product
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
                    width="72px"
                    height="72px"
                >
                    <Image
                        src={images[0]?.url || '/images/fallback.png'}
                        alt={''}
                        height={62}
                        width={62}
                        className={classes.img}
                        objectFit="contain"
                    />
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
                        <Typography
                            className={classes.cost}
                            children={`₹ ${price} x ${data.quantity || 1}`}
                            variant="subtitle2"
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
