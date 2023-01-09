import { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

import apiClient from '@libs/api-client';
import queryKeys from '@constants/query-keys';
import {
  FetchDefectiveDamageProductsInput,
  FetchDefectiveDamageProductsOutput,
} from '@apis/products/dtos/fetch-defective-damage-products.dto';

export async function fetchDefectiveDamageProducts(
  fetchDefectiveDamageProductsInput: FetchDefectiveDamageProductsInput,
) {
  const { page, limit, sellingCountry, productId } = fetchDefectiveDamageProductsInput;

  const result = await apiClient({
    url: `/v1/products/defective-damage?page=${page}&limit=${limit}${
      sellingCountry ? `&sellingCountry=${sellingCountry}` : ''
    }${productId ? `&productId=${productId}` : ''}`,
    method: 'GET',
  });

  return result;
}

function useFetchDefectiveDamageProducts(
  fetchDefectiveDamageProductsInput: FetchDefectiveDamageProductsInput,
): UseQueryResult<FetchDefectiveDamageProductsOutput, AxiosError<FetchDefectiveDamageProductsOutput>> {
  const { page, sellingCountry, productId } = fetchDefectiveDamageProductsInput;

  return useQuery(
    [queryKeys.PRODUCTS.ALL, queryKeys.PRODUCTS.FORWARDED, page, sellingCountry, productId],
    () => fetchDefectiveDamageProducts(fetchDefectiveDamageProductsInput),
    {
      select: ({ data }) => data,
    },
  );
}

export default useFetchDefectiveDamageProducts;
