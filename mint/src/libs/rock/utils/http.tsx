import { refreshAuthToken } from "../api/auth";
import { config as apiConfig } from "../config";
import { storage } from "./storage";

/**
 * Expected types from the backend response or request body
 */
type Data = Record<string, any> | string | number | boolean | Object;

export type DataT =
  | Record<string, Data>[]
  | Record<string, Data>
  | Data[]
  | Data;

export interface IMeta {
  context: string;
  link: any;
  totalCount: number;
  page: number;
  [key: string]: any;
}

export interface IError {
  code?: number | string;
  type?: string;
  context: string;
  message?: string;
  stack?: any;
  [key: string]: any;
}

export interface IErrorResponse<T> {
  success?: false;
  message?: string;
  errors?: T[];
  meta?: Partial<IMeta>;
}
/**
 * @example
 * type Todo = {
 *    userId: number
 *    id: string
 *    title: string
 *    completed: boolean
 *  }
 *  const data = await http<Todo[]>("https://jsonplaceholder.typicode.com/todos")
 */
export interface ISuccessResponse<D> {
  success?: boolean;
  message?: string;
  data?: D;
  meta?: Partial<IMeta>;
  [key: string]: DataT;
}

/**
 * Fetch API Wrapper for ease of use
 * @param path {string} Url Path to request.
 * @param config {RequestInit} request config.
 * @throws FetchError {IErrorResponse<T>}
 * @returns {Promise<ISuccessResponse>} SuccessResponse or ErrorResponse
 */
async function http<S, E = any>(
  path: string,
  config: RequestInit,
  withAPI = true
): Promise<S> {
  const requestPath = withAPI ? apiConfig.apiUrl + path : path;
  if (withAPI) {
    const access_token = storage.get.access_token();
    config = config || {};
    config.headers = config.headers || {};
    if(access_token) {
      config.headers["Authorization"] = `Bearer ${access_token}`
    }
    config.headers["Content-Type"] = "application/json";
  }

  const request = new Request(requestPath, config);
  const response = await fetch(request);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401 && withAPI && config.headers["Authorization"] && !config.headers['X-Refresh-Token']) {
      const response = await refreshAuthToken();
      if (response.data.access_token && response.data.refresh_token) {
        storage.put.access_token(response.data.access_token);
        storage.put.refresh_token(response.data.refresh_token);
        return http(path, config, withAPI);
      }
      storage.clear();
    }

    throw new HTTPError<E>(data);
  }
  return data as S;
}

export function HTTPError<T = DataT>(error: IErrorResponse<T>) {
  this.message = error?.message;
  this.success = error?.success;
  this.errors = error?.errors;
  this.meta = error?.meta;
}

export async function get<ResponseT = DataT, ErrorT = DataT>(
  path: string,
  config?: RequestInit,
  withAPI = true
): Promise<ISuccessResponse<ResponseT>> {
  const init = { method: "get", ...config };
  return await http<ISuccessResponse<ResponseT>, ErrorT>(path, init, withAPI);
}

export async function post<BodyT = DataT, ResponseT = DataT, ErrorT = DataT>(
  path: string,
  body: BodyT,
  config?: RequestInit,
  withAPI = true
): Promise<ISuccessResponse<ResponseT>> {
  const init = { method: "post", body: JSON.stringify(body), ...config };
  return await http<ISuccessResponse<ResponseT>, ErrorT>(path, init, withAPI);
}

export async function put<BodyT = DataT, ResponseT = DataT, ErrorT = DataT>(
  path: string,
  body: BodyT,
  config?: RequestInit,
  withAPI = true
): Promise<ISuccessResponse<ResponseT>> {
  const init = { method: "put", body: JSON.stringify(body), ...config };
  return await http<ISuccessResponse<ResponseT>, ErrorT>(path, init, withAPI);
}

export async function putRaw<ResponseT = DataT, ErrorT = DataT>(
  path: string,
  body: BodyInit,
  config?: RequestInit,
  withAPI = false
): Promise<ISuccessResponse<ResponseT>> {
  const init = { method: "put", body: body, ...config };
  return await http<ISuccessResponse<ResponseT>, ErrorT>(path, init, withAPI);
}

export async function del<ResponseT = DataT, ErrorT = DataT>(
  path: string,
  config?: RequestInit,
  withAPI = true
): Promise<ISuccessResponse<ResponseT>> {
  const init = { method: "delete", ...config };
  return await http<ISuccessResponse<ResponseT>, ErrorT>(path, init, withAPI);
}
