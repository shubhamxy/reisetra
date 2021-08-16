import React, { useEffect } from 'react'
import EditContent from './EditContent'
import SelectTags from './SelectTags'
import Success from './Success'
import { useCreateStory, useStory, useUpdateStory } from '../../libs'

import * as Yup from 'yup'
import { useFormik } from 'formik'


function useHelper({ onSuccess, isUpdate, step, data }) {
    const createStory = useCreateStory()
    const updateStory = useUpdateStory()

    const { id, slug, published, title, description, body, tags, files } = data || {}
    const initialValues = {
        step: step || 0,
        isUpdate: isUpdate || false,
        published: published === false ? false : true,
        title: title || '',
        slug: slug || id || '',
        description: description || '',
        body: body || '',
        tags: tags || [],
        files: files || [],
    }

    const onError = (error) => {
        let message = String(error.message)
        if (error.error) {
            message = message + ': ' + error.error
        }
    }
    const isLoading = false
    const schema = Yup.object().shape({
        title: Yup.string().required(),
        subtitle: Yup.string(),
        description: Yup.string(),
        body: Yup.string(),
        tags: Yup.array(),
        files: Yup.array(),
        slug: Yup.string(),
    })
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
        validate: (values) => {
            let errors
            if (values && !values.body) {
                errors = {}
                errors.body = 'required'
            }
            return errors
        },
        onSubmit: ({ title, description, body, tags, published, slug, }) => {
            if (isUpdate) {
                updateStory.mutate(
                    {
                        body: {
                            body: {
                                markdown: body,
                            },
                            tags,
                            title,
                            description,
                            files,
                            slug,
                            published,
                        },
                        storyId: id,
                    },
                    {
                        onSuccess: () => {},
                        onSettled: () => {
                            setFieldValue('step', 2)
                            onSuccess()
                        },
                    }
                )
                return
            }

            createStory.mutate(
                {
                    body: {
                        markdown: body,
                    },
                    slug,
                    tags,
                    title,
                    description,
                    files,
                    published,
                },
                {
                    onSettled: () => {
                        setFieldValue('step', 2)
                        onSuccess()
                    },
                }
            )
        },
    })

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
    }
}
interface ContentProps {
    id?: string
    onCloseHandler: any
    step?: any
    isUpdate?: any
    data?: any
    onSuccess?: any
}

export function CreateContent({
    id,
    onCloseHandler,
    step,
    isUpdate,
    onSuccess,
}: ContentProps) {
    const story = useStory(id)

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
        onSuccess,
        data: story && story.data ? story.data.data : {},
    })

    switch (values.step) {
        case 0:
            return (
                <EditContent
                    values={values}
                    setFieldValue={setFieldValue}
                    handleTagsClick={() => {
                        setFieldValue('step', 1)
                    }}
                    handleNext={(e) => {
                        setFieldValue('step', 1)
                    }}
                    text={{
                        header: {
                            title: 'Share your story',
                        },
                        title: {
                            id: 'title',
                            placeholder: 'Title of your story',
                        },
                        description: {
                            id: 'description',
                            placeholder: 'Description of your story',
                        },
                        content: {
                            id: 'content',
                            placeholder: 'Start writing here',
                        },
                        toolbar: {
                            text: 'Add to your story',
                        },
                        slug: {
                            id: 'slug',
                            placeholder: 'Slug for story',
                        },
                    }}
                />
            )
        case 1:
            return (
                <SelectTags
                    onCloseHandler={onCloseHandler}
                    isLoading={isLoading}
                    values={values}
                    setFieldValue={setFieldValue}
                    isValid={isValid}
                    handleGoBack={(e) => {
                        setFieldValue('step', 0)
                    }}
                    handleNext={async (e) => {
                        handleSubmit()
                    }}
                    handleSaveAsDraft={async (e) => {
                        setFieldValue('step', 1)
                    }}
                />
            )
        case 2:
            return (
                <Success
                    onCloseHandler={onCloseHandler}
                    handleSkipForNow={() => {
                        resetForm()
                        onCloseHandler()
                    }}
                    hasNext={false}
                    handleNext={() => {
                        resetForm()
                        onCloseHandler()
                    }}
                />
            )
        default:
            return null
    }
}
