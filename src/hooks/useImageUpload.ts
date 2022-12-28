import React, { useCallback, useState } from 'react';

import useUploadImage from '@apis/files/mutations/upload-image';

interface ImageUploadProps {
  input: any;
  maxFileSize: number;
  fileUploadPath: string;
  uploadFileTitle: string;
  defaultImageUrl: string | null;
}

export default ({ input, maxFileSize, fileUploadPath, uploadFileTitle, defaultImageUrl }: ImageUploadProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(defaultImageUrl);
  const { isLoading, mutate: uploadImageMutate } = useUploadImage();
  const [clientError, setClientError] = useState<string | null>(null);

  const onImageUpload = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = evt.target;
      if (!isLoading && files.length > 0) {
        const formData = new FormData();

        let isOverSize = false;
        let isNotAllowExtension = false;
        Array.from(files).forEach((file) => {
          if (file.size > maxFileSize) {
            isOverSize = true;
          }
          const fileType = file.type.toLocaleLowerCase();
          if (fileType !== 'image/png' && fileType !== 'image/jpeg' && fileType !== 'image/jpg') {
            isNotAllowExtension = true;
          }

          formData.append('image', file);
          formData.append('path', fileUploadPath);
        });

        if (isOverSize) {
          input.current.value = '';
          return setClientError(
            `${uploadFileTitle}(png, jpg, jpeg)는\n 최대 ${maxFileSize / 1024 / 1024}mb까지 등록가능합니다.`,
          );
        }

        if (isNotAllowExtension) {
          input.current.value = '';
          return setClientError('이미지 파일만 업로드가 가능합니다.');
        }

        return uploadImageMutate(formData, {
          onSuccess: (result) => {
            if (result?.image) {
              setImageUrl(result.image.url);
            }
          },
          onError: (err) => {
            alert(err);
          },
        });
      }
    },
    [isLoading],
  );

  return [isLoading, onImageUpload, imageUrl, clientError, setClientError] as const;
};
