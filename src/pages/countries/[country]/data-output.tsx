import RootLayout from '@ui/root-layout';
import useRouteWhenInvalidCountry from '@hooks/useRouteWhenInvalidCountry';
import useI18n from '@hooks/useI18n';
import { I18N_DATA_OUTPUT } from '@constants/i18n-namespace';
import DataOutput from '@components/data-output';

export default function DataOutputPage() {
  useRouteWhenInvalidCountry();

  const { i18n } = useI18n(I18N_DATA_OUTPUT);

  // const data = [
  //   {
  //     content1: '1',
  //     content2: '2',
  //   },
  //   {
  //     content1: '3',
  //     content2: '4',
  //   },
  //   {
  //     content1: '5',
  //     content2: '6',
  //   },
  // ];

  // const excelDownload = useExcelDownload({
  //   excelFilename: 'test',
  //   excelInsertData: data,
  //   excelTitle: ['상품명', '바코드번호', '출고시간', '출고국가', '통화', '판매가격'],
  //   searchDateTimezone: '',
  //   searchStartDatetime: '',
  //   searchEndDatetime: '',
  // });

  // <button onClick={() => excelDownload()} type="button">
  //       Excel Download Test
  //     </button>

  return (
    <RootLayout metaTitle={i18n('meta-title')} accessRole="Manager">
      <DataOutput />
    </RootLayout>
  );
}
