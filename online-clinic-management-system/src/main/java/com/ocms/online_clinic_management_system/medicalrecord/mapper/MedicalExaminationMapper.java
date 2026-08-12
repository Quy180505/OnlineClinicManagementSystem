package com.ocms.online_clinic_management_system.medicalrecord.mapper;

import com.ocms.online_clinic_management_system.appointment.entity.Appointment;
import com.ocms.online_clinic_management_system.medicalrecord.dto.response.MedicalExaminationResponse;
import com.ocms.online_clinic_management_system.medicalrecord.dto.response.TodayAppointmentResponse;
import com.ocms.online_clinic_management_system.medicalrecord.dto.response.TreatmentHistoryResponse;
import com.ocms.online_clinic_management_system.medicalrecord.entity.Disease;
import com.ocms.online_clinic_management_system.medicalrecord.entity.MedicalRecord;
import com.ocms.online_clinic_management_system.medicalrecord.entity.MedicalRecordDisease;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MedicalExaminationMapper {

    @Mapping(target = "appointmentId", source = "id")
    @Mapping(target = "patientId", source = "patient.id")
    @Mapping(target = "patientName", source = "patient.user.fullName")
    @Mapping(target = "patientPhone", source = "patient.user.phone")
    @Mapping(target = "serviceId", source = "service.id")
    @Mapping(target = "serviceName", source = "service.serviceName")
    @Mapping(target = "workDate", source = "schedule.workDate")
    @Mapping(target = "startTime", source = "schedule.startTime")
    @Mapping(target = "endTime", source = "schedule.endTime")
    @Mapping(target = "appointmentStatus", source = "appointmentStatus.name")
    TodayAppointmentResponse toTodayAppointmentResponse(Appointment appointment);

    List<TodayAppointmentResponse> toTodayAppointmentResponseList(List<Appointment> appointments);



    @Mapping(target = "appointmentId", source = "id")
    @Mapping(target = "patientId", source = "patient.id")
    @Mapping(target = "patientName", source = "patient.user.fullName")
    @Mapping(target = "serviceName", source = "service.serviceName")
    @Mapping(target = "appointmentDate", source = "schedule.workDate")
    @Mapping(target = "startTime", source = "schedule.startTime")
    @Mapping(target = "endTime", source = "schedule.endTime")
    @Mapping(target = "appointmentStatus", source = "appointmentStatus.name")
    MedicalExaminationResponse toMedicalExaminationResponse(Appointment appointment);

    @Mapping(target = "medicalRecordId", source = "id")
    @Mapping(target = "appointmentId", source = "appointment.id")
    @Mapping(target = "doctorId", source = "doctor.id")
    @Mapping(target = "doctorName", source = "doctor.user.fullName")
    @Mapping(target = "examinationDate", source = "examinationDate")
    @Mapping(target = "symptoms", source = "symptoms")
    @Mapping(target = "examinationResult", source = "examinationResult")
    @Mapping(target = "diagnosis", source = "diagnosis")
    @Mapping(target = "diseases", source = "diseases")
    TreatmentHistoryResponse toTreatmentHistoryResponse(MedicalRecord medicalRecord);

    List<TreatmentHistoryResponse> toTreatmentHistoryResponseList(List<MedicalRecord> medicalRecords);


    default List<String> mapDiseases(List<MedicalRecordDisease> diseases) {
        if (diseases == null) {
            return List.of();
        }

        return diseases.stream()
                .map(MedicalRecordDisease::getDisease)
                .map(Disease::getDiseaseName)
                .toList();
    }
}