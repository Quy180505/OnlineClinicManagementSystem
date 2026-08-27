package com.ocms.online_clinic_management_system.appointment.service;
import com.ocms.online_clinic_management_system.appointment.dto.response.AppointmentStatusResponse;
import java.util.List;

public interface AppointmentStatusService {

    List<AppointmentStatusResponse> getAll();
}
