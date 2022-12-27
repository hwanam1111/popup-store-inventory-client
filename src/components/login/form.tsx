import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import Cookies from 'universal-cookie';
import Router from 'next/router';

import { I18N_AUTH_LOGIN, I18N_COMMON } from '@constants/i18n-namespace';
import useI18n from '@hooks/useI18n';
import FormInput from '@ui/form/form-input';
import { useCallback } from 'react';
import FormError from '@ui/form/form-error';
import FormInputBlock from '@ui/form/form-input-block';
import FormLabel from '@ui/form/form-label';
import FormSubmitButton from '@ui/form/form-submit-button';
import useLogin from '@apis/users/mutations/login';
import { sweetAlert } from '@libs/sweet-alert2';
import useFetchMe from '@apis/users/queries/fetch-me';

const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  width: 600px;
  background-color: ${({ theme }) => theme.color.G0};
  border-radius: 1.5rem;
  padding: 2rem 5rem;
`;

const PageTitle = styled.h1`
  color: ${({ theme }) => theme.color.G100};
  font-weight: 700;
  font-size: 1.75rem;
`;

const Form = styled.form`
  margin-top: 3.5rem;
  display: flex;
  flex-flow: column;
  width: 100%;
`;

const Input = styled(FormInput)`
  margin-top: 0.25rem;
`;

const FormInputContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 1.875rem;
`;

const SubmitButton = styled(FormSubmitButton)`
  margin-top: 2rem;
`;

interface LoginFormInput {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { i18n: commonI18n } = useI18n(I18N_COMMON);
  const { i18n } = useI18n(I18N_AUTH_LOGIN);
  const { refetch: refetchMe } = useFetchMe();

  const {
    register,
    getValues,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<LoginFormInput>({
    mode: 'all',
  });

  const { isLoading, mutate, data: loginResult } = useLogin();
  const onSubmit = useCallback(() => {
    if (!isLoading && isValid) {
      const { email, password } = getValues();

      mutate(
        {
          email,
          password,
        },
        {
          onSuccess: (result) => {
            if (result.ok && result.token && result.user) {
              const cookies = new Cookies();
              cookies.set(process.env.JWT_COOKIE_NAME, result.token, {
                path: '/',
                expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 365),
              });

              refetchMe()
                .then(() => {
                  Router.push('/');
                })
                .catch(() => {
                  sweetAlert.fire({
                    icon: 'error',
                    titleText: commonI18n('api.server-error.message'),
                    confirmButtonText: commonI18n('api.server-error.confirm-button'),
                  });
                });
            }
          },
          onError: () => {
            sweetAlert.fire({
              icon: 'error',
              titleText: commonI18n('api.server-error.message'),
              confirmButtonText: commonI18n('api.server-error.confirm-button'),
            });
          },
        },
      );
    }
  }, [isLoading, isValid]);

  return (
    <Container>
      <PageTitle>{i18n('form.title')}</PageTitle>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormInputContainer>
          <FormInputBlock>
            <FormLabel label={i18n('form.email.label')} />
            <Input
              required
              type="email"
              placeholder={i18n('form.email.placeholder')}
              register={register('email', {
                required: i18n('form.email.error.require'),
              })}
            />
            {errors.email?.type === 'required' && <FormError message={i18n('form.email.error.require')} />}
          </FormInputBlock>
          <FormInputBlock>
            <FormLabel label={i18n('form.password.label')} />
            <Input
              required
              type="password"
              placeholder={i18n('form.password.placeholder')}
              register={register('password', {
                required: i18n('form.password.error.require'),
              })}
            />
            {errors.password?.type === 'required' && <FormError message={i18n('form.password.error.require')} />}
          </FormInputBlock>
        </FormInputContainer>
        <SubmitButton isLoading={false} disabled={!isValid} text={i18n('form.submit-button')} />
        {loginResult?.error?.message === 'user-not-found' && (
          <FormError message={i18n(`form.result.error.${loginResult?.error?.message}`)} />
        )}
      </Form>
    </Container>
  );
}
