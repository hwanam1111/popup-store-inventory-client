import { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

import apiClient from '@libs/api-client';
import queryKeys from '@constants/query-keys';
import {
  FetchDaysForwardedProductsInput,
  FetchDaysForwardedProductsOutput,
} from '@apis/statistics/dtos/fetch-days-forwarded-products.dto';

export async function FetchDaysForwardedProducts(fetchDaysForwardedProductsInput: FetchDaysForwardedProductsInput) {
  const { country, timezone } = fetchDaysForwardedProductsInput;

  const result = await apiClient({
    url: `/v1/statistics/days/forwarded-products-count?timezone=${timezone}${country ? `&country=${country}` : ''}`,
    method: 'GET',
  });

  return result;
}

function useFetchDaysForwardedProducts(
  fetchDaysForwardedProductsInput: FetchDaysForwardedProductsInput,
): UseQueryResult<FetchDaysForwardedProductsOutput, AxiosError<FetchDaysForwardedProductsOutput>> {
  const { country, timezone } = fetchDaysForwardedProductsInput;

  return useQuery(
    [queryKeys.STATISTICS.ALL, queryKeys.STATISTICS.CHART.DAYS.FORWARDED_PRODUCTS_COUNT, country, timezone],
    () => FetchDaysForwardedProducts(fetchDaysForwardedProductsInput),
    {
      select: ({ data }) => data,
    },
  );
}

export default useFetchDaysForwardedProducts;
