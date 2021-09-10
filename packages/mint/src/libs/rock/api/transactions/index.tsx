import { API_ROUTES, post, put } from '../../utils'

export function updateTransaction({ id, body }: { id: string; body: any }) {
    return put<any, any>(`${API_ROUTES.transactions}/${id}`, body)
}

export function createTransaction(body: any) {
    return post<any, any>(API_ROUTES.transactions, body)
}
