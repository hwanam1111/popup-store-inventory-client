import { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

import apiClient from '@libs/api-client';
import queryKeys from '@constants/query-keys';
import { FetchDaysRevenueInput, FetchDaysRevenueOutput } from '@apis/statistics/dtos/fetch-days-revenue.dto';

export async function FetchDaysRevenue(fetchDaysRevenueInput: FetchDaysRevenueInput) {
  const { country, timezone } = fetchDaysRevenueInput;

  const result = await apiClient({
    url: `/v1/statistics/days/revenue?timezone=${timezone}${country ? `&country=${country}` : ''}`,
    method: 'GET',
  });

  return result;
}

function useFetchDaysRevenue(
  fetchDaysRevenueInput: FetchDaysRevenueInput,
): UseQueryResult<FetchDaysRevenueOutput, AxiosError<FetchDaysRevenueOutput>> {
  const { country, timezone } = fetchDaysRevenueInput;

  return useQuery(
    [queryKeys.STATISTICS.ALL, queryKeys.STATISTICS.CHART.DAYS.REVENUE, country, timezone],
    () => FetchDaysRevenue(fetchDaysRevenueInput),
    {
      select: ({ data }) => data,
    },
  );
}

export default useFetchDaysRevenue;
