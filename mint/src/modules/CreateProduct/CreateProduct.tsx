import React from "react";
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
import { useCreateProduct, useUpdateProduct } from "../../libs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Container } from "@material-ui/core";

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
  dimensions: Yup.array(),
  brand: Yup.string().required("Brand is required"),
  inventory: Yup.object().shape({
    stockQuantity: Yup.number().required("Stock Quantity is required"),
    sku: Yup.string().required("SKU is required"),
  }),
  images: Yup.array().of(
    Yup.object().shape({
      key: Yup.string().required("key is required"),
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
      width: 600,
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

export function CreateProduct() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

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
    categories: [],
    brand: "",
    ...{
      mrp: 30000,
      tax: 18.5,
      taxCode: "1800",
      price: 20000,
      published: true,
      sizes: ["L", "XL", "XXL", "XXL"],
      dimensions: [3, 2, 4],
      categories: ["wall art", "gifts", "stationary"],
      details: [
        {
          label: "Weight (Kg)",
          value: "30",
        },
        {
          label: "Material",
          value: "Powder Coated Aluminum, Mango wood",
        },
        {
          label: "Legs",
          value: "Metal Black Finish",
        },
        {
          label: "Assembly",
          value: "Legs to be fitted",
        },
        {
          label: "Caring Instructions",
          value: "Wipe with dry cloths",
        },
        {
          label: "Special Features",
          value: "Made From Dry solid leaves",
        },
        {
          label: "SKU",
          value: "AVULUC-UL",
        },
      ],
      colors: ["red"],
      brand: "Apple",
      title: "Apple IPhone XS",
      description:
        "iPhone Xs and iPhone Xs Max build on the all-screen design of iPhone X and feature the sharpest displays with the highest pixel density of any Apple device.",
      inventory: {
        stockQuantity: 100,
        sku: "APL2",
      },
      images: [
        {
          key: "ckozorq8606530orlxq136pln/images/fbblock.png",
          url:
            "https://raw-soda.s3.ap-south-1.amazonaws.com/ckozorq8606530orlxq136pln/images/fbblock.png",
          contentType: "image/png",
        },
        {
          key:
            "ckozorq8606530orlxq136pln/images/analog-wall-clock-se-108-analog-brothers-creation-original-imafzzdzggzgnj5e.jpeg",
          url:
            "https://raw-soda.s3.ap-south-1.amazonaws.com/ckozorq8606530orlxq136pln/images/analog-wall-clock-se-108-analog-brothers-creation-original-imafzzdzggzgnj5e.jpeg",
          contentType: "image/jpeg",
        },
        {
          key: "ckozorq8606530orlxq136pln/images/ava_0010-512.v1443724322.png",
          url:
            "https://raw-soda.s3.ap-south-1.amazonaws.com/ckozorq8606530orlxq136pln/images/ava_0010-512.v1443724322.png",
          contentType: "image/png",
        },
      ],
    },
  };
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

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
      createProduct.mutate(data, {
        onSuccess: () => {
          setActiveStep(activeStep + 1);
        },
        onError: () => {},
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
    </React.Fragment>
  );
}
