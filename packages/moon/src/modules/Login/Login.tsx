/* eslint-disable dot-notation */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react'

import * as Yup from 'yup'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'
import { useFormik } from 'formik'
import {
    IErrorResponse,
    login,
    useVerifyGoogleLogin,
    useUserEmailLogin,
    useAuthDispatch,
    config,
    useUserPhoneLogin,
    useSendPhoneOTP,
} from '../../libs'
import { Logo } from '../../ui'
import { footerLinks } from '../../constants'
import { useRouter } from 'next/router'
import PhoneInput from 'react-phone-input-material-ui'
import 'react-phone-input-material-ui/lib/style.css'
import OtpInput from '../../libs/otp-input'
import { Edit } from '@material-ui/icons'

const LoginSchema = Yup.object().shape({
    isPhone: Yup.boolean(),
    isOTPSent: Yup.boolean(),
    phone: Yup.string().when('isPhone', {
        is: true,
        then: Yup.string()
            .matches(/^\+[1-9]\d{8,14}$/, 'Phone must be valid')
            .required('Phone is required'),
    }),
    otp: Yup.string().when('isOTPSent', {
        is: true,
        then: Yup.string().required('OTP is required'),
    }),
    email: Yup.string().when('isPhone', {
        is: false,
        then: Yup.string().required('Email is required'),
    }),
    password: Yup.string().when('isPhone', {
        is: false,
        then: Yup.string()
            .min(8, 'Password is too short - should be 8 chars minimum.')
            .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
            .required('Password is required'),
    }),
})

const useStyles = makeStyles((theme) => ({
    root: {
        // backdropFilter: "blur(50px)",
    },
    header: {},
    paper: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        flex: 1,
        maxWidth: 420,
        boxShadow: '0px 1px 4px 0px ${primary.main}33',
        backgroundColor: '#070707',
    },
    footer: {
        maxWidth: 400,
        padding: '12px 0 0 0',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
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
        paddingTop: 24,
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flex: 1,
        margin: '0',
        width: '100%',
        height: '100%',
        padding: theme.spacing(2.1, 4.0, 4.5, 4.0),
    },
    title: {
        paddingBottom: 8,
    },
    divider: {
        marginTop: 24,
        marginBottom: 24,
        position: 'relative',
        width: '100%',
        textAlign: 'center',
        height: 9,
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
    authProviders: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
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
        margin: theme.spacing(1, 0, 2.4, 0),
    },
    email: {},
    phoneContainer: {
        position: 'relative',
    },
    phoneInputContainer: {
        ...theme.typography.body1,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
    },
    phoneInput: {
        height: '48px !important',
        display: 'flex',
        flex: 1,
        width: '100%',
        background: `${theme.palette.background.paper} !important`,
    },
    phoneButton: {
        background: `transparent !important`,
        marginTop: '6px',
        marginLeft: '2px',
    },
    phoneDropdown: {
        background: `${theme.palette.background.paper} !important`,
        '&:hover': {
            backgroundColor: 'unset',
        },
    },
    edit: {
        position: 'absolute',
        top: 'calc(50% - 6px)',
        right: 0,
        paddingRight: '8px',
    },
}))

export function LogIn() {
    const classes = useStyles()
    const emailLogin = useUserEmailLogin()
    const phoneLogin = useUserPhoneLogin()
    const sendOTP = useSendPhoneOTP()

    const verifyGoogleLogin = useVerifyGoogleLogin()
    const authDispatch = useAuthDispatch()
    const googleBtnRef = useRef()
    const router = useRouter()
    const {
        values,
        setErrors,
        touched,
        errors,
        setFieldValue,
        resetForm,
        submitForm,
        handleChange,
        handleBlur,
        handleSubmit,
    } = useFormik({
        initialValues: {
            isPhone: false,
            isOTPSent: false,
            otp: '',
            phone: '',
            email: '',
            password: '',
        },
        validationSchema: LoginSchema,
        onSubmit: function (data) {
            if (data.isPhone) {
                if (data.isOTPSent) {
                    phoneLogin.mutate(
                        {
                            clientId:
                                (router.query['client_id'] as string) ||
                                config.clientId,
                            redirectUri:
                                (router.query['redirect_uri'] as string) ||
                                config.callbackUrl,
                            phone: data.phone,
                            otp: data.otp,
                        },
                        {
                            onError: (error: IErrorResponse<any>) => {
                                setErrors({
                                    phone: error.message,
                                })
                            },
                        }
                    )
                } else {
                    sendOTP.mutate(
                        {
                            clientId:
                                (router.query['client_id'] as string) ||
                                config.clientId,
                            redirectUri:
                                (router.query['redirect_uri'] as string) ||
                                config.callbackUrl,
                            phone: data.phone,
                        },
                        {
                            onSuccess: () => {
                                setFieldValue('isOTPSent', true)
                            },
                            onError: (error: IErrorResponse<any>) => {
                                setErrors({
                                    phone: error.message,
                                })
                            },
                        }
                    )
                }
                return
            }
            emailLogin.mutate(
                {
                    clientId:
                        (router.query['client_id'] as string) ||
                        config.clientId,
                    redirectUri:
                        (router.query['redirect_uri'] as string) ||
                        config.callbackUrl,
                    email: data.email,
                    password: data.password,
                },
                {
                    onError: (error: IErrorResponse<any>) => {
                        setErrors({
                            password: error.message,
                        })
                    },
                }
            )
        },
    })

    useEffect(() => {
        function initializeGoogleLogin() {
            const google = window['google']
            google.accounts.id.initialize({
                client_id: config.googleOAuthOptions.clientID,
                ux_mode: 'popup',
                callback: function handleCredentialResponse(response) {
                    verifyGoogleLogin
                        .mutateAsync({
                            ...response,
                            clientId:
                                (router.query['client_id'] as string) ||
                                config.clientId,
                            redirectUri:
                                (router.query['redirect_uri'] as string) ||
                                config.callbackUrl,
                        })
                        .then((response) => {
                            authDispatch(
                                login({
                                    access_token: response.data['access_token'],
                                    refresh_token:
                                        response.data['refresh_token'],
                                })
                            )
                        })
                        .catch(console.error)
                },
            })
            google.accounts.id.renderButton(googleBtnRef.current, {
                theme: 'outline',
                size: 'large',
                text: 'continue_with',
            })
            google.accounts.id.prompt()
        }

        if (window['google']) {
            initializeGoogleLogin()
        }
    }, [googleBtnRef.current])

    useEffect(() => {
        if (values.otp.length === 6) {
            submitForm()
        }
    }, [values.otp])
    // @ts-ignore
    return (
        <Grid container alignContent="center" justify="center">
            <Grid item container alignContent="center" justify="center">
                <Paper className={classes.paper} component="section">
                    <Box className={classes.container}>
                        <Grid
                            item
                            className={classes.header}
                            alignContent="center"
                            justify="center"
                            direction="column"
                        >
                            <Box display="flex" className={classes.logo}>
                                <Logo />
                            </Box>
                        </Grid>
                        <Box className={classes.content}>
                            <Typography className={classes.title} variant="h6">
                                Log in to your account
                            </Typography>
                            <form
                                className={classes.form}
                                noValidate
                                autoComplete="pweeeseturnoff"
                                onSubmit={handleSubmit}
                            >
                                <input
                                    style={{ display: 'none' }}
                                    type="email"
                                    name="fakeemailremembered"
                                />
                                <input
                                    style={{ display: 'none' }}
                                    type="password"
                                    name="fakepasswordremembered"
                                />

                                {values.isPhone ? (
                                    <>
                                        <Box className={classes.phoneContainer}>
                                            <PhoneInput
                                                value={values.phone}
                                                showDropdown={false}
                                                onChange={(value) =>
                                                    setFieldValue(
                                                        'phone',
                                                        '+' + value
                                                    )
                                                }
                                                country={'in'}
                                                containerClass={
                                                    classes.phoneInputContainer
                                                }
                                                inputClass={classes.phoneInput}
                                                buttonClass={
                                                    classes.phoneButton
                                                }
                                                prefix={'+'}
                                                disabled={
                                                    values.isPhone &&
                                                    values.isOTPSent
                                                }
                                                dropdownClass={
                                                    classes.phoneDropdown
                                                }
                                                component={TextField}
                                                inputProps={{
                                                    label: 'Phone',
                                                    size: 'medium',
                                                    margin: 'normal',
                                                    fullWidth: true,
                                                    id: 'phone',
                                                    name: 'phone',
                                                    error: touched.phone
                                                        ? !!errors.phone
                                                        : false,
                                                    helperText: touched.phone
                                                        ? errors.phone
                                                        : '',
                                                }}
                                            />
                                            {values.isOTPSent && (
                                                <Box className={classes.edit}>
                                                    <Edit
                                                        onClick={() => {
                                                            setFieldValue(
                                                                'isOTPSent',
                                                                false
                                                            )
                                                        }}
                                                    />
                                                </Box>
                                            )}
                                        </Box>

                                        {values.isOTPSent && (
                                            <OtpInput
                                                containerStyle={{
                                                    alignItems: 'center',
                                                }}
                                                inputStyle="inputStyle"
                                                numInputs={6}
                                                isDisabled={false}
                                                hasErrored={false}
                                                errorStyle="error"
                                                onChange={(value) =>
                                                    setFieldValue('otp', value)
                                                }
                                                separator={
                                                    <span
                                                        style={{ width: '8px' }}
                                                    ></span>
                                                }
                                                isInputNum={true}
                                                isInputSecure={false}
                                                shouldAutoFocus
                                                value={values.otp}
                                                placeholder={''}
                                            />
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <TextField
                                            label="Email"
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            name="email"
                                            type="text"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.email}
                                            error={
                                                touched.email
                                                    ? !!errors.email
                                                    : false
                                            }
                                            helperText={
                                                touched.email
                                                    ? errors.email
                                                    : ''
                                            }
                                            placeholder="e.g. john.doe@example.com"
                                        />
                                        <TextField
                                            label="Password"
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="password"
                                            type="password"
                                            id="password"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.password}
                                            error={
                                                touched.password
                                                    ? !!errors.password
                                                    : false
                                            }
                                            helperText={
                                                touched.password
                                                    ? errors.password
                                                    : ''
                                            }
                                            placeholder="e.g. ••••••••"
                                        />
                                    </>
                                )}

                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="flex-end"
                                    style={
                                        values.isPhone
                                            ? {
                                                  textAlign: 'center',
                                                  justifyContent: 'flex-end',
                                              }
                                            : {
                                                  textAlign: 'center',
                                                  justifyContent:
                                                      'space-between',
                                              }
                                    }
                                >
                                    <Grid item>
                                        <Typography
                                            variant="caption"
                                            align="center"
                                        >
                                            <Button
                                                title={
                                                    values.isPhone
                                                        ? 'Login with email'
                                                        : 'Login with phone'
                                                }
                                                variant="text"
                                                color="primary"
                                                onClick={() => {
                                                    resetForm()
                                                    setFieldValue(
                                                        'isPhone',
                                                        !values.isPhone
                                                    )
                                                }}
                                            >
                                                {values.isPhone
                                                    ? 'Continue with email'
                                                    : 'Continue with phone'}
                                            </Button>
                                        </Typography>
                                    </Grid>

                                    {!values.isPhone && (
                                        <Grid item>
                                            <Typography
                                                variant="caption"
                                                align="center"
                                            >
                                                <Button
                                                    title="forgot password?"
                                                    variant="text"
                                                    color="primary"
                                                    onClick={() => {
                                                        router.push({
                                                            query: router.query,
                                                            pathname:
                                                                '/forgot-password',
                                                        })
                                                    }}
                                                >
                                                    Forgot password?
                                                </Button>
                                            </Typography>
                                        </Grid>
                                    )}
                                </Grid>
                                <Grid
                                    item
                                    style={{
                                        textAlign: 'center',
                                        paddingTop: 20,
                                    }}
                                >
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        size="medium"
                                        disabled={
                                            values.isPhone
                                                ? phoneLogin.isLoading
                                                : emailLogin.isLoading
                                        }
                                        className={classes.submit}
                                    >
                                        {values.isPhone
                                            ? values.isOTPSent
                                                ? 'Login'
                                                : 'Login'
                                            : 'Login'}
                                    </Button>
                                </Grid>
                                <Grid
                                    container
                                    direction="column"
                                    justify="center"
                                    style={{ textAlign: 'center' }}
                                >
                                    <Grid item>
                                        <Typography
                                            variant="caption"
                                            align="center"
                                            style={{ marginRight: 8 }}
                                        >
                                            Don't have an account?{' '}
                                        </Typography>
                                        <Button
                                            title="Sign Up"
                                            variant="text"
                                            color="primary"
                                            onClick={() => {
                                                router.push({
                                                    query: router.query,
                                                    pathname: '/signup',
                                                })
                                            }}
                                        >
                                            {'Sign Up'}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                            <Grid
                                container
                                className={classes.authProviders}
                                spacing={2}
                            >
                                <Typography
                                    variant="caption"
                                    color="textSecondary"
                                    className={classes.divider}
                                >
                                    Or
                                </Typography>
                                <Grid item>
                                    <div
                                        id="google-button"
                                        ref={googleBtnRef}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Paper>
            </Grid>
            <Grid
                item
                container
                className={classes.footer}
                alignContent="center"
            >
                <Grid item style={{ width: '100%' }}>
                    <Box className={classes.links}>
                        {footerLinks.map((link) => (
                            <Link
                                key={link.to}
                                className={classes.link}
                                color="textSecondary"
                                href={link.to}
                                underline={'none'}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    )
}
