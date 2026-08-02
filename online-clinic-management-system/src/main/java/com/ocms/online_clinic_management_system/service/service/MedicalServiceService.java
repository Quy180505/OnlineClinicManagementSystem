package com.ocms.online_clinic_management_system.service.service;

import com.ocms.online_clinic_management_system.common.response.PageResponse;
import com.ocms.online_clinic_management_system.service.dto.request.CreateMedicalServiceRequest;
import com.ocms.online_clinic_management_system.service.dto.request.PatchMedicalServiceRequest;
import com.ocms.online_clinic_management_system.service.dto.request.UpdateMedicalServiceRequest;
import com.ocms.online_clinic_management_system.service.dto.response.MedicalServiceDetailResponse;
import com.ocms.online_clinic_management_system.service.dto.response.MedicalServiceResponse;

import java.util.List;

public interface MedicalServiceService {

    MedicalServiceResponse create(CreateMedicalServiceRequest request);

    MedicalServiceResponse update(Long medicalServiceId, UpdateMedicalServiceRequest request);

    void delete(Long medicalServiceId);

    MedicalServiceDetailResponse getById(Long medicalServiceId);

    PageResponse<MedicalServiceResponse> getAll(String keyword, Long specialtyId, int page, int size, String sortBy, String direction);

    List<MedicalServiceResponse> getBySpecialty(Long specialtyId);

    MedicalServiceResponse partialUpdate(Long medicalServiceId, PatchMedicalServiceRequest request);
}