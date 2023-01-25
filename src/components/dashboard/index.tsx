import { useRouter } from 'next/router';
import styled from 'styled-components';

import { I18N_DASHBOARD } from '@constants/i18n-namespace';
import useI18n from '@hooks/useI18n';
import MainSectionTitle from '@ui/main-section-title';
import Card from '@components/dashboard/card';
import Chart from '@components/dashboard/chart';
import useFetchDaysRevenue from '@apis/statistics/queries/fetch-days-revenue';
import ComponentLoading from '@ui/loading-component';
import { CountryName } from '@apis/countries/entities/country.entity';
import LocalStorage from '@utils/local-storage';
import { TIMEZONE } from '@constants/local-storage-keys';
import timezones from '@constants/timezones';
import { Timezones } from '@apis/timezones/entities/timezones.entity';
import useFetchDaysForwardedProducts from '@apis/statistics/queries/fetch-days-forwarded-products';
import useDaysDefectiveDamageProducts from '@apis/statistics/queries/fetch-days-defective-damage-products';

const Container = styled.div`
  margin: 3rem auto 0 auto;
  padding: 0 1rem;
`;

const CardContainer = styled.div`
  display: flex;
  margin-top: 2rem;
  gap: 1rem;
`;

export default function Dashboard() {
  const { i18n } = useI18n(I18N_DASHBOARD);
  const timezone = (LocalStorage.getItem(TIMEZONE) || timezones[0].value) as Timezones;

  const { query } = useRouter();
  const country = (query.country as string).replace(/\b[a-z]/, (text) => text.toUpperCase()) as CountryName;

  const { isLoading: isLoadingRevenueData, data: revenueData } = useFetchDaysRevenue({ country, timezone });
  const { isLoading: isLoadingForwardedProductsData, data: forwardedProductsData } = useFetchDaysForwardedProducts({
    country,
    timezone,
  });
  const { isLoading: isLoadingDefectiveDamageProductsData, data: defectiveDamageProductsData } =
    useDaysDefectiveDamageProducts({ country, timezone });

  return (
    <Container>
      <MainSectionTitle title={i18n('page-title')} />
      <CardContainer>
        <Card>
          {isLoadingRevenueData && !revenueData && <ComponentLoading color="#222" />}
          {revenueData?.chart && (
            <Chart
              chartName={i18n('chart.revenue.title')}
              chartData={[
                {
                  dataName: i18n('chart.revenue.title'),
                  data: Object.values(revenueData.chart) as unknown as number[],
                },
              ]}
              xaxisNames={Object.keys(revenueData.chart)}
            />
          )}
        </Card>
        <Card>
          {isLoadingForwardedProductsData && !forwardedProductsData && <ComponentLoading color="#222" />}
          {forwardedProductsData?.chart && (
            <Chart
              chartName={i18n('chart.forwarded-count.title')}
              chartData={[
                {
                  dataName: i18n('chart.forwarded-count.title'),
                  data: Object.values(forwardedProductsData.chart) as unknown as number[],
                },
              ]}
              xaxisNames={Object.keys(forwardedProductsData.chart)}
            />
          )}
        </Card>
        <Card>
          {isLoadingDefectiveDamageProductsData && !defectiveDamageProductsData && <ComponentLoading color="#222" />}
          {defectiveDamageProductsData?.chart && (
            <Chart
              chartName={i18n('chart.defective-damage-count.title')}
              chartData={[
                {
                  dataName: i18n('chart.defective-damage-count.data.name.defective'),
                  data: Object.values(defectiveDamageProductsData.chart).map(
                    (data) => data.damage,
                  ) as unknown as number[],
                },
                {
                  dataName: i18n('chart.defective-damage-count.data.name.damage'),
                  data: Object.values(defectiveDamageProductsData.chart).map(
                    (data) => data.defective,
                  ) as unknown as number[],
                },
              ]}
              xaxisNames={Object.keys(defectiveDamageProductsData.chart)}
            />
          )}
        </Card>
        {/* <Card>
          <Chart chartName="일별 출고 수량" chartData={[]} xaxisNames={['02-01', '02-02', '02-03']} />
        </Card>
        <Card>
          <Chart chartName="일별 불량/파손 수량" chartData={testData2} xaxisNames={['02-01', '02-02', '02-03']} />
        </Card> */}
      </CardContainer>
    </Container>
  );
}
