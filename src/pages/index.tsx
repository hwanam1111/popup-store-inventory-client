import { I18N_HOME } from '@constants/i18n-namespace';
import useI18n from '@hooks/useI18n';
import RootLayout from '@ui/root-layout';

export default function Home() {
  const { i18n } = useI18n(I18N_HOME);

  return (
    <RootLayout metaTitle="홈">
      <h1>{i18n('title')}</h1>
    </RootLayout>
  );
}
