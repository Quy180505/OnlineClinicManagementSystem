import {BarElement, CategoryScale,Chart as ChartJS,Legend, LinearScale,Tooltip,} from "chart.js";
import { Bar } from "react-chartjs-2";
import {REPORT_CHART_BORDER_COLORS,REPORT_CHART_COLORS, REPORT_CHART_HEIGHT} from "../../../../constants/reportConstants";

ChartJS.register(CategoryScale,LinearScale,BarElement,Tooltip,Legend);

function PatientAgeChart({ data: ageData }) {
  const data = {
    labels: ageData.map(
      (item) => item.ageGroup,
    ),
    datasets: [
      {
        label: "Số bệnh nhân",
        data: ageData.map(
          (item) => item.patientCount || 0,
        ),
        backgroundColor: ageData.map(
          (_, index) =>
            REPORT_CHART_COLORS[
              index % REPORT_CHART_COLORS.length
            ],
        ),
        borderColor: ageData.map(
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
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return (
    <div
      style={{
        height: `${REPORT_CHART_HEIGHT.PATIENT_AGE}px`,
      }}
    >
      <Bar data={data} options={options} />
    </div>
  );
}

export default PatientAgeChart;

