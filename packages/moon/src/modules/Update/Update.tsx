import { Paper } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
import * as Yup from 'yup'
import { footerLinks } from '../../constants'
import {
    useUserPasswordUpdate,
    updateSnackBar,
    useGlobalDispatch,
    IErrorResponse,
} from '../../libs'
import { Logo } from '../../ui/Logo'

const UpdatePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required.'),
    password: Yup.string()
        .required(
            'Password is required. Password has to be at least 8 characters and less than 64 characters.'
        )
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .max(64, 'Password is too Long - should be 64 chars maximum.'),
})

const useStyles = makeStyles((theme) => ({
    root: {},
    header: {},
    paper: {
        height: '100%',
        width: '100%',
        maxWidth: 420,
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        boxShadow: '0 4px 16px rgb(0 0 0 / 15%)',
    },
    footer: {
        minHeight: '60px',
        flexWrap: 'wrap',
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
        padding: theme.spacing(2.1, 4.0, 2.1, 4.0),
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
        margin: theme.spacing(10, 0, 2.4, 0),
    },
}))

export function UpdatePassword() {
    const classes = useStyles()
    const passwordUpdate = useUserPasswordUpdate()
    const { query, replace, asPath } = useRouter()
    const globalDispatch = useGlobalDispatch()
    const {
        values,
        isValid,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = useFormik({
        initialValues: {
            password: '',
            oldPassword: '',
        },
        validationSchema: UpdatePasswordSchema,
        onSubmit: function ({ oldPassword, password }) {
            passwordUpdate.mutate(
                {
                    password,
                    oldPassword,
                },
                {
                    onSuccess: () => {
                        globalDispatch(
                            updateSnackBar({
                                message: 'Password Updated Successfully',
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
                                message: error.message,
                                type: 'error',
                                open: true,
                                duration: 10000,
                            })
                        )
                    },
                }
            )
        },
    })

    return (
        <Grid
            container
            alignContent="center"
            justify="center"
            direction="column"
        >
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
                            Update password
                        </Typography>
                        <form
                            className={classes.form}
                            noValidate
                            autoComplete="pweeeseturnoff"
                            onSubmit={handleSubmit}
                        >
                            <TextField
                                label="Old Password"
                                size="small"
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="oldPassword"
                                type="password"
                                id="oldPassword"
                                value={values.oldPassword}
                                autoComplete="old-password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={
                                    touched.oldPassword
                                        ? !!errors.oldPassword
                                        : false
                                }
                                helperText={
                                    touched.oldPassword
                                        ? errors.oldPassword
                                        : ''
                                }
                                placeholder="e.g. ••••••••"
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
                                value={values.password}
                                autoComplete="new-password"
                                onChange={handleChange}
                                onBlur={handleBlur}
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
                                color="primary"
                                size="medium"
                                disabled={passwordUpdate.isLoading || !isValid}
                                className={classes.submit}
                            >
                                Update
                            </Button>
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
