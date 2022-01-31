import React, { useState, useEffect } from 'react'
import {
    Box,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    Grid,
    ButtonGroup,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    InputLabel,
    DialogActions,
} from '@material-ui/core'
import {
    useAuthState,
    useCreateReview,
    useDeleteReview,
    useOrders,
    useReviews,
    useUpdateReview,
} from '../../libs'
import GridList from '../../ui/List/GridList'
import { useRouter } from 'next/router'
import { ShoppingCart } from '@material-ui/icons'
import ReviewCard from './review'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ProductImages from '../../ui/ProductImages'
import { Rating } from '@material-ui/lab'
import { useGridItemStyles } from './useGridItemStyles'

const reviewSchema = Yup.object().shape({
    productId: Yup.string().required('Product is required'),
    title: Yup.string().required('Title is required'),
    description: Yup.string().min(4).required('Description is required'),
    images: Yup.array().of(
        Yup.object().shape({
            fileType: Yup.string().required('fileType is required'),
            contentType: Yup.string().required('contentType is required'),
            url: Yup.string().required('url is required'),
        })
    ),
    tags: Yup.array(),
    rating: Yup.number().required('Rating is required'),
    published: Yup.boolean().required(),
})

type TStyles = {
    background: string
    color: string
}[]

export const styles: TStyles = [
    {
        background: '#ffffff',
        color: '#0f0f0f',
    },
    {
        background: '#0f0f0f',
        color: '#ffffff',
    },
    { background: '#906039', color: '#ffffff' },
    {
        background: '#d3b7a1',
        color: '#ffffff',
    },
    {
        background: '#d88ea3',
        color: '#ffffff',
    },
    {
        background: '#286dc1',
        color: '#0f0f0f',
    },
    {
        background: '#74D125',
        color: '#0f0f0f',
    },
]

export function GridItem({
    styleIndex = 0,
    title,
    description,
    price,
    images,
    onClick,
}: {
    styleIndex: number
    title: string
    description: string
    price: string
    images: { url: string }[]
    onClick: () => any
}) {
    const classes = useGridItemStyles({ styleIndex })
    const [image, setImage] = useState(0)
    const [addToCartVisible, setAddToCartVisible] = useState(false)
    return (
        <Card className={classes.root} onClick={onClick}>
            <CardMedia
                className={classes.image}
                onMouseEnter={() => setImage(image + 1)}
                onMouseLeave={() => setImage(0)}
                image={images?.[image % images.length]?.url}
                title={title}
            />
            <CardContent
                className={classes.card}
                onMouseEnter={() => setAddToCartVisible(true)}
                onMouseLeave={() => setAddToCartVisible(false)}
            >
                <Typography
                    className={classes.title}
                    variant="h4"
                    title={title}
                >
                    {title}
                </Typography>
                <Typography className={classes.description} variant="subtitle2">
                    {description}
                </Typography>
                <Box display="flex" flex={1}>
                    <Box className={classes.costContainer}>
                        <Typography
                            className={classes.cost}
                            children={`₹ ${price}`}
                            variant="subtitle2"
                        />
                    </Box>
                    <Box className={classes.addToCartContainer}>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            style={{ opacity: addToCartVisible ? 1 : 0 }}
                            className={classes.button}
                            startIcon={
                                <ShoppingCart
                                    style={{ width: 14, height: 14 }}
                                />
                            }
                        >
                            Add to Cart
                        </Button>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}

export function Reviews({ id }: { id: string }) {
    const query = useReviews(id)
    const createReview = useCreateReview()
    const updateReview = useUpdateReview()
    const deleteReview = useDeleteReview()
    const [selected, setSelected] = useState(null)
    const router = useRouter()
    const authState = useAuthState()
    const orders = useOrders()
    const { user } = authState
    const [hasOrdered, setHasOrdered] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const hasOrdered =
            orders?.data?.pages?.some((page) => {
                const pageData = page?.data as any[]
                return !!pageData?.some((order) => {
                    if (order.status === 'SHIPPED') {
                        return order.cart.items.some(
                            (item) => item['productId'] === id
                        )
                    }
                    return false
                })
            }) || false
        setHasOrdered(hasOrdered)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orders])
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        resetForm()
        setOpen(false)
    }
    const initialValues = {
        productId: id,
        title: '',
        description: '',
        images: [],
        tags: [],
        rating: 5,
        published: true,
    }
    const {
        values,
        setFieldValue,
        isValid,
        touched,
        errors,
        handleChange,
        setValues,
        handleSubmit,
        validateForm,
        setTouched,
        handleBlur,
        resetForm,
    } = useFormik({
        initialValues,
        validateOnMount: true,
        enableReinitialize: true,
        validationSchema: reviewSchema,
        onSubmit: (data) => {
            if (selected) {
                updateReview.mutate(
                    {
                        id: selected,
                        body: data,
                    },
                    {
                        onSuccess: ({ data }) => {
                            handleClose()
                        },
                    }
                )
            } else {
                createReview.mutate(data, {
                    onSuccess: ({ data }) => {
                        handleClose()
                    },
                })
            }
        },
    })

    return (
        <>
            <Grid container xs={12}>
                <GridList
                    query={query}
                    emptyListCaption="No Reviews Yet"
                    renderItem={({ item, index }) => (
                        <ReviewCard
                            editable={
                                item.userId === authState?.['user']?.['id']
                            }
                            {...item}
                            onEdit={() => {
                                setSelected(item.id)
                                setValues({ ...item })
                                handleClickOpen()
                            }}
                            onDelete={() => {
                                deleteReview.mutate(item.id, {
                                    onSettled: () => {
                                        setSelected(null)
                                    },
                                })
                            }}
                            selected
                            key={item.id}
                        />
                    )}
                    ListHeaderComponent={
                        hasOrdered ? (
                            <Grid
                                container
                                item
                                xs={12}
                                justify="flex-end"
                                style={{ display: 'flex' }}
                            >
                                <ButtonGroup>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="medium"
                                        onClick={() => {
                                            handleClickOpen()
                                        }}
                                    >
                                        Add
                                    </Button>
                                </ButtonGroup>
                            </Grid>
                        ) : null
                    }
                />
            </Grid>
            <Dialog open={open} onClose={handleClose} scroll="body" fullWidth>
                <DialogTitle>{selected ? 'Edit' : 'Add'} Review</DialogTitle>
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="title"
                                name="title"
                                label="Title"
                                placeholder="Eg. Awesome build quality"
                                fullWidth
                                autoComplete="off"
                                value={values.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.title ? !!errors.title : false}
                                helperText={touched.title ? errors.title : ''}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="description"
                                name="description"
                                label="Description"
                                fullWidth
                                multiline
                                rows={6}
                                placeholder="Eg. Great deal at 44,900.00 thank you. This was the best deal just like the Black Friday sale or say the Boxing day sale"
                                autoComplete="off"
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
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel
                                required
                                error={touched.rating ? !!errors.rating : false}
                                style={{ paddingLeft: 24, paddingBottom: 12 }}
                                children="Rating"
                                shrink={true}
                                margin="dense"
                            />
                            <Rating
                                size="large"
                                id="rating"
                                name="rating"
                                value={values.rating}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <ProductImages
                                values={values}
                                setFieldValue={setFieldValue}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Box
                        display="flex"
                        flex={1}
                        width={'100%'}
                        justifyContent="flex-end"
                        pt={1.6}
                        pb={1.6}
                    >
                        <Button
                            onClick={handleClose}
                            color="primary"
                            variant="text"
                            size="medium"
                            style={{ marginRight: 16 }}
                        >
                            Cancel
                        </Button>

                        <Button
                            onClick={(e) => {
                                if (!isValid) {
                                    return;
                                }
                                handleSubmit()
                            }}
                            size="medium"
                            color="primary"
                            variant="contained"
                        >
                            Save
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </>
    )
}
