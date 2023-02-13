import { PaginationInput, PaginationOutput } from '@apis/common/dtos/pagination.dto';
import { CountryName } from '@apis/countries/entities/country.entity';
import { ProductForwardEntity } from '@apis/products/entities/product-forward.entity';

export interface FetchForwardedProductsInput extends PaginationInput {
  sellingCountry?: CountryName;
  productId?: number;
  isOnlyMeData: boolean;
}

export interface FetchForwardedProductsOutput extends PaginationOutput {
  forwardedProducts?: ProductForwardEntity[];
}
