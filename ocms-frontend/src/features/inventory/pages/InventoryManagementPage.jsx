import { useEffect, useState } from "react";
import InventoryTable from "../components/inventory/InventoryTable";
import InventorySearchForm from "../components/inventory/InventorySearchForm";
import InventoryDetailModal from "../components/inventory/InventoryDetailModal";
import ImportMedicineModal from "../components/import/ImportMedicineModal";
import useInventory from "../hooks/useInventory";
import useMedicineSearch from "../hooks/useMedicineSearch";
import useInventoryTransaction from "../hooks/useInventoryTransaction";
import useInventoryStatus from "../hooks/useInventoryStatus";
import Pagination from "../../../components/common/Pagination";
import { PAGINATION } from "../../../constants/paginationConstants";


export default function InventoryManagementPage() {
  const [showImportModal, setShowImportModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const {
    inventories,loading: inventoryLoading,actionLoading: inventoryActionLoading,
    error: inventoryError,page: inventoryPage,totalPages: inventoryTotalPages,
    totalElements: inventoryTotalElements,searchParams,selectedInventory,
    loadInventories,getInventoryDetail,importMedicine,clearError: clearInventoryError,clearSelectedInventory
  } = useInventory();

  const {
    medicines: medicineSearchResults,loading: medicineSearchLoading,searchMedicines,clearSearch
  } = useMedicineSearch();


  const {
    statuses,loading: statusLoading,loadStatuses, error: statusError, clearError: clearStatusError
  } = useInventoryStatus();


  const {
    transactions,loading: transactionLoading,page: transactionPage,
    totalPages: transactionTotalPages,totalElements: transactionTotalElements,
    loadTransactions,clearTransactions
  } = useInventoryTransaction();


  useEffect(() => {
    loadInventories({
      page: PAGINATION.DEFAULT_PAGE,
      size: PAGINATION.DEFAULT_PAGE_SIZE,
    });
  }, [loadInventories]);


  useEffect(() => {
  const timer = setTimeout(() => {
    loadStatuses().catch((error) => {
      console.error("Error occurred while loading inventory statuses.",error);
    });
  }, 0);

  return () => clearTimeout(timer);
}, [loadStatuses]);

  useEffect(() => {
    if (!successMessage) {
      return;
    }

    const timer = setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [successMessage]);

  const handleSearch = (params) => {
    loadInventories({
      ...params,
      page: PAGINATION.DEFAULT_PAGE,
      size: PAGINATION.DEFAULT_PAGE_SIZE,
    });
  };

  const handleInventoryPageChange = (nextPage) => {
    loadInventories({
      ...searchParams,
      page: nextPage,
      size: PAGINATION.DEFAULT_PAGE_SIZE,
    });
  };

  const handleOpenImportModal = () => {
    setSelectedMedicine(null);
    clearSearch();
    setShowImportModal(true);
  };


  const handleCloseImportModal = () => {
    if (inventoryActionLoading) {
      return;
    }

    setShowImportModal(false);
    setSelectedMedicine(null);
    clearSearch();
  };

  const handleSelectMedicine = (medicine) => {
    setSelectedMedicine(medicine);
  };

  const handleClearMedicine = () => {
    setSelectedMedicine(null);
    clearSearch();
  };

  const handleImportMedicine = async (data) => {
    try {
      await importMedicine(data);

      setShowImportModal(false);
      setSelectedMedicine(null);
      clearSearch();
      setSuccessMessage("Nhập thuốc vào kho thành công.");

      await loadInventories({
        ...searchParams,
        page: PAGINATION.DEFAULT_PAGE,
        size: PAGINATION.DEFAULT_PAGE_SIZE,
      });
    } catch (error) {
      console.error("Error occurred while importing medicine.",error);
    }
  };

  const handleViewDetail = async (inventoryId) => {
    try {
      setShowDetailModal(true);

      const inventory =
        await getInventoryDetail(inventoryId);

      clearTransactions();

      await loadTransactions(inventory.id, {
        page: PAGINATION.DEFAULT_PAGE,
        size: PAGINATION.DEFAULT_PAGE_SIZE,
      });
    } catch (error) {
      console.error("Error occurred while loading inventory detail.",error,);

      setShowDetailModal(false);
    }
  };

  const handleCloseDetail = () => {
    setShowDetailModal(false);
    clearSelectedInventory();
    clearTransactions();
  };

  const handleTransactionPageChange = (nextPage) => {
    if (!selectedInventory) {
      return;
    }

    loadTransactions(selectedInventory.id, {
      page: nextPage,
      size: PAGINATION.DEFAULT_PAGE_SIZE,
    });
  };

  return (
    <div className="container-fluid">
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center">

          <div>
            <h4 className="mb-1">
              Quản lý kho thuốc
            </h4>

            <p className="text-muted mb-0">
              Theo dõi tồn kho và quản lý nhập thuốc.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleOpenImportModal}
          >
            <i className="bi bi-box-arrow-in-down me-1" />
            Nhập thuốc
          </button>

        </div>
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

      {inventoryError && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          <i className="bi bi-exclamation-circle me-2" />

          {inventoryError}

          <button
            type="button"
            className="btn-close"
            onClick={clearInventoryError}
          />
        </div>
      )}

      {statusError && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          <i className="bi bi-exclamation-circle me-2" />

          {statusError}

          <button
            type="button"
            className="btn-close"
            onClick={clearStatusError}
          />
        </div>
      )}

      <div className="card border-0 shadow-sm">

        <div className="card-header bg-white">
          <h5 className="mb-0">
            <i className="bi bi-box-seam me-2" />
            Danh sách tồn kho
          </h5>
        </div>

        <div className="card-body">
          <div className="mb-4">
            <InventorySearchForm
              statuses={statuses}
              loading={ inventoryLoading ||statusLoading}
              onSearch={handleSearch}
            />
          </div>

          <InventoryTable
            inventories={inventories}
            loading={inventoryLoading}
            onViewDetail={handleViewDetail}
          />

          <div className="d-flex justify-content-between align-items-center mt-4">

            <small className="text-muted">
              Tổng số: {inventoryTotalElements} lô thuốc
            </small>

            <Pagination
              page={inventoryPage}
              totalPages={inventoryTotalPages}
              onPageChange={handleInventoryPageChange}
            />

          </div>

        </div>
      </div>

      {showImportModal && (
        <ImportMedicineModal
          loading={inventoryActionLoading}
          selectedMedicine={selectedMedicine}
          medicines={medicineSearchResults}
          medicineSearchLoading={ medicineSearchLoading}
          onSearchMedicine={searchMedicines}
          onSelectMedicine={ handleSelectMedicine}
          onClearMedicineSearch={handleClearMedicine}
          onClose={handleCloseImportModal}
          onSubmit={handleImportMedicine}
        />
      )}

      {showDetailModal && (
        <InventoryDetailModal
          inventory={selectedInventory}
          loading={inventoryActionLoading}
          transactions={transactions}
          transactionLoading={ transactionLoading}
          transactionPage={transactionPage}
          transactionTotalPages={transactionTotalPages}
          transactionTotalElements={transactionTotalElements}
          onTransactionPageChange={ handleTransactionPageChange}
          onClose={handleCloseDetail}
        />
      )}

    </div>
  );
}

