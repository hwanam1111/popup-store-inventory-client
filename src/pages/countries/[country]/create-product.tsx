import RootLayout from '@ui/root-layout';
import useRouteWhenInvalidCountry from '@hooks/useRouteWhenInvalidCountry';

export default function CreateProductPage() {
  useRouteWhenInvalidCountry();

  return (
    <RootLayout metaTitle="상품등록">
      <h1>상품등록</h1>
    </RootLayout>
  );
}
