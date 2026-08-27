package com.ocms.online_clinic_management_system.schedule.service;
import com.ocms.online_clinic_management_system.common.response.PageResponse;
import com.ocms.online_clinic_management_system.schedule.dto.request.CreateDoctorScheduleRequest;
import com.ocms.online_clinic_management_system.schedule.dto.request.DoctorScheduleSearchRequest;
import com.ocms.online_clinic_management_system.schedule.dto.request.UpdateDoctorScheduleRequest;
import com.ocms.online_clinic_management_system.schedule.dto.response.DoctorScheduleDetailResponse;
import com.ocms.online_clinic_management_system.schedule.dto.response.DoctorScheduleResponse;
import org.springframework.data.domain.Pageable;

public interface DoctorScheduleService {

    DoctorScheduleDetailResponse create(CreateDoctorScheduleRequest request);
    DoctorScheduleDetailResponse update(Long id, UpdateDoctorScheduleRequest request);
    void delete(Long id);
    DoctorScheduleDetailResponse getById(Long id);
    PageResponse<DoctorScheduleResponse> getAll(DoctorScheduleSearchRequest request, Pageable pageable);
    PageResponse<DoctorScheduleResponse> getFuture(DoctorScheduleSearchRequest request, Pageable pageable);
}