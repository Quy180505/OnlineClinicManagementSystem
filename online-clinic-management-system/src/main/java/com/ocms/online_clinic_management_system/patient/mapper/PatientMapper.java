package com.ocms.online_clinic_management_system.patient.mapper;

import com.ocms.online_clinic_management_system.patient.dto.request.UpdatePatientRequest;
import com.ocms.online_clinic_management_system.patient.dto.response.PatientDetailResponse;
import com.ocms.online_clinic_management_system.patient.dto.response.PatientResponse;
import com.ocms.online_clinic_management_system.patient.entity.Patient;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface PatientMapper {

    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "fullName", source = "user.fullName")
    PatientResponse toResponse(Patient patient);


    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "username", source = "user.username")
    @Mapping(target = "fullName", source = "user.fullName")
    @Mapping(target = "email", source = "user.email")
    @Mapping(target = "phone", source = "user.phone")
    @Mapping(target = "dateOfBirth", source = "user.dateOfBirth")
    @Mapping(target = "gender", source = "user.gender")
    @Mapping(target = "patientId", source = "id")
    PatientDetailResponse toDetailResponse(Patient patient);


    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    void updatePatientFromRequest(UpdatePatientRequest request, @MappingTarget Patient patient);

    @Condition
    default boolean isNotBlank(String value) {
        return value != null && !value.isBlank();
    }


}