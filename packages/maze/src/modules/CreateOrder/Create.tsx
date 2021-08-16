import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Details from './Details'
import Documents from './Documents'
import Summary from './Review'
import {
    updateSnackBar,
    useGlobalDispatch,
    useOrder,
    useProduct,
    useUpdateOrder,
} from '../../libs'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ButtonGroup, Container, TextField } from '@material-ui/core'

const Schema = Yup.object().shape({
    title: Yup.string(),
    description: Yup.string(),
    status: Yup.string(),
    documents: Yup.array().of(Yup.object().shape({
        fileName: Yup.string(),
        fileType: Yup.string(),
        contentType: Yup.string(),
        url: Yup.string().required('url is required'),
    })),
    sendUpdate: Yup.bool()
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

const steps = ['Documents', 'Details', 'Summary']

function StepContent({
    step,
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
}) {
    switch (step) {
        case 0:
            return (
                <Documents
                    values={values}
                    setFieldValue={setFieldValue}
                />

            )
        case 1:
            return (
                <Details
                    values={values}
                    touched={touched}
                    errors={errors}
                    handleBlur={handleBlur}
                    setFieldValue={setFieldValue}
                    handleChange={handleChange}
                />
            )
        case 2:
            return (
                <Summary
                    values={values}
                />
            )
        default:
            return null
    }
}


export function Create({ data = null, isUpdate }) {
    const classes = useStyles()
    const [activeStep, setActiveStep] = React.useState(0)

    const initialValues = {
        title: '',
        description: '',
        status: data.status,
        documents: data.documents,
        sendUpdate: false,
    }

    const updateMutation = useUpdateOrder()
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
        validationSchema: Schema,
        onSubmit: (formData) => {
            if (isUpdate) {
                updateMutation.mutate(
                    {
                        orderId: data['id'],
                        body: formData,
                    },
                    {
                        onSuccess: () => {
                            setActiveStep(activeStep + 1)
                            setServerErrors(null)
                            resetForm();
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
                    }
                )
                return
            }
        },
    })

    const handleNext = () => {
        if (activeStep === 0) {
            setTouched({
                title: true,
                description: true,
                status: true,
                documents: true,
            })
            setActiveStep(activeStep + 1)
            return
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
                        {isUpdate ? 'Update' : 'Add'} Order
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
                                    Order updated successfully
                                </Typography>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <StepContent
                                    step={activeStep}
                                    values={values}
                                    touched={touched}
                                    errors={errors}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    setFieldValue={setFieldValue}
                                />
                                <div className={classes.buttons}>
                                    <ButtonGroup>
                                        {activeStep !== 0 && (
                                            <Button
                                                size="medium"
                                                variant="contained"
                                                color="secondary"
                                                onClick={handleBack}
                                                className={classes.button}
                                            >
                                                Back
                                            </Button>
                                        )}
                                        <Button
                                            size="medium"
                                            variant="contained"
                                            color="primary"
                                            onClick={handleNext}
                                            className={classes.button}
                                        >
                                            {activeStep === steps.length - 1
                                                ? 'Submit'
                                                : 'Next'}
                                        </Button>
                                    </ButtonGroup>
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
