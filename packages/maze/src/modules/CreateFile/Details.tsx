import React from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

export default function ProductDetails({
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
                        id="name"
                        name="name"
                        label="Name"
                        fullWidth
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.name ? !!errors.name : false}
                        helperText={touched.name ? errors.name : ''}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
