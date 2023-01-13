import { useMutation, UseMutationResult } from 'react-query';
import { AxiosError } from 'axios';

import apiClient from '@libs/api-client';
import {
  CancelForwardingProductInput,
  CancelForwardingProductOutput,
} from '@apis/products/dtos/cancel-forwarding-product.dto';

const forwardingProductMutation = async (
  input: CancelForwardingProductInput,
): Promise<CancelForwardingProductOutput> => {
  const { data } = await apiClient({
    url: `/v1/products/cancel/forwarding`,
    method: 'POST',
    data: input,
  });
  return data;
};

export default function useCancelForwardingProduct(): UseMutationResult<
  CancelForwardingProductOutput,
  AxiosError<CancelForwardingProductOutput>,
  CancelForwardingProductInput
> {
  return useMutation(forwardingProductMutation);
}
