package com.ocms.online_clinic_management_system.appointment.mapper;

import com.ocms.online_clinic_management_system.appointment.dto.response.AppointmentStatusResponse;
import com.ocms.online_clinic_management_system.appointment.entity.AppointmentStatus;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AppointmentStatusMapper {

    AppointmentStatusResponse toResponse(AppointmentStatus appointmentStatus);
}