import React from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
const STATUS = {
    PENDING: 'PENDING',
    PAYMENT_FAILED: 'PAYMENT_FAILED',
    UNSHIPPED: 'UNSHIPPED',
    CONFIRMED: 'CONFIRMED',
    SHIPPED: 'SHIPPED',
    DELIVERED: 'DELIVERED',
    CANCELLED: 'CANCELLED'
};
export default function Details({
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    setFieldValue,
}) {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <FormControlLabel
                    control={
                        <Checkbox
                            color="primary"
                            name="sendUpdate"
                            checked={values.sendUpdate}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setFieldValue('sendUpdate', true)
                                } else {
                                    setFieldValue('sendUpdate', false)
                                }
                            }}
                        />
                    }
                    label="Send update to customer?"
                />
            </Grid>
            {values.sendUpdate && (
                <>
                    <Grid item xs={12}>
                        <TextField
                            multiline
                            id="title"
                            name="title"
                            label="Update Title (Sent In Email)"
                            value={values.title}
                            onChange={handleChange}
                            fullWidth
                            onBlur={handleBlur}
                            error={
                                touched.title ? !!errors.title : false
                            }
                            helperText={
                                touched.title ? errors.title : ''
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            multiline
                            rows={6}
                            id="description"
                            name="description"
                            label="Update Description (Sent In Email)"
                            value={values.description}
                            onChange={handleChange}
                            fullWidth
                            onBlur={handleBlur}
                            error={
                                touched.description ? !!errors.description : false
                            }
                            helperText={
                                touched.description ? errors.description : ''
                            }
                        />
                    </Grid>
                </>
            )}
            <Grid item xs={12} sm={6}>
                <Autocomplete
                    value={values.status}
                    onChange={(event, newValue) => {
                        setFieldValue('status', newValue || '')
                    }}
                    id="status"
                    options={Object.values(STATUS)}
                    selectOnFocus
                    renderOption={(option) => option}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            id="status"
                            name="status"
                            label="Status"
                            fullWidth
                            value={values.status}
                            onBlur={handleBlur}
                            error={touched.status ? !!errors.status : false}
                            helperText={touched.status ? errors.status : ''}
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                        />
                    )}
                />
            </Grid>
        </Grid>
    )
}
