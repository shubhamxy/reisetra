import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ProductDetails from "./ProductDetails";
import ProductImages from "./ProductImages";
import Summary from "./Review";
import {
  config,
  updateSnackBar,
  useCreateProduct,
  useGlobalDispatch,
  useUpdateProduct,
} from "../../libs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Container, TextField } from "@material-ui/core";
import { useQueryClient } from "react-query";

const createProductSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  mrp: Yup.number().required("MRP is required"),
  tax: Yup.string().required("Tax is required"),
  taxCode: Yup.string().required("HSN/SAC code is required"),
  price: Yup.number().required("Price is required"),
  colors: Yup.array(),
  sizes: Yup.array(),
  categories: Yup.array(),
  tags: Yup.array(),
  dimensions: Yup.array(),
  styles: Yup.array(),
  brand: Yup.string().required("Brand is required"),
  inventory: Yup.object().shape({
    stockQuantity: Yup.number().required("Stock Quantity is required"),
    sku: Yup.string().required("SKU is required"),
  }),
  images: Yup.array().of(
    Yup.object().shape({
      fileName: Yup.string().required("fileName is required"),
      fileType: Yup.string().required("fileType is required"),
      contentType: Yup.string().required("contentType is required"),
      url: Yup.string().required("url is required"),
    })
  ),
});

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: '100%',
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  container: {
    padding: theme.spacing(3),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      padding: theme.spacing(4.6),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Details", "Images", "Review"];

function StepContent({
  step,
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  setFieldValue,
}) {
  switch (step) {
    case 0:
      return (
        <ProductDetails
          values={values}
          touched={touched}
          errors={errors}
          handleBlur={handleBlur}
          setFieldValue={setFieldValue}
          handleChange={handleChange}
        />
      );
    case 1:
      return (
        <ProductImages
          values={values}
          touched={touched}
          errors={errors}
          handleBlur={handleBlur}
          setFieldValue={setFieldValue}
          handleChange={handleChange}
        />
      );
    case 2:
      return (
        <Summary
          values={values}
          touched={touched}
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
      );
    default:
      return null;
  }
}

export function CreateProduct({update = {}, isUpdate}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  if(update) {
    delete update['inventoryId'];
    if(update['categories']){
      update['categories'] = update['categories'].map(item => item?.label).filter(Boolean);
    }
    if(update['tags']){
      update['tags'] = update['tags'].map(item => item?.label).filter(Boolean);
    }
  }


  const initialValues = {
    title: "",
    description: "",
    inventory: {
      stockQuantity: 0,
      sku: "",
    },
    images: [],
    mrp: 0,
    tax: 18.5,
    taxCode: "",
    price: 0,
    published: true,
    sizes: [],
    details: undefined,
    colors: [],
    dimensions: [],
    styles: [],
    categories: [],
    brand: "",
    ...(config.isProduction ? {} : {
      title: "Big Peacock Wall Stand",
      description:
        "This product is a big peacock wall stand which will look attractive and awesome when kept or hanged at any wall in your house. \n\nIt is one-of-a-kind of a product and when you will hang it on your wall it will increase the liking of your wall and plus will give a luxurious look which is ergonomic and elegant. \n\nWe are sure that you will be able to show-off by hanging this at your lovely wall and all the people coming to your house will ask you and plus it is such at an unbelievable price. What else do you need when you have all the things you need?",
      inventory: { stockQuantity: 100, sku: "B07VXFMVCD" },
      styles: [],
      images: [
        {
          id: 'ckq4hab850002m9p8kczxmi58/images/1624151986235-81rmYy-6-pL._SL1500_.jpg',
          contentType: "image/jpeg",
          fileType: "images",
          fileName: "1624151986235-81rmYy-6-pL._SL1500_.jpg",
          url:
            "https://raw-soda.s3.ap-south-1.amazonaws.com/ckq4hab850002m9p8kczxmi58/images/1624151986235-81rmYy-6-pL._SL1500_.jpg",
        },
        {
          id: 'ckq4hab850002m9p8kczxmi58/images/1624151986236-81U5C8sfZyL._SL1500_.jpg',
          contentType: "image/jpeg",
          fileType: "images",
          fileName: "1624151986236-81U5C8sfZyL._SL1500_.jpg",
          url:
            "https://raw-soda.s3.ap-south-1.amazonaws.com/ckq4hab850002m9p8kczxmi58/images/1624151986236-81U5C8sfZyL._SL1500_.jpg",
        },
        {
          id: 'ckq4hab850002m9p8kczxmi58/images/1624151986236-818SUCoRFmL._SL1500_.jpg',
          contentType: "image/jpeg",
          fileType: "images",
          fileName: "1624151986236-818SUCoRFmL._SL1500_.jpg",
          url:
            "https://raw-soda.s3.ap-south-1.amazonaws.com/ckq4hab850002m9p8kczxmi58/images/1624151986236-818SUCoRFmL._SL1500_.jpg",
        },
      ],
      mrp: 4000,
      tax: 18.5,
      taxCode: "1800",
      price: 2999,
      published: true,
      sizes: ["general"],
      details: [
        { label: "Material", value: "Processed Wood" },
        { label: "Weight", value: "1.2KG" },
        { label: "Package Included", value: "Pack of 1 wall stand" },
      ],
      colors: ["multicolor"],
      dimensions: ["7.5cm", "15cm", "11.5cm"],
      categories: ["homedecor"],
      brand: "Reisetra Crafts ",
      tags: ["handicraft"],
    }),
    ...update,
  };
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const queryClient = useQueryClient();
  const globalDispatch = useGlobalDispatch();
  const [serverError, setServerErrors] = useState();
  const {
    values,
    setFieldValue,
    isValid,
    touched,
    errors,
    handleChange,
    handleSubmit,
    validateForm,
    setTouched,
    handleBlur,
    resetForm,
  } = useFormik({
    initialValues,
    validateOnMount: true,
    enableReinitialize: true,
    validationSchema: createProductSchema,
    onSubmit: (data) => {
      if(isUpdate) {
        updateProduct.mutate({
          productId: update['id'],
          body: data,
        }, {
          onSuccess: () => {
            setActiveStep(activeStep + 1);
            setServerErrors(null);
            queryClient.invalidateQueries("PRODUCTS")
          },
          onError: (error) => {
            globalDispatch(
              updateSnackBar({
                message: error["message"] || "Server Error",
                type: "error",
                open: true,
              })
            );
            setServerErrors(error["errors"]);
          },
        });
        return;
      }

      createProduct.mutate(data, {
        onSuccess: () => {
          setActiveStep(activeStep + 1);
          setServerErrors(null);
          queryClient.invalidateQueries("PRODUCTS")
        },
        onError: (error) => {
          globalDispatch(
            updateSnackBar({
              message: error["message"] || "Server Error",
              type: "error",
              open: true,
            })
          );
          setServerErrors(error["errors"]);
        },
      });
    },
  });

  const handleNext = () => {
    if (activeStep === 0) {
      setTouched({
        title: true,
        description: true,
        inventory: {
          stockQuantity: true,
          sku: true,
        },
        mrp: true,
        tax: true,
        taxCode: true,
        price: true,
        published: true,
        sizes: true,
        colors: true,
        brand: true,
      });
    } else if (activeStep === 1) {
    }
    if (activeStep === steps.length - 1) {
      handleSubmit();
      return;
    }
    if (isValid) {
      setActiveStep(activeStep + 1);
      return;
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Container className={classes.container}>
          <Typography component="h1" variant="h6" align="left">
            Add Product
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Submitted
                </Typography>
                <Typography variant="subtitle1">
                  Product added successfully
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <StepContent
                  step={activeStep}
                  values={values}
                  touched={touched}
                  errors={errors}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Submit" : "Next"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Container>
      </main>
      {serverError && <TextField inputProps={{style:{fontFamily: 'monospace', fontSize: 12}}} fullWidth multiline value={JSON.stringify(serverError, null, 4)} />}
    </React.Fragment>
  );
}
