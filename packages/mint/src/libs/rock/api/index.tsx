import { QueryClient } from 'react-query'
import { get } from '../utils'

export const defaultQueryFn = async ({ queryKey }) => {
    return get(queryKey[0])
}

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            queryFn: defaultQueryFn,
            retry: 1,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
        },
    },
})

export * from './auth'
export * from './carts'
export * from './files'
export * from './orders'
export * from './products'
export * from './stories'
export * from './transactions'
export * from './users'
