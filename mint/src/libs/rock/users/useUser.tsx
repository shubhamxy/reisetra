import { useMutation, useQuery, UseQueryOptions } from "react-query";
import { createAddress, getMe, updateMe, UserProfile } from "../api/user";
import { useAuthDispatch, setAuthState, logout } from "../auth";
import { ISuccessResponse, storage } from "../utils";

export const useUserProfile = () => useMutation(getMe, {
  mutationKey: ["user"],
});

export const useUpdateUserProfile = () => useMutation(updateMe);

export const useCreateAddress = () => useMutation(createAddress);
