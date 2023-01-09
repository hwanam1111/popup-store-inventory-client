import styled from 'styled-components';

import useI18n from '@hooks/useI18n';
import { I18N_COMMON } from '@constants/i18n-namespace';
import { CountryName } from '@apis/countries/entities/country.entity';
import { CurrencyUnit } from '@apis/currency/entities/currency.entity';
import dateToString from '@utils/date-to-string';
import numberWithComma from '@utils/number-with-comma';
import ComponentLoading from '@ui/loading-component';

const Container = styled.div`
  display: flex;
  flex-flow: column;
  border: 1px solid ${({ theme }) => theme.color.G20};
  border-radius: 0.625rem;
  padding: 1rem;
  width: 250px;
  height: 100%;
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

interface ScanBarcodeOfProductProps {
  menuType: 'Forwarding' | 'Cancel' | 'Defective' | 'Damage';
  isLoading: boolean;
  isHaveScanProduct: boolean;
  productImage: string;
  productName: string;
  barcode: string;
  createdAt: string;
  sellingCurrency: CurrencyUnit;
  sellingCountry: CountryName;
  productAmount: number;
  remainingQuantity: number;
  scanUserName: string;
  forwardedCount?: number;
  canceledCount?: number;
}

export default function ScanBarcodeOfProduct({
  menuType,
  isLoading,
  isHaveScanProduct,
  productImage,
  productName,
  barcode,
  createdAt,
  sellingCurrency,
  sellingCountry,
  productAmount,
  remainingQuantity,
  forwardedCount,
  scanUserName,
  canceledCount,
}: ScanBarcodeOfProductProps) {
  const { i18n } = useI18n(I18N_COMMON);

  return (
    <Container>
      {!isLoading && !isHaveScanProduct && (
        <>
          <ProductImage src="/images/blank-image.svg" />
          <ScanProductPlaceholder>{i18n('scan-barcode-of-product.placeholder')}</ScanProductPlaceholder>
        </>
      )}
      {isLoading && <ComponentLoading color="#222" />}
      {isHaveScanProduct && (
        <>
          <ProductImage src={productImage} />
          <ProducInfoBlock>
            <ProductName>{productName}</ProductName>
            <ProductInfoItem>{`${i18n('scan-barcode-of-product.info.barcode')} : ${barcode}`}</ProductInfoItem>
            <ProductInfoItem>
              {`${i18n('scan-barcode-of-product.info.scan-time')} : ${dateToString({
                date: new Date(createdAt),
                addTime: true,
                convertStringType: 'hypen',
              })}`}
            </ProductInfoItem>
            <ProductInfoItem>
              {`${i18n('scan-barcode-of-product.info.selling-country')} : ${sellingCountry}`}
            </ProductInfoItem>
            <ProductInfoItem>
              {`${i18n('scan-barcode-of-product.info.product-amount')} : ${sellingCurrency} ${numberWithComma(
                productAmount,
              )}`}
            </ProductInfoItem>
            <ProductInfoItem>
              {`${i18n('scan-barcode-of-product.info.remaining-quantity')} : ${numberWithComma(remainingQuantity)}`}
            </ProductInfoItem>
            <ProductInfoItem>{`${i18n('scan-barcode-of-product.info.scan-user')} : ${scanUserName}`}</ProductInfoItem>
            {menuType === 'Forwarding' && (
              <ProductInfoItem>
                {`${i18n('scan-barcode-of-product.info.forwarded-quantity')} : ${numberWithComma(forwardedCount)}`}
              </ProductInfoItem>
            )}
            {menuType === 'Cancel' && (
              <ProductInfoItem>
                {`${i18n('scan-barcode-of-product.info.canceled-quantity')} : ${numberWithComma(canceledCount)}`}
              </ProductInfoItem>
            )}
          </ProducInfoBlock>
        </>
      )}
    </Container>
  );
}
