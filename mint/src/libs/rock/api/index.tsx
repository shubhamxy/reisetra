import { QueryClient } from "react-query";
import { get } from "../utils/http";

export const defaultQueryFn = async ({ queryKey }) => {
  const data = await get(queryKey[0]);
  return data;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});
