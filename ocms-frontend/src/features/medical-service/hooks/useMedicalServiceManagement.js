import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { medicalServiceApi } from "../api/MedicalServiceApi";
import { specialtyApi } from "../../specialty/api/SpecialtyApi";
import { getErrorMessage } from "../../../utils/errorHandler";
import { PAGINATION } from "../../../constants/paginationConstants";

const DEBOUNCE_DELAY = 350;

const DEFAULT_SEARCH_PARAMS = {
  keyword: null,
  specialtyId: null,
  serviceType: null,
  page: PAGINATION.DEFAULT_PAGE,
  size: PAGINATION.DEFAULT_PAGE_SIZE,
  sortBy: "serviceName",
  direction: "asc",
};

export default function useMedicalServiceManagement() {
  const debounceRef = useRef(null);

  const [medicalServices, setMedicalServices] = useState([]);

  const [specialties, setSpecialties] = useState([]);

  const [pageInfo, setPageInfo] = useState({
    page: PAGINATION.DEFAULT_PAGE,
    size: PAGINATION.DEFAULT_PAGE_SIZE,
    totalPages: 0,
    totalElements: 0,
  });

  const [searchParams, setSearchParams] = useState(
    DEFAULT_SEARCH_PARAMS,
  );

  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [specialtyLoading, setSpecialtyLoading] = useState(false);

  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");

  const loadMedicalServices = useCallback(async (params) => {
    try {
      setLoading(true);
      setError("");

      const response = await medicalServiceApi.getPage(params);

      if (!response.success) {
        throw new Error(
          response.message ||
            "Không thể lấy danh sách dịch vụ y tế.",
        );
      }

      const data = response.data;

      setMedicalServices(data?.content || []);

      setPageInfo({
        page:
          data?.page ??
          PAGINATION.DEFAULT_PAGE,

        size:
          data?.size ??
          PAGINATION.DEFAULT_PAGE_SIZE,

        totalPages:
          data?.totalPages ?? 0,

        totalElements:
          data?.totalElements ?? 0,
      });
    } catch (error) {
      setError(
        getErrorMessage(
          error,
          "Không thể tải danh sách dịch vụ y tế.",
        ),
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const loadSpecialties = useCallback(async () => {
    try {
      setSpecialtyLoading(true);

      const response = await specialtyApi.getPage({
        page: PAGINATION.DEFAULT_PAGE,
        size: 1000,
        sortBy: "name",
        direction: "asc",
      });

      if (!response.success) {
        throw new Error(
          response.message ||
            "Không thể lấy danh sách chuyên khoa.",
        );
      }

      setSpecialties(
        response.data?.content || [],
      );
    } catch (error) {
      setError(
        getErrorMessage(
          error,
          "Không thể tải danh sách chuyên khoa.",
        ),
      );
    } finally {
      setSpecialtyLoading(false);
    }
  }, []);


  useEffect(() => {
    const timer = setTimeout(() => {
      loadMedicalServices(DEFAULT_SEARCH_PARAMS);
      loadSpecialties();
    }, 0);

    return () => clearTimeout(timer);
  }, [loadMedicalServices, loadSpecialties]);

  const searchMedicalServices = useCallback(
    ({
      keyword,
      specialtyId,
      serviceType,
    }) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        const nextSearchParams = {
          ...searchParams,

          keyword:
            keyword?.trim() || null,

          specialtyId:
            specialtyId
              ? Number(specialtyId)
              : null,

          serviceType:
            serviceType || null,

          page:
            PAGINATION.DEFAULT_PAGE,

          size:
            PAGINATION.DEFAULT_PAGE_SIZE,
        };

        setSearchParams(nextSearchParams);

        loadMedicalServices(
          nextSearchParams,
        );
      }, DEBOUNCE_DELAY);
    },
    [searchParams, loadMedicalServices],
  );

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(
          debounceRef.current,
        );
      }
    };
  }, []);

  const handlePageChange = useCallback(
    (page) => {
      const nextSearchParams = {
        ...searchParams,
        page,
      };

      setSearchParams(nextSearchParams);

      loadMedicalServices(
        nextSearchParams,
      );
    },
    [searchParams, loadMedicalServices],
  );

  const createMedicalService =
    useCallback(
      async (data) => {
        try {
          setProcessing(true);
          setActionError("");

          const response =
            await medicalServiceApi.create(
              data,
            );

          if (!response.success) {
            throw new Error(
              response.message ||
                "Không thể tạo dịch vụ y tế.",
            );
          }

          await loadMedicalServices(
            searchParams,
          );

          return {
            success: true,
            data: response.data,
          };
        } catch (error) {
          const message =
            getErrorMessage(
              error,
              "Không thể tạo dịch vụ y tế.",
            );

          setActionError(message);

          return {
            success: false,
            message,
          };
        } finally {
          setProcessing(false);
        }
      },
      [searchParams, loadMedicalServices],
    );

  const deleteMedicalService =
    useCallback(
      async (medicalServiceId) => {
        try {
          setProcessing(true);
          setActionError("");

          const response =
            await medicalServiceApi.delete(
              medicalServiceId,
            );

          if (!response.success) {
            throw new Error(
              response.message ||
                "Không thể xóa dịch vụ y tế.",
            );
          }

          await loadMedicalServices(
            searchParams,
          );

          return {
            success: true,
            data: response.data,
          };
        } catch (error) {
          const message =
            getErrorMessage(
              error,
              "Không thể xóa dịch vụ y tế.",
            );

          setActionError(message);

          return {
            success: false,
            message,
          };
        } finally {
          setProcessing(false);
        }
      },
      [searchParams, loadMedicalServices],
    );

  const clearActionError = useCallback(() => {
    setActionError("");
  }, []);

  const retry = useCallback(() => {
    loadMedicalServices(searchParams);
  }, [loadMedicalServices, searchParams]);

  return {
    medicalServices,
    specialties,

    pageInfo,
    searchParams,

    loading,
    processing,
    specialtyLoading,

    error,
    actionError,

    searchMedicalServices,
    handlePageChange,

    createMedicalService,
    deleteMedicalService,

    clearActionError,
    retry,
  };
}