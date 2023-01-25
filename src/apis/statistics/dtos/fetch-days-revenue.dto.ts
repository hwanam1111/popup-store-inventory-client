import { CountryName } from '@apis/countries/entities/country.entity';
import { Timezones } from '@apis/timezones/entities/timezones.entity';

interface FetchDaysRevenueChart {
  [key: string]: number[];
}

export interface FetchDaysRevenueInput {
  country?: CountryName;
  timezone: Timezones;
}

export interface FetchDaysRevenueOutput {
  chart?: FetchDaysRevenueChart;
}
