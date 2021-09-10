import React, { useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import {
    Dialog,
    DialogContent,
    Grid,
    Chip,
    Box,
    ButtonGroup,
    DialogActions,
} from '@material-ui/core'
import { Check, Error } from '@material-ui/icons'
import { Button } from '@material-ui/core'
import {
    useCancelOrder,
    useOrder,
    useOrderInvoice,
    useUpdateOrder,
} from '../../libs'
import { ProductList } from '../../ui/ProductList'
import { format } from 'date-fns'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import { saveAs } from 'file-saver'
import { Create } from '../CreateOrder'

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

export default function OrderCard(orderData) {
    const [data, setData] = useState(orderData)
    const {
        id,
        subTotal,
        itemDiscount,
        tax,
        shipping,
        total,
        discount,
        grandTotal,
        promo,
        userId,
        addressId,
        cartId,
        status,
        active,
        createdAt,
        updatedAt,
        documents,
        address: {
            fullname,
            address,
            region,
            nearby,
            zipcode,
            city,
            state,
            country,
            phone,
            email,
        },
        cart,
        user,
        selected,
    } = data

    const classes = useStyles({ selected })
    const cancelOrder = useCancelOrder()
    const updateOrder = useUpdateOrder()
    const [open, setOpen] = useState(false)

    const [openEdit, setOpenEdit] = useState(false)

    useOrder(id, {
        enabled: open,
        onSuccess: ({ data }) => {
            setData(data)
        },
    })
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const handleClickEditOpen = () => {
        setOpenEdit(true)
    }
    const handleEditClose = () => {
        setOpenEdit(false)
    }

    const Title = () => (
        <Grid xs={12} container justifyContent="center" alignItems="center">
            <Grid container item xs={6}>
                <Grid item xs>
                    <Typography variant="caption">ORDER PLACED</Typography>
                    <Typography variant="subtitle2">
                        {format(new Date(createdAt), 'dd MMMM yyyy')}
                    </Typography>
                </Grid>
                <Grid item xs>
                    <Typography variant="caption">TOTAL</Typography>
                    <Typography variant="subtitle2">{`₹ ${grandTotal}`}</Typography>
                </Grid>
                <Grid item xs>
                    <Typography variant="caption">SHIP TO</Typography>
                    <Typography variant="subtitle2">{fullname}</Typography>
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
                <Grid
                    item
                    xs
                    justifyContent="center"
                    alignItems="center"
                    alignContent="center"
                >
                    <Button
                        variant="text"
                        color="primary"
                        size="medium"
                        disabled={!documents || documents.length === 0}
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            if (documents && documents.length > 1) {
                                handleClickEditOpen()
                            } else {
                                saveAs(documents[0].url)
                            }
                        }}
                    >
                        <Typography variant="caption">INVOICE</Typography>
                    </Button>
                </Grid>
                <Grid
                    item
                    xs
                    justifyContent="center"
                    alignItems="center"
                    alignContent="center"
                >
                    <Button
                        variant="text"
                        color="primary"
                        size="medium"
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleClickEditOpen()
                        }}
                    >
                        <Typography variant="caption">EDIT</Typography>
                    </Button>
                </Grid>
                <Grid item>
                    <Chip
                        variant="outlined"
                        style={{ minWidth: 120 }}
                        label={
                            <Typography variant="caption">
                                {String(status).replace('_', ' ')}
                            </Typography>
                        }
                    />
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

    const HeadLine = () => (
        <Grid xs={12} container>
            <Grid container item>
                <Grid item xs={12}>
                    <Typography variant="caption">Order Placed</Typography>
                    <Typography variant="subtitle2">
                        {format(new Date(createdAt), 'dd MMMM yyyy')}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="caption">Total</Typography>
                    <Typography variant="subtitle2">{`₹ ${grandTotal}`}</Typography>
                </Grid>
            </Grid>
            <Grid container item>
                <Grid item xs={12}>
                    <Typography variant="caption">Order #</Typography>
                    <Typography variant="subtitle2">{id}</Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="caption">Status</Typography>
                    <Typography
                        variant="subtitle2"
                        style={{ textTransform: 'uppercase', fontSize: 12 }}
                    >
                        {String(status).replace('_', ' ')}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )

    const OrderSummary = () => {
        if (!data) {
            return null
        }

        return (
            <Grid xs={12} container>
                <Grid
                    item
                    xs={12}
                    container
                    alignItems="center"
                    justify="center"
                >
                    {cart && (
                        <Grid item xs={12} container>
                            <Grid item xs={12}>
                                <Typography variant="caption">Items</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2">
                                    {cart?.items?.length || '1'}
                                </Typography>
                            </Grid>
                        </Grid>
                    )}
                    <Grid item xs={12} container>
                        <Grid item xs={12}>
                            <Typography variant="caption">Subtotal</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2">
                                ₹{subTotal}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} container>
                        <Grid item xs={12}>
                            <Typography variant="caption">Taxes</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2">₹{tax}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} container>
                        <Grid item xs={12}>
                            <Typography variant="caption">
                                Estimated Shipping
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2">
                                {shipping === 0 ? 'Free' : `₹${shipping || 0}`}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} container>
                        <Grid item xs={12}>
                            <Typography variant="caption">Total</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2">
                                ₹{total || 0}
                            </Typography>
                        </Grid>
                    </Grid>
                    {promo && (
                        <Grid item xs={12} container>
                            <Grid item xs={12}>
                                <Typography variant="caption">Promo</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2">
                                    {promo?.toUpperCase()}{' '}
                                    {discount > 0 ? `(${discount}% off)` : '-'}
                                </Typography>
                            </Grid>
                        </Grid>
                    )}
                    {+data['itemDiscount'] > 0 && (
                        <Grid item xs={12} container>
                            <Grid item xs={12}>
                                <Typography variant="caption">
                                    Discount
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2">
                                    -₹{itemDiscount || 0}
                                </Typography>
                            </Grid>
                        </Grid>
                    )}

                    {+grandTotal > 0 && (
                        <Grid item xs={12} container>
                            <Grid item xs={12}>
                                <Typography variant="caption">
                                    Grand Total
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2">
                                    ₹{grandTotal || 0}
                                </Typography>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        )
    }

    const PaymentInfo = () => {
        if (!data || !data.transaction) {
            return null
        }
        const {
            active,
            amount,
            id: transactionId,
            notes,
            status,
            type,
            verified,
        } = data.transaction
        return (
            <Grid xs container>
                <Grid item xs={12}>
                    <Grid item xs={12}>
                        <Typography variant="caption">Transaction #</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">
                            {transactionId}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="caption">Verified</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">
                            {verified ? <Check /> : <Error />}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="caption">
                            Payment Method
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">{type}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="caption">Coupon</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">
                            {promo || 'None'}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="caption">Notes</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">
                            {notes.join(', ') || 'None'}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="caption">Billing Address</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle2">{fullname}</Typography>
                    <Typography variant="subtitle2">{address}</Typography>
                    <Typography variant="subtitle2">
                        {region}, {nearby}
                    </Typography>
                    <Typography variant="subtitle2">
                        {city}, {state}
                    </Typography>

                    <Typography variant="subtitle2">
                        {country}, {zipcode}
                    </Typography>
                </Grid>
            </Grid>
        )
    }

    const Address = () => {
        if (!data || !data.address) {
            return null
        }

        return (
            <Grid xs={12} container>
                <Grid item>
                    <Typography variant="subtitle2">{fullname}</Typography>
                    <Typography variant="subtitle2">{address}</Typography>
                    <Typography variant="subtitle2">
                        {region}, {nearby}
                    </Typography>

                    <Typography variant="subtitle2">
                        {city}, {state}
                    </Typography>

                    <Typography variant="subtitle2">
                        {country}, {zipcode}
                    </Typography>
                </Grid>
            </Grid>
        )
    }

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
                                    Order Details
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
                                        <HeadLine />
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            container
                            alignItems="center"
                            justify="center"
                        >
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
                                        Shipment Details
                                    </Typography>
                                </Box>
                            </Grid>
                            <ProductList data={data} />
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            container
                            alignItems="center"
                            justify="center"
                        >
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
                                        Payment information
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                container
                                alignItems="flex-start"
                                justify="flex-start"
                            >
                                <Card style={{ width: '100%' }}>
                                    <CardContent>
                                        <PaymentInfo />
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            container
                            alignItems="center"
                            justify="center"
                        >
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
                                        Shipping Address
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                container
                                alignItems="flex-start"
                                justify="flex-start"
                            >
                                <Card style={{ width: '100%' }}>
                                    <CardContent>
                                        <Address />
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            container
                            alignItems="center"
                            justify="center"
                        >
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
                                        Order Summary
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                container
                                alignItems="flex-start"
                                justify="flex-start"
                            >
                                <Card style={{ width: '100%' }}>
                                    <CardContent>
                                        <OrderSummary />
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>

                    <DialogActions>
                        <Box mt={3.2}>
                            {status === 'PENDING' && (
                                <ButtonGroup>
                                    <Button
                                        size="medium"
                                        variant="contained"
                                        color="primary"
                                        // disabled
                                        onClick={() => {
                                            updateOrder.mutate({
                                                orderId: id,
                                                body: {
                                                    status: 'CONFIRMED',
                                                },
                                            })
                                        }}
                                    >
                                        CONFRIM
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="large"
                                        onClick={() => {
                                            cancelOrder.mutate(id)
                                        }}
                                    >
                                        CANCEL
                                    </Button>
                                </ButtonGroup>
                            )}
                        </Box>
                    </DialogActions>
                </DialogContent>
            </Dialog>

            <Dialog
                open={openEdit}
                onClose={handleEditClose}
                scroll="body"
                fullWidth
            >
                <Create isUpdate={true} data={data} />
            </Dialog>
        </>
    )
}
