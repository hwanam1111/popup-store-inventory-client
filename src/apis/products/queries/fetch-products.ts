import { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

import apiClient from '@libs/api-client';
import queryKeys from '@constants/query-keys';
import { FetchProductsInput, FetchProductsOutput } from '@apis/products/dtos/fetch-products.dto';

export async function fetchProducts(fetchProductsInput: FetchProductsInput) {
  const { page, limit, sellingCountry } = fetchProductsInput;

  const result = await apiClient({
    url: `/v1/products?page=${page}&limit=${limit}${sellingCountry ? `&sellingCountry=${sellingCountry}` : ''}`,
    method: 'GET',
  });

  return result;
}

function useFetchProducts(
  fetchProductsInput: FetchProductsInput,
): UseQueryResult<FetchProductsOutput, AxiosError<FetchProductsOutput>> {
  const { page, sellingCountry } = fetchProductsInput;

  return useQuery([queryKeys.PRODUCTS.ALL, page, sellingCountry], () => fetchProducts(fetchProductsInput), {
    select: ({ data }) => data,
  });
}

export default useFetchProducts;
