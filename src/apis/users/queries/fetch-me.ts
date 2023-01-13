import { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

import apiClient from '@libs/api-client';
import queryKeys from '@constants/query-keys';
import { FetchMeOutput } from '@apis/users/dtos/fetch-me.dto';

export async function fetchMe() {
  const result = await apiClient({
    url: `/v1/users/me`,
    method: 'GET',
  });

  return result;
}

function useFetchMe(): UseQueryResult<FetchMeOutput, AxiosError<FetchMeOutput>> {
  return useQuery([queryKeys.USERS.ALL, queryKeys.USERS.ME], fetchMe, {
    select: ({ data }) => data,
  });
}

export default useFetchMe;
