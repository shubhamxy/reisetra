import { get, post, put } from '../../utils/http'

export function updateTransaction({ id, body }: { id: string; body: any }) {
    return put<any, any>(`transaction/${id}`, body)
}

export function createTransaction(body: any) {
    return post<any, any>('transaction', body)
}
