import { refreshAuthToken } from '../api'
import { config as apiConfig } from '../config'
import { storage } from './storage'

export type DataT = any

export interface IMeta {
    context: string
    link: any
    totalCount: number
    page: number

    [key: string]: any
}

export interface IError {
    code?: number | string
    type?: string
    context: string
    message?: string
    stack?: any

    [key: string]: any
}

export interface IErrorResponse<T> {
    success?: false
    message?: string
    errors?: T[]
    meta?: Partial<IMeta>
}

export interface ISuccessResponse<D> {
    success?: boolean
    message?: string
    data?: D
    meta?: Partial<IMeta>

    [key: string]: DataT
}

/**
 * Fetch API Wrapper for ease of use
 * @param path {string} Url Path to request.
 * @param config {RequestInit} request config.
 * @param withAPI {Boolean} use path as url
 * @throws FetchError {IErrorResponse<T>}
 * @returns {Promise<ISuccessResponse>} SuccessResponse or ErrorResponse
 */
async function http<S, E = any>(
    path: string,
    config: any,
    withAPI = true
): Promise<S> {
    let requestPath = path
    if (withAPI) {
        requestPath = apiConfig.apiUrl + path
    }

    config = config || {}
    config.headers = config.headers || {}
    config.headers['Content-Type'] =
        config.headers['Content-Type'] || 'application/json'
    if (withAPI && !config.headers['X-Refresh-Token']) {
        const accessToken = storage.get.access_token()
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`.trim()
        }
    }

    const request = new Request(requestPath, config)
    const response = await fetch(request)
    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
        if (
            response.status === 401 &&
            withAPI &&
            config.headers['Authorization'] &&
            !config.headers['X-Refresh-Token']
        ) {
            try {
                const successResponse = await refreshAuthToken({})
                if (
                    successResponse.data.access_token &&
                    successResponse.data.refresh_token
                ) {
                    storage.put.access_token(successResponse.data.access_token)
                    storage.put.refresh_token(
                        successResponse.data.refresh_token
                    )
                    return http(path, config, withAPI)
                }
            } catch (error) {
                storage.clear()
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
                throw new HTTPError<E>(error)
            }
        }
        throw new HTTPError<E>(data)
    }
    return data as S
}

export function HTTPError<T = DataT>(error: IErrorResponse<T>) {
    this.message = error?.message
    this.success = error?.success
    this.errors = error?.errors
    this.meta = error?.meta
}

export async function get<ResponseT = DataT, ErrorT = DataT>(
    path: string,
    config?: any,
    withAPI = true
): Promise<ISuccessResponse<ResponseT>> {
    const init = { method: 'get', ...config }
    return http<ISuccessResponse<ResponseT>, ErrorT>(path, init, withAPI)
}

export async function post<BodyT = DataT, ResponseT = DataT, ErrorT = DataT>(
    path: string,
    body: BodyT,
    config?: any,
    withAPI = true
): Promise<ISuccessResponse<ResponseT>> {
    const init = { method: 'post', body: JSON.stringify(body), ...config }
    return http<ISuccessResponse<ResponseT>, ErrorT>(path, init, withAPI)
}

export async function put<BodyT = DataT, ResponseT = DataT, ErrorT = DataT>(
    path: string,
    body: BodyT,
    config?: any,
    withAPI = true
): Promise<ISuccessResponse<ResponseT>> {
    const init = { method: 'put', body: JSON.stringify(body), ...config }
    return http<ISuccessResponse<ResponseT>, ErrorT>(path, init, withAPI)
}

export async function putRaw<ResponseT = DataT, ErrorT = DataT>(
    path: string,
    body: any,
    config?: any,
    withAPI = false
): Promise<ISuccessResponse<ResponseT>> {
    const init = { method: 'put', body: body, ...config }
    return http<ISuccessResponse<ResponseT>, ErrorT>(path, init, withAPI)
}

export async function del<ResponseT = DataT, ErrorT = DataT>(
    path: string,
    config?: any,
    withAPI = true
): Promise<ISuccessResponse<ResponseT>> {
    const init = { method: 'delete', ...config }
    return http<ISuccessResponse<ResponseT>, ErrorT>(path, init, withAPI)
}
