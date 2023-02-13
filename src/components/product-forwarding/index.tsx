import { useRouter } from 'next/router';
import styled from 'styled-components';

import { I18N_PRODUCT_FORWARDING } from '@constants/i18n-namespace';
import useI18n from '@hooks/useI18n';
import MainSectionTitle from '@ui/main-section-title';
import ForwardedProduct from '@components/product-forwarding/forwarded-product';
import ForwardedProductsHistory from '@components/product-forwarding/forwarded-history';
import useFetchForwardedProducts from '@apis/products/queries/fetch-forwarded-products.dto';
import { CountryName } from '@apis/countries/entities/country.entity';

const Container = styled.div`
  margin: 3rem auto 0 auto;
  padding: 0 1rem;
`;

const ContentBlock = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 2rem;
`;

export default function ProductForwarding() {
  const { i18n } = useI18n(I18N_PRODUCT_FORWARDING);
  const { query } = useRouter();
  const country = (query.country as string).replace(/\b[a-z]/, (text) => text.toUpperCase());
  const limit = 20;
  const { data: productsData, refetch } = useFetchForwardedProducts({
    limit,
    page: 1,
    isOnlyMeData: true,
    ...(country !== 'All' && { sellingCountry: country as CountryName }),
  });

  return (
    <Container>
      <MainSectionTitle title={i18n('page-title')} />
      <ContentBlock>
        <ForwardedProduct refetchForwardedProducts={refetch} />
        {productsData?.forwardedProducts && (
          <ForwardedProductsHistory forwardedProducts={productsData.forwardedProducts} />
        )}
      </ContentBlock>
    </Container>
  );
}
