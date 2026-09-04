import {ArcElement,Chart as ChartJS,Legend,Tooltip,} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { REPORT_CHART_BORDER_COLORS,REPORT_CHART_COLORS,REPORT_CHART_HEIGHT} from "../../../../constants/reportConstants";

ChartJS.register(ArcElement,Tooltip, Legend);

function PatientGenderChart({ data: genderData }) {
  const data = {
    labels: genderData.map(
      (item) => item.gender,
    ),
    datasets: [
      {
        label: "Số bệnh nhân",
        data: genderData.map(
          (item) => item.patientCount || 0,
        ),
        backgroundColor: genderData.map(
          (_, index) =>
            REPORT_CHART_COLORS[
              index % REPORT_CHART_COLORS.length
            ],
        ),
        borderColor: genderData.map(
          (_, index) =>
            REPORT_CHART_BORDER_COLORS[
              index %
                REPORT_CHART_BORDER_COLORS.length
            ],
        ),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div
      style={{
        height: `${REPORT_CHART_HEIGHT.PATIENT_GENDER}px`,
      }}
    >
      <Doughnut
        data={data}
        options={options}
      />
    </div>
  );
}

export default PatientGenderChart;

