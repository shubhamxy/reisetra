import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TagsInput from "../../ui/ChipInput";
import MapInput from "../../ui/MultiInput";
import { HexColorPicker } from "react-colorful";
import FormatPaint from "@material-ui/icons/FormatPaint";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import { useBrands, useCategories, useTags } from "../../libs";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
} from "@material-ui/core";
import { Box } from "@material-ui/core";
const filter = createFilterOptions<{ name: string }>();

export default function ProductDetails({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
}) {
  const tags = useTags();
  const categories = useCategories();
  const brands = useBrands();
  const [showPicker, setShowPicker] = useState(false);
  const [hex, setHex] = useState("");
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
          {/* <TextField
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
          /> */}
          <Autocomplete
            value={values.brand}
            onChange={(event, newValue) => {
              if (newValue && newValue.value) {
                setFieldValue("brand", newValue.value);
              } else if (newValue && newValue.name) {
                setFieldValue("brand", newValue.name);
              } else {
                setFieldValue("brand", newValue || "");
              }
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params) as { name: string }[];
              if (params.inputValue !== "") {
                filtered.push({
                  name: `Add "${params.inputValue}"`,
                  // @ts-ignore
                  value: params.inputValue,
                });
              }
              return filtered;
            }}
            id="brand"
            options={
              brands.data && brands.data.data
                ? (brands.data.data as { name: string }[])
                : []
            }
            getOptionLabel={(option) => {
              // e.g value selected with enter, right from the input
              if (typeof option === "string") {
                return option;
              }
              return option.name;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            renderOption={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                id="brand"
                name="brand"
                label="Brand"
                fullWidth
                value={values.brand}
                onBlur={handleBlur}
                error={touched.brand ? !!errors.brand : false}
                helperText={touched.brand ? errors.brand : ""}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TagsInput
            onChange={(value) => {
              setFieldValue("colors", value);
            }}
            value={values?.colors}
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
        <Grid item xs={12}>
          <MapInput
            onChange={(value) => {
              setFieldValue("faqs", value);
            }}
            value={values.faqs}
            fullWidth
            variant="outlined"
            id="faqs"
            name="faqs"
            placeholder="eg. does it require assembly: yes"
            label="FAQs"
            onBlur={handleBlur}
            error={touched.faqs ? !!errors.faqs : false}
            helperText={touched.faqs ? errors.faqs : ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* <TagsInput
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
          /> */}

          <Autocomplete
            multiple
            id="categories"
            options={
              categories.data && categories.data.data
                ? categories.data.data.map((item) => item.label)
                : []
            }
            getOptionLabel={(option) => option}
            value={values.categories}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                label="Categories"
                onBlur={handleBlur}
                helperText={touched.categories ? errors.categories : ""}
                error={touched.categories ? !!errors.categories : false}
                placeholder="eg. Home Decor"
              />
            )}
            renderTags={(value: string[], getTagProps) =>
              value?.map((option: string, index: number) => (
                <Chip
                  color="primary"
                  variant="outlined"
                  label={
                    <Typography component="p" variant="subtitle2">
                      {option}
                    </Typography>
                  }
                  {...getTagProps({ index })}
                />
              ))
            }
            onChange={(_, value) => {
              setFieldValue("categories", value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* <TagsInput
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
          /> */}
          <Autocomplete
            multiple
            id="tags"
            options={
              tags.data && tags.data.data
                ? tags.data.data?.map((item) => item.label)
                : []
            }
            getOptionLabel={(option) => option}
            value={values.tags}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                label="Tags"
                onBlur={handleBlur}
                helperText={touched.tags ? errors.tags : ""}
                error={touched.tags ? !!errors.tags : false}
                placeholder="eg. exclusive"
              />
            )}
            renderTags={(value, getTagProps) =>
              value?.map((option: string, index: number) => (
                <Chip
                  color="primary"
                  variant="outlined"
                  label={
                    <Typography component="p" variant="subtitle2">
                      {option}
                    </Typography>
                  }
                  {...getTagProps({ index })}
                />
              ))
            }
            onChange={(_, value) => {
              setFieldValue("tags", value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TagsInput
            onChange={(value) => {
              setFieldValue("sizes", value);
            }}
            value={values?.sizes || []}
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
              setFieldValue("dimensions", value);
            }}
            value={values?.dimensions || []}
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
            value={values?.styles || []}
            fullWidth
            variant="outlined"
            id="styles"
            name="styles"
            placeholder="[forground, background] color for card"
            label="Styles (For Store UI)"
            onBlur={handleBlur}
            error={touched.styles ? !!errors.styles : false}
            helperText={touched.styles ? errors.styles : ""}
            endAdornment={
              <IconButton
                onClick={() => {
                  setShowPicker(!showPicker);
                }}
              >
                <FormatPaint style={{height: 14, width: 14}} />
              </IconButton>
            }
          />
        </Grid>
        <Dialog
          PaperProps={{
            style:
              values?.styles?.length === 0
                ? { color: hex }
                : { background: hex },
          }}
          open={showPicker}
          onClose={() => setShowPicker(!showPicker)}
        >
          <DialogContent>
            <HexColorPicker
              color={hex}
              onChange={(value) => {
                setHex(value);
              }}
            />
            <Box
              style={
                values?.styles?.length === 0
                  ? { color: hex }
                  : { color: values.styles[0], background: hex }
              }
              children={
                <Typography component="p" variant="subtitle2">
                  {hex}
                </Typography>
              }
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                if(hex){
                  setFieldValue("styles", [...values.styles, hex]);
                }
                setHex("");
                setShowPicker(false);
              }}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>

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
