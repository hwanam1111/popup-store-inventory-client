import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { RefetchOptions, RefetchQueryFilters, QueryObserverResult } from 'react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { I18N_COMMON, I18N_DEFECTIVE_DAMAGE_PRODUCT } from '@constants/i18n-namespace';
import useI18n from '@hooks/useI18n';
import useScanBarcode from '@hooks/useScanBarcode';
import { CountryName } from '@apis/countries/entities/country.entity';
import { sweetAlert } from '@libs/sweet-alert2';
import ScanBarcodeOfProduct from '@ui/scan-barcode-of-product';
import useDefectiveDamageProduct from '@apis/products/mutations/defective-damage-product';
import { FetchDefectiveDamageProductsOutput } from '@apis/products/dtos/fetch-defective-damage-products.dto';
import useFetchProductByBarcode from '@apis/products/queries/fetch-product-by-barcode';
import FormInput from '@ui/form/form-input';
import FormSubmitButton from '@ui/form/form-submit-button';
import FormInputBlock from '@ui/form/form-input-block';
import FormLabel from '@ui/form/form-label';
import FormError from '@ui/form/form-error';
import FormRadio from '@ui/form/form-radio';
import OutsideClickHandler from 'react-outside-click-handler';

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

const Input = styled(FormInput)`
  margin-top: 0.25rem;
`;

const FormInputContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 1.875rem;
`;

const FormRadioBlock = styled.div`
  margin-top: 0.625rem;
  display: flex;
  flex-flow: column;
  gap: 0.325rem;
`;

const SubmitButton = styled(FormSubmitButton)`
  margin-top: 2rem;
`;

interface DefectiveDamageProductFormInput {
  memo: string;
  forwardHistoryType: 'Defective' | 'Damage';
}

interface ForwardedProductProps {
  refetchDefectiveDamageProducts: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>,
  ) => Promise<QueryObserverResult<FetchDefectiveDamageProductsOutput, AxiosError<FetchDefectiveDamageProductsOutput>>>;
}

export default function DefectiveDamageProduct({ refetchDefectiveDamageProducts }: ForwardedProductProps) {
  const { i18n: commonI18n } = useI18n(I18N_COMMON);
  const { i18n } = useI18n(I18N_DEFECTIVE_DAMAGE_PRODUCT);
  const router = useRouter();
  const { query } = useRouter();
  const country = (query.country as string).replace(/\b[a-z]/, (text) => text.toUpperCase());

  const { finalBarcode, onResetBarcodeValue } = useScanBarcode();
  const {
    data: fetchProductData,
    isLoading: isFetchProductLoading,
    error: fetchProductError,
  } = useFetchProductByBarcode({
    barcode: finalBarcode === '' ? null : finalBarcode,
    sellingCountry: country as CountryName,
  });

  const [formOpend, setFormOpend] = useState<boolean>(false);

  useEffect(() => {
    if (finalBarcode !== '' && !isFetchProductLoading && fetchProductData?.product) {
      setFormOpend(true);
    }
  }, [finalBarcode, isFetchProductLoading, fetchProductData?.product]);

  const onCloseForm = useCallback(() => {
    setFormOpend(false);
    onResetBarcodeValue();
  }, []);

  useEffect(() => {
    if (finalBarcode !== '' && fetchProductError) {
      sweetAlert.fire({
        icon: 'error',
        titleText: i18n(`defective-damage-product.result.error.${fetchProductError.response?.data?.error.message}`),
        confirmButtonText: i18n('defective-damage-product.result.confirm-button'),
      });
      onResetBarcodeValue();
    }
  }, [fetchProductError, finalBarcode]);

  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<DefectiveDamageProductFormInput>({
    mode: 'all',
  });
  const {
    isLoading: isDefectiveDamageProductLoading,
    mutate: defectiveDamageProductMutation,
    data: defectiveDamageProductData,
  } = useDefectiveDamageProduct();
  const onSubmit = useCallback(() => {
    if (!isDefectiveDamageProductLoading && isValid && fetchProductData?.product) {
      const { forwardHistoryType, memo } = getValues();
      defectiveDamageProductMutation(
        {
          barcode: fetchProductData.product.barcode,
          sellingCountry: country as CountryName,
          forwardHistoryType,
          memo,
        },
        {
          onSuccess: (result) => {
            if (result?.ok) {
              refetchDefectiveDamageProducts();
              setFormOpend(false);
              setValue('forwardHistoryType', null);
              setValue('memo', '');
            }
          },
          onError: (err) => {
            if (err.response?.data?.error) {
              return sweetAlert
                .fire({
                  icon: 'error',
                  titleText: i18n(`defective-damage-product.result.error.${err.response?.data?.error.message}`),
                  confirmButtonText: i18n('defective-damage-product.result.confirm-button'),
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
      onResetBarcodeValue();
    }
  }, [isDefectiveDamageProductLoading, isValid, fetchProductData?.product]);

  return (
    <>
      <ScanBarcodeOfProduct
        menuType="Defective-Damage"
        isLoading={isDefectiveDamageProductLoading}
        isHaveScanProduct={!!defectiveDamageProductData?.defectiveDamageProduct}
        productImage={defectiveDamageProductData?.defectiveDamageProduct.productImage}
        productName={defectiveDamageProductData?.defectiveDamageProduct.productName}
        barcode={defectiveDamageProductData?.defectiveDamageProduct.barcode}
        createdAt={defectiveDamageProductData?.defectiveDamageProduct.createdAt}
        sellingCurrency={defectiveDamageProductData?.defectiveDamageProduct.sellingCurrency}
        sellingCountry={defectiveDamageProductData?.defectiveDamageProduct.sellingCountry}
        productAmount={defectiveDamageProductData?.defectiveDamageProduct.productAmount || 0}
        remainingQuantity={defectiveDamageProductData?.defectiveDamageProduct.remainingQuantity || 0}
        canceledCount={defectiveDamageProductData?.defectiveDamageCount || 0}
        scanUserName={defectiveDamageProductData?.defectiveDamageProduct.productForwardedUser.name}
      />
      {formOpend && (
        <FormOverlay>
          <OutsideClickHandler onOutsideClick={onCloseForm}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormInputContainer>
                <FormInputBlock>
                  <FormLabel label={i18n('form.forward-history-type.label')} required />
                  <FormRadioBlock>
                    <FormRadio
                      register={register('forwardHistoryType')}
                      id="Defective"
                      name="forwardHistoryType"
                      value="Defective"
                      label={i18n('form.forward-history-type.radio.defective')}
                      readOnly={false}
                      defaultChecked={false}
                    />
                    <FormRadio
                      register={register('forwardHistoryType')}
                      id="Damage"
                      name="forwardHistoryType"
                      value="Damage"
                      label={i18n('form.forward-history-type.radio.damage')}
                      readOnly={false}
                      defaultChecked={false}
                    />
                  </FormRadioBlock>
                  {errors.forwardHistoryType?.type === 'required' && (
                    <FormError message={i18n('form.forward-history-type.error.require')} />
                  )}
                </FormInputBlock>
                <FormInputBlock>
                  <FormLabel label={i18n('form.memo.label')} required />
                  <Input
                    required
                    type="text"
                    placeholder={i18n('form.memo.placeholder')}
                    register={register('memo', {
                      required: i18n('form.memo.error.require'),
                    })}
                  />
                  {errors.memo?.type === 'required' && <FormError message={i18n('form.memo.error.require')} />}
                </FormInputBlock>
              </FormInputContainer>
              <SubmitButton
                isLoading={isDefectiveDamageProductLoading}
                disabled={!isValid}
                text={i18n('form.submit-button')}
              />
            </Form>
          </OutsideClickHandler>
        </FormOverlay>
      )}
    </>
  );
}
