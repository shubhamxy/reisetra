import { useMutation, useQueryClient } from "react-query";
import { updateTransaction } from "../api/transaction";
import { setAuthState, useAuthDispatch } from "../auth";

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();
  const dispatch = useAuthDispatch();
  return useMutation(updateTransaction, {
    onSuccess: () => {
      dispatch(setAuthState({user: null}));
      queryClient.invalidateQueries("cart");
    },
  });
};
