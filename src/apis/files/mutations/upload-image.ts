import { useMutation, UseMutationResult } from 'react-query';
import { AxiosError } from 'axios';

import apiClient from '@libs/api-client';
import { UploadImageInput, UploadImageOutput } from '@apis/files/dtos/upload-image.dto';

const imageUploadMutation = async (input: UploadImageInput): Promise<UploadImageOutput> => {
  const { data } = await apiClient({
    url: `/v1/files/upload/image`,
    method: 'POST',
    data: input,
  });
  return data;
};

export default function useUploadImage(): UseMutationResult<
  UploadImageOutput,
  AxiosError<UploadImageOutput>,
  UploadImageInput
> {
  return useMutation(imageUploadMutation);
}
