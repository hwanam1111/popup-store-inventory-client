import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { I18N_COMMON, I18N_PRODUCT_FORWARDING } from '@constants/i18n-namespace';
import useI18n from '@hooks/useI18n';
import useScanBarcode from '@hooks/useScanBarcode';
import useForwardingProduct from '@apis/products/mutations/forwarding-product';
import { CountryName } from '@apis/countries/entities/country.entity';
import { sweetAlert } from '@libs/sweet-alert2';
import ComponentLoading from '@ui/loading-component';
import dateToString from '@utils/date-to-string';
import numberWithComma from '@utils/number-with-comma';

const Container = styled.div`
  display: flex;
  flex-flow: column;
  border: 1px solid ${({ theme }) => theme.color.G20};
  border-radius: 0.625rem;
  padding: 1rem;
  width: 250px;
`;

const ProductImage = styled.img`
  object-fit: cover;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.color.BG30};
  padding: 0.5rem;
  width: 100%;
  min-height: 200px;
`;

const ScanProductPlaceholder = styled.p`
  color: ${({ theme }) => theme.color.G60};
  font-size: 0.875rem;
  text-align: center;
  margin-top: 1.5rem;
`;

const ProducInfoBlock = styled.div`
  display: flex;
  flex-flow: column;
  margin-top: 2rem;
  gap: 0.875rem;
`;

const ProductInfoItem = styled.p`
  color: ${({ theme }) => theme.color.G60};
  font-size: 0.875rem;
`;

const ProductName = styled.h2`
  color: ${({ theme }) => theme.color.G80};
  font-weight: 600;
`;

export default function ForwardedProduct() {
  const { i18n: commonI18n } = useI18n(I18N_COMMON);
  const { i18n } = useI18n(I18N_PRODUCT_FORWARDING);
  const router = useRouter();
  const { query } = useRouter();
  const country = (query.country as string).replace(/\b[a-z]/, (text) => text.toUpperCase());

  const { finalBarcode, onResetBarcodeValue } = useScanBarcode();

  const {
    isLoading: isForwardingProductLoading,
    mutate: forwardingProductMutate,
    data: forwardedProductData,
  } = useForwardingProduct();
  useEffect(() => {
    if (finalBarcode !== '' && !isForwardingProductLoading) {
      forwardingProductMutate(
        {
          barcode: finalBarcode,
          sellingCountry: country as CountryName,
        },
        {
          onError: (err) => {
            if (err.response?.data?.error) {
              return sweetAlert.fire({
                icon: 'error',
                titleText: i18n(`forwarding-product.result.error.${err.response?.data?.error.message}`),
                confirmButtonText: i18n('forwarding-product.result.confirm-button'),
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

    onResetBarcodeValue();
  }, [finalBarcode, isForwardingProductLoading]);

  return (
    <Container>
      {!isForwardingProductLoading && !forwardedProductData?.forwardedProduct && (
        <>
          <ProductImage src="/images/blank-image.svg" />
          <ScanProductPlaceholder>{i18n('forwarding-product.placeholder')}</ScanProductPlaceholder>
        </>
      )}
      {isForwardingProductLoading && <ComponentLoading color="#222" />}
      {forwardedProductData?.forwardedProduct && (
        <>
          <ProductImage src={forwardedProductData.forwardedProduct.productImage} />
          <ProducInfoBlock>
            <ProductName>{forwardedProductData.forwardedProduct.productName}</ProductName>
            <ProductInfoItem>
              {`${i18n('forwarding-product.info.barcode')} : ${forwardedProductData.forwardedProduct.barcode}`}
            </ProductInfoItem>
            <ProductInfoItem>
              {`${i18n('forwarding-product.info.forwarded-time')} : ${dateToString({
                date: new Date(forwardedProductData.forwardedProduct.createdAt),
                addTime: true,
                convertStringType: 'hypen',
              })}`}
            </ProductInfoItem>
            <ProductInfoItem>
              {`${i18n('forwarding-product.info.selling-country')} : ${
                forwardedProductData.forwardedProduct.sellingCountry
              }`}
            </ProductInfoItem>
            <ProductInfoItem>
              {`${i18n('forwarding-product.info.product-amount')} : ${
                forwardedProductData.forwardedProduct.sellingCurrency
              } ${numberWithComma(forwardedProductData.forwardedProduct.productAmount)}`}
            </ProductInfoItem>
            <ProductInfoItem>
              {`${i18n('forwarding-product.info.remaining-quantity')} : ${numberWithComma(
                forwardedProductData.forwardedProduct.remainingQuantity,
              )}`}
            </ProductInfoItem>
            <ProductInfoItem>
              {`${i18n('forwarding-product.info.forwarded-quantity')} : ${numberWithComma(
                forwardedProductData.forwardedCount,
              )}`}
            </ProductInfoItem>
            <ProductInfoItem>
              {`${i18n('forwarding-product.info.forwarded-user')} : ${
                forwardedProductData.forwardedProduct.productForwardedUser.name
              }`}
            </ProductInfoItem>
          </ProducInfoBlock>
        </>
      )}
    </Container>
  );
}
