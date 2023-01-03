import { UserEntity } from '@apis/users/entities/user.entity';
import { ProductEntity } from '@apis/products/entities/product.entity';
import { CountryName } from '@apis/countries/entities/country.entity';
import { CurrencyUnit } from '@apis/currency/entities/currency.entity';

export interface ProductForwardEntity {
  id: number;
  barcode: string;
  productName: string;
  productImage: string;
  productAmount: number;
  sellingCurrency: CurrencyUnit;
  sellingCountry: CountryName;
  remainingQuantity: number;
  createdAt: string;
  product: ProductEntity;
  productForwardedUser: UserEntity;
}
