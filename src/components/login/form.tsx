import styled from 'styled-components';
import { useForm } from 'react-hook-form';

import { I18N_AUTH_LOGIN } from '@constants/i18n-namespace';
import useI18n from '@hooks/useI18n';
import FormInput from '@ui/form/form-input';
import { useCallback } from 'react';
import FormError from '@ui/form/form-error';
import FormInputBlock from '@ui/form/form-input-block';
import FormLabel from '@ui/form/form-label';
import FormSubmitButton from '@ui/form/form-submit-button';

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
  const { i18n } = useI18n(I18N_AUTH_LOGIN);

  const {
    register,
    getValues,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<LoginFormInput>({
    mode: 'all',
  });

  // TODO: mutation 연동
  const isLoading = false;
  const onSubmit = useCallback(() => {
    if (!isLoading && isValid) {
      const { email, password } = getValues();
      console.log(email, password);
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
      </Form>
    </Container>
  );
}
