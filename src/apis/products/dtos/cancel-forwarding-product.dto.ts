import { Union } from '@utils/union-type';

import { CoreOutput } from '@apis/common/dtos/output.dto';
import { CountryName } from '@apis/countries/entities/country.entity';
import { ProductForwardEntity } from '@apis/products/entities/product-forward.entity';

export interface CancelForwardingProductInput {
  barcode: string;
  sellingCountry: CountryName;
}

const forwardingProductErrorMessageOutput = {
  'product-not-found': 'product-not-found',
} as const;
export type CancelForwardingProductErrorMessageOutput = Union<typeof forwardingProductErrorMessageOutput>;

export interface CancelForwardingProductOutput extends CoreOutput<CancelForwardingProductErrorMessageOutput> {
  canceledForwardingProduct?: ProductForwardEntity;
  canceledForwardingCount?: number;
}
