import {useDropzone} from "react-dropzone";
import {useMutation} from "react-query";
import { uploadFile } from "../api/file";
import { useGlobalDispatch, updateSnackBar } from "../global";

interface UseFileUploadParams {
  maxSize?: number;
  key?: string;
  successText?: string;
  infoText?: string;
  accept?: string[];
  multiple?: boolean;
  onSuccess?: (files: any) => void;
  onError?: (error: any) => void;
  fileType: 'images' | 'documents',
};
export function useFileUpload({
	maxSize = 5242880,
  fileType,
	key,
	successText = "File uploaded",
	infoText = "File uploading",
	accept = ["image/jpg", "image/jpeg", "image/png"],
	multiple = false,
	onSuccess = () => {},
	onError = () => {},
}: UseFileUploadParams) {
	const fileUploadMutation = useMutation(uploadFile);
  const dispatch = useGlobalDispatch();
	const _onError = error => {
		let message = String(error.message);
    dispatch(updateSnackBar({
      message: message,
      type: "error",
      open: true,
    }));
    onError(error);
	};

	return useDropzone({
		maxSize: maxSize || 5242880, // 5mb default
		accept,
		multiple,
		onDrop: (files, rejectedFiles) => {
			if (files.length > 0) {
				const uploadedFiles = Promise.all(
					files.map(async file => {
            const fileName = `${key || Date.now()}-${file.name}`.trim();
						try {
							const response = await fileUploadMutation.mutateAsync({
                file,
                params: {
                  contentType: file.type,
                  fileName,
                  fileType,
                }
              });
              const data = response.data;
							if (!data.id) {
								throw Error("Server error: data missing");
							}
              const {signedUrl, expiresIn, ...rest} = data;
							return rest;
						} catch (error) {
							_onError(error);
						}
					}),
				);
        dispatch(updateSnackBar({
          message: infoText,
          type: "info",
          open: true,
        }));
				uploadedFiles.then(data => {
					const uploaded = data.filter(Boolean);
					if (uploaded.length > 0) {
						onSuccess(uploaded);
            dispatch(updateSnackBar({
              message: successText,
              type: "success",
              open: true,
            }));
					}
				});
			} else if (rejectedFiles[0].errors[0].code === "file-too-large") {
        _onError({message: "File too large"})
			}
		},
	});
}
