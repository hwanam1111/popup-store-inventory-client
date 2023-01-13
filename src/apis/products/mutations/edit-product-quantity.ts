import { useMutation, UseMutationResult } from 'react-query';
import { AxiosError } from 'axios';

import apiClient from '@libs/api-client';
import { EditProductQuantityInput, EditProductQuantityOutput } from '@apis/products/dtos/edit-product-quantity.dto';

const createProductMutation = async (input: EditProductQuantityInput): Promise<EditProductQuantityOutput> => {
  const { productId } = input;
  const { data } = await apiClient({
    url: `/v1/products/${productId}/quantity`,
    method: 'PATCH',
    data: input,
  });
  return data;
};

export default function useEditProductQuantity(): UseMutationResult<
  EditProductQuantityOutput,
  AxiosError<EditProductQuantityOutput>,
  EditProductQuantityInput
> {
  return useMutation(createProductMutation);
}
