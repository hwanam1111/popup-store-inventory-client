import { CoreOutput } from '@apis/common/dtos/output.dto';
import { ProductEntity } from '@apis/products/entities/product.entity';
import { Union } from '@utils/union-type';

export interface FetchProductByBarcodeInput {
  barcode: string;
}

const fetchProductByBarcodeErrorMessageOutput = {
  'product-not-found': 'product-not-found',
} as const;
export type FetchProductByBarcodeErrorMessageOutput = Union<typeof fetchProductByBarcodeErrorMessageOutput>;

export interface FetchProductByBarcodeOutput extends CoreOutput<FetchProductByBarcodeErrorMessageOutput> {
  product?: ProductEntity;
}
