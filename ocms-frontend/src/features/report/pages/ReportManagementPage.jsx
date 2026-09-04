import { useEffect, useState } from "react";
import PatientReportSection from "../components/patient/PatientReportSection";
import RevenueReportSection from "../components/revenue/RevenueReportSection";
import ReportYearSelector from "../components/ReportYearSelector";
import useReport from "../hooks/useReport";

const CURRENT_YEAR = new Date().getFullYear();

function ReportManagementPage() {

  const [year, setYear] = useState(CURRENT_YEAR);

  const {
    monthlyRevenue, quarterlyRevenue,revenueBySpecialty,patientAge,
    patientGender, patientSpecialty,revenueView,quarter,loadingRevenue,loadingPatient,error,
    loadReports,loadRevenueReports,changeRevenueView,changeQuarter,clearError,
  } = useReport();


  const handleYearChange = (newYear) => {
    setYear(newYear);
    loadReports(newYear,revenueView,quarter);
  };


  const handleRevenueViewChange = (view) => {
    changeRevenueView(view);
    loadRevenueReports(year,view,quarter);
  };

 
  const handleQuarterChange = (value) => {
    const newQuarter =value === "" ? null : Number(value);

    changeQuarter(value);

    loadRevenueReports(year,revenueView,newQuarter);
  };


  const handleRetry = () => {
    loadReports(year, revenueView, quarter);
  };

  
  useEffect(() => {
    const timer = setTimeout(() => {
      loadReports(CURRENT_YEAR,"monthly", null);
    }, 0);

    return () => clearTimeout(timer);
  }, [loadReports]);

  return (
    <div className="container-fluid py-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h4 className="mb-1">
            Báo cáo thống kê
          </h4>

          <p className="text-muted mb-0">
            Thống kê doanh thu và bệnh nhân theo năm.
          </p>
        </div>

        <ReportYearSelector
          year={year}
          onChange={handleYearChange}
        />
      </div>

      {error && (
        <div
          className="alert alert-danger d-flex justify-content-between align-items-center"
          role="alert"
        >
          <span>{error}</span>

          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={handleRetry}
            >
              Thử lại
            </button>

            <button
              type="button"
              className="btn-close"
              onClick={clearError}
              aria-label="Đóng"
            />
          </div>
        </div>
      )}

      <RevenueReportSection
        monthlyRevenue={monthlyRevenue}
        quarterlyRevenue={quarterlyRevenue}
        revenueBySpecialty={revenueBySpecialty}
        revenueView={revenueView}
        quarter={quarter}
        loading={loadingRevenue}
        onChangeView={handleRevenueViewChange}
        onChangeQuarter={handleQuarterChange}
      />

      <PatientReportSection
        patientAge={patientAge}
        patientGender={patientGender}
        patientSpecialty={patientSpecialty}
        loading={loadingPatient}
      />
    </div>
  );
}

export default ReportManagementPage;

