import { useMutation, UseMutationResult } from 'react-query';
import { AxiosError } from 'axios';

import apiClient from '@libs/api-client';
import { LoginInput, LoginOutput } from '@apis/users/dtos/login.dto';

const loginMutation = async (input: LoginInput): Promise<LoginOutput> => {
  const { data } = await apiClient({
    url: `/v1/users/login`,
    method: 'POST',
    data: input,
  });
  return data;
};

export default function useLogin(): UseMutationResult<LoginOutput, AxiosError<LoginOutput>, LoginInput> {
  return useMutation(loginMutation);
}
