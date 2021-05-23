import React, { useEffect, useState } from "react";
import CreateQuery from "./CreateQuery";
import QuerySuccessDialog from "./Success";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useCreateProduct, useUpdateProduct } from "../../libs";

export function CreateProduct({ onCloseHandler = () => {}}) {
  const initialValues = {
    step: 0,
    mrp: 30000,
    tax: 18.5,
    price: 20000,
    published: true,
    size: "xl",
    extra: {},
    color: "red",
    brand: "Apple",
    title: "Apple IPhone XS",
    description:
      "iPhone Xs and iPhone Xs Max build on the all-screen design of iPhone X and feature the sharpest displays with the highest pixel density of any Apple device.",
    inventory: {
      stockQuantity: 100,
      sku: "APL-1010",
    },
  };
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const onError = (error) => {
    let message = String(error.message);
    if (error.error) {
      message = message + ": " + error.error;
    }
  };

  const {
    values,
    setFieldValue,
    isValid,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues,
    validateOnMount: true,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      question: Yup.string().required(),
    }),
    onSubmit: (data) => {
      createProduct.mutate(data, {
        onSuccess: () => {
          onCloseHandler();
        },
        onError,
      });
    },
  });

  const [hasVisitedTags, setHasVisitedTags] = useState(false);
  const isLoading = createProduct.isLoading || updateProduct.isLoading;
  switch (values.step) {
    case 0:
      return (
        <CreateQuery
          onCloseHandler={onCloseHandler}
          values={values}
          setFieldValue={setFieldValue}
          handleChange={handleChange}
          isValid={isValid}
          nextBtnLabel={hasVisitedTags ? "Submit" : "Next"}
          handleNext={(e) => {
            if (hasVisitedTags) {
              handleSubmit();
            } else {
              setFieldValue("step", 1);
              setHasVisitedTags(true);
            }
          }}
          onError={onError}
        />
      );
    case 1:
      return (
        <QuerySuccessDialog
          onCloseHandler={onCloseHandler}
          handleNext={() => {
            onCloseHandler();
            resetForm();
          }}
        />
      );
    default:
      return null;
  }
}
