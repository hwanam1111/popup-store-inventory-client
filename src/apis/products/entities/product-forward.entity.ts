import { UserEntity } from '@apis/users/entities/user.entity';
import { ProductEntity } from '@apis/products/entities/product.entity';
import { CountryName } from '@apis/countries/entities/country.entity';
import { CurrencyUnit } from '@apis/currency/entities/currency.entity';

import { Union } from '@utils/union-type';

export const forwardHistoryType = {
  Forwarding: 'Forwarding',
  Cancel: 'Cancel',
  Defective: 'Defective',
  Damage: 'Damage',
} as const;
export type ForwardHistoryType = Union<typeof forwardHistoryType>;

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
  forwardHistoryType: ForwardHistoryType;
  memo: string | null;
}
