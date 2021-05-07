type Data = Record<string, any> | string | number | boolean | Object;
export type DataT = Record<string, Data>[] | Record<string, Data> | Data[] | Data;
interface ISuccessResponse<D> {
  statusCode?: number;
  message?: string;
  data?: D;
  meta?: Record<string, string>;
}

export type SuccessResponse<D = DataT> = ISuccessResponse<D>;
