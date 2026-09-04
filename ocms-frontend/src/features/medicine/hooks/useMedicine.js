import { useCallback, useState } from "react";
import medicineApi from "../api/medicineApi";
import { PAGINATION } from "../../../constants/paginationConstants";
export default function useMedicine() {

  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(PAGINATION.DEFAULT_PAGE);
  const [size, setSize] = useState(PAGINATION.MEDICINE_PAGE_SIZE);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [searchParams, setSearchParams] = useState({medicineName: "",medicineCategoryId: ""});
  const [selectedMedicine, setSelectedMedicine] = useState(null);

 const loadMedicines = useCallback(
  async (params = {}) => {
    try {
      setLoading(true);
      setError(null);

      const requestParams = {
        page: params.page ?? PAGINATION.DEFAULT_PAGE,
        size: params.size ?? PAGINATION.MEDICINE_PAGE_SIZE,
        medicineName:params.medicineName ?? searchParams.medicineName,
        medicineCategoryId:params.medicineCategoryId ??searchParams.medicineCategoryId,
      };

      const response = await medicineApi.search(requestParams);
      const data = response.data;

      setMedicines(data?.content || []);
      setPage(data?.page ?? PAGINATION.DEFAULT_PAGE);
      setSize( data?.size ?? PAGINATION.MEDICINE_PAGE_SIZE);
      setTotalPages(data?.totalPages ?? 0);
      setTotalElements(data?.totalElements ?? 0);

      if (params.medicineName !== undefined) {
        setSearchParams((prev) => ({...prev,medicineName: params.medicineName}));
      }

      if (params.medicineCategoryId !== undefined) {
        setSearchParams((prev) => ({...prev,medicineCategoryId: params.medicineCategoryId}));
      }

      return response;
    } catch (err) {
      setError(err.response?.data?.message ||"Không thể tải danh sách thuốc.");
    } finally {
      setLoading(false);
    }
  },
  [searchParams],
);

  const getMedicineDetail = useCallback(async (medicineId) => {
    try {
      setActionLoading(true);
      setError(null);

      const response = await medicineApi.getById(medicineId);

      setSelectedMedicine(response.data);

      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Không thể tải thông tin thuốc.");
      throw err;
    } finally {
      setActionLoading(false);
    }
  }, []);

  const createMedicine = useCallback(async (data) => {
    try {
      setActionLoading(true);
      setError(null);

      const response = await medicineApi.create(data);

      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Không thể thêm thuốc.");
      throw err;
    } finally {
      setActionLoading(false);
    }
  }, []);

  const updateMedicine = useCallback(async (medicineId, data) => {
    try {
      setActionLoading(true);
      setError(null);

      const response = await medicineApi.update(medicineId, data);

      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Không thể cập nhật thuốc.");
      throw err;
    } finally {
      setActionLoading(false);
    }
  }, []);

  const deleteMedicine = useCallback(async (medicineId) => {
    try {
      setActionLoading(true);
      setError(null);

      const response = await medicineApi.delete(medicineId);

      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Không thể ngừng sử dụng thuốc.");
      throw err;
    } finally {
      setActionLoading(false);
    }
  }, []);

  const clearError = () => {
    setError(null);
  };

  const clearSelectedMedicine = () => {
    setSelectedMedicine(null);
  };

  return {
    medicines,loading,actionLoading,error,page,size,totalPages,totalElements, searchParams,selectedMedicine,
    loadMedicines,getMedicineDetail,createMedicine,updateMedicine, deleteMedicine,setPage,setSize,
    clearError,clearSelectedMedicine,
  };
}
