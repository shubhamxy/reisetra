import React, { useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import { formatDistance } from 'date-fns'
import { Rating } from '@material-ui/lab'
import { ImagePreview } from '../../ui/MediaPreview'
import {
    Box,
    ButtonGroup,
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
} from '@material-ui/core'
import { Delete, Edit } from '@material-ui/icons'

const useStyles = makeStyles<any, any>((theme: Theme) =>
    createStyles({
        root: ({ selected }) => ({
            width: '100%',
            alignSelf: 'flex-start',
            cursor: 'pointer',
            ...(selected
                ? {
                      boxShadow: `0px 0px 0px 2px ${theme.palette.primary.main}66`,
                  }
                : {
                      boxShadow: `0px 0px 0px 4px ${theme.palette.background.paper}`,
                  }),
            transition: 'box-shadow ease-in 400ms',
        }),
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        avatar: {
            backgroundColor: red[500],
        },
        description: {
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            wordBreak: 'break-all',
        },
    })
)

export default function ReviewCard({
    title,
    onEdit,
    onDelete,
    selected,
    images,
    rating,
    description,
    createdAt,
    editable,
    user,
}) {
    const classes = useStyles({ selected })
    const [open, setOpen] = useState(false)
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    return (
        <>
            <Card className={classes.root} onClick={handleClickOpen}>
                <CardHeader
                    avatar={
                        <Avatar
                            src={user?.avatar}
                            aria-label="recipe"
                            className={classes.avatar}
                        >
                            {(user?.name ? user?.name : 'A')[0]}
                        </Avatar>
                    }
                    title={user?.name || ''}
                    subheader={formatDistance(new Date(createdAt), new Date(), {
                        addSuffix: true,
                    })}
                />
                <CardContent>
                    <Rating value={rating || 5} readOnly />
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        {title}
                    </Typography>
                    <Typography paragraph className={classes.description}>
                        {description}
                    </Typography>
                </CardContent>
                <Box>
                    <ImagePreview
                        listTileCount={2}
                        variant="list"
                        objectFit="cover"
                        cellWidth={'100px'}
                        data={images}
                    />
                </Box>
            </Card>
            <Dialog open={open} onClose={handleClose} scroll="body" fullWidth>
                <DialogTitle>
                    <CardHeader
                        avatar={
                            <Avatar
                                src={user?.avatar}
                                aria-label="recipe"
                                className={classes.avatar}
                            >
                                {(user?.name ? user?.name : 'A')[0]}
                            </Avatar>
                        }
                        action={
                            editable ? (
                                <ButtonGroup>
                                    <Button
                                        size="medium"
                                        variant="text"
                                        color="primary"
                                        onClick={() => {
                                            handleClose()
                                            onEdit()
                                        }}
                                    >
                                        <Edit
                                            style={{ height: 14, width: 14 }}
                                        />
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="medium"
                                        onClick={() => {
                                            handleClose()
                                            onDelete()
                                        }}
                                    >
                                        <Delete
                                            style={{ height: 14, width: 14 }}
                                        />
                                    </Button>
                                </ButtonGroup>
                            ) : null
                        }
                        title={user?.name || ''}
                        subheader={formatDistance(
                            new Date(createdAt),
                            new Date(),
                            {
                                addSuffix: true,
                            }
                        )}
                    />
                </DialogTitle>
                <DialogContent>
                    <CardContent>
                        <Rating size={'large'} value={rating || 5} readOnly />
                        <Typography
                            variant="h5"
                            color="textSecondary"
                            component="p"
                        >
                            {title}
                        </Typography>
                        <Typography paragraph>{description}</Typography>
                    </CardContent>
                </DialogContent>
            </Dialog>
        </>
    )
}
