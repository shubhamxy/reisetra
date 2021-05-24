import React, {useEffect} from "react";
import EditContent from "./EditContent";
import SelectTags from "./SelectTags";
import Success from "./Success";

import * as Yup from "yup";
import {useFormik} from "formik";

import {
	fromString,
	isEmpty,
} from "../../ui/TextEditor";

function useHelper({
	isUpdate,
	step,
	data,
}) {
	const {_id, isPublished, title, description, tags, type, images, docs} =
		data || {};
	const initialValues = {
		step: step || 0,
		isUpdate: isUpdate || false,
		isPublished: isPublished === false ? false : true,
		title: title || "",
		content: fromString(description),
		tags: tags || [],
		type: type,
		images: images || [],
		docs: docs || [],
	};

	const onError = error => {
		let message = String(error.message);
		if (error.error) {
			message = message + ": " + error.error;
		}
	};
	const isLoading = false;
	const schema = Yup.object().shape({
		title: Yup.string().required(),
		content: Yup.array().required(),
		docs: Yup.array(),
		images: Yup.array(),
	});
	const {
		setFieldValue,
		values,
		setFieldError,
		handleChange,
		isValid,
		errors,
		resetForm,
		handleSubmit,
	} = useFormik({
		initialValues,
		validateOnMount: true,
		enableReinitialize: true,
		validationSchema: schema,
		validate: values => {
			let errors;
			if (values && values.content && isEmpty(values.content)) {
				errors = {};
				errors.content = "required";
			}
			return errors;
		},
		onSubmit: ({
		}) => {

		},
	});
	return {
		isLoading,
		onError,
		setFieldValue,
		setFieldError,
		values,
		errors,
		isValid,
		handleChange,
		resetForm,
		handleSubmit,
	};
}

export default function CreateReview({
	onCloseHandler,
	step,
	isUpdate,
	setFieldError,
	data,
}) {
	const {
		values,
		setFieldValue,
		isValid,
		resetForm,
		handleSubmit,
		isLoading,
	} = useHelper({
		step,
		isUpdate,
		data,
	});

	switch (values.step) {
		case 0:
			return (
				<EditContent
					onCloseHandler={onCloseHandler}
					isLoading={isLoading}
					values={values}
					setFieldValue={setFieldValue}
					setFieldError={setFieldError}
					isValid={isValid}
					handleTagsClick={() => {
						setFieldValue("step", 1);
					}}
					handleNext={e => {
						setFieldValue("step", 1);
					}}
					text={{
						header: {
							title: "Share your review",
						},
						title: {
							id: "title",
							placeholder: "Title of your review",
						},
						content: {
							id: "content",
							placeholder: "Start writing here",
						},
						toolbar: {
							text: "Add to your review",
						},
					}}
				/>
			);
		case 1:
			return (
				<SelectTags
					onCloseHandler={onCloseHandler}
					isLoading={isLoading}
					values={values}
					setFieldValue={setFieldValue}
					isValid={isValid}
					handleNext={async e => {
					}}
					handleSaveAsDraft={async e => {

					}}
					handleGoBack={e => {

          }}
				/>
			);
		case 2:
			return (
				<Success
					academics={[]}
					onCloseHandler={onCloseHandler}
					handleSkipForNow={() => {

					}}
					hasNext={false}
					handleNext={() => {

					}}
				/>
			);
		default:
			return null;
	}
}
