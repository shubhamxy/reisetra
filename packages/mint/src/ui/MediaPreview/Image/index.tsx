import React, { useState } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Box, Dialog, Typography } from '@material-ui/core'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import Image from 'next/image'
import { ImageWithZoom } from './ZoomableImage'

const useStyles = makeStyles<
    Theme,
    {
        objectFit: any
        cellWidth: any
        cellHeight: any
        length: number
        borderRadius: string
        selected: boolean
    }
>((theme) => ({
    root: {
        padding: 0,
        margin: 0,
        width: '100%',
    },
    gridList: ({ length, selected }) => ({
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridTemplateRows: 'repeat(12, 1fr)',
        gridGap: '4px',
        alignItems: 'stretch',
        justifyItems: 'center',
        margin: 'auto',
        ...(selected !== undefined
            ? {
                  border: `1px solid ${
                      selected ? theme.palette.primary.main : 'transparent'
                  }`,
              }
            : {}),
    }),
    gridItem: ({ length, borderRadius }) => ({
        borderRadius: borderRadius || '2px',
        display: 'flex',
        cursor: 'pointer',
        width: '100%',
        gridColumn: 'span 3',
        gridRow: 'span 4',
        height: '100%',
        maxHeight: '100px',
        minHeight: '100px',
        border: `1px solid transparent`,
        '&:hover': {
            border: `1px solid ${theme.palette.primary.main}`,
            '& .closebtn': {
                opacity: 1,
            },
        },
        '&:nth-child(1)': {
            gridColumn: 'span 12',
            gridRow: 'span 8',
            height: '100%',
            maxHeight: '320px',
            minHeight: '320px',
            alignItems: 'center',
            '&:hover': {
                border: `1px solid transparent`,
                '& .closebtn': {
                    opacity: 1,
                },
            },
        },
        justifyContent: 'center',
    }),

    list: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gridTemplateRows: '1fr',
        gridGap: '4px',
        alignItems: 'start',
        justifyItems: 'center',
        margin: 'auto',
        overflow: 'hidden',
    },
    listItem: ({ cellHeight, cellWidth, borderRadius }) => ({
        display: 'flex',
        cursor: 'pointer',
        width: cellWidth || '100%',
        gridColumn: 'span 1',
        gridRow: 'span 1',
        height: cellHeight || '100px',
        justifyContent: 'center',
        borderRadius: borderRadius || '0px',
        overflow: 'hidden',
        '&:hover': {
            '& button': {
                opacity: 1,
            },
        },
    }),
    image: ({ objectFit }) => ({
        objectFit: objectFit || 'cover',
        height: '100%',
        width: '100%',
    }),
    imageback: ({ objectFit }) => ({
        position: 'absolute',
        right: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: objectFit || 'cover',
        zIndex: 0,
    }),
    imageBg: {
        background: '#fafafa',
        objectFit: 'cover',
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, ' +
            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    icon: {
        color: 'white',
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
        background: '#0f0f0f',
        color: '#ffffff',
        border: 'none',
        cursor: 'pointer',
        margin: 0,
        padding: 0,
        position: 'absolute',
        top: 10,
        right: 10,
        opacity: 0,
        '&:hover': {
            opacity: 1,
        },
        transition: 'opacity ease 0.4s',
    },
    paper: {
        background: 'transparent',
        boxShadow: 'none',
        backgroundColor: theme.palette.common.black,
        height: '100%',
        width: '100%',
        margin: 0,
        padding: 0,
        borderRadius: 0,
    },
    scrollPaper: {
        borderRadius: 0,
    },
    previewContainer: {
        backgroundColor: 'rgba(0,0,0,0.02)',
        backdropFilter: 'blur(2px)',
    },
    dialogRoot: {
        borderRadius: 0,
    },
    previewimage: {
        objectFit: 'contain',
        display: 'flex',
        maxWidth: '100%',
        maxHeight: '100%',
        flex: 1,
        borderRadius: 4,
        overflow: 'hidden',
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
        background: '#ffffff',
        color: '#0f0f0f',
        border: 'none',
        cursor: 'pointer',
        margin: 0,
        padding: 0,
        position: 'absolute',
        top: '10px',
        right: '10px',
        opacity: 1,
        '&:hover': {
            opacity: 1,
        },
        transition: 'opacity ease 0.8s',
    },
    enableZoom: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        padding: 0,
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        opacity: 1,
        '&:hover': {
            opacity: 1,
        },
        transition: 'opacity ease 0.8s',
    },
    prev: {
        height: 40,
        width: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 30,
        borderRadius: '50%',
        background: '#ffffff77',
        lineHeight: 0,
        color: '#0f0f0f',
        border: 'none',
        cursor: 'pointer',
        margin: 0,
        padding: 0,
        position: 'absolute',
        top: 'calc(50% - 21px)',
        opacity: 1,
        '&:disabled': {
            opacity: 0.3,
        },
        transition: 'opacity ease 0.5s',
        left: '12px',
    },
    next: {
        height: 40,
        width: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        lineHeight: 0,
        borderRadius: '50%',
        background: '#ffffff77',
        color: '#0f0f0f',
        border: 'none',
        cursor: 'pointer',
        margin: 0,
        padding: 0,
        position: 'absolute',
        top: 'calc(50% - 21px)',
        opacity: 0.7,
        '&:disabled': {
            opacity: 0.3,
        },
        right: '12px',
        transition: 'opacity ease 0.5s',
    },
}))

function ListView({
    classes,
    data,
    setOpenIndex,
    showRemoveIcon,
    handleRemoveItem,
    showTitleBar,
    listTileCount,
}) {
    return (
        <Box className={classes.list}>
            {data.slice(0, listTileCount).map((tile, index) => (
                <Box
                    className={classes.listItem}
                    position="relative"
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setOpenIndex(index)
                    }}
                >
                    <img
                        className={classes.image}
                        src={tile.url}
                        alt={tile.title}
                        key={tile.url}
                    />
                    {showRemoveIcon && (
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                handleRemoveItem(e, index, tile)
                            }}
                            className={classes.closeBtn}
                        >
                            &#xd7;
                        </button>
                    )}
                    {showTitleBar && (
                        <Typography
                            children={tile.mediaName}
                            className={classes.titleBar}
                        />
                    )}
                </Box>
            ))}
            {data.length > listTileCount && (
                <Box
                    className={classes.listItem}
                    justifyContent="center"
                    alignItems="center"
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setOpenIndex(listTileCount)
                    }}
                >
                    <Typography
                        children={`+${data.length - listTileCount} more`}
                        variant="body1"
                    />
                </Box>
            )}
        </Box>
    )
}

function GridView({
    classes,
    data,
    setOpenIndex,
    showRemoveIcon,
    handleRemoveItem,
    showTitleBar,
}) {
    const [selectedIndex, setSelectedIndex] = useState(0)
    return (
        <Box className={classes.gridList}>
            <Box
                className={classes.gridItem}
                position="relative"
                onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                }}
            >
                <ImageWithZoom
                    // onDoubleClick={() => setZoom(!zoom)}
                    key={data[selectedIndex].url}
                    alt={`${data[selectedIndex].url}`}
                    src={data[selectedIndex].url}
                />
            </Box>
            {data.slice(0, 3).map((tile, index) => (
                <Box
                    key={tile.url}
                    className={classes.gridItem}
                    position="relative"
                    onMouseEnter={() => setSelectedIndex(index)}
                    onTouchEnd={() => setSelectedIndex(index)}
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setOpenIndex(index)
                    }}
                >
                    <Image
                        className={classes.image}
                        src={tile.url}
                        alt={tile.title}
                        key={tile.url}
                        layout="fill"
                        // width="300px"
                        // height="300px"
                    />
                    {showRemoveIcon && (
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                handleRemoveItem(e, index, tile)
                            }}
                            className={`${classes.closeBtn}`}
                        >
                            &#xd7;
                        </button>
                    )}
                    {showTitleBar && (
                        <Typography
                            children={tile.mediaName}
                            className={classes.titleBar}
                        />
                    )}
                </Box>
            ))}
            {data.length > 3 && (
                <Box
                    className={classes.gridItem}
                    height="100%"
                    minHeight="100px"
                    position="relative"
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setOpenIndex(3)
                    }}
                >
                    <Image
                        className={classes.imageback}
                        src={data[3].url}
                        alt={data[3].title}
                        key={data[3].url}
                        layout="fill"
                    />
                    <Box
                        display="flex"
                        width="100%"
                        height="100%"
                        position="absolute"
                        bgcolor="rgba(46, 46, 46, 0.6)"
                        // style={{backdropFilter: "blur(4px)"}}
                        justifyContent="center"
                        alignItems="center"
                        zIndex={1}
                    >
                        <Typography
                            style={{ color: '#fff', fontSize: '20px' }}
                            children={`+${data.length - 3} more`}
                            variant="caption"
                        />
                    </Box>
                </Box>
            )}
        </Box>
    )
}

interface DataT {
    url: string
    title?: string
}

interface ImagePreview {
    [x: string]: any

    data: DataT[]
    style?: any
    className?: any
    cellHeight?: any
    borderRadius?: any
    cellWidth?: any
    variant?: string
    objectFit?: string
    selected?: any
    focused?: any
    showTitleBar?: boolean
    showRemoveIcon?: boolean
    handleRemoveItem?: (
        e: React.MouseEvent<HTMLElement, MouseEvent>,
        index: number,
        tile: DataT
    ) => any
    listTileCount?: number
}

export default function ImagePreview({
    style,
    className,
    cellHeight,
    borderRadius,
    cellWidth,
    variant = 'grid',
    objectFit = 'cover',
    selected,
    focused,
    data,
    showTitleBar = false,
    showRemoveIcon = false,
    handleRemoveItem,
    listTileCount = 4,
    ...other
}: ImagePreview) {
    const classes = useStyles({
        length: data?.length,
        objectFit,
        cellWidth,
        cellHeight,
        borderRadius,
        selected,
    })
    const [openIndex, setOpenIndex] = useState(-1)
    const [zoom, setZoom] = useState(true)
    if (!data || data.length === 0) {
        return null
    }
    return (
        <div
            contentEditable={false}
            style={style}
            className={`${className ? className + ' ' : ''}${classes.root}`}
            {...other}
        >
            {variant === 'grid' ? (
                <GridView
                    classes={classes}
                    data={data}
                    showRemoveIcon={showRemoveIcon}
                    showTitleBar={showTitleBar}
                    setOpenIndex={setOpenIndex}
                    handleRemoveItem={handleRemoveItem}
                />
            ) : (
                <ListView
                    classes={classes}
                    data={data}
                    showRemoveIcon={showRemoveIcon}
                    showTitleBar={showTitleBar}
                    setOpenIndex={setOpenIndex}
                    handleRemoveItem={handleRemoveItem}
                    listTileCount={listTileCount}
                />
            )}

            <Dialog
                maxWidth="lg"
                keepMounted={false}
                open={openIndex > -1}
                fullWidth
                classes={{
                    root: classes.dialogRoot,
                    scrollPaper: classes.scrollPaper,
                    paper: classes.paper,
                    container: classes.previewContainer,
                }}
                onClose={() => setOpenIndex(-1)}
                style={{ backgroundColor: 'transparent', borderRadius: 0 }}
            >
                {openIndex > -1 && data[openIndex]?.url && (
                    <Image
                        onDoubleClick={() => setZoom(!zoom)}
                        layout="fill"
                        className={classes.previewimage}
                        src={data[openIndex]?.url}
                        alt={`${data[openIndex]?.url}`}
                        key={data[openIndex]?.url}
                    />
                )}
                <button
                    onClick={() => setOpenIndex(openIndex - 1)}
                    className={classes.prev}
                    disabled={openIndex === 0}
                >
                    <NavigateBeforeIcon />
                </button>

                <button
                    onClick={() => setOpenIndex(openIndex + 1)}
                    className={classes.next}
                    disabled={openIndex === data.length - 1}
                >
                    <NavigateNextIcon />
                </button>

                {openIndex > -1 && (
                    <button
                        onClick={() => setOpenIndex(-1)}
                        className={classes.closePreviewBtn}
                    >
                        &#xd7;
                    </button>
                )}
                {/* {openIndex > -1 && (
          <FormControlLabel
            className={classes.enableZoom}
            control={
              <Switch
                checked={zoom}
                onChange={(e, checked) => {
                  setZoom(checked);
                }}
                name="Zoom"
                color="primary"
              />
            }
            labelPlacement="start"
            label="Zoom"
          />
        )} */}
            </Dialog>
        </div>
    )
}
