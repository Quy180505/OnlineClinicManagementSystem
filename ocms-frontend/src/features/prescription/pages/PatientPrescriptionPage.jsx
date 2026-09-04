import { useCallback, useEffect, useState } from "react";
import Pagination from "../../../components/common/Pagination";
import { PAGINATION } from "../../../constants/paginationConstants";
import PrescriptionSearchForm from "../components/patient/PrescriptionSearchForm";
import PrescriptionPatientTable from "../components/patient/PrescriptionPatientTable";
import PrescriptionPatientDetail from "../components/patient/PrescriptionPatientDetail";
import usePrescriptionSearch from "../hooks/usePrescriptionSearch";
import usePrescriptionDetail from "../hooks/usePrescriptionDetail";

export default function PatientPrescriptionPage() {

  const {
    prescriptions,loading,error,
    page, totalPages,totalElements,
    searchParams,loadPrescriptions, clearError,
  } = usePrescriptionSearch();

  const {
    prescription: selectedPrescription,loading: detailLoading,
    error: detailError,loadPrescriptionDetail,clearPrescriptionDetail,clearError: clearDetailError,
  } = usePrescriptionDetail();

  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
  });

  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    let cancelled = false;

    queueMicrotask(() => {
      if (!cancelled) {
        loadPrescriptions({
          page: PAGINATION.DEFAULT_PAGE,
          size: PAGINATION.DEFAULT_PAGE_SIZE,
        }).catch(() => {});
      }
    });

    return () => {
      cancelled = true;
    };
  }, [loadPrescriptions]);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();

    await loadPrescriptions({
        fromDate: formData.fromDate,
        toDate: formData.toDate,

        page: PAGINATION.DEFAULT_PAGE,
        size: PAGINATION.DEFAULT_PAGE_SIZE,
      });
  };

  const handleReset = async () => {
    const resetData = {
      fromDate: "",
      toDate: "",
    };

    setFormData(resetData);

    await loadPrescriptions({
      fromDate: "",
      toDate: "",
      page: PAGINATION.DEFAULT_PAGE,
      size: PAGINATION.DEFAULT_PAGE_SIZE,
    });
  };

  const handlePageChange = async (nextPage) => {
    await loadPrescriptions({
      ...searchParams,
      page: nextPage,
      size: PAGINATION.DEFAULT_PAGE_SIZE,
    });
  };

  const handleViewDetail = async (prescriptionId) => {
    try {
      clearDetailError();
      setShowDetail(true);
      await loadPrescriptionDetail(prescriptionId);
    } catch {
      console.error("Error loading prescription detail");
    }
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    clearPrescriptionDetail();
    clearDetailError();
  };

  return (
    <div className="container-fluid">
      <div className="mb-4">
        <h4 className="mb-1">Đơn thuốc điện tử</h4>

        <p className="text-muted mb-0">
          Tra cứu các đơn thuốc đã được bác sĩ kê trong quá trình khám chữa
          bệnh.
        </p>
      </div>

      {error && (
        <div className="alert alert-danger">
          <i className="bi bi-exclamation-circle me-2" />
          {error}

          <button
            type="button"
            className="btn-close float-end"
            onClick={clearError}
          />
        </div>
      )}

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header bg-white">
          <h5 className="mb-0">
            <i className="bi bi-search me-2" />
            Tìm kiếm đơn thuốc
          </h5>
        </div>

        <div className="card-body">
          <PrescriptionSearchForm
            keyword={formData.keyword}
            fromDate={formData.fromDate}
            toDate={formData.toDate}
            loading={loading}
            onChange={handleChange}
            onSearch={handleSearch}
            onReset={handleReset}
          />
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white">
          <h5 className="mb-0">Danh sách đơn thuốc</h5>
        </div>

        <div className="card-body">
          <PrescriptionPatientTable
            prescriptions={prescriptions}
            loading={loading}
            onViewDetail={handleViewDetail}
          />

          <div className="d-flex justify-content-between align-items-center mt-4">
            <small className="text-muted">
              Tổng số: {totalElements} đơn thuốc
            </small>

            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>

      {showDetail && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="modal-dialog modal-xl modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Chi tiết đơn thuốc</h5>

                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseDetail}
                  disabled={detailLoading}
                />
              </div>

              <div className="modal-body">
                {detailError && (
                  <div className="alert alert-danger">{detailError}</div>
                )}

                <PrescriptionPatientDetail
                  prescription={selectedPrescription}
                  loading={detailLoading}
                />
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseDetail}
                  disabled={detailLoading}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
