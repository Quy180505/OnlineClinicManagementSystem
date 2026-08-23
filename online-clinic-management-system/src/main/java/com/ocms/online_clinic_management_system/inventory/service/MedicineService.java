package com.ocms.online_clinic_management_system.inventory.service;
import com.ocms.online_clinic_management_system.common.response.PageResponse;
import com.ocms.online_clinic_management_system.inventory.dto.request.CreateMedicineRequest;
import com.ocms.online_clinic_management_system.inventory.dto.request.MedicineSearchRequest;
import com.ocms.online_clinic_management_system.inventory.dto.request.UpdateMedicineRequest;
import com.ocms.online_clinic_management_system.inventory.dto.response.MedicineDetailResponse;
import com.ocms.online_clinic_management_system.inventory.dto.response.MedicineResponse;
import org.springframework.data.domain.Pageable;

public interface MedicineService {

    MedicineResponse create(CreateMedicineRequest request);
    MedicineResponse update(Long medicineId, UpdateMedicineRequest request);
    MedicineDetailResponse getById(Long medicineId);
    PageResponse<MedicineResponse> search(MedicineSearchRequest request, Pageable pageable);
    void delete(Long medicineId);
    void restore(Long medicineId);
}