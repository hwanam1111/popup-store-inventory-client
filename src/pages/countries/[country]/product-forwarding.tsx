import { useRouter } from 'next/router';

import RootLayout from '@ui/root-layout';
import useRouteWhenInvalidCountry from '@hooks/useRouteWhenInvalidCountry';
import { I18N_PRODUCT_FORWARDING } from '@constants/i18n-namespace';
import useI18n from '@hooks/useI18n';
import ProductForwarding from '@components/product-forwarding';
import CannotBeDone from '@components/product-forwarding/cannot-be-done';

export default function ProductForwardingPage() {
  useRouteWhenInvalidCountry();

  const { i18n } = useI18n(I18N_PRODUCT_FORWARDING);

  const { query } = useRouter();
  const country = (query.country as string).toLocaleLowerCase();

  return (
    <RootLayout metaTitle={i18n('meta-title')}>
      {country === 'all' ? <CannotBeDone /> : <ProductForwarding />}
    </RootLayout>
  );
}
