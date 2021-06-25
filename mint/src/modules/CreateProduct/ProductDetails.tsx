import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TagsInput from "../../ui/ChipInput";
import MapInput from "../../ui/MultiInput";

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
          <TagsInput
            onChange={(value) => {
              setFieldValue("colors", value);
            }}
            value={values.colors}
            fullWidth
            variant="outlined"
            id="colors"
            name="colors"
            placeholder="eg. red"
            label="Colors"
            onBlur={handleBlur}
            error={touched.colors ? !!errors.colors : false}
            helperText={touched.colors ? errors.colors : ""}
          />
        </Grid>
        <Grid item xs={12}>
          <MapInput
            onChange={(value) => {
              setFieldValue("details", value);
            }}
            value={values.details}
            fullWidth
            variant="outlined"
            id="details"
            name="details"
            placeholder="eg. Weight: 16kg "
            label="Details"
            onBlur={handleBlur}
            error={touched.details ? !!errors.details : false}
            helperText={touched.details ? errors.details : ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TagsInput
            onChange={(value) => {
              setFieldValue("sizes", value);
            }}
            value={values.sizes}
            fullWidth
            variant="outlined"
            id="sizes"
            name="sizes"
            placeholder="eg. xl, xxl"
            label="Sizes"
            onBlur={handleBlur}
            error={touched.sizes ? !!errors.sizes : false}
            helperText={touched.sizes ? errors.sizes : ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TagsInput
            onChange={(value) => {
              setFieldValue("categories", value);
            }}
            value={values.categories}
            fullWidth
            variant="outlined"
            id="categories"
            name="categories"
            placeholder="eg. wall-decor, table"
            label="Categories"
            onBlur={handleBlur}
            error={touched.categories ? !!errors.categories : false}
            helperText={touched.categories ? errors.categories : ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TagsInput
            onChange={(value) => {
              setFieldValue("tags", value);
            }}
            value={values.tags}
            fullWidth
            variant="outlined"
            id="tags"
            name="tags"
            placeholder="eg. phone, exclusive"
            label="Tags"
            onBlur={handleBlur}
            error={touched.tags ? !!errors.tags : false}
            helperText={touched.tags ? errors.tags : ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TagsInput
            onChange={(value) => {
              setFieldValue("dimensions", value);
            }}
            value={values.dimensions}
            fullWidth
            variant="outlined"
            id="dimensions"
            name="dimensions"
            placeholder="eg. 24 x 25 x 26"
            label="Dimensions"
            onBlur={handleBlur}
            error={touched.dimensions ? !!errors.dimensions : false}
            helperText={touched.dimensions ? errors.dimensions : ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TagsInput
            onChange={(value) => {
              setFieldValue("styles", value);
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
            helperText={touched.styles ? errors.styles : ""}
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
            error={
              touched.inventory?.stockQuantity
                ? !!errors.inventory?.stockQuantity
                : false
            }
            helperText={
              touched.inventory?.stockQuantity
                ? errors.inventory?.stockQuantity
                : ""
            }
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
