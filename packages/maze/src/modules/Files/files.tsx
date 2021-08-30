import React, { useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import {
    Dialog,
    DialogContent,
    Grid,
    Box,
    ButtonGroup,
    DialogActions,
} from '@material-ui/core'
import { Check, Error } from '@material-ui/icons'
import { Button } from '@material-ui/core'
import { format } from 'date-fns'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import { DocsPreview, ImagePreview } from '../../ui/MediaPreview'

const useStyles = makeStyles<any, any>((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            cursor: 'pointer',
            boxShadow: `0px 0px 0px 2px ${theme.palette.primary.main}66`,
            transition: 'box-shadow ease-in 400ms',
            backgroundColor: 'transparent',
        },
        content: {
            paddingBottom: 16,
        },
        description: {
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            wordBreak: 'break-all',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
        },
        head: {},
    })
)

export default function FileCard(data) {
    const {
        url,
        meta: { id, invoice, fileName, contentType },
        fileType,
        userId,
        productId,
        reviewId,
        categoryId,
        tagId,
        storyId,
        orderId,
        active,
        createdAt,
        updatedAt,
    } = data

    const classes = useStyles({ selected: true })
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const Title = () => (
        <Grid xs={12} container justifyContent="center" alignItems="center">
            <Grid container item xs={6}>
                <Grid item xs>
                    <Typography variant="caption">Name</Typography>
                    <Typography variant="subtitle2">{fileName}</Typography>
                </Grid>
                <Grid item xs>
                    <Typography variant="caption">Type</Typography>
                    <Typography variant="subtitle2">{fileType}</Typography>
                </Grid>
            </Grid>

            <Grid
                container
                item
                xs={6}
                justifyContent="center"
                alignItems="center"
                alignContent="center"
            >
                <Grid item xs>
                    <Grid item xs={12}></Grid>
                </Grid>
                <Grid item>
                    <Grid item xs={12}>
                        {fileType === 'images' ? (
                            <ImagePreview
                                data={[data]}
                                variant="list"
                                cellWidth={'100px'}
                                cellHeight={'100px'}
                            />
                        ) : (
                            <DocsPreview
                                markerFeild={'invoice'}
                                data={[data]}
                            />
                        )}
                    </Grid>
                </Grid>
                <Grid
                    item
                    justifyContent="center"
                    alignItems="center"
                    alignContent="center"
                >
                    <ArrowRightIcon />
                </Grid>
            </Grid>
        </Grid>
    )

    const Details = () => (
        <Grid xs={12} container>
            <Grid item xs={12}>
                {fileType === 'images' ? (
                    <ImagePreview data={[data]} />
                ) : (
                    <DocsPreview markerFeild={'invoice'} data={[data]} />
                )}
            </Grid>

            <Grid container item>
                <Grid item xs={12}>
                    <Typography variant="caption">File Created</Typography>
                    <Typography variant="subtitle2">
                        {format(new Date(createdAt), 'dd MMMM yyyy')}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="caption">File Updated</Typography>
                    <Typography variant="subtitle2">
                        {format(new Date(updatedAt), 'dd MMMM yyyy')}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="caption">File Type</Typography>
                    <Typography variant="subtitle2">{fileType}</Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="caption">Content Type</Typography>
                    <Typography variant="subtitle2">{contentType}</Typography>
                </Grid>
            </Grid>

            <Grid container item>
                <Grid item xs={12}>
                    <Typography variant="caption">Active</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle2">
                        {active ? <Check /> : <Error />}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="caption">Invoice?</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle2">
                        {invoice ? <Check /> : <Error />}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="caption">File Id</Typography>
                    <Typography variant="subtitle2">{id}</Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="caption">User Id</Typography>
                    <Typography variant="subtitle2">{userId}</Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="caption">Product Id</Typography>
                    <Typography variant="subtitle2">{productId}</Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="caption">Review Id</Typography>
                    <Typography variant="subtitle2">{reviewId}</Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="caption">Category Id</Typography>
                    <Typography variant="subtitle2">{categoryId}</Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="caption">tag Id</Typography>
                    <Typography variant="subtitle2">{tagId}</Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="caption">Story Id</Typography>
                    <Typography variant="subtitle2">{storyId}</Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="caption">orderId</Typography>
                    <Typography variant="subtitle2">{orderId}</Typography>
                </Grid>
            </Grid>
        </Grid>
    )

    return (
        <>
            <Card
                className={classes.root}
                onClick={handleClickOpen}
                variant="outlined"
            >
                <CardContent className={classes.content}>
                    <Title />
                </CardContent>
            </Card>
            <Dialog open={open} onClose={handleClose} scroll="body" fullWidth>
                <DialogContent>
                    <Grid container>
                        <Grid
                            item
                            xs={12}
                            container
                            alignItems="flex-start"
                            justify="flex-start"
                        >
                            <Box m={1} mt={2}>
                                <Typography
                                    style={{ fontSize: 16 }}
                                    variant="body2"
                                >
                                    File Details
                                </Typography>
                            </Box>
                            <Grid
                                item
                                xs={12}
                                container
                                alignItems="flex-start"
                                justify="flex-start"
                            >
                                <Card style={{ width: '100%' }}>
                                    <CardContent>
                                        <Details />
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* <DialogActions>
            <Box mt={3.2}>
                <ButtonGroup>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="medium"
                  >
                    DELETE
                  </Button>
                </ButtonGroup>
            </Box>
          </DialogActions> */}
                </DialogContent>
            </Dialog>
        </>
    )
}
