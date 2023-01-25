import { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

import apiClient from '@libs/api-client';
import queryKeys from '@constants/query-keys';
import {
  FetchDaysDefectiveDamageProductsInput,
  FetchDaysDefectiveDamageProductsOutput,
} from '@apis/statistics/dtos/fetch-days-defective-damage-products.dto';

export async function DaysDefectiveDamageProducts(
  fetchDaysDefectiveDamageProductsInput: FetchDaysDefectiveDamageProductsInput,
) {
  const { country, timezone } = fetchDaysDefectiveDamageProductsInput;

  const result = await apiClient({
    url: `/v1/statistics/days/defective-damage-products-count?timezone=${timezone}${
      country ? `&country=${country}` : ''
    }`,
    method: 'GET',
  });

  return result;
}

function useDaysDefectiveDamageProducts(
  fetchDaysDefectiveDamageProductsInput: FetchDaysDefectiveDamageProductsInput,
): UseQueryResult<FetchDaysDefectiveDamageProductsOutput, AxiosError<FetchDaysDefectiveDamageProductsOutput>> {
  const { country, timezone } = fetchDaysDefectiveDamageProductsInput;

  return useQuery(
    [queryKeys.STATISTICS.ALL, queryKeys.STATISTICS.CHART.DAYS.DEFECTIVE_DAMAGE_PRODUCTS_COUNT, country, timezone],
    () => DaysDefectiveDamageProducts(fetchDaysDefectiveDamageProductsInput),
    {
      select: ({ data }) => data,
    },
  );
}

export default useDaysDefectiveDamageProducts;
