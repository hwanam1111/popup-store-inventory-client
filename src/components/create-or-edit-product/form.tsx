import styled from 'styled-components';

import { I18N_CREATE_PRODUCT } from '@constants/i18n-namespace';
import useI18n from '@hooks/useI18n';
import CreateOrEditProductTitle from '@components/create-or-edit-product/title';
import { useForm } from 'react-hook-form';
import { useCallback, useEffect } from 'react';
import FormInput from '@ui/form/form-input';
import FormInputBlock from '@ui/form/form-input-block';
import FormError from '@ui/form/form-error';
import FormLabel from '@ui/form/form-label';
import useScanBarcode from '@hooks/useScanBarcode';

const Container = styled.div``;

const Form = styled.form`
  margin-top: 3rem;
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

interface CreateOrEditProductFormInput {
  barcode: string;
  productName: string;
  productImage: string;
  productAmount: number;
  sellingCurrency: 'KRW' | 'USD' | 'EUR';
}

export default function CreateOrEditProductForm() {
  const { i18n } = useI18n(I18N_CREATE_PRODUCT);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<CreateOrEditProductFormInput>({
    mode: 'all',
  });

  const { isScanBarcodeStart, barcodeValue, onResetBarcodeValue } = useScanBarcode();
  useEffect(() => {
    if (isScanBarcodeStart === false && barcodeValue !== '') {
      setValue('barcode', barcodeValue);
      onResetBarcodeValue();
    }
  }, [isScanBarcodeStart, barcodeValue]);

  const isLoading = false;
  const onSubmit = useCallback(() => {
    if (!isLoading && isValid) {
      //
    }
  }, []);

  return (
    <Container>
      <CreateOrEditProductTitle title={i18n('form.title')} message={i18n('form.message')} />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormInputContainer>
          <FormInputBlock>
            <FormLabel label={i18n('form.barcode.label')} />
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
        </FormInputContainer>
      </Form>
    </Container>
  );
}
