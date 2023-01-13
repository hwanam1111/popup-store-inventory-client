import { useMutation, UseMutationResult } from 'react-query';
import { AxiosError } from 'axios';

import apiClient from '@libs/api-client';
import { CreateProductInput, CreateProductOutput } from '@apis/products/dtos/create-product.dto';

const createProductMutation = async (input: CreateProductInput): Promise<CreateProductOutput> => {
  const { data } = await apiClient({
    url: `/v1/products`,
    method: 'POST',
    data: input,
  });
  return data;
};

export default function useCreateProduct(): UseMutationResult<
  CreateProductOutput,
  AxiosError<CreateProductOutput>,
  CreateProductInput
> {
  return useMutation(createProductMutation);
}
