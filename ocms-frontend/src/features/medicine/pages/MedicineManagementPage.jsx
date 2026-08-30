import { useEffect, useState } from "react";
import MedicineTable from "../components/MedicineTable";
import MedicineSearchForm from "../components/MedicineSearchForm";
import MedicineDetailModal from "../components/MedicineDetailModal";
import MedicineFormModal from "../components/MedicineFormModal";
import MedicineCategoryTable from "../components/MedicineCategoryTable";
import MedicineCategoryFormModal from "../components/MedicineCategoryFormModal";
import MedicineCategoryDetailModal from "../components/MedicineCategoryDetailModal";
import useMedicine from "../hooks/useMedicine";
import useMedicineCategory from "../hooks/useMedicineCategory";
import Pagination from "../../../components/common/Pagination";
import { PAGINATION } from "../../../constants/paginationConstants";

export default function MedicineManagementPage() {
  const [activeTab, setActiveTab] = useState("medicine");
  const [showMedicineDetail, setShowMedicineDetail] = useState(false);
  const [showMedicineForm, setShowMedicineForm] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [showCategoryDetail, setShowCategoryDetail] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const {
    medicines,loading: medicineLoading,actionLoading: medicineActionLoading,
    error: medicineError,page: medicinePage, totalPages: medicineTotalPages,
    totalElements: medicineTotalElements,searchParams,selectedMedicine,
    loadMedicines,getMedicineDetail,createMedicine,updateMedicine,
    deleteMedicine,clearError: clearMedicineError,clearSelectedMedicine,
  } = useMedicine();

  const {
    categories,loading: categoryLoading,actionLoading: categoryActionLoading, 
    error: categoryError,page: categoryPage,
    totalPages: categoryTotalPages,totalElements: categoryTotalElements,
    selectedCategory,searchCategoriesResult,searchLoading,
    loadCategories,searchCategories,clearCategorySearch,getCategoryDetail,
    createCategory,updateCategory,deleteCategory,clearError: clearCategoryError,clearSelectedCategory
  } = useMedicineCategory();

  useEffect(() => {
    if (!successMessage) {
      return;
    }

    const timer = setTimeout(() => {setSuccessMessage("")}, 2000);

    return () => clearTimeout(timer);
  }, [successMessage]);

  useEffect(() => {
    loadMedicines({
      page: PAGINATION.DEFAULT_PAGE,
      size: PAGINATION.MEDICINE_PAGE_SIZE,
    });

    loadCategories({
      page: PAGINATION.DEFAULT_PAGE,
      size: PAGINATION.MEDICINE_CATEGORY_PAGE_SIZE,
    });
  }, [loadMedicines, loadCategories]);

  const handleSearchMedicine = (params) => {
    loadMedicines({
      ...params,
      page: PAGINATION.DEFAULT_PAGE,
      size: PAGINATION.MEDICINE_PAGE_SIZE,
    });
  };

  const handleMedicinePageChange = (nextPage) => {
    loadMedicines({
      page: nextPage,
      size: PAGINATION.MEDICINE_PAGE_SIZE,
    });
  };

  const handleViewMedicineDetail = async (medicineId) => {
    setShowMedicineDetail(true);
    await getMedicineDetail(medicineId);
  };

  const handleCloseMedicineDetail = () => {
    setShowMedicineDetail(false);
    clearSelectedMedicine();
  };

  const handleOpenCreateMedicine = () => {
    setEditingMedicine(null);
    setShowMedicineForm(true);
  };

  const handleOpenEditMedicine = (medicine) => {
    setEditingMedicine(medicine);
    setShowMedicineForm(true);
  };

  const handleCloseMedicineForm = () => {
    if (medicineActionLoading) {
      return;
    }

    setShowMedicineForm(false);
    setEditingMedicine(null);
  };

  const handleSubmitMedicine = async (data) => {
    try {
      if (editingMedicine) {
        await updateMedicine(editingMedicine.id, data);

        setSuccessMessage("Cập nhật thuốc thành công.");
      } else {
        await createMedicine(data);

        setSuccessMessage("Thêm thuốc thành công.");
      }

      setShowMedicineForm(false);
      setEditingMedicine(null);

      await loadMedicines();
    } catch {
      console.error("Error occurred while submitting medicine form.");
    }
  };

  const handleDeleteMedicine = async (medicine) => {
    const confirmed = window.confirm(
      `Bạn có chắc muốn ngừng sử dụng thuốc "${medicine.medicineName}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteMedicine(medicine.id);

      setSuccessMessage("Ngừng sử dụng thuốc thành công.");

      await loadMedicines();
    } catch {
      console.error("Error occurred while deleting medicine.");
    }
  };
  const handleViewCategoryDetail = async (categoryId) => {
    setShowCategoryDetail(true);
    await getCategoryDetail(categoryId);
  };

  const handleCloseCategoryDetail = () => {
    setShowCategoryDetail(false);
    clearSelectedCategory();
  };

  const handleOpenCreateCategory = () => {
    setEditingCategory(null);
    setShowCategoryForm(true);
  };

  const handleOpenEditCategory = (category) => {
    setEditingCategory(category);
    setShowCategoryForm(true);
  };

  const handleCloseCategoryForm = () => {
    if (categoryActionLoading) {
      return;
    }

    setShowCategoryForm(false);
    setEditingCategory(null);
  };

  const handleSubmitCategory = async (data) => {
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, data);

        setSuccessMessage("Cập nhật danh mục thành công.");
      } else {
        await createCategory(data);

        setSuccessMessage("Thêm danh mục thành công.");
      }

      setShowCategoryForm(false);
      setEditingCategory(null);

      await loadCategories();
    } catch {
      console.error("Error occurred while submitting category form.");
    }
  };

  const handleDeleteCategory = async (category) => {
    const confirmed = window.confirm(
      `Bạn có chắc muốn xóa danh mục "${category.categoryName}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteCategory(category.id);

      setSuccessMessage("Xóa danh mục thành công.");

      await loadCategories();
    } catch {
      console.error("Error occurred while deleting category.");
    }
  };
  const handleCategoryPageChange = (nextPage) => {
    loadCategories({
      page: nextPage,
      size: PAGINATION.MEDICINE_CATEGORY_PAGE_SIZE,
    });
  };

  const error = activeTab === "medicine" ? medicineError : categoryError;

  const clearError =
    activeTab === "medicine" ? clearMedicineError : clearCategoryError;

  return (
    <div className="container-fluid">
      <div className="mb-4">
        <h4 className="mb-1">Quản lý thuốc</h4>

        <p className="text-muted mb-0">Quản lý danh mục thuốc và giá bán.</p>
      </div>

      {successMessage && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <i className="bi bi-check-circle me-2" />
          {successMessage}

          <button
            type="button"
            className="btn-close"
            onClick={() => setSuccessMessage("")}
          />
        </div>
      )}
      {error && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {error}

          <button type="button" className="btn-close" onClick={clearError} />
        </div>
      )}

      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white border-0">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <button
                type="button"
                className={`nav-link ${
                  activeTab === "medicine" ? "active" : ""
                }`}
                onClick={() => setActiveTab("medicine")}
              >
                <i className="bi bi-capsule me-1" />
                Thuốc
              </button>
            </li>

            <li className="nav-item">
              <button
                type="button"
                className={`nav-link ${
                  activeTab === "category" ? "active" : ""
                }`}
                onClick={() => setActiveTab("category")}
              >
                <i className="bi bi-tags me-1" />
                Danh mục thuốc
              </button>
            </li>
          </ul>
        </div>

        <div className="card-body">
          {activeTab === "medicine" ? (
            <>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">Danh sách thuốc</h5>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleOpenCreateMedicine}
                >
                  <i className="bi bi-plus-lg me-1" />
                  Thêm thuốc
                </button>
              </div>

              <div className="mb-4">
                <MedicineSearchForm
                  searchParams={searchParams}
                  categories={categories}
                  onSearch={handleSearchMedicine}
                />
              </div>

              <MedicineTable
                medicines={medicines}
                loading={medicineLoading}
                onViewDetail={handleViewMedicineDetail}
                onEdit={handleOpenEditMedicine}
                onDelete={handleDeleteMedicine}
              />

              <div className="d-flex justify-content-between align-items-center mt-4">
                <small className="text-muted">
                  Tổng số: {medicineTotalElements} thuốc
                </small>

                <Pagination
                  page={medicinePage}
                  totalPages={medicineTotalPages}
                  onPageChange={handleMedicinePageChange}
                />
              </div>
            </>
          ) : (
            <>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">Danh mục thuốc</h5>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleOpenCreateCategory}
                >
                  <i className="bi bi-plus-lg me-1" />
                  Thêm danh mục
                </button>
              </div>

              <MedicineCategoryTable
                categories={categories}
                loading={categoryLoading}
                onViewDetail={handleViewCategoryDetail}
                onEdit={handleOpenEditCategory}
                onDelete={handleDeleteCategory}
              />

              <div className="d-flex justify-content-between align-items-center mt-4">
                <small className="text-muted">
                  Tổng số: {categoryTotalElements} danh mục
                </small>

                <Pagination
                  page={categoryPage}
                  totalPages={categoryTotalPages}
                  onPageChange={handleCategoryPageChange}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {showMedicineDetail && (
        <MedicineDetailModal
          medicine={selectedMedicine}
          loading={medicineActionLoading}
          onClose={handleCloseMedicineDetail}
        />
      )}

      {showMedicineForm && (
        <MedicineFormModal
          medicine={editingMedicine}
          searchCategories={searchCategories}
          searchCategoriesResult={searchCategoriesResult}
          searchLoading={searchLoading}
          clearCategorySearch={clearCategorySearch}
          loading={medicineActionLoading}
          onClose={handleCloseMedicineForm}
          onSubmit={handleSubmitMedicine}
        />
      )}

      {showCategoryDetail && (
        <MedicineCategoryDetailModal
          category={selectedCategory}
          loading={categoryActionLoading}
          onClose={handleCloseCategoryDetail}
        />
      )}

      {showCategoryForm && (
        <MedicineCategoryFormModal
          category={editingCategory}
          loading={categoryActionLoading}
          onClose={handleCloseCategoryForm}
          onSubmit={handleSubmitCategory}
        />
      )}
    </div>
  );
}
