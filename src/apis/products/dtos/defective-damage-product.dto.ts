import { Union } from '@utils/union-type';

import { CoreOutput } from '@apis/common/dtos/output.dto';
import { CountryName } from '@apis/countries/entities/country.entity';
import { ProductForwardEntity } from '@apis/products/entities/product-forward.entity';

export interface DefectiveDamageProductInput {
  barcode: string;
  sellingCountry: CountryName;
  forwardHistoryType: 'Defective' | 'Damage';
  memo: string;
}

const forwardingProductErrorMessageOutput = {
  'product-not-found': 'product-not-found',
} as const;
export type DefectiveDamageProductErrorMessageOutput = Union<typeof forwardingProductErrorMessageOutput>;

export interface DefectiveDamageProductOutput extends CoreOutput<DefectiveDamageProductErrorMessageOutput> {
  defectiveDamageProduct?: ProductForwardEntity;
  defectiveDamageCount?: number;
}
