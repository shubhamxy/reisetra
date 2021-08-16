import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { useStyles } from './styles'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Rating } from '@material-ui/lab'

function useHelper({ slug }) {
    const router = useRouter()
    function handleClick(e) {
        e.preventDefault()
        e.stopPropagation()
        router.push(`/product/${slug}?ref=${encodeURIComponent(router.asPath)}`)
    }
    return {
        handleClick,
    }
}

export function ProductCard({ data }) {
    const { id, slug, title, description, rating, ratingsCount, price, mrp, images } =
        data
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
                    {/* <Typography
            className={classes.subText}
            variant="body1"
            color="textPrimary"
            component="span"
          >
            {description}
          </Typography> */}
                    <Box className={classes.costContainer}>
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
                        <Box display="flex" alignItems="center">
                            <Typography
                                className={classes.cost}
                                children={`₹ ${price}`}
                                variant="subtitle2"
                            />
                            <Typography
                                className={classes.cost}
                                children={`(${
                                    (((+mrp - +price) / +mrp) * 100) | 0
                                }% off)`}
                                variant="subtitle2"
                                style={{ marginLeft: 6 }}
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
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
