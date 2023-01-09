import { useRouter } from 'next/router';
import styled from 'styled-components';

import { I18N_CANCEL_FORWARDING } from '@constants/i18n-namespace';
import useI18n from '@hooks/useI18n';
import MainSectionTitle from '@ui/main-section-title';
import { CountryName } from '@apis/countries/entities/country.entity';
import useFetchCanceledForwardingProducts from '@apis/products/queries/fetch-cancaled-forwarding-products.dto';
import CancelForwardingProduct from '@components/product-cancel-forwarding/cancaled-forwarding-product';
import CanceledForwardingProductsHistory from '@components/product-cancel-forwarding/canceled-forwarding-history';

const Container = styled.div`
  margin: 3rem auto 0 auto;
  padding: 0 1rem;
`;

const ContentBlock = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 2rem;
`;

export default function ProductCancelForwarding() {
  const { i18n } = useI18n(I18N_CANCEL_FORWARDING);
  const { query } = useRouter();
  const country = (query.country as string).replace(/\b[a-z]/, (text) => text.toUpperCase());
  const limit = 30;
  const { data: productsData, refetch } = useFetchCanceledForwardingProducts({
    limit,
    page: 1,
    ...(country !== 'All' && { sellingCountry: country as CountryName }),
  });

  return (
    <Container>
      <MainSectionTitle title={i18n('page-title')} />
      <ContentBlock>
        <CancelForwardingProduct refetchForwardedProducts={refetch} />
        {productsData?.canceledForwardingProducts && (
          <CanceledForwardingProductsHistory canceledForwardingProducts={productsData.canceledForwardingProducts} />
        )}
      </ContentBlock>
    </Container>
  );
}
