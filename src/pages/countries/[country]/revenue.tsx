import RootLayout from '@ui/root-layout';
import useRouteWhenInvalidCountry from '@hooks/useRouteWhenInvalidCountry';

export default function RevenuePage() {
  useRouteWhenInvalidCountry();

  return (
    <RootLayout metaTitle="매출">
      <h1>매출</h1>
    </RootLayout>
  );
}
