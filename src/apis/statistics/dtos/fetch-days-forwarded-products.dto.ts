import { CountryName } from '@apis/countries/entities/country.entity';
import { Timezones } from '@apis/timezones/entities/timezones.entity';

interface DaysForwardedProductsChart {
  [key: string]: number[];
}

export interface FetchDaysForwardedProductsInput {
  country?: CountryName;
  timezone: Timezones;
}

export interface FetchDaysForwardedProductsOutput {
  chart?: DaysForwardedProductsChart;
}
