import styled from 'styled-components';
import { useRouter } from 'next/router';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { I18N_PRODUCTS_LIST } from '@constants/i18n-namespace';
import useI18n from '@hooks/useI18n';
import useFetchProducts from '@apis/products/queries/fetch-products';
import usePagination from '@hooks/usePagination';
import { CountryName } from '@apis/countries/entities/country.entity';
import Pagination from '@ui/pagination';
import MainSectionTitle from '@ui/main-section-title';
import Table from '@ui/table';
import numberWithComma from '@utils/number-with-comma';

const Container = styled.div`
  margin: 3rem auto 0 auto;
  padding: 0 3rem;
`;

const ContentBlock = styled.div`
  border: 1px solid ${({ theme }) => theme.color.G20};
  border-radius: 0.625rem;
  padding: 1.5rem;
  margin-top: 2rem;
`;

const ProductNameImageBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
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

export default function ProductsList() {
  const { i18n } = useI18n(I18N_PRODUCTS_LIST);
  const { query } = useRouter();
  const country = (query.country as string).replace(/\b[a-z]/, (text) => text.toUpperCase());
  const [page, onChangePage] = usePagination(1);
  const limit = 30;
  const { data: productsData } = useFetchProducts({
    limit,
    page,
    ...(country !== 'All' && { sellingCountry: country as CountryName }),
  });

  return (
    <Container>
      <MainSectionTitle title={i18n('page-title')} />
      <ContentBlock>
        {productsData &&
          (productsData.products?.length > 0 ? (
            <Table
              th={[
                i18n('table.th.product-name'),
                i18n('table.th.barcode'),
                i18n('table.th.selling-country'),
                i18n('table.th.product-amount'),
                i18n('table.th.product-quantity'),
                i18n('table.th.sold-quantity'),
                i18n('table.th.canceled-quantity'),
                i18n('table.th.defective-quantity'),
                i18n('table.th.damage-quantity'),
              ]}
            >
              {productsData.products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <ProductNameImageBlock>
                      <ProductImage effect="blur" src={product.productImage} alt={product.productName} />
                      <span>{product.productName}</span>
                    </ProductNameImageBlock>
                  </td>
                  <td>{product.barcode}</td>
                  <td>{product.sellingCountry}</td>
                  <td>
                    {product.sellingCurrency} {numberWithComma(product.productAmount)}
                  </td>
                  <td>{numberWithComma(product.productQuantity)}</td>
                  <td>{numberWithComma(product.soldQuantity)}</td>
                  <td>{numberWithComma(product.canceledCount)}</td>
                  <td>{numberWithComma(product.defectiveQuantity)}</td>
                  <td>{numberWithComma(product.damageQuantity)}</td>
                </tr>
              ))}
            </Table>
          ) : (
            <HaveNotProducts>{i18n('have-not-products')}</HaveNotProducts>
          ))}
        {productsData?.products.length > 0 && (
          <Pagination
            page={page}
            onChangePage={onChangePage}
            maxPageItemCount={limit}
            totalItemCount={productsData?.totalResults || 0}
          />
        )}
      </ContentBlock>
    </Container>
  );
}
