import { Box, ButtonGroup, makeStyles, Grid } from '@material-ui/core'
import React, { useState } from 'react'
import { MainLayout } from '../layouts/MainLayout'
import { AppHeader } from '../ui/Header'
import { Footer } from '../ui/Footer'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import { config, useDeleteStory, useStories } from '../libs'

import { useRouter } from 'next/router'
import { GridItem } from '../modules/Stories'
import GridList from '../ui/List/GridList'
import { CreateContent } from '../modules/CreateStory'

const useStyles = makeStyles((theme) => ({
    content: {
        marginBottom: 48,
        display: 'flex',
        flexDirection: 'column',
    },
    left: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    right: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
}))

const CMSPage = () => {
    const classes = useStyles()
    const deleteStory = useDeleteStory()
    const router = useRouter()
    const query = useStories(router.query, true)
    const [open, setOpen] = React.useState(null)
    const [selected, setSelected] = useState(null)
    const handleClickOpen = (key) => () => {
        setOpen(key)
    }

    const handleClose = () => {
        setOpen(null)
        setSelected(null)
    }
    return (
        <MainLayout
            classes={{
                left: classes.left,
                right: classes.right,
            }}
            header={<AppHeader />}
            footer={<Footer />}
        >
            <Box display="flex" flexDirection="column">
                <Grid container item xs={12} spacing={2} justify="flex-end">
                    <ButtonGroup>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="medium"
                            onClick={handleClickOpen('story')}
                        >
                            Add
                        </Button>
                    </ButtonGroup>
                </Grid>
                <GridList
                    query={query}
                    renderItem={({ item, index }) => (
                        <GridItem
                            {...item}
                            showDescription
                            onClick={() => {
                                window.open(
                                    `${config.clientUrl}/story/${item.slug}`,
                                    '__blank'
                                )
                            }}
                            key={item.id}
                            styleIndex={index}
                            handleDelete={(slug) => {
                                deleteStory.mutate(slug)
                                setSelected(null)
                            }}
                            handleEdit={(slug) => {
                                setSelected(slug)
                                handleClickOpen('story')()
                            }}
                        />
                    )}
                />
                <Dialog
                    scroll="body"
                    fullWidth
                    maxWidth="md"
                    open={!!open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <CreateContent
                        id={selected}
                        isUpdate={selected}
                        onSuccess={() => {
                            setSelected(null)
                        }}
                        onCloseHandler={handleClose}
                    />
                </Dialog>
            </Box>
        </MainLayout>
    )
}

export default CMSPage
