import { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

import apiClient from '@libs/api-client';
import queryKeys from '@constants/query-keys';
import {
  FetchDaysSynthesisConditions,
  FetchDaysSynthesisInput,
  FetchDaysSynthesisOutput,
} from '@apis/statistics/dtos/fetch-days-synthesis.dto';

export async function fetchDaysSynthesis(fetchDaysSynthesisInput: FetchDaysSynthesisInput) {
  const { country, timezone, selectDate } = fetchDaysSynthesisInput;

  const result = await apiClient({
    url: `/v1/statistics/days/synthesis?timezone=${timezone}&country=${country}&selectDate=${selectDate}`,
    method: 'GET',
  });

  return result;
}

function useFetchDaysSynthesis(
  { isCall }: FetchDaysSynthesisConditions,
  fetchDaysSynthesisInput: FetchDaysSynthesisInput,
): UseQueryResult<FetchDaysSynthesisOutput, AxiosError<FetchDaysSynthesisOutput>> {
  const { country, timezone, selectDate } = fetchDaysSynthesisInput;

  return useQuery(
    [queryKeys.STATISTICS.ALL, queryKeys.STATISTICS.CHART.DAYS.SYNTHESIS, country, timezone, selectDate],
    () => fetchDaysSynthesis(fetchDaysSynthesisInput),
    {
      select: ({ data }) => data,
      enabled: !!selectDate && isCall,
    },
  );
}

export default useFetchDaysSynthesis;
