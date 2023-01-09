import { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

import apiClient from '@libs/api-client';
import queryKeys from '@constants/query-keys';
import {
  FetchCanceledForwardingProductsInput,
  FetchCanceledForwardingProductsOutput,
} from '@apis/products/dtos/fetch-canceled-forwarding-products.dto';

export async function fetchCanceledForwardingProducts(
  fetchCanceledForwardingProductsInput: FetchCanceledForwardingProductsInput,
) {
  const { page, limit, sellingCountry, productId } = fetchCanceledForwardingProductsInput;

  const result = await apiClient({
    url: `/v1/products/canceled/forwarding?page=${page}&limit=${limit}${
      sellingCountry ? `&sellingCountry=${sellingCountry}` : ''
    }${productId ? `&productId=${productId}` : ''}`,
    method: 'GET',
  });

  return result;
}

function useFetchCanceledForwardingProducts(
  fetchCanceledForwardingProductsInput: FetchCanceledForwardingProductsInput,
): UseQueryResult<FetchCanceledForwardingProductsOutput, AxiosError<FetchCanceledForwardingProductsOutput>> {
  const { page, sellingCountry, productId } = fetchCanceledForwardingProductsInput;

  return useQuery(
    [queryKeys.PRODUCTS.ALL, queryKeys.PRODUCTS.FORWARDED, page, sellingCountry, productId],
    () => fetchCanceledForwardingProducts(fetchCanceledForwardingProductsInput),
    {
      select: ({ data }) => data,
    },
  );
}

export default useFetchCanceledForwardingProducts;
