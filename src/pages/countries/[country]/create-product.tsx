import RootLayout from '@ui/root-layout';
import useRouteWhenInvalidCountry from '@hooks/useRouteWhenInvalidCountry';
import useI18n from '@hooks/useI18n';
import { I18N_CREATE_PRODUCT } from '@constants/i18n-namespace';
import CreateOrEditProduct from '@components/create-or-edit-product';

export default function CreateProductPage() {
  useRouteWhenInvalidCountry();

  const { i18n } = useI18n(I18N_CREATE_PRODUCT);

  return (
    <RootLayout metaTitle={i18n('meta-title')} accessRole="Manager">
      <CreateOrEditProduct />
    </RootLayout>
  );
}
