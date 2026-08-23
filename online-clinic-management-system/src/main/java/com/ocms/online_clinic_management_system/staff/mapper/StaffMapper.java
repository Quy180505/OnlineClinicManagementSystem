package com.ocms.online_clinic_management_system.staff.mapper;
import com.ocms.online_clinic_management_system.patient.entity.Patient;
import com.ocms.online_clinic_management_system.staff.dto.request.UpdatePatientInformationRequest;
import com.ocms.online_clinic_management_system.staff.dto.request.UpdateStaffRequest;
import com.ocms.online_clinic_management_system.staff.dto.response.PatientManagementResponse;
import com.ocms.online_clinic_management_system.staff.dto.response.StaffResponse;
import com.ocms.online_clinic_management_system.staff.entity.Staff;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface StaffMapper {

    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "fullName", source = "user.fullName")
    StaffResponse toStaffResponse(Staff staff);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    void updateStaffFromRequest(UpdateStaffRequest request, @MappingTarget Staff staff);

    @Mapping(target = "patientId", source = "id")
    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "fullName", source = "user.fullName")
    @Mapping(target = "phone", source = "user.phone")
    @Mapping(target = "email", source = "user.email")
    @Mapping(target = "dateOfBirth", source = "user.dateOfBirth")
    @Mapping(target = "gender", source = "user.gender")

    @Mapping(target = "citizenId", source = "citizenId")
    @Mapping(target = "address", source = "address")
    @Mapping(target = "bloodType", source = "bloodType")
    @Mapping(target = "allergyInfo", source = "allergyInfo")
    @Mapping(target = "medicalHistory", source = "medicalHistory")
    @Mapping(target = "emergencyContact", source = "emergencyContact")
    PatientManagementResponse toResponse(Patient patient);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "bloodType", ignore = true)
    @Mapping(target = "allergyInfo", ignore = true)
    @Mapping(target = "medicalHistory", ignore = true)
    void updatePatientInformation(UpdatePatientInformationRequest request, @MappingTarget Patient patient);
}