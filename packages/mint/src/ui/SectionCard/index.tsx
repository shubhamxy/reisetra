import * as React from 'react'
import { useState } from 'react'
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    InputLabel,
    makeStyles,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography,
} from '@material-ui/core'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Rating } from '@material-ui/lab'
import { useCreateForm, useForm } from '../../libs'
import { SectionFormData } from '../../content'

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            width: '100%',
            backgroundImage: `url("/images/hero.jpeg")`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            boxShadow: '2px 2px 7px rgba(15, 15, 15, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '242px',
            color: theme.palette.common.white,
            [theme.breakpoints.down('sm')]: {
                backgroundPosition: 'center left',
            },
        },
        content: {
            height: '100%',
            display: 'flex',
            maxWidth: 400,
            textAlign: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            [theme.breakpoints.down('sm')]: {
                ...theme.typography.h4,
            },
        },
        description: {
            ...theme.typography.caption,
            fontSize: 16,
            textAlign: 'center',
            [theme.breakpoints.down('sm')]: {
                fontSize: 20,
                ...theme.typography.subtitle2,
            },
        },
        actionsContainer: {},
        form: {
            width: '100%',
        },
        formItem: {
            width: '100%',
        },
        formControl: {
            width: '100%',
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    })
)

interface IFormData {
    description: string
    actions: {
        label: string
    }[]
    formTitle: string
    form: {
        type: string
        id: string
        label: string
        name: string
        props: {
            size: string
            multiline: boolean
            rows?: undefined
        }
        menuItems?: undefined
    }[]
}

export function SectionCard({ formId = 'section' }) {
    const classes = useStyles()
    const [showModal, setShowModal] = useState(false)
    const [visible, setVisible] = useState(true)
    const form = useForm(formId)
    const createFormData = useCreateForm()
    const formData = (form?.data?.data?.data as IFormData) || SectionFormData
    const initialValues = {}

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
        validationSchema: Yup.object().shape({}),
        onSubmit: async (data) => {
            await createFormData.mutateAsync({
                body: data,
                formId,
            })
            setShowModal(false)
            setVisible(false)
        },
    })

    return (
        <>
            {visible ? (
                <Card className={classes.root}>
                    <CardContent className={classes.content}>
                        <Typography
                            className={classes.description}
                            variant={'caption'}
                        >
                            {formData.description}
                        </Typography>
                        <Box display={'flex'} pt={2.4}>
                            <Button
                                onClick={() => setShowModal(true)}
                                color={'secondary'}
                                variant={'contained'}
                            >
                                {formData.actions[0].label}
                            </Button>
                            <Button
                                onClick={() => {
                                    setVisible(false)
                                }}
                                style={{ marginLeft: 30 }}
                                variant={'text'}
                            >
                                {formData.actions[1].label}
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            ) : null}
            <Dialog
                open={showModal}
                onClose={() => {
                    setShowModal(false)
                }}
                scroll="body"
                fullWidth
            >
                <DialogTitle>{formData.formTitle}</DialogTitle>
                <form
                    className={classes.form}
                    onSubmit={handleSubmit}
                    noValidate
                    autoComplete="off"
                >
                    <DialogContent>
                        <Container maxWidth="lg">
                            <Grid container spacing={3}>
                                {formData.form.map((item) => {
                                    switch (item.type) {
                                        case 'text-feild':
                                            return (
                                                <Grid
                                                    item
                                                    xs={12}
                                                    key={item.id}
                                                    className={classes.formItem}
                                                >
                                                    {/* @ts-ignore */}
                                                    <TextField
                                                        name={item.name}
                                                        id={item.id}
                                                        label={item.label}
                                                        value={
                                                            values[item.name]
                                                        }
                                                        onChange={handleChange}
                                                        className={
                                                            classes.formControl
                                                        }
                                                        {...item.props}
                                                    />
                                                </Grid>
                                            )
                                        case 'select':
                                            return (
                                                <Grid
                                                    item
                                                    xs={12}
                                                    key={item.id}
                                                    className={classes.formItem}
                                                >
                                                    <FormControl
                                                        className={
                                                            classes.formControl
                                                        }
                                                    >
                                                        <InputLabel
                                                            id={
                                                                item.label +
                                                                '-id'
                                                            }
                                                        >
                                                            {item.label}
                                                        </InputLabel>
                                                        <Select
                                                            labelId={
                                                                item.id +
                                                                '-label'
                                                            }
                                                            id={item.id}
                                                            name={item.name}
                                                            value={
                                                                values[
                                                                    item.name
                                                                ]
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            {...item.props}
                                                        >
                                                            {item.menuItems.map(
                                                                (mitem) => (
                                                                    <MenuItem
                                                                        key={
                                                                            mitem.value
                                                                        }
                                                                        value={
                                                                            mitem.value
                                                                        }
                                                                    >
                                                                        {
                                                                            mitem.label
                                                                        }
                                                                    </MenuItem>
                                                                )
                                                            )}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                            )
                                        case 'checkbox':
                                            return (
                                                <Grid
                                                    item
                                                    xs={12}
                                                    key={item.id}
                                                    className={classes.formItem}
                                                >
                                                    <FormControl component="fieldset">
                                                        <FormLabel component="legend">
                                                            {item.label}
                                                        </FormLabel>
                                                        <RadioGroup
                                                            aria-label={
                                                                item.label
                                                            }
                                                            name={item.name}
                                                            value={
                                                                values[
                                                                    item.name
                                                                ]
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            {...item.props}
                                                        >
                                                            {item.menuItems?.map(
                                                                (mitem) => (
                                                                    <FormControlLabel
                                                                        key={
                                                                            mitem.value
                                                                        }
                                                                        value={
                                                                            mitem.value
                                                                        }
                                                                        control={
                                                                            <Radio />
                                                                        }
                                                                        label={
                                                                            mitem.label
                                                                        }
                                                                    />
                                                                )
                                                            )}
                                                        </RadioGroup>
                                                    </FormControl>
                                                </Grid>
                                            )
                                        case 'ratings':
                                            return (
                                                <Grid
                                                    container
                                                    item
                                                    xs={12}
                                                    spacing={2}
                                                    key={item.id}
                                                    className={classes.formItem}
                                                >
                                                    <FormControl component="fieldset">
                                                        <FormLabel
                                                            component="legend"
                                                            style={{
                                                                fontSize: 12,
                                                                marginLeft: 12,
                                                                paddingBottom: 12,
                                                            }}
                                                        >
                                                            {item.label}
                                                        </FormLabel>
                                                        <Grid item>
                                                            <Rating
                                                                size="large"
                                                                name={item.name}
                                                                defaultValue={2}
                                                                max={10}
                                                                onChange={
                                                                    handleChange
                                                                }
                                                            />
                                                        </Grid>
                                                    </FormControl>
                                                </Grid>
                                            )
                                        default:
                                            return null
                                    }
                                })}
                            </Grid>
                        </Container>
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
                                onClick={() => {
                                    setShowModal(false)
                                }}
                                color="primary"
                                variant="text"
                                size="medium"
                                style={{ marginRight: 16 }}
                            >
                                {/* @ts-ignore */}
                                {formData?.formActions[0].label}
                            </Button>

                            <Button
                                type="submit"
                                size="medium"
                                color="primary"
                                variant="contained"
                            >
                                {/* @ts-ignore */}
                                {formData?.formActions[1].label}
                            </Button>
                        </Box>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}
