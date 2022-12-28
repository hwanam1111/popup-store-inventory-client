import RootLayout from '@ui/root-layout';
import useRouteWhenInvalidCountry from '@hooks/useRouteWhenInvalidCountry';

export default function ProductsInventoryPage() {
  useRouteWhenInvalidCountry();

  return (
    <RootLayout metaTitle="재고현황">
      <h1>재고현황</h1>
    </RootLayout>
  );
}
