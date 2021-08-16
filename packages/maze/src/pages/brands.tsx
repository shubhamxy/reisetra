import { Box, ButtonGroup, CircularProgress, Container, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import { MainLayout } from '../layouts/MainLayout'
import { AppHeader } from '../ui/Header'
import { Footer as UIFooter } from '../ui/Footer'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import { config, getTotalCount, getTotalDataCount, logout, useAuthDispatch, useAuthState, useBrands, useDeleteProduct } from '../libs'
import { Grid } from '@material-ui/core'
import { CreateBrand } from '../modules/CreateBrand'

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { GridItem } from '../modules/Brands'
import { Footer, List } from '../ui/List'

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
    const authDispatch = useAuthDispatch();

    const {} = authState
    const router = useRouter()
    const query = useBrands(router.query)
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
            footer={<UIFooter />}
        >
            <Container maxWidth="md">
                <Grid container xs={12} justify="flex-end">
                    <ButtonGroup>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="medium"
                            onClick={handleClickOpen('brand')}
                        >
                            Add
                        </Button>
                    </ButtonGroup>
                </Grid>
                <List
                    classes={{}}
                    variant="infinite"
                    data={query.data}
                    renderItem={({ item, index }) => (
                        <GridItem
                            {...item}
                            showDescription
                            onClick={() => {
                                window.open(
                                    `${config.clientUrl}/products?brand=${item}`
                                )
                            }}
                            key={item.id}
                            styleIndex={index}
                            handleDelete={(id) => {
                                deleteProduct.mutate(id)
                            }}
                            handleEdit={(id) => {
                                setSelected(id)
                                handleClickOpen('brand')()
                            }}
                        />
                    )}
                    ListLoadingComponent={
                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            pt={2}
                            pb={2}
                        >
                            <CircularProgress size={24} />
                        </Box>
                    }
                    ListFooterComponent={
                        <Footer
                            hasNextPage={query?.hasNextPage}
                            fetchNextPage={query?.fetchNextPage}
                            totalDataCount={getTotalDataCount(query?.data)}
                            totalCount={getTotalCount(query?.data)}
                        // isLoading={query.isLoading}
                        />
                    }
                />
                <Dialog
                    scroll="body"
                    fullWidth
                    maxWidth="md"
                    open={!!open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <CreateBrand />
                </Dialog>
            </Container>
        </MainLayout>
    )
}

export default CMSPage
