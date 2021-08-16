import React, { useState } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import {
    Box,
    Card,
    CardContent,
    Typography,
    Menu,
    MenuItem,
    IconButton,
} from '@material-ui/core'
import Image from 'next/image'
import { useInterval } from '../../libs'
import { MoreVert } from '@material-ui/icons'

const useGridItemStyles = makeStyles((theme) => ({
    root: () => ({
        display: 'flex',
        flex: 1,
        position: 'relative',
        flexDirection: 'column',
        alignItems: 'flex-start',
        cursor: 'pointer',
        minHeight: 120,
        justifyContent: 'center',
        mixBlendMode: 'normal',
        borderRadius: 8,
        boxShadow: '0px 4px 12px rgba(15, 15, 15, 0.10)',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
            height: 'unset',
            alignItems: 'center',
        },
    }),
    card: {
        margin: 0,
        padding: '20px 24px 20px 24px',
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    titleContainer: {
        marginLeft: '12px',
        padding: '14px',
        paddingTop: '2px',
        paddingBottom: '2px',
        background: '#0f0f0f10',
        backdropFilter: 'blur(4px)',
        borderRadius: '6px',
    },
    title: {
        ...theme.typography.subtitle2,
        display: '-webkit-box',
        overflow: 'hidden',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        wordBreak: 'break-all',
    },
    description: {
        ...theme.typography.caption,
        display: '-webkit-box',
        overflow: 'hidden',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        wordBreak: 'break-all',
    },
    banner: {},
    cover: {},
    group: {},
    costContainer: {
        display: 'flex',
        flexDirection: 'column',
        bottom: '24px',
        left: '24px',
    },
    addToCartContainer: {
        position: 'absolute',
        bottom: '12px',
        right: '12px',
    },
    button: {
        transition: 'opacity ease-in 0.2s',
    },
    cost: {},
    seeAllText: {
        ...theme.typography.body2,
        fontSize: '12px',
        lineHeight: '14px',
    },
    imageContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '100%',
    },
    media: {
        position: 'relative',
        backgroundColor: '#fff',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        backgroundSize: 'contain',
        height: 0,
        width: '100%',
        paddingTop: '56.25%', // 16:9
    },
    image: {
        transition: 'all ease-in 2s',
    },
}))

export function GridItem({
    name: title,
    value,
    description,
    illustration,
    colorIndex,
    onClick,
    styles,
    images,
    handleEdit,
    handleDelete,
}) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

    const classes = useGridItemStyles({ styles, colorIndex })
    const [image, setImage] = useState(0)
    useInterval(
        () => {
            setImage((image + 1) % images?.length)
        },
        image > 0 && images.length > 0 ? 2000 : null
    )

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        event.stopPropagation()
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <Card
            elevation={0}
            className={classes.root}
            onMouseEnter={() =>
                images?.length > 0 ? setImage((image + 1) % images.length) : ''
            }
            onMouseLeave={() => setImage(0)}
        >
            {/* <Image
        objectPosition="center"
        objectFit={styles && styles[2] ? styles[2] : "cover"}
        className={classes.image}
        src={images?.[image % images.length]?.url || "/images/fallback.png"}
        layout="fill"
      /> */}
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
                    {illustration && (
                        <Box>
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

            <Box className={classes.addToCartContainer} mt={1.4}>
                <IconButton
                    aria-label="settings"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreVert />
                </IconButton>
            </Box>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleEdit(title)
                    }}
                >
                    Edit
                </MenuItem>
                <MenuItem
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleDelete(title)
                    }}
                >
                    Delete
                </MenuItem>
            </Menu>
        </Card>
    )
}
