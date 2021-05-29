import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useFileUpload } from "../../libs/rock/file";
import { ImagePreview } from "../../ui/MediaPreview";
import { Box, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
const useStyles = makeStyles((theme) => ({
  dropzone: {
    position: "relative",
    height: "300px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderRadius: 12,
    cursor: "pointer",
    border: `2px dashed ${theme.palette.primary.main}33`,
  },
  dragActive: {
    border: `2px dashed ${theme.palette.primary.main}88`,
  },
}));
export default function ProductImages({ values, errors, touched, handleBlur, setFieldValue, handleChange }) {
  const upload = useFileUpload({
    fileType: "images",
    multiple: true,
    onSuccess: (files) => {
      setFieldValue("images", [...values.images, ...files])
    },
  });
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item>
          <ImagePreview variant="list" data={values.images}
            showRemoveIcon
            handleRemoveItem={(e, index, item) => {
              const val = [...values.images]
              val.splice(index, 1);
              setFieldValue("images", val);
            }}
          />
        </Grid>

        <Grid
          item
          {...upload.getRootProps()}
          className={clsx(
            classes.dropzone,
            upload.isDragActive ? classes.dragActive : ""
          )}
        >
          <input {...upload.getInputProps()} />
          <Box display="flex" flexDirection="column" alignItems="center">
            <CloudUploadIcon />
            {upload.isDragActive ? (
              <Typography>Drop your image here</Typography>
            ) : (
              <>
                <Typography> Drag your image here</Typography>
                <Typography>or</Typography>
                <Typography>browse</Typography>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
