import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { RefetchOptions, RefetchQueryFilters, QueryObserverResult } from 'react-query';
import { AxiosError } from 'axios';

import { I18N_COMMON, I18N_CANCEL_FORWARDING } from '@constants/i18n-namespace';
import useI18n from '@hooks/useI18n';
import useScanBarcode from '@hooks/useScanBarcode';
import { CountryName } from '@apis/countries/entities/country.entity';
import { sweetAlert } from '@libs/sweet-alert2';
import ScanBarcodeOfProduct from '@ui/scan-barcode-of-product';
import useCancelForwardingProduct from '@apis/products/mutations/cancel-forwarding-product';
import { FetchCanceledForwardingProductsOutput } from '@apis/products/dtos/fetch-canceled-forwarding-products.dto';

interface ForwardedProductProps {
  refetchForwardedProducts: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>,
  ) => Promise<
    QueryObserverResult<FetchCanceledForwardingProductsOutput, AxiosError<FetchCanceledForwardingProductsOutput>>
  >;
}

export default function CancelForwardingProduct({ refetchForwardedProducts }: ForwardedProductProps) {
  const { i18n: commonI18n } = useI18n(I18N_COMMON);
  const { i18n } = useI18n(I18N_CANCEL_FORWARDING);
  const router = useRouter();
  const { query } = useRouter();
  const country = (query.country as string).replace(/\b[a-z]/, (text) => text.toUpperCase());

  const { finalBarcode, onResetBarcodeValue } = useScanBarcode();
  const {
    isLoading: isCancelForwardingProduct,
    mutate: cancelForwardingProductMutation,
    data: cancaledForwardingProductData,
  } = useCancelForwardingProduct();
  useEffect(() => {
    if (finalBarcode !== '' && !isCancelForwardingProduct) {
      cancelForwardingProductMutation(
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
                titleText: i18n(`cancel-forwarding-product.result.error.${err.response?.data?.error.message}`),
                confirmButtonText: i18n('cancel-forwarding-product.result.confirm-button'),
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
  }, [finalBarcode, isCancelForwardingProduct]);

  return (
    <ScanBarcodeOfProduct
      menuType="Cancel"
      isLoading={isCancelForwardingProduct}
      isHaveScanProduct={!!cancaledForwardingProductData?.canceledForwardingProduct}
      productImage={cancaledForwardingProductData?.canceledForwardingProduct.productImage}
      productName={cancaledForwardingProductData?.canceledForwardingProduct.productName}
      barcode={cancaledForwardingProductData?.canceledForwardingProduct.barcode}
      createdAt={cancaledForwardingProductData?.canceledForwardingProduct.createdAt}
      sellingCurrency={cancaledForwardingProductData?.canceledForwardingProduct.sellingCurrency}
      sellingCountry={cancaledForwardingProductData?.canceledForwardingProduct.sellingCountry}
      productAmount={cancaledForwardingProductData?.canceledForwardingProduct.productAmount || 0}
      remainingQuantity={cancaledForwardingProductData?.canceledForwardingProduct.remainingQuantity || 0}
      canceledCount={cancaledForwardingProductData?.canceledForwardingCount || 0}
      scanUserName={cancaledForwardingProductData?.canceledForwardingProduct.productForwardedUser.name}
    />
  );
}
