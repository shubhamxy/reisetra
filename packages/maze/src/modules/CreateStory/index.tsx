import React, {useEffect} from "react";
import EditContent from "./EditContent";
import SelectTags from "./SelectTags";
import Success from "./Success";
import {useCreateStory, useUpdateStory} from '../../libs';

import * as Yup from "yup";
import {useFormik} from "formik";

import {
  defaultValue,
	isEmpty,
} from "../../ui/TextEditor";


function useHelper({
	isUpdate,
	step,
	data,
}) {
	const {id, published, title, description, body, tags, files} =
		data || {};
	const initialValues = {
		step: step || 0,
		isUpdate: isUpdate || false,
		published: published === false ? false : true,
		title: title || "",
    description: description || "",
		body: body || defaultValue,
		tags: tags || [],
		files: files || [],
	};
  const createStory = useCreateStory();
  const updateStory = useUpdateStory();

	const onError = error => {
		let message = String(error.message);
		if (error.error) {
			message = message + ": " + error.error;
		}
	};
	const isLoading = false;
	const schema = Yup.object().shape({
		title: Yup.string().required(),
		body: Yup.array().required(),
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
			if (values && values.body && isEmpty(values.body)) {
				errors = {};
				errors.body = "required";
			}
			return errors;
		},
		onSubmit: ({
      title,
      description,
      body,
      tags,
      published,
		}) => {
      if(isUpdate) {
        updateStory.mutate({
          body: {
            body,
            tags,
            title,
            description,
            files,
            published
          },
          storyId: id,
        }, {
          onSuccess: () => {
            setFieldValue("step", 2);
          }
        })
        return;
      }

      createStory.mutate({
        body,
        tags,
        title,
        description,
        files,
        published,
      }, {
        onSuccess: () => {
          setFieldValue("step", 2);
        }
      })
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
interface ContentProps {
  onCloseHandler: any;
  step?: any;
  isUpdate?: any;
  data?: any;
}

export function CreateContent({
	onCloseHandler,
	step,
	isUpdate,
	data,
}: ContentProps) {
	const {
		values,
		setFieldValue,
    setFieldError,
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
							title: "Share your story",
						},
						title: {
							id: "title",
							placeholder: "Title of your story",
						},
            description: {
							id: "description",
							placeholder: "Description of your story",
						},
						content: {
							id: "content",
							placeholder: "Start writing here",
						},
						toolbar: {
							text: "Add to your story",
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
          handleGoBack={e => {
            setFieldValue("step", 0);
          }}
					handleNext={async e => {
            handleSubmit();
					}}
					handleSaveAsDraft={async e => {
            setFieldValue("step", 1);
					}}
				/>
			);
		case 2:
			return (
				<Success
					academics={[]}
					onCloseHandler={onCloseHandler}
					handleSkipForNow={() => {
            resetForm();
            onCloseHandler();
					}}
					hasNext={false}
					handleNext={() => {
            resetForm();
            onCloseHandler();
					}}
				/>
			);
		default:
			return null;
	}
}
