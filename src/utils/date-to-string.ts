export type ConvertStringType = 'hypen' | 'dot' | 'korean';

interface DateToStringProps {
  date: Date;
  convertStringType: ConvertStringType;
  addTime?: boolean;
  cutYear?: boolean;
}

export default ({ date, convertStringType, addTime = false, cutYear = false }: DateToStringProps): string => {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  let year = date.getFullYear().toString();
  if (cutYear) {
    year = year.substring(2, 4).padStart(2, '0');
  }

  let result: string = '';

  switch (convertStringType) {
    case 'hypen':
      result = `${year}-${month}-${day}`;
      break;
    case 'dot':
      result = `${year}.${month}.${day}`;
      break;
    case 'korean':
      result = `${year}년${month}월${day}일`;
      break;
    default:
      break;
  }

  if (addTime) {
    result += ` ${hours}:${minutes}:${seconds}`;
  }

  return result;
};
