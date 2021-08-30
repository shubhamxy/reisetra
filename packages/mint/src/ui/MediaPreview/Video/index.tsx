/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import { Box, Dialog, Typography } from '@material-ui/core'
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary'
const useStyles = makeStyles((theme) => ({
    root: {
        padding: '16px 0px 16px 0px',
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        flex: 1,
        overflow: 'scroll',
        alignItems: 'center',
        justifyContent: 'center',
    },
    gridItem: {
        display: 'flex',
        flexDirection: 'column',
        marginRight: '10px',
        marginBottom: '10px',
        borderRadius: '8px',
        position: 'relative',
        maxWidth: '100%',
        maxHeight: '200px',
        '&:hover': {
            transition:
                'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        },
        '&:last-child': {
            marginRight: 0,
        },
    },
    icon: {
        width: '100%',
        objectFit: 'cover',
        height: '64px',
        position: 'absolute',
        margin: '0 auto',
        zIndex: 10,
        cursor: 'pointer',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200px',
    },
    preview: {
        borderRadius: '8px',
        height: '100%',
        objectFit: 'contain',
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '4px',
        overflow: 'hidden',
        padding: theme.spacing(0.4, 0.4, 1, 0.4),
    },
    emptyContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        borderRadius: '4px',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(0.4, 0.4, 1, 0.4),
    },
    emptyText: {
        color: fade('#292C2E', 0.6),
        fontSize: 14,
        fontWeight: 500,
    },
    title: {
        fontSize: 14,
        fontWeight: 600,
        lineHeight: '19px',
        color: '#131415',
        display: '-webkit-box',
        WebkitLineClamp: 1,
        overflow: 'hidden',
        WebkitBoxOrient: 'vertical',
        wordBreak: 'break-all',
    },
    subtitle: {
        fontSize: 12,
        fontWeight: 500,
        color: '#B0BAC5',
    },
    viewMoreWrap: {
        display: 'flex',
        padding: theme.spacing(2, 2, 2, 2),
        alignItems: 'flex-end',
        flex: 1,
    },
    viewMoreText: {
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '19px',
        color: fade('#131415', 0.6),
    },
    closeBtn: {
        height: 26,
        width: 26,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        lineHeight: 0,
        borderRadius: '50%',
        background: fade('#0f0f0f', 0.1),
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        margin: 0,
        padding: 0,
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 100,
    },

    closePreviewBtn: {
        height: 26,
        width: 26,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        lineHeight: 0,
        borderRadius: '50%',
        background: '#0f0f0f',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        margin: 0,
        padding: 0,
        position: 'absolute',
        top: 10,
        right: 10,
        opacity: 0.8,
        '&:hover': {
            opacity: 1,
        },
        transition: 'opacity ease 0.8s',
    },
    previewContainer: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        position: 'relative',
    },
    paper: {
        borderRadius: '12px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'transparent',
        width: '100%',
        maxWidth: '720px',
        overflow: 'hidden',
    },
    video: {
        objectFit: 'contain',
        display: 'flex',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    titleBar: {},
}))

export default function VideoPreview({
    style,
    className,
    data,
    readOnly,
    showTitleBar = false,
    showRemoveIcon = false,
    handleRemoveItem,
    ...other
}) {
    const classes = useStyles()
    const [isOpen, setIsOpen] = useState(false)
    const [openDoc, setOpenDoc] = useState({})
    if (!data || data.length === 0) {
        return null
    }
    return (
        <Box
            component="div"
            contentEditable={false}
            style={style}
            className={`${className ? className + ' ' : ''}${classes.root}`}
            {...other}
        >
            {data.map((item, index) => (
                <Box key={index} className={classes.gridItem}>
                    <Box
                        className={classes.container}
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            setIsOpen(true)
                            setOpenDoc(item)
                        }}
                    >
                        <video className={classes.preview}>
                            <source src={item?.mediaUrl} />
                        </video>
                        <VideoLibraryIcon
                            color="action"
                            className={classes.icon}
                        />
                    </Box>

                    {showTitleBar && (
                        <Typography
                            children={item.mediaName}
                            className={classes.titleBar}
                        />
                    )}
                    {showRemoveIcon && (
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                handleRemoveItem(e, index, item)
                            }}
                            className={classes.closeBtn}
                        >
                            &#xd7;
                        </button>
                    )}
                </Box>
            ))}
            <Dialog
                scroll="paper"
                maxWidth="lg"
                keepMounted={false}
                open={isOpen}
                fullWidth
                classes={{
                    paper: classes.paper,
                    container: classes.previewContainer,
                }}
                onClose={() => {
                    setIsOpen(false)
                    setOpenDoc({})
                }}
                onBackdropClick={() => {
                    setIsOpen(false)
                    setOpenDoc({})
                }}
                style={{ backgroundColor: 'transparent' }}
            >
                <video controls className={classes.video} autoPlay>
                    {/* @ts-ignore */}
                    <source src={openDoc?.url} />
                </video>
                <button
                    onClick={() => setIsOpen(false)}
                    className={classes.closePreviewBtn}
                >
                    &#xd7;
                </button>
            </Dialog>
        </Box>
    )
}
