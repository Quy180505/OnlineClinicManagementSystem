package com.ocms.online_clinic_management_system.specialty.service;

import com.ocms.online_clinic_management_system.common.response.PageResponse;
import com.ocms.online_clinic_management_system.specialty.dto.request.CreateSpecialtyRequest;
import com.ocms.online_clinic_management_system.specialty.dto.request.UpdateSpecialtyRequest;
import com.ocms.online_clinic_management_system.specialty.dto.response.SpecialtyDetailResponse;
import com.ocms.online_clinic_management_system.specialty.dto.response.SpecialtyResponse;

import java.util.List;

public interface SpecialtyService {

    SpecialtyResponse create(CreateSpecialtyRequest request);

    SpecialtyResponse update(Long specialtyId, UpdateSpecialtyRequest request);

    void delete(Long specialtyId);

    SpecialtyDetailResponse getById(Long specialtyId);

    PageResponse<SpecialtyResponse> getAll(String keyword, int page, int size, String sortBy, String direction);

    List<SpecialtyResponse> getAll();

    SpecialtyResponse partialUpdate(Long specialtyId, UpdateSpecialtyRequest request);
}