import styled from 'styled-components';
import { useRouter } from 'next/router';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { I18N_FORWARDED_PRODUCTS_HISTORY } from '@constants/i18n-namespace';
import useI18n from '@hooks/useI18n';
import usePagination from '@hooks/usePagination';
import { CountryName } from '@apis/countries/entities/country.entity';
import Pagination from '@ui/pagination';
import MainSectionTitle from '@ui/main-section-title';
import Table from '@ui/table';
import numberWithComma from '@utils/number-with-comma';
import useFetchForwardedProducts from '@apis/products/queries/fetch-forwarded-products.dto';
import dateToString from '@utils/date-to-string';

const Container = styled.div`
  margin: 3rem auto 0 auto;
  padding: 0 3rem;
`;

const HistoryTableBlock = styled.div`
  border: 1px solid ${({ theme }) => theme.color.G20};
  border-radius: 0.625rem;
  padding: 1.5rem;
  margin-top: 2rem;
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

export default function ForwardedProductsList() {
  const { i18n } = useI18n(I18N_FORWARDED_PRODUCTS_HISTORY);
  const { query } = useRouter();
  const country = (query.country as string).replace(/\b[a-z]/, (text) => text.toUpperCase());

  const [page, onChangePage] = usePagination(1);
  // const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const limit = 10;
  const { data: forwardedHistoryData } = useFetchForwardedProducts({
    limit,
    page,
    isOnlyMeData: false,
    ...(country !== 'All' && { sellingCountry: country as CountryName }),
  });

  return (
    <Container>
      <MainSectionTitle title={`${i18n('page-title')} (${numberWithComma(forwardedHistoryData?.totalResults || 0)})`} />
      <HistoryTableBlock>
        {forwardedHistoryData &&
          (forwardedHistoryData.forwardedProducts?.length > 0 ? (
            <Table
              th={[
                '',
                i18n('table.th.forwarded-time'),
                i18n('table.th.history-type'),
                i18n('table.th.product-name'),
                i18n('table.th.barcode'),
                i18n('table.th.selling-country'),
                i18n('table.th.product-amount'),
                i18n('table.th.forwarded-user-name'),
                i18n('table.th.remaining-quantity'),
              ]}
            >
              {forwardedHistoryData.forwardedProducts.map((product) => (
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
                  <td>{product.forwardHistoryType}</td>
                  <td>{product.productName}</td>
                  <td>{product.barcode}</td>
                  <td>{product.sellingCountry}</td>
                  <td>
                    {product.sellingCurrency} {numberWithComma(product.productAmount)}
                  </td>
                  <td>{product.productForwardedUser.name}</td>
                  <td>{numberWithComma(product.remainingQuantity)}</td>
                </tr>
              ))}
            </Table>
          ) : (
            <HaveNotProducts>{i18n('have-not-products')}</HaveNotProducts>
          ))}
        {forwardedHistoryData?.forwardedProducts?.length > 0 && (
          <Pagination
            page={page}
            onChangePage={onChangePage}
            maxPageItemCount={limit}
            totalItemCount={forwardedHistoryData.totalResults || 0}
          />
        )}
      </HistoryTableBlock>
    </Container>
  );
}
