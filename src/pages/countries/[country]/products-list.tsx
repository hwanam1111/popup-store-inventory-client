import RootLayout from '@ui/root-layout';
import useRouteWhenInvalidCountry from '@hooks/useRouteWhenInvalidCountry';

export default function ProductsListPage() {
  useRouteWhenInvalidCountry();

  return (
    <RootLayout metaTitle="상품리스트">
      <h1>상품리스트</h1>
    </RootLayout>
  );
}
