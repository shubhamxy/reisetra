import {useDropzone} from "react-dropzone";
import {useMutation} from "react-query";
import { uploadFile } from "../api/file";

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
	const _onError = error => {
		let message = String(error.message);
		if (error.error) {
			message = message + ": " + error.error;
		}
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
						try {
							const response = await fileUploadMutation.mutateAsync({
                file,
                params: {
                  contentType: file.type,
                  fileName: key || file.name,
                  fileType: fileType,
                }
              });
              const data = response.data;
							if (!data.key) {
								throw Error("Server error: data missing");
							}
              const {signedUrl, expiresIn, ...rest} = data;
							return rest;
						} catch (error) {
							_onError(error);
						}
					}),
				);
				uploadedFiles.then(data => {
					const uploaded = data.filter(Boolean);
					if (uploaded.length > 0) {
						onSuccess(uploaded);
					}
				});
			} else if (rejectedFiles[0].errors[0].code === "file-too-large") {

			}
		},
	});
}
