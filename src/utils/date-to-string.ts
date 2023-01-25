import moment from 'moment-timezone';

import LocalStorage from '@utils/local-storage';
import { TIMEZONE } from '@constants/local-storage-keys';
import timezones from '@constants/timezones';

export type ConvertStringType = 'hypen' | 'dot';

interface DateToStringProps {
  date: Date;
  convertStringType: ConvertStringType;
  convertTimezone?: boolean;
  addTime?: boolean;
  addTimeZoneCityName?: boolean;
}

export default ({
  date,
  convertStringType,
  convertTimezone = true,
  addTime = false,
  addTimeZoneCityName = false,
}: DateToStringProps): string => {
  const timezone = LocalStorage.getItem(TIMEZONE) || timezones[0].value;

  let convertedDate: string = '';

  switch (convertStringType) {
    case 'hypen':
      if (convertTimezone) {
        convertedDate = moment.tz(date, timezone).format('YYYY-MM-DD HH:mm:ss');
      } else {
        convertedDate = moment.tz(date, timezones[0].value).format('YYYY-MM-DD HH:mm:ss');
      }
      break;
    case 'dot':
      if (convertTimezone) {
        convertedDate = moment.tz(date, timezone).format('YYYY.MM.DD HH:mm:ss');
      } else {
        convertedDate = moment.tz(date, timezones[0].value).format('YYYY.MM.DD HH:mm:ss');
      }
      break;
    default:
      break;
  }

  if (addTime === false) {
    convertedDate = convertedDate.split(' ')[0];
  }

  if (addTimeZoneCityName === true) {
    convertedDate = `(${
      timezones.find((tz) => tz.value === LocalStorage.getItem(TIMEZONE))?.name.split(', ')[0]
    } Time) ${convertedDate}`;
  }

  return convertedDate;
};
