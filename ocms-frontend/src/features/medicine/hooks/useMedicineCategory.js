import { useCallback,useEffect,useRef,useState} from "react";
import medicineCategoryApi from "../api/medicineCategoryApi";
import { PAGINATION } from "../../../constants/paginationConstants";

const DEBOUNCE_DELAY = 400;

export default function useMedicineCategory() {

  const debounceRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [searchCategoriesResult, setSearchCategoriesResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(PAGINATION.DEFAULT_PAGE);
  const [size, setSize] = useState(PAGINATION.MEDICINE_CATEGORY_PAGE_SIZE);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const loadCategories = useCallback(
      async (params = {}) => {
        try {
          setLoading(true);
          setError(null);

          const requestParams = {
            page:params.page ?? PAGINATION.DEFAULT_PAGE,
            size:params.size ??PAGINATION.MEDICINE_CATEGORY_PAGE_SIZE,
            sort: "categoryName,asc",
          };

          const response =await medicineCategoryApi.search(requestParams);
          const data = response.data;

          setCategories(data?.content || []);
          setPage( data?.page ?? PAGINATION.DEFAULT_PAGE);
          setSize(data?.size ?? PAGINATION.MEDICINE_CATEGORY_PAGE_SIZE);
          setTotalPages(data?.totalPages ?? 0);
          setTotalElements(data?.totalElements ?? 0);

          return response;
        } catch (err) {
          setError( err.response?.data?.message ||"Không thể tải danh mục thuốc.");
          throw err;
        } finally {
          setLoading(false);
        }
      },
      [],
    );

  const searchCategories = useCallback((keyword) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    const trimmedKeyword =keyword?.trim() || "";

    if ( trimmedKeyword.length <PAGINATION.MEDICINE_CATEGORY_SEARCH_MIN_LENGTH) {
      setSearchCategoriesResult([]);
      setSearchLoading(false);
      return;
    }

    debounceRef.current = setTimeout(
      async () => {
        try {
          setSearchLoading(true);
          setError(null);

          const response =
            await medicineCategoryApi.search({
              categoryName: trimmedKeyword,
              page: PAGINATION.DEFAULT_PAGE,
              size:PAGINATION.MEDICINE_CATEGORY_SEARCH_SIZE,
              sort: "categoryName,asc"
            });

          setSearchCategoriesResult(response.data?.content || []);
        } catch (err) {
          setError(err.response?.data?.message || "Không thể tìm kiếm danh mục thuốc.");

          setSearchCategoriesResult([]);
        } finally {
          setSearchLoading(false);
        }
      },
      DEBOUNCE_DELAY,
    );
  }, []);

  const clearCategorySearch = useCallback(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    setSearchCategoriesResult([]);
    setSearchLoading(false);
  }, []);


  const getCategoryDetail = useCallback(
    async (categoryId) => {
      try {
        setActionLoading(true);
        setError(null);

        const response =await medicineCategoryApi.getById(categoryId,);

        setSelectedCategory(response.data);

        return response.data;
      } catch (err) {
        setError(err.response?.data?.message ||"Không thể tải thông tin danh mục.",);

        throw err;
      } finally {
        setActionLoading(false);
      }
    },
    [],
  );


  const createCategory = useCallback(
    async (data) => {
      try {
        setActionLoading(true);
        setError(null);

        const response = await medicineCategoryApi.create(data);

        return response.data;
      } catch (err) {
        setError(err.response?.data?.message ||"Không thể thêm danh mục.");

        throw err;
      } finally {
        setActionLoading(false);
      }
    },
    [],
  );


  const updateCategory = useCallback(
    async (categoryId, data) => {
      try {
        setActionLoading(true);
        setError(null);

        const response = await medicineCategoryApi.update(categoryId,data);

        return response.data;
      } catch (err) {
        setError(err.response?.data?.message ||"Không thể cập nhật danh mục.");
        throw err;
      } finally {
        setActionLoading(false);
      }
    },
    [],
  );

  const deleteCategory = useCallback(
    async (categoryId) => {
      try {
        setActionLoading(true);
        setError(null);

        const response =await medicineCategoryApi.delete(categoryId,);

        return response.data;
      } catch (err) {

        setError(err.response?.data?.message ||"Không thể xóa danh mục.",);
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

  const clearSelectedCategory = useCallback(() => {
    setSelectedCategory(null);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return {
    categories,searchCategoriesResult,loading,searchLoading,actionLoading,error,page,
    size,totalPages,totalElements,selectedCategory,
    loadCategories,searchCategories,clearCategorySearch,
    getCategoryDetail,createCategory,updateCategory,deleteCategory,
    setPage,setSize,clearError,clearSelectedCategory,
  };
}