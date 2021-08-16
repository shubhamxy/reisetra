import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import TagsInput from '../../ui/ChipInput'
import MapInput from '../../ui/MultiInput'

export default function ProductDetails({
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    setFieldValue,
    isUpdate
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
                        disabled={isUpdate}
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
                <Grid item xs={12} sm={6}>
                    <TagsInput
                        onChange={(value) => {
                            setFieldValue('styles', value)
                        }}
                        value={values.styles}
                        fullWidth
                        variant="outlined"
                        id="styles"
                        name="styles"
                        placeholder="Css colors ex. #fff, #f00"
                        label="Styles (For Store UI)"
                        onBlur={handleBlur}
                        error={touched.styles ? !!errors.styles : false}
                        helperText={touched.styles ? errors.styles : ''}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
