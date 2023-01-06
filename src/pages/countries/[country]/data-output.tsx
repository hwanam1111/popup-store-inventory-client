import RootLayout from '@ui/root-layout';
import useRouteWhenInvalidCountry from '@hooks/useRouteWhenInvalidCountry';
import useI18n from '@hooks/useI18n';
import { I18N_DATA_OUTPUT } from '@constants/i18n-namespace';

export default function DataOutputPage() {
  useRouteWhenInvalidCountry();

  const { i18n } = useI18n(I18N_DATA_OUTPUT);

  return (
    <RootLayout metaTitle={i18n('meta-title')} accessRole="Manager">
      data output
    </RootLayout>
  );
}
