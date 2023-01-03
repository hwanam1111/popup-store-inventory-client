import { CountryName } from '@apis/countries/entities/country.entity';
import { PaginationInput, PaginationOutput } from '@apis/common/dtos/pagination.dto';
import { ProductEntity } from '@apis/products/entities/product.entity';

export interface FetchProductsInput extends PaginationInput {
  sellingCountry?: CountryName;
}

export interface FetchProductsOutput extends PaginationOutput {
  products?: (ProductEntity & { remainingQuantity: number; soldQuantity: number })[];
}
