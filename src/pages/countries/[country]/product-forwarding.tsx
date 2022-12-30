import RootLayout from '@ui/root-layout';
import useRouteWhenInvalidCountry from '@hooks/useRouteWhenInvalidCountry';
import { I18N_PRODUCT_FORWARDING } from '@constants/i18n-namespace';
import useI18n from '@hooks/useI18n';
import ProductForwarding from '@components/product-forwarding';

export default function ProductForwardingPage() {
  useRouteWhenInvalidCountry();

  const { i18n } = useI18n(I18N_PRODUCT_FORWARDING);

  return (
    <RootLayout metaTitle={i18n('meta-title')}>
      <ProductForwarding />
    </RootLayout>
  );
}
