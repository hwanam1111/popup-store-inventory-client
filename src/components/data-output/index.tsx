import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { I18N_DATA_OUTPUT } from '@constants/i18n-namespace';
import useI18n from '@hooks/useI18n';
import { CountryName } from '@apis/countries/entities/country.entity';
import MainSectionTitle from '@ui/main-section-title';
import Table from '@ui/table';
import numberWithComma from '@utils/number-with-comma';
import { sweetAlert, sweetConfirm } from '@libs/sweet-alert2';
import LocalStorage from '@utils/local-storage';
import { TIMEZONE } from '@constants/local-storage-keys';
import timezones from '@constants/timezones';
import { Timezones } from '@apis/timezones/entities/timezones.entity';
import DataOutputDatePicker from '@components/data-output/datepicker';
import dateToString from '@utils/date-to-string';
import useFetchDaysSynthesis from '@apis/statistics/queries/fetch-days-synthesis';
import ComponentLoading from '@ui/loading-component';
import useExcelDownload from '@hooks/useExcelDownload';

const Container = styled.div`
  margin: 3rem auto 0 auto;
  padding: 0 3rem;
`;

const DataPickerBlock = styled.div`
  display: flex;
  margin-top: 2rem;
  gap: 1rem;
  align-items: flex-end;
`;

const CallDataButton = styled.button`
  background-color: ${({ theme }) => theme.color.PB100};
  color: ${({ theme }) => theme.color.PB600};
  font-size: 0.875rem;
  border-radius: 0.25rem;
  padding: 0.75rem 1rem;

  &:hover {
    background-color: ${({ theme }) => theme.color.PB200};
    transition: 0.2s background-color;
  }
`;

const ContentBlock = styled.div`
  border: 1px solid ${({ theme }) => theme.color.G20};
  border-radius: 0.625rem;
  padding: 1.5rem;
  margin-top: 2rem;
`;

const PleaseCallData = styled.p``;

export default function DataOutput() {
  const { query } = useRouter();
  const { i18n } = useI18n(I18N_DATA_OUTPUT);
  const country = (query.country as string).replace(/\b[a-z]/, (text) => text.toUpperCase()) as CountryName;

  const timezone = (LocalStorage.getItem(TIMEZONE) || timezones[0].value) as Timezones;
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isCallData, setIsCallData] = useState<boolean>(false);

  const { isLoading, data } = useFetchDaysSynthesis(
    { isCall: isCallData },
    {
      country,
      timezone,
      ...(selectedDate && {
        selectDate: dateToString({
          date: selectedDate,
          convertStringType: 'hypen',
          convertTimezone: false,
        }),
      }),
    },
  );
  const onCallData = useCallback(() => {
    if (selectedDate === null) {
      return sweetAlert.fire({
        icon: 'error',
        titleText: i18n(`call-data.error.empty-date`),
      });
    }

    const date = dateToString({
      date: selectedDate,
      convertStringType: 'hypen',
      convertTimezone: false,
    });

    sweetConfirm
      .fire({
        title: `(Timezone: ${timezone}) ${date} ${i18n('call-data.confirm.title')}`,
        confirmButtonText: i18n('call-data.confirm.button'),
      })
      .then((result) => {
        if (result.isConfirmed) {
          setIsCallData(true);
          setTimeout(() => {
            setIsCallData(false);
          }, 10);
        }
      });
  }, [selectedDate]);

  const excelDownload = useExcelDownload({
    excelFilename: `${country}_${dateToString({
      date: selectedDate,
      convertStringType: 'hypen',
      convertTimezone: false,
    })}_result`,
    searchDate: dateToString({
      date: selectedDate,
      convertStringType: 'hypen',
      convertTimezone: false,
    }),
    excelInsertData: data?.result?.map((outputData) => ({
      productName: outputData.productName,
      barcode: outputData.barcode,
      productAmount: `${outputData.sellingCurrency} ${numberWithComma(outputData.productAmount)}`,
      productForwardCount: numberWithComma(outputData.productForwardCount),
      productDefectiveCount: numberWithComma(outputData.productDefectiveCount),
      productDamageCount: numberWithComma(outputData.productDamageCount),
      totalRevenue: `${outputData.sellingCurrency} ${numberWithComma(
        outputData.productAmount * outputData.productForwardCount,
      )}`,
    })),
    excelTitle: ['상품명', '바코드번호', '상품가격', '판매 수량(출고량)', '불량 수량', '파손 수량', '총 출고 매출'],
    searchDateTimezone: timezone,
  });
  useEffect(() => {
    if (data) {
      excelDownload();
    }
  }, [data]);

  return (
    <Container>
      <MainSectionTitle title={i18n('page-title')} />
      <DataPickerBlock>
        <DataOutputDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <CallDataButton type="button" onClick={onCallData}>
          {i18n('call-data.button')}
        </CallDataButton>
      </DataPickerBlock>
      <ContentBlock>
        {data && data.result?.length > 0 && (
          <Table
            th={[
              i18n('table.th.product-name'),
              i18n('table.th.barcode'),
              i18n('table.th.product-amount'),
              i18n('table.th.sold-quantity'),
              i18n('table.th.defective-quantity'),
              i18n('table.th.damage-quantity'),
            ]}
          >
            {data.result.map((outputData) => (
              <tr key={outputData.id}>
                <td>{outputData.productName}</td>
                <td>{outputData.barcode}</td>
                <td>
                  {outputData.sellingCurrency} {numberWithComma(outputData.productAmount)}
                </td>
                <td>{numberWithComma(outputData.productForwardCount)}</td>
                <td>{numberWithComma(outputData.productDefectiveCount)}</td>
                <td>{numberWithComma(outputData.productDamageCount)}</td>
              </tr>
            ))}
          </Table>
        )}
        {!data && !isLoading && <PleaseCallData>{i18n('please-call-data')}</PleaseCallData>}
        {isLoading && <ComponentLoading color="#222" />}
      </ContentBlock>
    </Container>
  );
}
