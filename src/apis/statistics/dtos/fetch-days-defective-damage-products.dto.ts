import { CountryName } from '@apis/countries/entities/country.entity';
import { Timezones } from '@apis/timezones/entities/timezones.entity';

interface DaysDefectiveDamageProductsChart {
  [key: string]: {
    defective: number[];
    damage: number[];
  };
}

export interface FetchDaysDefectiveDamageProductsInput {
  country?: CountryName;
  timezone: Timezones;
}

export interface FetchDaysDefectiveDamageProductsOutput {
  chart?: DaysDefectiveDamageProductsChart;
}
