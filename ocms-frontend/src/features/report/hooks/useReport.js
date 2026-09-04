import { useCallback, useState } from "react";
import { reportApi } from "../api/reportApi";

export default function useReport() {

  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [quarterlyRevenue, setQuarterlyRevenue] = useState([]);
  const [revenueBySpecialty, setRevenueBySpecialty] = useState([]);

  const [patientAge, setPatientAge] = useState([]);
  const [patientGender, setPatientGender] = useState([]);
  const [patientSpecialty, setPatientSpecialty] = useState([]);

  const [revenueView, setRevenueView] = useState("monthly");
  const [quarter, setQuarter] = useState(null);

  const [loadingRevenue, setLoadingRevenue] = useState(false);
  const [loadingPatient, setLoadingPatient] = useState(false);

  const [error, setError] = useState(null);


  const loadRevenueReports = useCallback(
    async (year, currentRevenueView, currentQuarter) => {
      try {
        setLoadingRevenue(true);
        setError(null);

        const revenueOverviewPromise = currentRevenueView === "monthly"? reportApi.getMonthlyRevenue(year): reportApi.getQuarterlyRevenue(year);

        const [ revenueOverviewResponse, revenueSpecialtyResponse,] = await Promise.all([
          revenueOverviewPromise,
          reportApi.getRevenueBySpecialty(year, currentQuarter)
        ]);

        if (currentRevenueView === "monthly") {
          setMonthlyRevenue(revenueOverviewResponse?.data ?? []);
        } else {
          setQuarterlyRevenue(revenueOverviewResponse?.data ?? []);
        }

        setRevenueBySpecialty(revenueSpecialtyResponse?.data ?? []);
      } catch (error) {
        setError(error.response?.data?.message || "Không thể tải dữ liệu doanh thu.");
      } finally {
        setLoadingRevenue(false);
      }
    },
    []
  );

  const loadPatientReports = useCallback(
    async (year) => {
      try {

        setLoadingPatient(true);
        setError(null);

        const [ ageResponse,genderResponse,patientSpecialtyResponse] = await Promise.all([
          reportApi.getPatientsByAge(year),
          reportApi.getPatientsByGender(year),
          reportApi.getPatientsBySpecialty(year),
        ]);

        setPatientAge(ageResponse?.data ?? []);
        setPatientGender(genderResponse?.data ?? []);
        setPatientSpecialty(patientSpecialtyResponse?.data ?? []);
      } catch (error) {
        setError(error.response?.data?.message ||"Không thể tải dữ liệu bệnh nhân.");
      } finally {
        setLoadingPatient(false);
      }
    },
    []
  );

  const loadReports = useCallback(
    async (year, currentRevenueView, currentQuarter) => {
      await Promise.all([
        loadRevenueReports(year, currentRevenueView,currentQuarter),
        loadPatientReports(year),
      ]);
    },
    [loadRevenueReports, loadPatientReports]
  );

  const changeRevenueView = useCallback((view) => {
    setRevenueView(view);
  }, []);

  const changeQuarter = useCallback((value) => {
    setQuarter(value === "" ? null : Number(value));
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    monthlyRevenue,quarterlyRevenue,revenueBySpecialty,patientAge,patientGender,
    patientSpecialty,revenueView,quarter,loadingRevenue,loadingPatient, error,
    loadReports,loadRevenueReports,loadPatientReports,changeRevenueView,changeQuarter,clearError
  };
}