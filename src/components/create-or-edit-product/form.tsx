import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import Router, { useRouter } from 'next/router';

import { I18N_COMMON, I18N_CREATE_PRODUCT } from '@constants/i18n-namespace';
import useI18n from '@hooks/useI18n';
import useScanBarcode from '@hooks/useScanBarcode';
import CreateOrEditProductTitle from '@components/create-or-edit-product/title';
import UploadProductImage from '@components/create-or-edit-product/image';
import FormInput from '@ui/form/form-input';
import FormInputBlock from '@ui/form/form-input-block';
import FormError from '@ui/form/form-error';
import FormLabel from '@ui/form/form-label';
import FormRadio from '@ui/form/form-radio';
import FormSubmitButton from '@ui/form/form-submit-button';
import { countryName, CountryName } from '@apis/countries/entities/country.entity';
import useCreateProduct from '@apis/products/mutations/create-product';
import { currencyUnit, CurrencyUnit } from '@apis/currency/entities/currency.entity';
import { sweetAlert } from '@libs/sweet-alert2';

const Container = styled.div``;

const Form = styled.form`
  margin-top: 3rem;
  display: flex;
  flex-flow: column;
  width: 100%;
`;

const Input = styled(FormInput)`
  margin-top: 0.625rem;
`;

const FormInputContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 2.25rem;
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

interface CreateOrEditProductFormInput {
  barcode: string;
  productName: string;
  productAmount: number;
  productQuantity: string;
  sellingCurrency: CurrencyUnit;
  sellingCountry: CountryName;
}

export default function CreateOrEditProductForm() {
  const router = useRouter();
  const { query } = useRouter();
  const currentCountry = (query.country as string).replace(/\b[a-z]/, (text) => text.toUpperCase());
  const { i18n: commonI18n } = useI18n(I18N_COMMON);
  const { i18n } = useI18n(I18N_CREATE_PRODUCT);

  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    watch,
    formState: { isValid, errors },
  } = useForm<CreateOrEditProductFormInput>({
    mode: 'all',
  });

  const { isScanBarcodeStart, finalBarcode, onResetBarcodeValue } = useScanBarcode();
  useEffect(() => {
    if (isScanBarcodeStart === false && finalBarcode !== '') {
      setValue('barcode', finalBarcode);
      onResetBarcodeValue();
    }
  }, [isScanBarcodeStart, finalBarcode]);

  const [productImage, setProductImage] = useState<string | null>(null);

  const { isLoading, mutate } = useCreateProduct();
  const onSubmit = useCallback(() => {
    if (!isLoading && isValid) {
      const { barcode, productAmount, productName, productQuantity, sellingCountry, sellingCurrency } = getValues();

      mutate(
        {
          barcode,
          productAmount,
          productImage,
          productName,
          productQuantity: parseInt(productQuantity, 10),
          sellingCountry,
          sellingCurrency,
        },
        {
          onSuccess: (result) => {
            if (result?.ok && result?.product) {
              sweetAlert
                .fire({
                  icon: 'success',
                  titleText: i18n('form.result.success.message'),
                  confirmButtonText: i18n('form.result.confirm-button'),
                })
                .then((swalResult) => {
                  if (swalResult) {
                    Router.push(
                      '/countries/[country]/products-list',
                      `/countries/${currentCountry.toLocaleLowerCase()}/products-list`,
                    );
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
  }, [isLoading, isValid, productImage]);

  return (
    <Container>
      <CreateOrEditProductTitle title={i18n('form.title')} message={i18n('form.message')} />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormInputContainer>
          <FormInputBlock>
            <FormLabel label={i18n('form.barcode.label')} required />
            <Input
              required
              readonly
              type="barcode"
              placeholder={i18n('form.barcode.placeholder')}
              register={register('barcode', {
                required: i18n('form.barcode.error.require'),
              })}
            />
            {errors.barcode?.type === 'required' && <FormError message={i18n('form.barcode.error.require')} />}
          </FormInputBlock>
          {watch().barcode && (
            <>
              <FormInputBlock>
                <FormLabel label={i18n('form.selling-country.label')} required />
                <FormRadioBlock>
                  {Object.values(countryName).map((country) => (
                    <FormRadio
                      key={country}
                      register={register('sellingCountry')}
                      id={country}
                      name="sellingCountry"
                      value={country}
                      label={i18n(`form.selling-country.radio.${country.toLocaleLowerCase()}`)}
                      readOnly={false}
                      defaultChecked={currentCountry === country}
                    />
                  ))}
                </FormRadioBlock>
                {errors.sellingCountry?.type === 'required' && (
                  <FormError message={i18n('form.selling-country.error.require')} />
                )}
              </FormInputBlock>
              <FormInputBlock>
                <FormLabel label={i18n('form.product-image.label')} required />
                <UploadProductImage setProductImage={setProductImage} />
              </FormInputBlock>
              <FormInputBlock>
                <FormLabel label={i18n('form.product-name.label')} required />
                <Input
                  required
                  type="text"
                  placeholder={i18n('form.product-name.placeholder')}
                  register={register('productName', {
                    required: i18n('form.product-name.error.require'),
                  })}
                />
                {errors.productName?.type === 'required' && (
                  <FormError message={i18n('form.product-name.error.require')} />
                )}
              </FormInputBlock>
              <FormInputBlock>
                <FormLabel label={i18n('form.product-quantity.label')} required />
                <Input
                  required
                  type="number"
                  placeholder={i18n('form.product-quantity.placeholder')}
                  register={register('productQuantity', {
                    required: i18n('form.product-quantity.error.require'),
                  })}
                />
                {errors.productQuantity?.type === 'required' && (
                  <FormError message={i18n('form.product-quantity.error.require')} />
                )}
              </FormInputBlock>
              <FormInputBlock>
                <FormLabel label={i18n('form.selling-currency.label')} required />
                <FormRadioBlock>
                  {Object.values(currencyUnit).map((currency) => (
                    <FormRadio
                      key={currency}
                      register={register('sellingCurrency')}
                      id={currency}
                      name="sellingCurrency"
                      value={currency}
                      label={i18n(`form.selling-currency.radio.${currency}`)}
                      readOnly={false}
                      defaultChecked={false}
                    />
                  ))}
                </FormRadioBlock>
                {errors.sellingCountry?.type === 'required' && (
                  <FormError message={i18n('form.selling-currency.error.require')} />
                )}
              </FormInputBlock>
              <FormInputBlock>
                <FormLabel label={i18n('form.product-amount.label')} required />
                <Input
                  required
                  type="number"
                  step="0.01"
                  placeholder={i18n('form.product-amount.placeholder')}
                  register={register('productAmount', {
                    required: i18n('form.product-amount.error.require'),
                  })}
                />
                {errors.productAmount?.type === 'required' && (
                  <FormError message={i18n('form.product-amount.error.require')} />
                )}
              </FormInputBlock>
            </>
          )}
        </FormInputContainer>
        <SubmitButton
          isLoading={isLoading}
          disabled={!isValid || productImage === '/images/blank-image.svg'}
          text={i18n('form.submit-button')}
        />
      </Form>
    </Container>
  );
}
