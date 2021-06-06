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
  tags: Yup.array(),
  dimensions: Yup.array(),
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
      title: "Apple IPhone XS",
      description:
        "Super Retina.\nThe custom OLED displays on iPhone XS deliver the most accurate color in the industry, HDR, and true blacks.\n\nExceptional Materials.\nThe most durable glass ever in a smartphone. A beautiful new gold finish, achieved with an atomic-level process. Precision-machined, surgical-grade stainless steel bands. And a new level of water and dust resistance.3\nSurgical-grade stainless steel. We used a special Apple-designed alloy that’s precisely machined to create structural bands in three finishes.\nWireless charging. The glass back allows iPhone XS to charge wirelessly.4 And it charges even faster than iPhone X.\nPVD color process. Gold and space gray finishes use an advanced physical vapor deposition process on the stainless steel bands for colors and reflectivity that beautifully complement the glass.\n\nAdvanced Face ID.\nSecurity is simple when your face is your password. You can unlock your iPhone, log in to apps, and pay for things with a glance. It’s the most secure facial authentication ever in a smartphone. And now it’s even faster.\n\nIntelligent A12 Bionic.\nThis is the smartest, most powerful chip in a smartphone, with our next generation Neural Engine. For amazing augmented reality experiences. Incredible portraits with Depth Control. And speed and fluidity in everything you do.\n\nBreakthrough dual-camera system.\nThe world’s most popular camera is defining a new era of photography. Where an innovative sensor works with the ISP and Neural Engine to help you create photos like never before.\nSmart HDR. New secondary frames, a faster sensor, and the powerful A12 Bionic chip bring more highlight and shadow detail to your photos.\nLarger and deeper pixels. A new sensor creates better image fidelity, greater color accuracy, and reduced noise in low-light shots.\nEnhanced bokeh effect. Portrait mode photos look even more professional thanks to a sophisticated background blur.\nAll-new Depth Control. Now you can adjust the depth of field in portraits after you shoot.\nDual 12MP rear cameras. With ƒ/1.8 wide-angle lens, ƒ/2.4 telephoto lens, 2x faster sensor for Smart HDR across your photos, Portrait mode with Depth Control, 4K video up to 60 fps.\nTrueDepth camera. With ƒ/2.2 wide-angle lens, Portrait mode with Depth Control, 1080p HD video up to 60 fps.\nAnd this. iPhone XS delivers Gigabit-class LTE for superfast download speeds.5And up to 512GB of storage, making this our highest-capacity iPhone yet.\nNo other phone is like iPhone. Every decision that goes into iPhone makes it stand apart. From the way it’s made, to the way we build in privacy and security from the start, to the innovative ways we recycle components.",
      inventory: {
        stockQuantity: 100,
        sku: "APPLE-XS",
      },
      images: [
        {
          fileName: "refurb-iphone-xs-silver_AV1.jpeg",
          fileType: "images",
          url:
            "https://raw-soda.s3.ap-south-1.amazonaws.com/ckp99epp60002m6p85n26ae01/images/refurb-iphone-xs-silver_AV1.jpeg",
          contentType: "image/jpeg",
        },
      ],
      mrp: 30000,
      tax: 18.5,
      taxCode: "1800",
      price: 20000,
      published: true,
      sizes: ["XS"],
      details: [
        {
          label: "Capacity",
          value: "64GB",
        },
        {
          label: "Processor",
          value: "A12 Bionic chip",
        },
        {
          label: "Display",
          value:
            "Super Retina HD display  5.8-inch (diagonal) all-screen OLED Multi-Touch display  HDR display  2436-by-1125-pixel resolution at 458 ppi  1,000,000:1 contrast ratio (typical)  True Tone display  Wide color display (P3)  3D Touch  625 cd/m2 max brightness (typical)  Fingerprint-resistant oleophobic coating  Support for display of multiple languages and characters simultaneously  The iPhone XS display has rounded corners that follow a beautiful curved design, and these corners are within a standard rectangle. When measured as a standard rectangular shape, the screen is 5.85 inches diagonally (actual viewable area is less).",
        },
        {
          label: "Splash, Water, and Dust Resistant",
          value:
            "Rated IP68 (maximum depth of 2 meters up to 30 minutes) under IEC standard 60529 ³",
        },
        {
          label: "Power and Battery",
          value:
            "Lasts up to 30 minutes longer than iPhone X¹³  Built-in rechargeable lithium-ion battery  Wireless charging (works with Qi-certified chargers)4  Charging via USB to computer system or power adapter",
        },
        {
          label: "Talk time (wireless)",
          value: "Up to 20 hours",
        },
        {
          label: "Internet use",
          value: "Up to 12 hours",
        },
        {
          label: "Wireless video playback",
          value: "Up to 14 hours",
        },
        {
          label: "Wireless audio playback",
          value: "Up to 60 hours",
        },
      ],
      colors: ["silver", "grey", "gold"],
      dimensions: [3, 2, 4],
      categories: ["smartphone"],
      tags: ["iphone"],
      brand: "Apple",
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
