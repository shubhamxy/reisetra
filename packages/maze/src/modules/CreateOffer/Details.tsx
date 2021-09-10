import React from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import TagsInput from '../../ui/ChipInput'

export default function OfferDetails({
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    setFieldValue,
}) {
    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="label"
                        name="label"
                        label="Label"
                        fullWidth
                        value={values.label}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.label ? !!errors.label : false}
                        helperText={touched.label ? errors.label : ''}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        multiline
                        id="value"
                        name="value"
                        label="Value"
                        value={values.value}
                        onChange={handleChange}
                        fullWidth
                        onBlur={handleBlur}
                        error={touched.value ? !!errors.value : false}
                        helperText={touched.value ? errors.value : ''}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        multiline
                        id="type"
                        name="type"
                        label="Type"
                        value={values.type}
                        onChange={handleChange}
                        fullWidth
                        onBlur={handleBlur}
                        error={touched.type ? !!errors.type : false}
                        helperText={touched.type ? errors.type : ''}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
