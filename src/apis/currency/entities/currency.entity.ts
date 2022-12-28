import { Union } from '@utils/union-type';

export const currencyUnit = {
  KRW: 'KRW',
  USD: 'USD',
  EUR: 'EUR',
} as const;
export type CurrencyUnit = Union<typeof currencyUnit>;

export interface CurrencyEntity {
  currencyUnit: CurrencyUnit;
}
