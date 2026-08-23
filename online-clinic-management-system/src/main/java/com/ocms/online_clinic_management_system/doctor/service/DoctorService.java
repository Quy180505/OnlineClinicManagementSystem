package com.ocms.online_clinic_management_system.doctor.service;
import com.ocms.online_clinic_management_system.common.response.PageResponse;
import org.springframework.data.domain.Pageable;
import com.ocms.online_clinic_management_system.doctor.dto.request.UpdateDoctorRequest;
import com.ocms.online_clinic_management_system.doctor.dto.response.DoctorResponse;
import com.ocms.online_clinic_management_system.doctor.dto.response.DoctorSummaryResponse;
import com.ocms.online_clinic_management_system.doctor.entity.Doctor;
import com.ocms.online_clinic_management_system.user.entity.User;


public interface DoctorService {

    void createDoctor(User user, Long specialtyId, String degree, Integer experienceYears);
    DoctorResponse update(Long doctorId, UpdateDoctorRequest request);
    DoctorResponse findById(Long doctorId);
    Doctor findEntity(Long id);
    PageResponse<DoctorSummaryResponse> getAllDoctors(Pageable pageable);
}