import { useMutation, UseMutationResult } from 'react-query';
import { AxiosError } from 'axios';

import apiClient from '@libs/api-client';
import {
  DefectiveDamageProductInput,
  DefectiveDamageProductOutput,
} from '@apis/products/dtos/defective-damage-product.dto';

const forwardingProductMutation = async (input: DefectiveDamageProductInput): Promise<DefectiveDamageProductOutput> => {
  const { data } = await apiClient({
    url: `/v1/products/defective-damage`,
    method: 'POST',
    data: input,
  });
  return data;
};

export default function useDefectiveDamageProduct(): UseMutationResult<
  DefectiveDamageProductOutput,
  AxiosError<DefectiveDamageProductOutput>,
  DefectiveDamageProductInput
> {
  return useMutation(forwardingProductMutation);
}
