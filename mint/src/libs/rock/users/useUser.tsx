import { useMutation } from "react-query";
import { getMe, updateMe } from "../api/user";

export const useUserProfile = () => useMutation(getMe);

export const useUpdateUserProfile = () => useMutation(updateMe);
