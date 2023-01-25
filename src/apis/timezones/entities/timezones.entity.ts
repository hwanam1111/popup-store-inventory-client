import { Union } from '@utils/union-type';

export const timezones = {
  'Asia/Seoul': 'Asia/Seoul',
  'Europe/Berlin': 'Europe/Berlin',
  'Europe/Brussels': 'Europe/Brussels',
  'Europe/Madrid': 'Europe/Madrid',
  'Europe/Paris': 'Europe/Paris',
} as const;
export type Timezones = Union<typeof timezones>;

export interface TimezonesEntity {
  timezones: Timezones;
}
