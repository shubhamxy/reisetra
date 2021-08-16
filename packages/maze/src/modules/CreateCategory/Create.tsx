import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ProductDetails from './Details'
import ProductImages from './Images'
import Summary from './Review'
import {
    config,
    updateSnackBar,
    useCreateCategory,
    useCreateProduct,
    useGlobalDispatch,
    useUpdateCategory,
    useUpdateProduct,
} from '../../libs'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Container, TextField } from '@material-ui/core'
import { useQueryClient } from 'react-query'

const createProductSchema = Yup.object().shape({
    label: Yup.string().required('Label is required'),
    value: Yup.string().required('Value is required'),
    styles: Yup.array(),
    images: Yup.array().of(
        Yup.object().shape({
            url: Yup.string().required('url is required'),
        })
    ),
})

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    container: {
        padding: theme.spacing(3),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            padding: theme.spacing(4.6),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}))

const steps = ['Details', 'Images', 'Review']

function StepContent({
    step,
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
    isUpdate,
}) {
    switch (step) {
        case 0:
            return (
                <ProductDetails
                    isUpdate={isUpdate}
                    values={values}
                    touched={touched}
                    errors={errors}
                    handleBlur={handleBlur}
                    setFieldValue={setFieldValue}
                    handleChange={handleChange}
                />
            )
        case 1:
            return (
                <ProductImages
                    values={values}
                    touched={touched}
                    errors={errors}
                    handleBlur={handleBlur}
                    setFieldValue={setFieldValue}
                    handleChange={handleChange}
                />
            )
        case 2:
            return <Summary values={values} />
        default:
            return null
    }
}

export function CreateCategory({id = null}) {
    const classes = useStyles()
    const [activeStep, setActiveStep] = React.useState(0)
    const isUpdate = id !== null;

    const initialValues = {
        label: '',
        value: '',
        images: [],
        styles: [],
        ...(config.isProduction
            ? {}
            : {
                  label: 'Wall Art',
                  value: 'wallart',
                  styles: [],
                  images: [
                      {
                          id: 'ckq4hab850002m9p8kczxmi58/images/1624151986235-81rmYy-6-pL._SL1500_.jpg',
                          contentType: 'image/jpeg',
                          fileType: 'images',
                          fileName: '1624151986235-81rmYy-6-pL._SL1500_.jpg',
                          url: 'https://raw-soda.s3.ap-south-1.amazonaws.com/ckq4hab850002m9p8kczxmi58/images/1624151986235-81rmYy-6-pL._SL1500_.jpg',
                      },
                      {
                          id: 'ckq4hab850002m9p8kczxmi58/images/1624151986236-81U5C8sfZyL._SL1500_.jpg',
                          contentType: 'image/jpeg',
                          fileType: 'images',
                          fileName: '1624151986236-81U5C8sfZyL._SL1500_.jpg',
                          url: 'https://raw-soda.s3.ap-south-1.amazonaws.com/ckq4hab850002m9p8kczxmi58/images/1624151986236-81U5C8sfZyL._SL1500_.jpg',
                      },
                      {
                          id: 'ckq4hab850002m9p8kczxmi58/images/1624151986236-818SUCoRFmL._SL1500_.jpg',
                          contentType: 'image/jpeg',
                          fileType: 'images',
                          fileName: '1624151986236-818SUCoRFmL._SL1500_.jpg',
                          url: 'https://raw-soda.s3.ap-south-1.amazonaws.com/ckq4hab850002m9p8kczxmi58/images/1624151986236-818SUCoRFmL._SL1500_.jpg',
                      },
                  ],
              }),
    }
    const createCategory = useCreateCategory()
    const updateCategory = useUpdateCategory();
    const queryClient = useQueryClient()
    const globalDispatch = useGlobalDispatch()
    const [serverError, setServerErrors] = useState()
    const {
        values,
        setFieldValue,
        isValid,
        touched,
        errors,
        handleChange,
        handleSubmit,
        validateForm,
        setTouched,
        handleBlur,
        resetForm,
    } = useFormik({
        initialValues,
        validateOnMount: true,
        enableReinitialize: true,
        validationSchema: createProductSchema,
        onSubmit: (data) => {
            if(isUpdate) {
                updateCategory.mutate(data, {
                    onSuccess: () => {
                        setActiveStep(activeStep + 1)
                        setServerErrors(null)
                        queryClient.invalidateQueries('categories')
                    },
                    onError: (error) => {
                        globalDispatch(
                            updateSnackBar({
                                message: error['message'] || 'Server Error',
                                type: 'error',
                                open: true,
                            })
                        )
                        setServerErrors(error['errors'])
                    },
                })
                return;
            }

            createCategory.mutate(data, {
                onSuccess: () => {
                    setActiveStep(activeStep + 1)
                    setServerErrors(null)
                    queryClient.invalidateQueries('categories')
                },
                onError: (error) => {
                    globalDispatch(
                        updateSnackBar({
                            message: error['message'] || 'Server Error',
                            type: 'error',
                            open: true,
                        })
                    )
                    setServerErrors(error['errors'])
                },
            })
        },
    })

    const handleNext = () => {
        if (activeStep === 0) {
            setTouched({
                label: true,
                value: true,
            })
        } else if (activeStep === 1) {
        }
        if (activeStep === steps.length - 1) {
            handleSubmit()
            return
        }
        if (isValid) {
            setActiveStep(activeStep + 1)
            return
        }
    }

    const handleBack = () => {
        setActiveStep(activeStep - 1)
    }
    return (
        <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
                <Container className={classes.container}>
                    <Typography component="h1" variant="h6" align="left">
                        {isUpdate ? 'Update' : 'Add'} Category
                    </Typography>
                    <Stepper
                        activeStep={activeStep}
                        className={classes.stepper}
                    >
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Submitted
                                </Typography>
                                <Typography variant="subtitle1">
                                     Added successfully
                                </Typography>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <StepContent
                                    isUpdate={isUpdate}
                                    step={activeStep}
                                    values={values}
                                    touched={touched}
                                    errors={errors}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    setFieldValue={setFieldValue}
                                />
                                <div className={classes.buttons}>
                                    {activeStep !== 0 && (
                                        <Button
                                            onClick={handleBack}
                                            className={classes.button}
                                        >
                                            Back
                                        </Button>
                                    )}
                                    <Button
                                        size="large"
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1
                                            ? 'Submit'
                                            : 'Next'}
                                    </Button>
                                </div>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Container>
            </main>
            {serverError && (
                <TextField
                    inputProps={{
                        style: { fontFamily: 'monospace', fontSize: 12 },
                    }}
                    fullWidth
                    multiline
                    value={JSON.stringify(serverError, null, 4)}
                />
            )}
        </React.Fragment>
    )
}
