import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
} from 'react-query'
import {
    createStory,
    deleteStory,
    getStory,
    getStories,
    updateStory,
} from '../api/stories'
import { updateSnackBar, useGlobalDispatch } from '../global'
import { DataT, IErrorResponse, ISuccessResponse, QueryKeys } from '../utils'

export const useCreateStory = () => {
    const globalDispatch = useGlobalDispatch()
    const queryClient = useQueryClient()
    return useMutation(createStory, {
        onSuccess: () => {
            updateSnackBar({
                message: 'Story added sucessfully',
                type: 'info',
                open: true,
            })
            queryClient.invalidateQueries(QueryKeys.stories)
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
export const useStory = (id: string) =>
    useQuery([QueryKeys.story, id], getStory, {
        enabled: !!id,
        onSuccess: () => {},
    })

export const useUpdateStory = () => {
    const globalDispatch = useGlobalDispatch()
    const queryClient = useQueryClient()

    return useMutation(updateStory, {
        onSuccess: () => {
            updateSnackBar({
                message: 'Story updated sucessfully',
                type: 'info',
                open: true,
            })
            queryClient.invalidateQueries(QueryKeys.story)
            queryClient.invalidateQueries(QueryKeys.stories)
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

export const useDeleteStory = () => {
    const globalDispatch = useGlobalDispatch()
    const queryClient = useQueryClient()
    return useMutation(deleteStory, {
        onSuccess: () => {
            updateSnackBar({
                message: 'Story deleted sucessfully',
                type: 'info',
                open: true,
            })
            queryClient.invalidateQueries(QueryKeys.story)
            queryClient.invalidateQueries(QueryKeys.stories)
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
