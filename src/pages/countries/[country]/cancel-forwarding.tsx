import { useRouter } from 'next/router';

import RootLayout from '@ui/root-layout';
import useRouteWhenInvalidCountry from '@hooks/useRouteWhenInvalidCountry';
import { I18N_CANCEL_FORWARDING } from '@constants/i18n-namespace';
import useI18n from '@hooks/useI18n';
import ImpossibleInAllCountry from '@ui/impossible-in-all-country';
import ProductCancelForwarding from '@components/product-cancel-forwarding';

export default function CancelForwardingPage() {
  useRouteWhenInvalidCountry();

  const { i18n } = useI18n(I18N_CANCEL_FORWARDING);

  const { query } = useRouter();
  const country = (query.country as string).toLocaleLowerCase();

  return (
    <RootLayout metaTitle={i18n('meta-title')}>
      {country === 'all' ? (
        <ImpossibleInAllCountry i18nAccessProductKey="cannot-cancel-product" />
      ) : (
        <ProductCancelForwarding />
      )}
    </RootLayout>
  );
}
