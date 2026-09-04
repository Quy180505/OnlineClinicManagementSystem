import {BarElement,CategoryScale,Chart as ChartJS,Legend,LinearScale,Tooltip} from "chart.js";
import { Bar } from "react-chartjs-2";
import {REPORT_CHART_BORDER_COLORS,REPORT_CHART_COLORS,REPORT_CHART_HEIGHT,REPORT_CURRENCY,REPORT_CURRENCY_LOCALE,REPORT_REVENUE_VIEW} from "../../../../constants/reportConstants";


ChartJS.register(CategoryScale,LinearScale,BarElement,Tooltip,Legend);

function formatCurrency(value) {
  return new Intl.NumberFormat(REPORT_CURRENCY_LOCALE,).format(value || 0);
}

function RevenueOverviewChart({monthlyRevenue,quarterlyRevenue,view}) {

  const sourceData =view === REPORT_REVENUE_VIEW.MONTHLY? monthlyRevenue: quarterlyRevenue;

  const labels =
    view === REPORT_REVENUE_VIEW.MONTHLY ? 
        sourceData.map((item) => `Tháng ${item.period}`)
        : 
        sourceData.map((item) => `Quý ${item.period}`);

  const data = {
    labels,
    datasets: [
      {
        label: "Doanh thu",
        data: sourceData.map((item) => item.revenue || 0,),
        backgroundColor: sourceData.map(
          (_, index) =>
            REPORT_CHART_COLORS[
              index % REPORT_CHART_COLORS.length
            ],
        ),
        borderColor: sourceData.map(
          (_, index) =>
            REPORT_CHART_BORDER_COLORS[
              index %
                REPORT_CHART_BORDER_COLORS.length
            ],
        ),
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${formatCurrency(
              context.raw,
            )} ${REPORT_CURRENCY}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) =>
            new Intl.NumberFormat(
              REPORT_CURRENCY_LOCALE,
              {
                notation: "compact",
              },
            ).format(value),
        },
      },
    },
  };

  return (
    <div
      style={{
        height: `${REPORT_CHART_HEIGHT.REVENUE_OVERVIEW}px`,
      }}
    >
      <Bar data={data} options={options} />
    </div>
  );
}

export default RevenueOverviewChart;

