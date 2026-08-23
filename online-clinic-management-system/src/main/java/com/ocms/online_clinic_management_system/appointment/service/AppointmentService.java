package com.ocms.online_clinic_management_system.appointment.service;
import com.ocms.online_clinic_management_system.appointment.dto.request.AppointmentSearchRequest;
import com.ocms.online_clinic_management_system.appointment.dto.request.CreateAppointmentRequest;
import com.ocms.online_clinic_management_system.appointment.dto.request.RejectAppointmentRequest;
import com.ocms.online_clinic_management_system.appointment.dto.response.AppointmentDetailResponse;
import com.ocms.online_clinic_management_system.appointment.dto.response.AppointmentResponse;
import com.ocms.online_clinic_management_system.common.response.PageResponse;
import org.springframework.data.domain.Pageable;

public interface AppointmentService {

    AppointmentResponse create(CreateAppointmentRequest request);
    AppointmentDetailResponse getById(Long appointmentId);
    PageResponse<AppointmentResponse> search(AppointmentSearchRequest request, Pageable pageable);
    AppointmentResponse confirm(Long appointmentId);
    AppointmentResponse reject(Long appointmentId, RejectAppointmentRequest request);
    AppointmentResponse cancel(Long appointmentId);
    PageResponse<AppointmentResponse> getMyAppointments(AppointmentSearchRequest request, Pageable pageable);
}