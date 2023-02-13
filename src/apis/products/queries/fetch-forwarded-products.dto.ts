import { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

import apiClient from '@libs/api-client';
import queryKeys from '@constants/query-keys';
import {
  FetchForwardedProductsInput,
  FetchForwardedProductsOutput,
} from '@apis/products/dtos/fetch-forwarded-products.dto';

export async function fetchForwardedProducts(fetchForwardedProductsInput: FetchForwardedProductsInput) {
  const { page, limit, sellingCountry, productId, isOnlyMeData } = fetchForwardedProductsInput;

  const result = await apiClient({
    url: `/v1/products/forwarded?isOnlyMeData=${isOnlyMeData}&page=${page}&limit=${limit}${
      sellingCountry ? `&sellingCountry=${sellingCountry}` : ''
    }${productId ? `&productId=${productId}` : ''}`,
    method: 'GET',
  });

  return result;
}

function useFetchForwardedProducts(
  fetchForwardedProductsInput: FetchForwardedProductsInput,
): UseQueryResult<FetchForwardedProductsOutput, AxiosError<FetchForwardedProductsOutput>> {
  const { page, sellingCountry, productId, isOnlyMeData } = fetchForwardedProductsInput;

  return useQuery(
    [queryKeys.PRODUCTS.ALL, queryKeys.PRODUCTS.FORWARDED, page, sellingCountry, productId, isOnlyMeData],
    () => fetchForwardedProducts(fetchForwardedProductsInput),
    {
      select: ({ data }) => data,
    },
  );
}

export default useFetchForwardedProducts;
