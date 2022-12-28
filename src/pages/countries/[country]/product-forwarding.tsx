import RootLayout from '@ui/root-layout';
import useRouteWhenInvalidCountry from '@hooks/useRouteWhenInvalidCountry';

export default function ProductForwardingPage() {
  useRouteWhenInvalidCountry();

  return (
    <RootLayout metaTitle="상품출고">
      <h1>상품출고</h1>
    </RootLayout>
  );
}
