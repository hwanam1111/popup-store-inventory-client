import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { ProductForwardEntity } from '@apis/products/entities/product-forward.entity';
import { I18N_DEFECTIVE_DAMAGE_PRODUCT } from '@constants/i18n-namespace';
import useI18n from '@hooks/useI18n';
import Table from '@ui/table';
import numberWithComma from '@utils/number-with-comma';
import dateToString from '@utils/date-to-string';

const ContentBlock = styled.div`
  width: calc(100% - 250px - 2rem);
  border: 1px solid ${({ theme }) => theme.color.G20};
  border-radius: 0.625rem;
  padding: 1.5rem;
`;

const ProductImageBlock = styled.div`
  width: 3.125rem;
  height: 3.125rem;
`;

const ProductImage = styled(LazyLoadImage)`
  object-fit: cover;
  width: 3.125rem;
  height: 3.125rem;
  border-radius: 0.475rem;
  background-color: ${({ theme }) => theme.color.BG30};
  padding: 0.25rem;
`;

const HaveNotProducts = styled.p``;

interface ForwardedProductsHistoryProps {
  defectiveDamageProducts: ProductForwardEntity[];
}

export default function DefectiveDamageProductsHistory({ defectiveDamageProducts }: ForwardedProductsHistoryProps) {
  const { i18n } = useI18n(I18N_DEFECTIVE_DAMAGE_PRODUCT);

  return (
    <ContentBlock>
      {defectiveDamageProducts.length > 0 ? (
        <Table
          th={[
            '',
            i18n('defective-damage-history.table.th.checked-time'),
            i18n('defective-damage-history.table.th.reason'),
            i18n('defective-damage-history.table.th.product-name'),
            i18n('defective-damage-history.table.th.barcode'),
            i18n('defective-damage-history.table.th.selling-country'),
            i18n('defective-damage-history.table.th.product-amount'),
            i18n('defective-damage-history.table.th.checked-user-name'),
          ]}
        >
          {defectiveDamageProducts.map((product) => (
            <tr key={product.id}>
              <td>
                <ProductImageBlock>
                  <ProductImage effect="blur" src={product.productImage} alt={product.productName} />
                </ProductImageBlock>
              </td>
              <td>
                {dateToString({
                  date: new Date(product.createdAt),
                  convertStringType: 'hypen',
                  addTime: true,
                  addTimeZoneCityName: true,
                })}
              </td>
              <td>{product.memo}</td>
              <td>{product.productName}</td>
              <td>{product.barcode}</td>
              <td>{product.sellingCountry}</td>
              <td>
                {product.sellingCurrency} {numberWithComma(product.productAmount)}
              </td>
              <td>{product.productForwardedUser.name}</td>
            </tr>
          ))}
        </Table>
      ) : (
        <HaveNotProducts>{i18n('defective-damage-history.have-not-products')}</HaveNotProducts>
      )}
    </ContentBlock>
  );
}
