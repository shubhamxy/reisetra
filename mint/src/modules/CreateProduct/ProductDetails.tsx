import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default function AddressForm({
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
            id="title"
            name="title"
            label="Title"
            fullWidth
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.title ? !!errors.title : false}
            helperText={touched.title ? errors.title : ""}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            multiline
            id="description"
            name="description"
            label="Description"
            value={values.description}
            onChange={handleChange}
            fullWidth
            onBlur={handleBlur}
            error={touched.description ? !!errors.description : false}
            helperText={touched.description ? errors.description : ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="brand"
            name="brand"
            label="Brand"
            fullWidth
            value={values.brand}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.brand ? !!errors.brand : false}
            helperText={touched.brand ? errors.brand : ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="color"
            name="color"
            label="Color"
            fullWidth
            value={values.color}
            onChange={handleChange}

            onBlur={handleBlur}
            error={touched.color ? !!errors.color : false}
            helperText={touched.color ? errors.color : ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="price"
            name="price"
            label="Selling Price"
            type="number"
            fullWidth
            value={values.price}
            onChange={handleChange}

            onBlur={handleBlur}
            error={touched.price ? !!errors.price : false}
            helperText={touched.price ? errors.price : ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="mrp"
            name="mrp"
            label="MRP"
            fullWidth
            type="number"
            value={values.mrp}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.mrp ? !!errors.mrp : false}
            helperText={touched.mrp ? errors.mrp : ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="tax"
            name="tax"
            label="Tax %"
            fullWidth
            type="number"
            value={values.tax}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.tax ? !!errors.tax : false}
            helperText={touched.tax ? errors.tax : ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="taxCode"
            name="taxCode"
            label="HSN/SAC"
            fullWidth
            value={values.taxCode}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.taxCode ? !!errors.taxCode : false}
            helperText={touched.taxCode ? errors.taxCode : ""}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="inventory.stockQuantity"
            name="inventory.stockQuantity"
            label="Stock Quantity"
            fullWidth
            type="number"
            value={values.inventory.stockQuantity}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.inventory?.stockQuantity ? !!errors.inventory?.stockQuantity : false}
            helperText={touched.inventory?.stockQuantity ? errors.inventory?.stockQuantity : ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="inventory.sku"
            name="inventory.sku"
            label="SKU"
            fullWidth
            value={values.inventory.sku}
            onChange={handleChange}

            onBlur={handleBlur}
            error={touched.inventory?.sku ? !!errors.inventory?.sku : false}
            helperText={touched.inventory?.sku ? errors.inventory?.sku : ""}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                name="published"
                checked={values.published}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFieldValue("published", true);
                  } else {
                    setFieldValue("published", false);
                  }
                }}
              />
            }
            label="Published"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
