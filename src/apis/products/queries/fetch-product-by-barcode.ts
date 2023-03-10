import { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

import apiClient from '@libs/api-client';
import queryKeys from '@constants/query-keys';
import {
  FetchProductByBarcodeInput,
  FetchProductByBarcodeOutput,
} from '@apis/products/dtos/fetch-product-by-barcode.dto';

export async function fetchProductByBarcode(fetchProductByBarcodeInput: FetchProductByBarcodeInput) {
  const { barcode, sellingCountry } = fetchProductByBarcodeInput;

  const result = await apiClient({
    url: `/v1/products/barcode/${barcode}${sellingCountry ? `?sellingCountry=${sellingCountry}` : ''}`,
    method: 'GET',
  });

  return result;
}

function useFetchProductByBarcode(
  fetchProductByBarcodeInput: FetchProductByBarcodeInput,
): UseQueryResult<FetchProductByBarcodeOutput, AxiosError<FetchProductByBarcodeOutput>> {
  const { barcode, sellingCountry } = fetchProductByBarcodeInput;

  return useQuery(
    [queryKeys.PRODUCTS.ALL, barcode, sellingCountry],
    () => fetchProductByBarcode(fetchProductByBarcodeInput),
    {
      select: ({ data }) => data,
      enabled: !!barcode,
    },
  );
}

export default useFetchProductByBarcode;
