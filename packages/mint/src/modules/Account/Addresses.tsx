import React from 'react'
import {
    createStyles,
    makeStyles,
    Theme,
    useTheme,
} from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import {
    config,
    useAddresses,
    useAuthState,
    useCountries,
    useCreateAddress,
    useDeleteAddress,
    useLocalities,
    useStates,
    useUpdateAddress,
} from '../../libs'
import { AddressFeed } from '../../ui'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    ButtonGroup,
    Grid,
    Typography,
} from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import * as Yup from 'yup'
import { useFormik } from 'formik'
import { AsyncListInput } from '../../ui/Addresses/AsyncListInput'
import { useDebounce } from 'use-debounce'
import { PlaceInput } from '../../ui/Addresses/PlaceInput'

const addressSchema = Yup.object().shape({
    fullname: Yup.string().required('Fullname is required'),
    address: Yup.string(),
    region: Yup.string(),
    nearby: Yup.string(),
    zipcode: Yup.string().required('Zipcode is required'),
    locality: Yup.object().required('Locality is required'),
    state: Yup.object().required('State is required'),
    country: Yup.object().required('Country is required'),
    email: Yup.string().email().required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    isSameBillingAddress: Yup.boolean(),
})

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            // @ts-ignore
            fontWeight: theme.typography.fontWeightRegular,
        },
    })
)

export function Addresses({
    title = 'Addresses',
    defaultExpanded = true,
    selected,
    setSelected,
    header,
    children,
    ...rest
}) {
    const classes = useStyles()
    const userAddresses = useAddresses(
        {},
        {
            onSuccess: ({ pages }) => {
                if (
                    defaultExpanded &&
                    !selected &&
                    pages?.length > 0 &&
                    pages[0].data.length > 0
                ) {
                    setSelected(pages[0].data[0].id)
                }
            },
        }
    )
    const createAddress = useCreateAddress()
    const updateAddress = useUpdateAddress()
    const deleteAddress = useDeleteAddress()

    const theme = useTheme()
    const [open, setOpen] = React.useState(false)
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        resetForm()
        setOpen(false)
    }
    const authState = useAuthState()
    const { user } = authState
    const initialValues = {
        fullname: '',
        addressSearch: '',
        address: '',
        region: '',
        nearby: '',
        zipcode: '',
        localitySearch: '',
        locality: {
            code: '',
            name: '',
        },
        stateSearch: '',
        state: {
            code: '',
            name: '',
        },
        countrySearch: '',
        country: {
            code: '',
            name: '',
        },
        email: user?.email || '',
        phone: user?.phone || '',
        ...(config.isProduction
            ? {}
            : {
                  fullname: 'Shubham Jain',
                  addressSearch: '',
                  address: 'H 116, A-1 Sector 6, Rohini',
                  region: 'Rohini',
                  nearby: 'Aggarwal sweets',
                  zipcode: '110085',
                  localitySearch: '',
                  locality: {
                      code: 'IN_DL_1000',
                      name: 'Rohini',
                  },
                  stateSearch: '',
                  state: {
                      code: 'IN_DL',
                      name: 'Delhi',
                  },
                  countrySearch: '',
                  country: {
                      code: 'IN',
                      name: 'India',
                  },
                  email: user?.email || '',
                  phone: user?.phone || '+918123456789',
              }),
    }

    const {
        values,
        isValid,
        touched,
        errors,
        handleChange,
        setValues,
        handleSubmit,
        setFieldValue,
        handleBlur,
        resetForm,
    } = useFormik({
        initialValues,
        validateOnMount: true,
        enableReinitialize: true,
        validationSchema: addressSchema,
        onSubmit: (data) => {
            const {
                addressSearch,
                localitySearch,
                countrySearch,
                stateSearch,
                ...other
            } = data
            if (selected) {
                updateAddress.mutate(
                    {
                        addressId: selected,
                        body: {
                            ...other,
                            address: other.address || addressSearch,
                            locality: other.locality.name || localitySearch,
                            state: other.state.code || stateSearch,
                            country: other.country.code || countrySearch,
                        },
                    },
                    {
                        onSuccess: () => {
                            handleClose()
                        },
                    }
                )
            } else {
                createAddress.mutate(
                    {
                        ...other,
                        locality: other.locality.name,
                        state: other.state.code,
                        country: other.country.code,
                    },
                    {
                        onSuccess: () => {
                            handleClose()
                        },
                    }
                )
            }
        },
    })

    const [debouncedCountryFilters] = useDebounce(
        { name: values.countrySearch },
        2000
    )
    const countries = useCountries(debouncedCountryFilters)
    const [debouncedStateFilters] = useDebounce(
        {
            name: values.stateSearch,
            countryCode: values?.country?.code,
        },
        2000
    )
    const [debouncedLocalityFilters] = useDebounce(
        {
            name: values.localitySearch,
            countryCode: values?.country?.code,
            stateCode: values?.state?.code,
        },
        2000
    )
    const states = useStates(debouncedStateFilters)
    const localities = useLocalities(debouncedLocalityFilters)
    return (
        <>
            <Box className={classes.root} {...rest}>
                <Accordion
                    color="primary"
                    defaultExpanded={defaultExpanded}
                    variant="outlined"
                    style={{ border: 'none' }}
                >
                    <AccordionSummary
                        color="primary"
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <Typography variant="subtitle2">{title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails color="primary">
                        <Grid container>
                            {header && (
                                <Grid
                                    item
                                    xs={12}
                                    justifyContent="space-between"
                                    style={{ display: 'flex' }}
                                >
                                    <ButtonGroup>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="medium"
                                            onClick={() => {
                                                resetForm()
                                                setSelected(null)
                                                handleClickOpen()
                                            }}
                                        >
                                            Add
                                        </Button>
                                    </ButtonGroup>
                                    {selected && (
                                        <ButtonGroup>
                                            <Button
                                                disabled={!selected}
                                                size="medium"
                                                variant="text"
                                                color="primary"
                                                onClick={async () => {
                                                    let address = null
                                                    for (
                                                        let i = 0;
                                                        i <
                                                        userAddresses.data.pages
                                                            .length;
                                                        i++
                                                    ) {
                                                        const pageData =
                                                            userAddresses.data
                                                                .pages[i]
                                                                .data as any[]
                                                        address = pageData.find(
                                                            (item: any) =>
                                                                item.id ===
                                                                selected
                                                        )
                                                    }
                                                    if (address) {
                                                        await setValues(address)
                                                    }
                                                    handleClickOpen()
                                                }}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                style={{
                                                    backgroundColor:
                                                        theme.palette.error
                                                            .main,
                                                }}
                                                size="medium"
                                                disabled={!selected}
                                                onClick={() => {
                                                    deleteAddress.mutate(
                                                        selected,
                                                        {
                                                            onSuccess: () => {
                                                                setSelected(
                                                                    null
                                                                )
                                                            },
                                                        }
                                                    )
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </ButtonGroup>
                                    )}
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <AddressFeed
                                    data={userAddresses.data?.pages[0].data}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                    {children}
                </Accordion>
            </Box>
            <Dialog
                fullWidth
                open={open}
                onClose={handleClose}
                scroll="body"
                keepMounted={false}
            >
                <DialogTitle>{selected ? 'Edit' : 'Add'} Address</DialogTitle>
                <DialogContent>
                    <Grid container item xs={12} spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="fullname"
                                name="fullname"
                                label="Full Name"
                                placeholder="Eg. Ram Das"
                                fullWidth
                                autoComplete="name"
                                value={values.fullname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={
                                    touched.fullname ? !!errors.fullname : false
                                }
                                helperText={
                                    touched.fullname ? errors.fullname : ''
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <PlaceInput
                                freeSolo
                                required
                                id="address"
                                name="address"
                                label="Address"
                                fullWidth
                                multiline
                                placeholder="Eg. 45, 5th Floor, Industry House, Race Course Road"
                                autoComplete="Address"
                                value={values.address}
                                onChange={(e, v) => {
                                    console.log(e, v)
                                    setFieldValue('address', v)
                                }}
                                // onChange={handleChange}
                                onBlur={handleBlur}
                                error={
                                    touched.address ? !!errors.address : false
                                }
                                helperText={
                                    touched.address ? errors.address : ''
                                }
                                inputValue={values.addressSearch}
                                onInputChange={(e, v) => {
                                    setFieldValue('address', v)
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="region"
                                name="region"
                                label="Region"
                                fullWidth
                                autoComplete="region"
                                value={values.region}
                                placeholder="Eg. Rajgarh"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.region ? !!errors.region : false}
                                helperText={touched.region ? errors.region : ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <AsyncListInput
                                freeSolo
                                query={localities}
                                required
                                id="locality"
                                name="locality"
                                label="City / Province / Town"
                                fullWidth
                                placeholder="Eg. Bangalore"
                                autoComplete="shipping city"
                                value={values.locality}
                                handleNoOptions={(e, val) => {
                                    setFieldValue('locality', {
                                        code: '__',
                                        name: val,
                                    })
                                }}
                                onChange={(e, v) => {
                                    setFieldValue('locality', v)
                                }}
                                inputValue={values.localitySearch}
                                onInputChange={(e, v) => {
                                    setFieldValue('localitySearch', v)
                                }}
                                onBlur={handleBlur}
                                error={
                                    touched.locality ? !!errors.locality : false
                                }
                                helperText={
                                    touched.locality ? errors.locality : ''
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <AsyncListInput
                                query={states}
                                required
                                id="state"
                                name="state"
                                label="State"
                                placeholder="Eg. Karnataka"
                                fullWidth
                                value={values.state}
                                onChange={(e, v) => {
                                    setFieldValue('state', v)
                                }}
                                inputValue={values.stateSearch}
                                onInputChange={(e, v) => {
                                    setFieldValue('stateSearch', v)
                                }}
                                onBlur={handleBlur}
                                error={touched.state ? !!errors.state : false}
                                helperText={touched.state ? errors.state : ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="zipcode"
                                name="zipcode"
                                label="Zip / Postal code"
                                fullWidth
                                placeholder="560001"
                                autoComplete="shipping postal-code"
                                value={values.zipcode}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={
                                    touched.zipcode ? !!errors.zipcode : false
                                }
                                helperText={
                                    touched.zipcode ? errors.zipcode : ''
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="nearby"
                                name="nearby"
                                label="Nearby"
                                fullWidth
                                value={values.nearby}
                                onChange={handleChange}
                                placeholder="Eg. mgm mall"
                                onBlur={handleBlur}
                                error={touched.nearby ? !!errors.nearby : false}
                                helperText={touched.nearby ? errors.nearby : ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <AsyncListInput
                                id="country"
                                name="country"
                                label="Country"
                                placeholder="Eg. India"
                                onBlur={handleBlur}
                                error={
                                    touched.country ? !!errors.country : false
                                }
                                helperText={
                                    touched.country ? errors.country : ''
                                }
                                fullWidth
                                query={countries}
                                value={values.country}
                                onChange={(e, v) => {
                                    setFieldValue('country', v)
                                }}
                                inputValue={values.countrySearch}
                                onInputChange={(e, v) => {
                                    setFieldValue('countrySearch', v)
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="email"
                                name="email"
                                label="Email Address"
                                placeholder="Eg. john@example.com"
                                fullWidth
                                autoComplete="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.email ? !!errors.email : false}
                                helperText={touched.email ? errors.email : ''}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="phone"
                                name="phone"
                                label="Phone"
                                placeholder="Eg. +918022250763"
                                fullWidth
                                autoComplete="phone"
                                value={values.phone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.phone ? !!errors.phone : false}
                                helperText={touched.phone ? errors.phone : ''}
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
                            onClick={() => {
                                if (!isValid) {
                                    return
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
