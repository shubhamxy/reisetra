export type DataT = any

export interface SuccessResponse<D> {
  statusCode?: number;
  message?: string;
  data?: D;
  meta?: Record<string, string>;
}

/**
 * Data Response sent to user
 * @param data data to be sent
 * @param message top level message ex. Login successfull etc
 * @param meta metadata
 * @returns success Response Object
 */
export async function successResponse(
  data: DataT | Promise<DataT>,
  message?: string,
  meta?: Record<string, any>,
): Promise<SuccessResponse<DataT>> {
  const resolvedData = await data;
  return {
    data: resolvedData,
    message,
    meta,
  };
}
