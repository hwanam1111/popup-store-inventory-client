import RootLayout from '@ui/root-layout';
import useRouteWhenInvalidCountry from '@hooks/useRouteWhenInvalidCountry';
import useI18n from '@hooks/useI18n';
import { I18N_DASHBOARD } from '@constants/i18n-namespace';
import Dashboard from '@components/dashboard';

export default function DashboardPage() {
  useRouteWhenInvalidCountry();

  const { i18n } = useI18n(I18N_DASHBOARD);

  return (
    <RootLayout metaTitle={i18n('meta-title')}>
      <Dashboard />
    </RootLayout>
  );
}
