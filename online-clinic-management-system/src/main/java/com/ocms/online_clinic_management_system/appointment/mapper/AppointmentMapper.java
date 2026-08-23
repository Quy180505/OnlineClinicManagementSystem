package com.ocms.online_clinic_management_system.appointment.mapper;
import com.ocms.online_clinic_management_system.appointment.dto.request.CreateAppointmentRequest;
import com.ocms.online_clinic_management_system.appointment.dto.response.AppointmentDetailResponse;
import com.ocms.online_clinic_management_system.appointment.dto.response.AppointmentResponse;
import com.ocms.online_clinic_management_system.appointment.entity.Appointment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AppointmentMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "patient", ignore = true)
    @Mapping(target = "doctor", ignore = true)
    @Mapping(target = "service", ignore = true)
    @Mapping(target = "schedule", ignore = true)
    @Mapping(target = "appointmentStatus", ignore = true)
    @Mapping(target = "medicalRecord", ignore = true)
    Appointment toEntity(CreateAppointmentRequest request);

    @Mapping(target = "appointmentStatus", source = "appointmentStatus.name")
    @Mapping(target = "doctorId", source = "doctor.id")
    @Mapping(target = "doctorName", source = "doctor.user.fullName")
    @Mapping(target = "serviceId", source = "service.id")
    @Mapping(target = "serviceName", source = "service.serviceName")
    @Mapping(target = "appointmentDate",source = "schedule.workDate")
    @Mapping(target = "startTime", source = "schedule.startTime")
    @Mapping(target = "endTime", source = "schedule.endTime")
    AppointmentResponse toResponse(Appointment appointment);

    @Mapping(target = "appointmentStatus", source = "appointmentStatus.name")
    @Mapping(target = "patient.id", source = "patient.id")
    @Mapping(target = "patient.fullName", source = "patient.user.fullName")
    @Mapping(target = "patient.phone",source = "patient.user.phone")
    @Mapping(target = "doctor.id", source = "doctor.id")
    @Mapping(target = "doctor.fullName", source = "doctor.user.fullName")
    @Mapping(target = "service.id", source = "service.id")
    @Mapping(target = "service.name", source = "service.serviceName")
    @Mapping(target = "service.price", source = "service.price")
    @Mapping(target = "schedule.id", source = "schedule.id")
    @Mapping(target = "schedule.date", source = "schedule.workDate")
    @Mapping(target = "schedule.startTime", source = "schedule.startTime")
    @Mapping(target = "schedule.endTime", source = "schedule.endTime")
    @Mapping(target = "invoice", ignore = true)
    AppointmentDetailResponse toDetailResponse(Appointment appointment);

}