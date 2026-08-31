import { useCallback, useRef, useState } from "react";
import inventoryApi from "../api/inventoryApi";
import { PAGINATION } from "../../../constants/paginationConstants";

const INITIAL_SEARCH_PARAMS = {
  medicineId: "",
  medicineCategoryId: "",
  inventoryStatusId: "",
  expireDateFrom: "",
  expireDateTo: "",
  availableOnly: false,
};

export default function useInventory() {

  const [inventories, setInventories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(PAGINATION.DEFAULT_PAGE);
  const [size, setSize] = useState(PAGINATION.DEFAULT_PAGE_SIZE);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const [searchParams, setSearchParams] = useState(INITIAL_SEARCH_PARAMS);
  const searchParamsRef = useRef(INITIAL_SEARCH_PARAMS);

  const [selectedInventory, setSelectedInventory] =useState(null);

  const loadInventories = useCallback(
    async (params = {}) => {
      try {
        setLoading(true);
        setError(null);

        const currentSearchParams =searchParamsRef.current;

        const filters = {medicineId: params.medicineId !== undefined ?
                         params.medicineId: currentSearchParams.medicineId,

                          medicineCategoryId:params.medicineCategoryId !== undefined? 
                          params.medicineCategoryId : currentSearchParams.medicineCategoryId,

                          inventoryStatusId:params.inventoryStatusId !== undefined ? 
                          params.inventoryStatusId: currentSearchParams.inventoryStatusId,

                          expireDateFrom:params.expireDateFrom !== undefined ? 
                          params.expireDateFrom : currentSearchParams.expireDateFrom,

                          expireDateTo: params.expireDateTo !== undefined ? 
                          params.expireDateTo : currentSearchParams.expireDateTo,

                          availableOnly:params.availableOnly !== undefined ?
                          params.availableOnly: currentSearchParams.availableOnly,
        };

        const requestParams = {
          page:params.page ?? PAGINATION.DEFAULT_PAGE,
          size:params.size ?? PAGINATION.DEFAULT_PAGE_SIZE,
        };

        Object.entries(filters).forEach(
          ([key, value]) => {
            if (
              value !== "" &&
              value !== null &&
              value !== undefined
            ) {
              requestParams[key] = value;
            }
          },
        );

        const response = await inventoryApi.search(requestParams);

        const data = response.data;

        setInventories(data?.content || []);

        setPage( data?.page ?? PAGINATION.DEFAULT_PAGE,);

        setSize( data?.size ?? PAGINATION.DEFAULT_PAGE_SIZE);

        setTotalPages(data?.totalPages ?? 0);

        setTotalElements(data?.totalElements ?? 0);

    
        const previousFilters = searchParamsRef.current;

        const filtersChanged =
          Object.keys(filters).some(
            (key) =>
              previousFilters[key] !==
              filters[key],
          );

        if (filtersChanged) {
          searchParamsRef.current = filters;
          setSearchParams(filters);
        }

        return response;
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Không thể tải danh sách tồn kho.",
        );

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const getInventoryDetail = useCallback(
    async (inventoryId) => {
      try {
        setActionLoading(true);
        setError(null);

        const response = await inventoryApi.getById(inventoryId);

        setSelectedInventory(response.data);

        return response.data;
      } catch (err) {
        setError(err.response?.data?.message ||"Không thể tải thông tin tồn kho.",);

        throw err;
      } finally {
        setActionLoading(false);
      }
    },
    [],
  );

  const importMedicine = useCallback(
    async (data) => {
      try {
        setActionLoading(true);
        setError(null);

        const response = await inventoryApi.importMedicine(data);

        return response.data;
      } catch (err) {
        setError(
          err.response?.data?.message ||"Không thể nhập thuốc vào kho.",);
        throw err;
      } finally {
        setActionLoading(false);
      }
    },
    [],
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearSelectedInventory =
    useCallback(() => {
      setSelectedInventory(null);
    }, []);

  return {
    inventories,loading,actionLoading,error,page,size,totalPages,totalElements,searchParams,selectedInventory,
    loadInventories,getInventoryDetail,importMedicine,setPage,setSize,clearError,clearSelectedInventory
  };
}