import RootLayout from '@ui/root-layout';
import useRouteWhenInvalidCountry from '@hooks/useRouteWhenInvalidCountry';
import ProductsList from '@components/products-list';
import useI18n from '@hooks/useI18n';
import { I18N_PRODUCTS_LIST } from '@constants/i18n-namespace';

export default function ProductsListPage() {
  useRouteWhenInvalidCountry();

  const { i18n } = useI18n(I18N_PRODUCTS_LIST);

  return (
    <RootLayout metaTitle={i18n('meta-title')}>
      <ProductsList />
    </RootLayout>
  );
}
