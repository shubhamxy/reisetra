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
    useDeleteProduct,
    useOffers,
} from '../libs'
import { CreateOffer } from '../modules/CreateOffer'

import { useRouter } from 'next/router'
import { GridItem } from '../modules/Offers'
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
    const router = useRouter()
    const query = useOffers(router.query)
    const authDispatch = useAuthDispatch()
    useEffect(() => {
        if (
            authState.isHydrated === true &&
            (authState.isAuthenticated === false ||
                (authState.user && authState.user.role !== 'ADMIN'))
        ) {
            authDispatch(logout())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authState])
    const [open, setOpen] = React.useState(null)
    const [setSelected] = useState(null)
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
                            onClick={handleClickOpen('offer')}
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
                                    `${config.clientUrl}/product/${item.slug}`
                                )
                            }}
                            key={item.id}
                            styleIndex={index}
                            handleDelete={(id) => {
                                deleteProduct.mutate(id)
                            }}
                            handleEdit={(id) => {
                                setSelected(id)
                                handleClickOpen('product')()
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
                    <CreateOffer />
                </Dialog>
            </Box>
        </MainLayout>
    )
}

export default CMSPage
