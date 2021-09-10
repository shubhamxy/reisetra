import { post, put } from '../../utils/http'

export function updateTransaction({ id, body }: { id: string; body: any }) {
    return put<any, any>(`transactions/${id}`, body)
}

export function createTransaction(body: any) {
    return post<any, any>('transactions', body)
}
