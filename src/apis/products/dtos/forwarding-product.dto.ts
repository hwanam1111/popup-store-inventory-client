import { Union } from '@utils/union-type';

import { CoreOutput } from '@apis/common/dtos/output.dto';
import { CountryName } from '@apis/countries/entities/country.entity';
import { ProductForwardEntity } from '@apis/products/entities/product-forward.entity';

export interface ForwardingProductInput {
  barcode: string;
  sellingCountry: CountryName;
}

const forwardingProductErrorMessageOutput = {
  'product-not-found': 'product-not-found',
  'out-of-inventory': 'out-of-inventory',
} as const;
export type ForwardingProductErrorMessageOutput = Union<typeof forwardingProductErrorMessageOutput>;

export interface ForwardingProductOutput extends CoreOutput<ForwardingProductErrorMessageOutput> {
  forwardedProduct?: ProductForwardEntity;
  forwardedCount?: number;
}
