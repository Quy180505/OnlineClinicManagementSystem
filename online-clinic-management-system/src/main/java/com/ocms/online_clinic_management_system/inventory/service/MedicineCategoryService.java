package com.ocms.online_clinic_management_system.inventory.service;
import com.ocms.online_clinic_management_system.common.response.PageResponse;
import com.ocms.online_clinic_management_system.inventory.dto.request.CreateMedicineCategoryRequest;
import com.ocms.online_clinic_management_system.inventory.dto.request.UpdateMedicineCategoryRequest;
import com.ocms.online_clinic_management_system.inventory.dto.response.MedicineCategoryResponse;
import org.springframework.data.domain.Pageable;

public interface MedicineCategoryService {

    MedicineCategoryResponse create(CreateMedicineCategoryRequest request);
    MedicineCategoryResponse update(Long categoryId, UpdateMedicineCategoryRequest request);
    MedicineCategoryResponse getById(Long categoryId);
    PageResponse<MedicineCategoryResponse> search(Pageable pageable);
    void delete(Long categoryId);
}