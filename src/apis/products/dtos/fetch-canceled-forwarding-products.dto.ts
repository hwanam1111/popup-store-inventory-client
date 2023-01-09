import { PaginationInput, PaginationOutput } from '@apis/common/dtos/pagination.dto';
import { CountryName } from '@apis/countries/entities/country.entity';
import { ProductForwardEntity } from '@apis/products/entities/product-forward.entity';

export interface FetchCanceledForwardingProductsInput extends PaginationInput {
  sellingCountry?: CountryName;
  productId?: number;
}

export interface FetchCanceledForwardingProductsOutput extends PaginationOutput {
  canceledForwardingProducts?: ProductForwardEntity[];
}
