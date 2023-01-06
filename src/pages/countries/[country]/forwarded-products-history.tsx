import RootLayout from '@ui/root-layout';
import useRouteWhenInvalidCountry from '@hooks/useRouteWhenInvalidCountry';
import useI18n from '@hooks/useI18n';
import { I18N_FORWARDED_PRODUCTS_HISTORY } from '@constants/i18n-namespace';

export default function ForwardedProductsHistoryPage() {
  useRouteWhenInvalidCountry();

  const { i18n } = useI18n(I18N_FORWARDED_PRODUCTS_HISTORY);

  return (
    <RootLayout metaTitle={i18n('meta-title')} accessRole="Manager">
      <h1>출고기록</h1>
    </RootLayout>
  );
}
