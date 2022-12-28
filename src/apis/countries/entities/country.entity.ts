import { Union } from '@utils/union-type';

export const countryName = {
  Germany: 'Germany',
  Belgium: 'Belgium',
  Spain: 'Spain',
  France: 'France',
} as const;
export type CountryName = Union<typeof countryName>;

export interface CountryEntity {
  countryName: CountryName;
}
