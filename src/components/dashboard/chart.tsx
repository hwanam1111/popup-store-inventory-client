import dynamic from 'next/dynamic';

const DynamicComponentWithNoSSR = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ChartDataType {
  dataName: string;
  data: number[];
}

interface DashboardChartProps {
  chartName: string;
  chartData: ChartDataType[];
  xaxisNames: string[];
}

export default function DashboardChart({ chartName, chartData, xaxisNames }: DashboardChartProps) {
  const chartOptions = {
    series: chartData.map((chart) => ({
      name: chart.dataName,
      data: chart.data,
    })),
    options: {
      chart: {
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth' as 'straight' | 'smooth' | 'stepline' | ('straight' | 'smooth' | 'stepline')[],
      },
      title: {
        text: chartName,
        align: 'left' as 'left' | 'center' | 'right',
      },
      grid: {
        row: {
          colors: ['#f3f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: xaxisNames,
      },
    },
  };

  return (
    <div>
      <DynamicComponentWithNoSSR options={chartOptions.options} series={chartOptions.series} typs="line" />
    </div>
  );
}
