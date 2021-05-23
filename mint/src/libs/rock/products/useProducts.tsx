import { useMutation } from "react-query";
import { updateProduct, createProduct } from "../api/product";

export const useCreateProduct = () => useMutation(createProduct);
export const useUpdateProduct = () => useMutation(updateProduct);
