import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./ProductDetails";
import PaymentForm from "./ProductImages";
import Review from "./Review";
import { useCreateProduct, useUpdateProduct } from "../../libs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Container } from "@material-ui/core";
// {
//   mrp: 30000,
//   tax: 18.5,
//   price: 20000,
//   published: true,
//   size: "xl",
//   extra: {},
//   color: "red",
//   brand: "Apple",
//   title: "Apple IPhone XS",
//   description:
//     "iPhone Xs and iPhone Xs Max build on the all-screen design of iPhone X and feature the sharpest displays with the highest pixel density of any Apple device.",
//   inventory: {
//     stockQuantity: 100,
//     sku: "APL-1010",
//   },
//   images: [],
// }
const createProductSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  mrp: Yup.number().required("MRP is required"),
  tax: Yup.string().required("Tax is required"),
  taxCode: Yup.string().required("HSN/SAC code is required"),
  price: Yup.number().required("Price is required"),
  color: Yup.string().required("Color is required"),
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
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
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
        <AddressForm
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
        <PaymentForm
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
        <Review
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
    size: "",
    extra: {},
    color: "",
    brand: "",
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
    validateForm();
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
        size: true,
        color: true,
        brand: true,
      });
    } else if (activeStep === 1) {
      setTouched({
        images: true,
      });
    }
    if (activeStep === steps.length - 1) {
      handleSubmit();
      return;
    }
    setActiveStep(activeStep + 1);
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
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    disabled={!isValid}
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
