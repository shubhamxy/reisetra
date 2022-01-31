import { del, get, post, put } from '../../utils/http'
import pickBy from 'lodash.pickby'
import identity from 'lodash.identity'
const queryString = require('query-string')

export interface CreateStoryDTO {
    title: string
    description: string
    body: any[]
    published: boolean
    files: any[]
    tags: string[]
}

export function getStory({ queryKey }: { queryKey: any }) {
    return get(`stories/${queryKey[1]}`)
}

export function getForm({ queryKey }: { queryKey: any }) {
    return get(`forms/${queryKey[1]}`)
}

export function createFormData({
    formId,
    body,
}: {
    formId: string
    body: any
}) {
    return post(`forms/${formId}`, body)
}

export function createStory(body: CreateStoryDTO) {
    return post('stories', body)
}

export function deleteStory(id: string) {
    return del(`stories/${id}`)
}

export function updateStory({
    storyId,
    body,
}: {
    storyId: string
    body: CreateStoryDTO
}) {
    return put(`stories/${storyId}`, body)
}

interface PaginationParams {
    [key: string]: string
    size?: string
    buttonNum?: string
    cursor?: string
    orderBy?: string
    orderDirection?: 'desc' | 'asc'
}

export function getStories(params: PaginationParams) {
    const qs = queryString.stringify(pickBy(params, identity))
    return get(`stories/all?${qs}`)
}
