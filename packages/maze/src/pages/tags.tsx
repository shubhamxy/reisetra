/* eslint-disable no-unused-vars */
import { Box, ButtonGroup, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import { MainLayout } from '../layouts/MainLayout'
import { AppHeader } from '../ui/Header'
import { Footer } from '../ui/Footer'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import { useAuthState, useDeleteProduct, useTags } from '../libs'
import { Grid } from '@material-ui/core'
import { CreateTag } from '../modules/CreateTag'

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { GridItem } from '../modules/Categories'
import GridList from '../ui/List/GridList'

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
    const deleteProduct = useDeleteProduct()
    const authState = useAuthState()
    const {} = authState
    const router = useRouter()
    const query = useTags(router.query)
    const { push } = router
    const [open, setOpen] = useState(null)
    const [selected, setSelected] = useState(null)
    const handleClickOpen = (key) => () => {
        setOpen(key)
    }

    const handleClose = () => {
        setOpen(null)
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
                            onClick={handleClickOpen('tag')}
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
                            key={item.id}
                            styleIndex={index}
                            handleDelete={(id) => {
                                deleteProduct.mutate(id)
                            }}
                            handleEdit={(id) => {
                                setSelected(id)
                                handleClickOpen('tags')()
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
                    <CreateTag />
                </Dialog>
            </Box>
        </MainLayout>
    )
}

export default CMSPage
