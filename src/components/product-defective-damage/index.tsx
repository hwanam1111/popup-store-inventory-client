import { useRouter } from 'next/router';
import styled from 'styled-components';

import { I18N_DEFECTIVE_DAMAGE_PRODUCT } from '@constants/i18n-namespace';
import useI18n from '@hooks/useI18n';
import MainSectionTitle from '@ui/main-section-title';
import { CountryName } from '@apis/countries/entities/country.entity';
import DefectiveDamageProduct from '@components/product-defective-damage/defective-damage-product';
import DefectiveDamageProductsHistory from '@components/product-defective-damage/defective-damage-history';
import useFetchDefectiveDamageProducts from '@apis/products/queries/fetch-defective-damage-products.dto';

const Container = styled.div`
  margin: 3rem auto 0 auto;
  padding: 0 1rem;
`;

const ContentBlock = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 2rem;
`;

export default function ProductDefectiveDamage() {
  const { i18n } = useI18n(I18N_DEFECTIVE_DAMAGE_PRODUCT);
  const { query } = useRouter();
  const country = (query.country as string).replace(/\b[a-z]/, (text) => text.toUpperCase());
  const limit = 30;
  const { data: productsData, refetch } = useFetchDefectiveDamageProducts({
    limit,
    page: 1,
    ...(country !== 'All' && { sellingCountry: country as CountryName }),
  });

  return (
    <Container>
      <MainSectionTitle title={i18n('page-title')} />
      <ContentBlock>
        <DefectiveDamageProduct refetchDefectiveDamageProducts={refetch} />
        {productsData?.defectiveDamageProducts && (
          <DefectiveDamageProductsHistory defectiveDamageProducts={productsData.defectiveDamageProducts} />
        )}
      </ContentBlock>
    </Container>
  );
}
