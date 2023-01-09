import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { RefetchOptions, RefetchQueryFilters, QueryObserverResult } from 'react-query';
import { AxiosError } from 'axios';

import { I18N_COMMON, I18N_PRODUCT_FORWARDING } from '@constants/i18n-namespace';
import useI18n from '@hooks/useI18n';
import useScanBarcode from '@hooks/useScanBarcode';
import useForwardingProduct from '@apis/products/mutations/forwarding-product';
import { CountryName } from '@apis/countries/entities/country.entity';
import { sweetAlert } from '@libs/sweet-alert2';
import { FetchForwardedProductsOutput } from '@apis/products/dtos/fetch-forwarded-products.dto';
import ScanBarcodeOfProduct from '@ui/scan-barcode-of-product';

interface ForwardedProductProps {
  refetchForwardedProducts: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>,
  ) => Promise<QueryObserverResult<FetchForwardedProductsOutput, AxiosError<FetchForwardedProductsOutput>>>;
}

export default function ForwardedProduct({ refetchForwardedProducts }: ForwardedProductProps) {
  const { i18n: commonI18n } = useI18n(I18N_COMMON);
  const { i18n } = useI18n(I18N_PRODUCT_FORWARDING);
  const router = useRouter();
  const { query } = useRouter();
  const country = (query.country as string).replace(/\b[a-z]/, (text) => text.toUpperCase());

  const { finalBarcode, onResetBarcodeValue } = useScanBarcode();
  const {
    isLoading: isForwardingProductLoading,
    mutate: forwardingProductMutate,
    data: forwardedProductData,
  } = useForwardingProduct();
  useEffect(() => {
    if (finalBarcode !== '' && !isForwardingProductLoading) {
      forwardingProductMutate(
        {
          barcode: finalBarcode,
          sellingCountry: country as CountryName,
        },
        {
          onSuccess: (result) => {
            if (result?.ok) {
              refetchForwardedProducts();
            }
          },
          onError: (err) => {
            if (err.response?.data?.error) {
              return sweetAlert.fire({
                icon: 'error',
                titleText: i18n(`forwarding-product.result.error.${err.response?.data?.error.message}`),
                confirmButtonText: i18n('forwarding-product.result.confirm-button'),
              });
            }

            return sweetAlert
              .fire({
                icon: 'error',
                titleText: commonI18n('api.server-error.message'),
                confirmButtonText: commonI18n('api.server-error.confirm-button'),
              })
              .then((swalResult) => {
                if (swalResult) {
                  router.reload();
                }
              });
          },
        },
      );
    }

    onResetBarcodeValue();
  }, [finalBarcode, isForwardingProductLoading]);

  return (
    <ScanBarcodeOfProduct
      menuType="Forwarding"
      isLoading={isForwardingProductLoading}
      isHaveScanProduct={!!forwardedProductData?.forwardedProduct}
      productImage={forwardedProductData?.forwardedProduct.productImage}
      productName={forwardedProductData?.forwardedProduct.productName}
      barcode={forwardedProductData?.forwardedProduct.barcode}
      createdAt={forwardedProductData?.forwardedProduct.createdAt}
      sellingCurrency={forwardedProductData?.forwardedProduct.sellingCurrency}
      sellingCountry={forwardedProductData?.forwardedProduct.sellingCountry}
      productAmount={forwardedProductData?.forwardedProduct.productAmount || 0}
      remainingQuantity={forwardedProductData?.forwardedProduct.remainingQuantity || 0}
      forwardedCount={forwardedProductData?.forwardedCount || 0}
      scanUserName={forwardedProductData?.forwardedProduct.productForwardedUser.name}
    />
  );
}
