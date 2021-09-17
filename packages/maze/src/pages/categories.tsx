import { Box, ButtonGroup, makeStyles, Grid } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { MainLayout } from '../layouts/MainLayout'
import { AppHeader } from '../ui/Header'
import { Footer } from '../ui/Footer'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import {
    config,
    logout,
    useAuthDispatch,
    useAuthState,
    useCategories,
} from '../libs'
import { CreateCategory } from '../modules/CreateCategory'

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
    const router = useRouter()
    const query = useCategories(router.query)
    const [open, setOpen] = React.useState(null)
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
                            onClick={handleClickOpen('category')}
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
                                    `${config.clientUrl}/products?category=${item.label}`
                                )
                            }}
                            key={item.value}
                            styleIndex={index}
                            handleDelete={() => {
                                // deleteProduct.mutate(id);
                            }}
                            handleEdit={(id) => {
                                setSelected(id)
                                handleClickOpen('category')()
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
                    <CreateCategory id={selected} />
                </Dialog>
            </Box>
        </MainLayout>
    )
}

export default CMSPage
