/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import { Box, Tooltip } from '@material-ui/core'
import { CloudDownload } from '@material-ui/icons'
import { saveAs } from 'file-saver'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 24,
    },
    gridList: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        flex: 1,
    },
    gridItem: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        justifyContent: 'center',
        borderRadius: '4px',
        width: '100px',
        height: '100px',
        position: 'relative',
        boxShadow: `0px 0px 0px 4px ${theme.palette.primary.main}33`,
        marginRight: '12px',
        '&:last-child': {
            marginRight: 0,
        },
    },
    icon: {
        width: '100%',
        objectFit: 'cover',
        height: '64px',
    },
    container: {
        display: 'flex',
    },
    image: {
        objectFit: 'cover',
        height: '80px',
        width: '80px',
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
        fontSize: 12,
        fontWeight: 500,
        lineHeight: '19px',
        color: '#2E2E2E',
        display: '-webkit-box',
        WebkitLineClamp: 1,
        overflow: 'hidden',
        WebkitBoxOrient: 'vertical',
        wordBreak: 'break-all',
        maxWidth: '100px',
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
        height: 20,
        width: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 14,
        lineHeight: 0,
        borderRadius: '50%',
        background: fade('#0f0f0f', 0.4),
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        margin: 0,
        padding: 0,
        position: 'absolute',
        top: 5,
        right: 6,
    },
    closePreviewBtn: {
        height: 42,
        width: 42,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 30,
        lineHeight: 0,
        borderRadius: '50%',
        background: '#ffffff',
        color: '#0f0f0f',
        border: 'none',
        cursor: 'pointer',
        margin: 0,
        padding: 0,
        position: 'absolute',
        top: 10,
        right: 0,
    },
    paper: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
    },
    previewContainer: {
        borderRadius: '12px',
        width: '100%',
        maxWidth: '720px',
        height: '100%',
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'visible',
    },
    doc: {
        display: 'flex',
        height: '80vh',
        flex: 1,
    },
}))

export default function DocsPreview({
    className,
    data,
    showRemoveIcon = false,
    handleRemoveItem,
    markerFeild = '',
}) {
    const classes = useStyles()
    if (!data || data.length === 0) {
        return null
    }
    return (
        <Box className={`${className ? className + ' ' : ''}${classes.root}`}>
            <Box className={classes.gridList}>
                {data.map((item, index) => (
                    <Box
                        key={index}
                        className={classes.gridItem}
                        style={
                            item && item.meta && item.meta[markerFeild]
                                ? {
                                      boxShadow: `0px 0px 0px 4px #1e88e533`,
                                  }
                                : {}
                        }
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            saveAs(item.url)
                        }}
                    >
                        <Tooltip title={item.meta.fileName}>
                            <Box className={classes.container}>
                                <CloudDownload />
                            </Box>
                        </Tooltip>

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
            </Box>
        </Box>
    )
}
