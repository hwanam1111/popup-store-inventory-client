import { useMutation, UseMutationResult } from 'react-query';
import { AxiosError } from 'axios';

import apiClient from '@libs/api-client';
import { DeleteProductInput, DeleteProductOutput } from '@apis/products/dtos/delete-product.dto';

const createProductMutation = async (input: DeleteProductInput): Promise<DeleteProductOutput> => {
  const { productId } = input;
  const { data } = await apiClient({
    url: `/v1/products/${productId}`,
    method: 'DELETE',
    data: input,
  });
  return data;
};

export default function useDeleteProduct(): UseMutationResult<
  DeleteProductOutput,
  AxiosError<DeleteProductOutput>,
  DeleteProductInput
> {
  return useMutation(createProductMutation);
}
