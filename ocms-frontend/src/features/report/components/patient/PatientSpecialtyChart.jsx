import {BarElement,CategoryScale,Chart as ChartJS,Legend,LinearScale,Tooltip} from "chart.js";
import { Bar } from "react-chartjs-2";
import {REPORT_CHART_BORDER_COLORS,REPORT_CHART_COLORS,REPORT_CHART_HEIGHT,} from "../../../../constants/reportConstants";

ChartJS.register(CategoryScale,LinearScale,BarElement,Tooltip, Legend,);

function PatientSpecialtyChart({ data: specialties}) {
  const data = {
    labels: specialties.map(
      (item) => item.specialtyName,
    ),
    datasets: [
      {
        label: "Số bệnh nhân",
        data: specialties.map(
          (item) => item.patientCount || 0,
        ),
        backgroundColor: specialties.map(
          (_, index) =>
            REPORT_CHART_COLORS[
              index % REPORT_CHART_COLORS.length
            ],
        ),
        borderColor: specialties.map(
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
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
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
        height: Math.max(
          REPORT_CHART_HEIGHT.MIN_SPECIALTY,
          specialties.length * REPORT_CHART_HEIGHT.SPECIALTY_ITEM,
        ),
      }}
    >
      <Bar
        data={data}
        options={options}
      />
    </div>
  );
}

export default PatientSpecialtyChart;

