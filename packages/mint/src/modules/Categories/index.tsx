/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react'
import { Box, Card, CardContent, Typography } from '@material-ui/core'
import Image from 'next/image'
import { useCategories, useInterval } from '../../libs'
import { useRouter } from 'next/router'
import GridList from '../../ui/List/GridList'
import { useGridStyles, useGridItemStyles, colors } from './useGridStyles'

// common responsive css grid variants
export function Grid({ children, ...rest }) {
    const classes = useGridStyles()
    return (
        <Box className={classes.root} {...rest}>
            {children}
        </Box>
    )
}

export function GridItem({
    title,
    description,
    descriptionImage1,
    descriptionImage2,
    illustration,
    colorIndex,
    onClick,
    styles,
    images,
}) {
    const classes = useGridItemStyles({ styles, colorIndex })
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
                    {descriptionImage1 && (
                        <Box className={classes.group}>
                            <Image
                                alt=""
                                src={descriptionImage1}
                                height={'40px'}
                                width={'40px'}
                            />
                        </Box>
                    )}
                    {descriptionImage2 && (
                        <Box className={classes.group}>
                            <Image
                                alt=""
                                src={descriptionImage2}
                                height={'40px'}
                                width={'40px'}
                            />
                        </Box>
                    )}

                    {illustration && (
                        <Box className={classes.illustration}>
                            <Image
                                alt=""
                                src={illustration}
                                height={'40px'}
                                width={'40px'}
                            />
                        </Box>
                    )}
                </CardContent>
            )}
        </Card>
    )
}

const Categories = ({ variant = 'default' }) => {
    const router = useRouter()
    const categories = useCategories()
    if (variant === 'infinite') {
        return (
            <GridList
                query={categories}
                renderItem={({ item, index }) => (
                    <GridItem
                        {...item}
                        key={index}
                        colorIndex={index % colors.length}
                    ></GridItem>
                )}
            />
        )
    }
    const categoriesData =
        // @ts-ignore
        categories['data']?.['data']?.map((item) => ({
            ...item,
            title: item.label,
            // illustration: `/images/categories/${item.value}.jpeg`,
            styles: item.styles,
            images: item.images,
        })) || []

    return (
        <Grid>
            {categoriesData.map((item, index) => (
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
                            delete data.query['category']
                        } else {
                            // @ts-ignore
                            data.query['category'] = item.title
                        }
                        router.push(data)
                    }}
                />
            ))}
        </Grid>
    )
}

export default Categories
