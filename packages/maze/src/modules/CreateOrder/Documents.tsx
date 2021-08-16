import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { useFileUpload } from '../../libs/rock/file'
import { DocsPreview, ImagePreview } from '../../ui/MediaPreview'
import { Box, FormControlLabel, Checkbox, makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

const useStyles = makeStyles((theme) => ({
    dropzone: {
        position: 'relative',
        height: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderRadius: 12,
        cursor: 'pointer',
        border: `2px dashed ${theme.palette.primary.main}33`,
    },
    dragActive: {
        border: `2px dashed ${theme.palette.primary.main}88`,
    },
}))
export default function Documents({
    values,
    setFieldValue,
}) {
    const upload = useFileUpload({
        fileType: 'documents',
        accept: ['application/pdf'],
        multiple: true,
        onSuccess: (files) => {
            files.forEach(item => {
                if (item && item['meta']) {
                    item['meta']['invoice'] = invoice;
                }
            })
            setFieldValue('documents', [...values.documents, ...files])
            setInvoice(false);
        },
    })
    const [invoice, setInvoice] = useState(false);
    const classes = useStyles()
    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                color="primary"
                                name="invoice"
                                checked={invoice}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setInvoice(true);
                                    } else {
                                        setInvoice(false);
                                    }
                                }}
                            />
                        }
                        label="Is Invoice"
                    />
                </Grid>
                <Grid
                    item
                    {...upload.getRootProps()}
                    className={clsx(
                        classes.dropzone,
                        upload.isDragActive ? classes.dragActive : ''
                    )}
                >
                    <input {...upload.getInputProps()} />
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                    >
                        <CloudUploadIcon />
                        {upload.isDragActive ? (
                            <Typography variant="caption">
                                Drop your documents here
                            </Typography>
                        ) : (
                            <>
                                <Typography variant="caption">
                                    Drag and drop your documents here
                                </Typography>
                                <Typography variant="caption">or</Typography>
                                <Typography variant="caption">
                                    browse
                                </Typography>
                            </>
                        )}
                    </Box>
                </Grid>
                <Grid item>
                    <DocsPreview
                        data={values.documents}
                        showRemoveIcon
                        markerFeild="invoice"
                        handleRemoveItem={(e, index, item) => {
                            const val = [...values.documents]
                            val.splice(index, 1)
                            setFieldValue('documents', val)
                        }} className={undefined} />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
