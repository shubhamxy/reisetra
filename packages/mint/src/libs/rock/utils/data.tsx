import { InfiniteData } from 'react-query'
import { DataT, ISuccessResponse } from './http'

export function getTotalDataCount(data: InfiniteData<ISuccessResponse<DataT>>) {
    let total = 0
    data?.pages?.forEach((page: { data: any[] }) => {
        total += page?.data?.length || 0
    })
    return total
}

export function getTotalCount(data: {
    pages: { meta?: { totalCount?: number } }[]
}) {
    return data?.pages[0]?.meta?.totalCount || 0
}
