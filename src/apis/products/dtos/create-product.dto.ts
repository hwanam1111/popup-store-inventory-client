import { Union } from '@utils/union-type';
import { CoreOutput } from '@apis/common/dtos/output.dto';
import { CurrencyUnit } from '@apis/currency/entities/currency.entity';
import { CountryName } from '@apis/countries/entities/country.entity';

export interface CreateProductInput {
  barcode: string;
  productName: string;
  productImage: string;
  productAmount: number;
  sellingCurrency: CurrencyUnit;
  sellingCountry: CountryName;
  productQuantity: number;
}

const createProductErrorMessageOutput = {
  'exist-product': 'exist-product',
} as const;
export type CreateProductErrorMessageOutput = Union<typeof createProductErrorMessageOutput>;

export interface CreateProductOutput extends CoreOutput<CreateProductErrorMessageOutput> {
  product?: {
    id: number;
  };
}
