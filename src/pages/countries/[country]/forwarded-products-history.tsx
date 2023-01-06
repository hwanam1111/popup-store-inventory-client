import RootLayout from '@ui/root-layout';
import useRouteWhenInvalidCountry from '@hooks/useRouteWhenInvalidCountry';
import useI18n from '@hooks/useI18n';
import { I18N_FORWARDED_PRODUCTS_HISTORY } from '@constants/i18n-namespace';
import ForwardedProductsList from '@components/forwarded-products-history';

export default function ForwardedProductsHistoryPage() {
  useRouteWhenInvalidCountry();

  const { i18n } = useI18n(I18N_FORWARDED_PRODUCTS_HISTORY);

  return (
    <RootLayout metaTitle={i18n('meta-title')}>
      <ForwardedProductsList />
    </RootLayout>
  );
}
