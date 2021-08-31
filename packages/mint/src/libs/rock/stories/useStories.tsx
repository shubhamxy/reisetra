import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
} from 'react-query'
import { createFormData, getForm, getStories, getStory } from '../api'
import { updateSnackBar, useGlobalDispatch } from '../global'
import { DataT, IErrorResponse, ISuccessResponse, QueryKeys } from '../utils'

export const useStory = (id: string) =>
    useQuery([QueryKeys.stories, id], getStory, {
        enabled: !!id,
        onSuccess: () => {},
    })
export const useStories = (filters = {}, enabled = true) =>
    useInfiniteQuery<ISuccessResponse<DataT>, IErrorResponse<DataT>>(
        [QueryKeys.stories, filters],
        ({ queryKey, pageParam = undefined }) =>
            getStories({
                ...filters,
                buttonNum: '4',
                size: '10',
                cursor: pageParam,
            }),
        {
            enabled,
            getNextPageParam: (lastPage, _pages) => {
                return lastPage.meta.link?.next?.cursor
            },
        }
    )

export const useForm = (id: string) =>
    useQuery([QueryKeys.forms, id], getForm, {
        enabled: !!id,
        onSuccess: () => {},
    })

export const useCreateForm = () => {
    const globalDispatch = useGlobalDispatch()
    const queryClient = useQueryClient()
    return useMutation(createFormData, {
        onSuccess: () => {
            updateSnackBar({
                message: 'Form Submitted sucessfully',
                type: 'info',
                open: true,
            })
            queryClient.invalidateQueries(QueryKeys.forms)
        },
        onError: (error) => {
            globalDispatch(
                updateSnackBar({
                    message: error['message'] || 'Server Error',
                    type: 'error',
                    open: true,
                })
            )
        },
    })
}
