import { CountryName } from '@apis/countries/entities/country.entity';
import { PaginationInput, PaginationOutput } from '@apis/common/dtos/pagination.dto';
import { ProductEntity } from '@apis/products/entities/product.entity';

export interface FetchProductsInput extends PaginationInput {
  sellingCountry?: CountryName;
}

interface InventoryOutput {
  remainingQuantity: number;
  soldQuantity: number;
}

export interface FetchProductsOutput extends PaginationOutput {
  products?: (ProductEntity & InventoryOutput)[];
}
