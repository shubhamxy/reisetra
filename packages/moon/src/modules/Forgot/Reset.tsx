import React, { useEffect, useState } from 'react'
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
import { useUserEmailResetPassword } from '../../libs/rock/auth/useAuth'
import { updateSnackBar, useGlobalDispatch } from '../../libs/rock/global'
import { IErrorResponse } from '../../libs/rock/utils/http'
import { useRouter } from 'next/router'
import { Logo } from '../../ui/Logo'

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    token: Yup.string().required('Required'),
    password: Yup.string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
})

const useStyles = makeStyles((theme) => ({
    root: {},
    header: {},
    paper: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        flex: 1,
        maxWidth: 364,
        boxShadow: '0 4px 16px rgb(0 0 0 / 15%)',
    },
    footer: {
        minHeight: '60px',
        flexWrap: 'wrap',
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
        textAlign: 'left',
        paddingBottom: 24,
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
        padding: theme.spacing(1, 0, 2.4, 0),
    },
    submit: {
        margin: theme.spacing(2.4, 0, 2.4, 0),
    },
}))

export function ResetPassword() {
    const classes = useStyles()
    const emailResetPassword = useUserEmailResetPassword()
    const { query, replace, push, asPath } = useRouter()
    const globalDispatch = useGlobalDispatch()
    const [fromQuery, setFromQuery] = useState(false)
    const {
        values,
        touched,
        errors,
        setErrors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
    } = useFormik({
        initialValues: {
            email: '',
            password: '',
            token: '',
        },
        validationSchema: LoginSchema,
        onSubmit: function (data) {
            emailResetPassword.mutate(
                {
                    email: data.email,
                    password: data.password,
                    token: data.token,
                },
                {
                    onSuccess: (response) => {
                        globalDispatch(
                            updateSnackBar({
                                message: 'Email Sent Successfully',
                                type: 'success',
                                open: true,
                            })
                        )
                        replace({
                            pathname: '/',
                            query,
                        })
                    },
                    onError: (error: IErrorResponse<any>) => {
                        globalDispatch(
                            updateSnackBar({
                                message: error.errors[0].message,
                                type: 'error',
                                open: true,
                                duration: 10000,
                            })
                        )
                        if (
                            error.errors[0].type === 'ResetPasswordTokenInvalid'
                        ) {
                            setErrors({
                                token: error.errors[0].message,
                            })
                            return
                        }
                        setErrors({
                            password: error.errors[0].message,
                        })
                    },
                }
            )
        },
    })

    useEffect(() => {
        if (
            query.email &&
            query.token &&
            typeof query.email === 'string' &&
            typeof query.token === 'string'
        ) {
            setFromQuery(true)
            setFieldValue('email', query.email)
            setFieldValue('token', query.token)
            replace('/reset-password', undefined, { shallow: true })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query])
    const footerLinks = [
        {
            to: '/terms',
            label: 'Terms',
        },
        {
            to: '/privacy',
            label: 'Privacy',
        },
        {
            to: '/resources',
            label: 'Resources',
        },
    ]

    return (
        <Grid
            container
            alignContent="center"
            justify="center"
            direction="column"
        >
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
            <Paper className={classes.paper} component="section">
                <Box className={classes.container}>
                    <Box className={classes.content}>
                        <Typography className={classes.title} variant="h6">
                            Reset password
                        </Typography>
                        {/* <Typography className={classes.title} variant="caption">
              Fill in your new password
            </Typography> */}
                        <form
                            className={classes.form}
                            noValidate
                            autoComplete="pweeeseturnoff"
                            onSubmit={handleSubmit}
                        >
                            <input
                                id="email"
                                style={{ display: 'none' }}
                                type="email"
                                name="fakeusernameremembered"
                            />
                            <input
                                id="password"
                                style={{ display: 'none' }}
                                type="password"
                                name="fakepasswordremembered"
                            />

                            <TextField
                                label="Email Address"
                                size="small"
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                disabled={fromQuery}
                                name="email"
                                type="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                error={touched.email ? !!errors.email : false}
                                helperText={touched.email ? errors.email : ''}
                                placeholder="e.g. email@address.com"
                            />
                            <TextField
                                label="Code"
                                size="small"
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                disabled={fromQuery}
                                name="token"
                                type="text"
                                id="token"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.token}
                                error={touched.token ? !!errors.token : false}
                                helperText={touched.token ? errors.token : ''}
                                placeholder="e.g. oSU_iJn"
                            />
                            <TextField
                                label="New Password"
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
                                    touched.password ? !!errors.password : false
                                }
                                helperText={
                                    touched.password ? errors.password : ''
                                }
                                placeholder="e.g. ••••••••"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="medium"
                                color="primary"
                                disabled={emailResetPassword.isLoading}
                                className={classes.submit}
                            >
                                Update
                            </Button>
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
                                    >
                                        <Button
                                            title="Back to Login"
                                            variant="text"
                                            color="primary"
                                            onClick={() => {
                                                push({
                                                    query: query,
                                                    pathname: '/',
                                                })
                                            }}
                                        >
                                            {'Back to Login'}
                                        </Button>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Box>
            </Paper>
            <Grid className={classes.footer}>
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
    )
}
