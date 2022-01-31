import React, { useEffect } from 'react'
import * as Yup from 'yup'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { format } from 'date-fns'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { Paper, Link } from '@material-ui/core'
import { useFormik } from 'formik'
import { useAuthState } from '../../libs/rock/auth'
import { config, useCreateSupportTicket, useOrders } from '../../libs'
import { useRouter } from 'next/router'

const SupportSchema = Yup.object().shape({
    order: Yup.object().nullable(),
    subject: Yup.string()
        .required(
            'Subject is required. Subject has to be at least 3 characters.'
        )
        .min(3, 'Subject is too short - should be 3 chars minimum.'),
    ticketId: Yup.string(),
    description: Yup.string()
        .required(
            'Description is required. Description has to be at least 20 characters.'
        )
        .min(20, 'Description is too short - should be 20 chars minimum.'),
})
function getOrderName(order) {
    if (!order) {
        return ''
    }
    return `Order Placed for ${order.cart.items.length} items on
  ${format(new Date(order.createdAt), 'dd MMMM yyyy')}`
}
const useStyles = makeStyles((theme) => ({
    root: {},
    header: {},
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer: {
        display: 'flex',
        minHeight: '60px',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        margin: '77px auto 32px',
        textAlign: 'center',
        justifyContent: 'center',
    },
    links: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 4,
        margin: '24px 0 0 0',
        textAlign: 'center',
    },
    link: {
        ...theme.typography.caption,
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        width: '100%',
        height: '100%',
        textAlign: 'left',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: '0',
        width: '100%',
        height: '100%',
        padding: theme.spacing(4, 2.4, 4, 2.4),
        maxWidth: 620,
    },
    title: {
        textAlign: 'left',
        marginBottom: 12,
    },
    divider: {
        marginTop: 24,
        marginBottom: 12,
        position: 'relative',
        width: '100%',
        textAlign: 'center',
        '&:before': {
            background:
                'linear-gradient(to right, #4f44e0 0%, transparent 40%, transparent 60%, #4f44e0 100%)',
            content: "''",
            display: 'block',
            height: 1,
            position: 'absolute',
            top: 8,
            width: '100%',
        },
    },
    illustration: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    form: {
        width: '100%',
    },
    submit: {
        margin: theme.spacing(1, 0, 1, 0),
    },
    authProviders: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
}))

export function Support() {
    const classes = useStyles()
    const orders = useOrders({ size: 20 })
    const authState = useAuthState()
    const support = useCreateSupportTicket()
    const { isAuthenticated, isHydrated } = authState
    const router = useRouter()
    const {
        values,
        isValid,
        resetForm,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
    } = useFormik({
        enableReinitialize: true,
        initialValues: {
            order: {
                id: (router.query.orderId as string) || '',
                value: (router.query.orderId as string) || '',
            },
            subject: '',
            description: '',
            ticketId: (router.query.ticketId as string) || '',
        },
        validationSchema: SupportSchema,
        onSubmit: function (data) {
            support.mutate(
                {
                    subject: data.subject,
                    ticketId: data.ticketId,
                    description: data.description,
                    orderId: data.order.id,
                },
                {
                    onSuccess: () => {
                        resetForm()
                    },
                }
            )
        },
    })
    let ordersData = []
    orders?.data?.pages?.forEach((page) => {
        ordersData = ordersData.concat(
            // @ts-ignore
            page.data.map((item) => ({
                value: item.id,
                label: getOrderName(item),
            }))
        )
    })
    useEffect(() => {
        if (isHydrated && !isAuthenticated) {
            router.push(
                `/login?redirect_route=${encodeURIComponent(router.asPath)}`
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, isHydrated])
    return (
        <Paper className={classes.paper} component="section">
            <Box className={classes.content}>
                <form
                    className={classes.form}
                    noValidate
                    autoComplete="pleaseturnoff"
                    onSubmit={handleSubmit}
                >
                    <Grid container xs>
                        <Grid item xs={12} style={{ paddingTop: 12 }}>
                            <Autocomplete
                                value={values.order}
                                onChange={(event, newValue) => {
                                    setFieldValue('order', newValue)
                                }}
                                id="order"
                                getOptionLabel={(option) => option.label}
                                options={ordersData}
                                selectOnFocus
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        id="order"
                                        name="order"
                                        label="Order"
                                        fullWidth
                                        value={values.order}
                                        onBlur={handleBlur}
                                        placeholder="eg. order #1"
                                        error={
                                            touched.order
                                                ? !!errors.order
                                                : false
                                        }
                                        helperText={
                                            touched.order ? errors.order : ''
                                        }
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Subject"
                                size="small"
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                multiline
                                name="subject"
                                type="subject"
                                id="subject"
                                value={values.subject}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={
                                    touched.subject ? !!errors.subject : false
                                }
                                helperText={
                                    touched.subject ? errors.subject : ''
                                }
                                placeholder="eg. product not received."
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Description"
                                size="small"
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                multiline
                                rows={8}
                                name="description"
                                type="description"
                                id="description"
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={
                                    touched.description
                                        ? !!errors.description
                                        : false
                                }
                                helperText={
                                    touched.description
                                        ? errors.description
                                        : ''
                                }
                                placeholder="eg. description of the issue"
                            />
                        </Grid>

                        {values.ticketId && (
                            <Grid item xs={12}>
                                <TextField
                                    label="Ticket Id"
                                    size="small"
                                    variant="outlined"
                                    margin="normal"
                                    disabled
                                    fullWidth
                                    multiline
                                    name="ticketId"
                                    type="string"
                                    id="ticketId"
                                    value={values.ticketId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={
                                        touched.ticketId
                                            ? !!errors.ticketId
                                            : false
                                    }
                                    helperText={
                                        touched.ticketId ? errors.ticketId : ''
                                    }
                                    placeholder="eg. 123456789"
                                />
                            </Grid>
                        )}
                        <Grid item xs={12} style={{ marginTop: 24 }}>
                            <Button
                                type="submit"
                                fullWidth
                                size="medium"
                                variant="contained"
                                color="primary"
                                disabled={!isValid}
                                className={classes.submit}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>

                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    p={2}
                >
                    <Typography variant="caption">Or</Typography>
                    <Typography variant="caption">
                        Email us at{' '}
                        <Link
                            underline={'none'}
                            href={`mailto:${config.contactEmail}`}
                        >
                            {config.contactEmail}
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Paper>
    )
}
