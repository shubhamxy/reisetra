import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { useFiles } from '../../libs'
import { ImagePreview } from '../../ui/MediaPreview'
import { Box, makeStyles } from '@material-ui/core'
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

export function ProductImages({ values, setFieldValue }) {
    const upload = useFiles({
        fileType: 'images',
        multiple: true,
        onSuccess: (files) => {
            setFieldValue('images', [...values.images, ...files])
        },
    })
    const classes = useStyles()
    return (
        <React.Fragment>
            <Grid container>
                <Grid item>
                    <ImagePreview
                        variant="list"
                        data={values.images}
                        showRemoveIcon
                        borderRadius="12px"
                        handleRemoveItem={(e, index) => {
                            const val = [...values.images]
                            val.splice(index, 1)
                            setFieldValue('images', val)
                        }}
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
                                Drop your image here
                            </Typography>
                        ) : (
                            <>
                                <Typography variant="caption">
                                    Drag your image here
                                </Typography>
                                <Typography variant="caption">or</Typography>
                                <Typography variant="caption">
                                    browse
                                </Typography>
                            </>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
