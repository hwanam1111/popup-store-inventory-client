import { useCallback } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import OutsideClickHandler from 'react-outside-click-handler';

import FormInput from '@ui/form/form-input';
import FormSubmitButton from '@ui/form/form-submit-button';
import FormInputBlock from '@ui/form/form-input-block';
import FormLabel from '@ui/form/form-label';
import FormError from '@ui/form/form-error';
import useEditProductQuantity from '@apis/products/mutations/edit-product-quantity';
import { sweetAlert } from '@libs/sweet-alert2';
import useI18n from '@hooks/useI18n';
import { I18N_COMMON, I18N_EDIT_PRODUCT_QUANTITY } from '@constants/i18n-namespace';

const FormOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  width: 100%;
  height: 100vh;
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0.6);
`;

const Form = styled.form`
  display: flex;
  flex-flow: column;
  width: 600px;
  border-radius: 0.5rem;
  padding: 2rem;
  background-color: ${({ theme }) => theme.color.G0};
`;

const ProductName = styled.h1`
  font-size: 1.125rem;
  font-weight: 500;
  color: ${({ theme }) => theme.color.G80};
`;

const Input = styled(FormInput)`
  margin-top: 0.25rem;
`;

const FormInputContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 1.875rem;
  margin-top: 1.875rem;
`;

const SubmitButton = styled(FormSubmitButton)`
  margin-top: 2rem;
`;

interface EditProductQuantityFormInput {
  productQuantity: number;
}

interface EditProductQuantityProps {
  productId: number;
  productName: string;
  onClose: () => void;
}

export default function EditProductQuantity({ productId, productName, onClose }: EditProductQuantityProps) {
  const router = useRouter();
  const { i18n: commonI18n } = useI18n(I18N_COMMON);
  const { i18n } = useI18n(I18N_EDIT_PRODUCT_QUANTITY);

  const {
    register,
    getValues,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<EditProductQuantityFormInput>({
    mode: 'all',
  });

  const { isLoading, mutate } = useEditProductQuantity();
  const onSubmit = useCallback(() => {
    if (!isLoading && isValid) {
      const { productQuantity } = getValues();
      mutate(
        {
          productId,
          productQuantity,
        },
        {
          onSuccess: (result) => {
            if (result?.ok) {
              sweetAlert
                .fire({
                  icon: 'success',
                  titleText: i18n('form.result.success'),
                  confirmButtonText: i18n('form.result.confirm-button'),
                })
                .then((swalResult) => {
                  if (swalResult) {
                    router.reload();
                  }
                });
            }
          },
          onError: (err) => {
            if (err.response?.data?.error) {
              return sweetAlert
                .fire({
                  icon: 'error',
                  titleText: i18n(`form.result.error.${err.response?.data?.error.message}`),
                  confirmButtonText: i18n('form.result.confirm-button'),
                })
                .then((swalResult) => {
                  if (swalResult) {
                    router.reload();
                  }
                });
            }

            return sweetAlert
              .fire({
                icon: 'error',
                titleText: commonI18n('api.server-error.message'),
                confirmButtonText: commonI18n('api.server-error.confirm-button'),
              })
              .then((swalResult) => {
                if (swalResult) {
                  router.reload();
                }
              });
          },
        },
      );
    }
  }, [isLoading, isValid]);

  return (
    <FormOverlay>
      <OutsideClickHandler onOutsideClick={onClose}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ProductName>
            {i18n('edit-quantity-product-name')} : {productName}
          </ProductName>
          <FormInputContainer>
            <FormInputBlock>
              <FormLabel label={i18n('form.product-quantity.label')} required />
              <Input
                required
                type="number"
                step="0"
                placeholder={i18n('form.product-quantity.placeholder')}
                register={register('productQuantity', {
                  required: i18n('form.product-quantity.error.require'),
                })}
              />
              {errors.productQuantity?.type === 'required' && (
                <FormError message={i18n('form.product-quantity.error.require')} />
              )}
            </FormInputBlock>
          </FormInputContainer>
          <SubmitButton isLoading={isLoading} disabled={!isValid} text={i18n('form.submit-button')} />
        </Form>
      </OutsideClickHandler>
    </FormOverlay>
  );
}
