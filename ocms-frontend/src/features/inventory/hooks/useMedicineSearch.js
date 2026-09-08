import { useCallback, useEffect, useRef, useState } from "react";
import medicineApi from "../../medicine/api/medicineApi";
import { PAGINATION } from "../../../constants/paginationConstants";

const DEBOUNCE_DELAY = PAGINATION.SEARCH_DEBOUNCE_DELAY;

export default function useMedicineSearch() {
  
  const debounceRef = useRef(null);
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchMedicines = useCallback((keyword) => {
    const trimmedKeyword = keyword?.trim() || "";

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (trimmedKeyword.length < PAGINATION.MEDICINE_SEARCH_MIN_LENGTH) {
      setMedicines([]);
      setLoading(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await medicineApi.search({
          medicineName: trimmedKeyword,
          page: PAGINATION.DEFAULT_PAGE,
          size: PAGINATION.MEDICINE_SEARCH_SIZE,
          sort: "medicineName,asc",
        });

        setMedicines(response.data?.content || []);
      } catch (err) {
        setMedicines([]);

        setError(err.response?.data?.message || "Không thể tìm kiếm thuốc.");
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_DELAY);
  }, []);

  const clearSearch = useCallback(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    setMedicines([]);
    setLoading(false);
    setError(null);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return {
    medicines,loading,error,searchMedicines,clearSearch,
  };
}
