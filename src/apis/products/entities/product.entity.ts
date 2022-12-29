import { CountryName } from '@apis/countries/entities/country.entity';
import { CurrencyUnit } from '@apis/currency/entities/currency.entity';

export interface ProductEntity {
  id: number;
  barcode: string;
  productName: string;
  productImage: string;
  productAmount: number;
  sellingCurrency: CurrencyUnit;
  sellingCountry: CountryName;
  productQuantity: number;
}
