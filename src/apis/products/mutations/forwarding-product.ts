import { useMutation, UseMutationResult } from 'react-query';
import { AxiosError } from 'axios';

import apiClient from '@libs/api-client';
import { ForwardingProductInput, ForwardingProductOutput } from '@apis/products/dtos/forwarding-product.dto';

const forwardingProductMutation = async (input: ForwardingProductInput): Promise<ForwardingProductOutput> => {
  const { data } = await apiClient({
    url: `/v1/products/forwarding`,
    method: 'POST',
    data: input,
  });
  return data;
};

export default function useForwardingProduct(): UseMutationResult<
  ForwardingProductOutput,
  AxiosError<ForwardingProductOutput>,
  ForwardingProductInput
> {
  return useMutation(forwardingProductMutation);
}
