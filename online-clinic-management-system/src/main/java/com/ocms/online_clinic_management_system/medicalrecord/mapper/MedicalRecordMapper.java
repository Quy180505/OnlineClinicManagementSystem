package com.ocms.online_clinic_management_system.medicalrecord.mapper;

import com.ocms.online_clinic_management_system.medicalrecord.dto.request.UpdateMedicalRecordRequest;
import com.ocms.online_clinic_management_system.medicalrecord.dto.response.MedicalRecordResponse;
import com.ocms.online_clinic_management_system.medicalrecord.dto.response.PatientMedicalHistoryDetailResponse;
import com.ocms.online_clinic_management_system.medicalrecord.dto.response.PatientMedicalHistoryResponse;
import com.ocms.online_clinic_management_system.medicalrecord.entity.Disease;
import com.ocms.online_clinic_management_system.medicalrecord.entity.MedicalRecord;
import com.ocms.online_clinic_management_system.medicalrecord.entity.MedicalRecordDisease;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface MedicalRecordMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "appointment", ignore = true)
    @Mapping(target = "patient", ignore = true)
    @Mapping(target = "doctor", ignore = true)
    @Mapping(target = "examinationDate", ignore = true)
    @Mapping(target = "diseases", ignore = true)
    void updateMedicalRecord(UpdateMedicalRecordRequest request, @MappingTarget MedicalRecord medicalRecord);

    @Mapping(target = "appointmentId", source = "appointment.id")
    @Mapping(target = "patientId", source = "patient.id")
    @Mapping(target = "doctorId", source = "doctor.id")
    MedicalRecordResponse toMedicalRecordResponse(MedicalRecord medicalRecord);

    @Mapping(target = "medicalRecordId", source = "id")
    @Mapping(target = "appointmentId", source = "appointment.id")
    @Mapping(target = "examinationDate", source = "examinationDate")
    @Mapping(target = "specialtyName", source = "doctor.specialty.name")
    @Mapping(target = "doctorId", source = "doctor.id")
    @Mapping(target = "doctorName", source = "doctor.user.fullName")
    @Mapping(target = "appointmentStatus", source = "appointment.appointmentStatus.name")
    PatientMedicalHistoryResponse toPatientMedicalHistoryResponse(MedicalRecord medicalRecord);

    List<PatientMedicalHistoryResponse> toPatientMedicalHistoryResponseList(List<MedicalRecord> medicalRecords);

    @Mapping(target = "medicalRecordId", source = "id")
    @Mapping(target = "appointmentId", source = "appointment.id")
    @Mapping(target = "examinationDate", source = "examinationDate")
    @Mapping(target = "specialtyName", source = "doctor.specialty.name")
    @Mapping(target = "doctorId", source = "doctor.id")
    @Mapping(target = "doctorName", source = "doctor.user.fullName")
    @Mapping(target = "appointmentStatus", source = "appointment.appointmentStatus.name")
    @Mapping(target = "symptoms", source = "symptoms")
    @Mapping(target = "examinationResult", source = "examinationResult")
    @Mapping(target = "diagnosis", source = "diagnosis")
    PatientMedicalHistoryDetailResponse toPatientMedicalHistoryDetailResponse(MedicalRecord medicalRecord);

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