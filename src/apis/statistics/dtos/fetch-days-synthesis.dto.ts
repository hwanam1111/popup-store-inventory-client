import { CountryName } from '@apis/countries/entities/country.entity';
import { ProductEntity } from '@apis/products/entities/product.entity';
import { Timezones } from '@apis/timezones/entities/timezones.entity';

export interface FetchDaysSynthesisConditions {
  isCall: boolean;
}

export interface FetchDaysSynthesisInput {
  country: CountryName;
  timezone: Timezones;
  selectDate: string;
}

export interface FetchDaysSynthesisOutput {
  result?: (Pick<ProductEntity, 'id' | 'barcode' | 'productName' | 'sellingCurrency' | 'productAmount'> & {
    productForwardCount: number;
    productForwardCancelCount: number;
    productDefectiveCount: number;
    productDamageCount: number;
  })[];
}
