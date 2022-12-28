import RootLayout from '@ui/root-layout';
import useRouteWhenInvalidCountry from '@hooks/useRouteWhenInvalidCountry';

export default function DashboardPage() {
  useRouteWhenInvalidCountry();

  return (
    <RootLayout metaTitle="대시보드">
      <h1>대시보드</h1>
    </RootLayout>
  );
}
