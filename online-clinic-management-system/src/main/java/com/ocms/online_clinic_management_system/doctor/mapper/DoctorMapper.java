package com.ocms.online_clinic_management_system.doctor.mapper;
import com.ocms.online_clinic_management_system.doctor.dto.request.UpdateDoctorRequest;
import com.ocms.online_clinic_management_system.doctor.dto.response.DoctorResponse;
import com.ocms.online_clinic_management_system.doctor.dto.response.DoctorSummaryResponse;
import com.ocms.online_clinic_management_system.doctor.entity.Doctor;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface DoctorMapper {

    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "fullName", source = "user.fullName")
    @Mapping(target = "specialty", source = "specialty.name")
    DoctorResponse toDoctorResponse(Doctor doctor);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "specialty", ignore = true)
    void updateDoctorFromRequest(UpdateDoctorRequest request, @MappingTarget Doctor doctor);

    @Mapping(target = "fullName", source = "user.fullName")
    @Mapping(target = "specialtyName", source = "specialty.name")
    DoctorSummaryResponse toSummaryResponse(Doctor doctor);
}