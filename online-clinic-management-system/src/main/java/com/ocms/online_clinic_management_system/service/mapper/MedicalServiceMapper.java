package com.ocms.online_clinic_management_system.service.mapper;
import com.ocms.online_clinic_management_system.service.dto.request.CreateMedicalServiceRequest;
import com.ocms.online_clinic_management_system.service.dto.request.PatchMedicalServiceRequest;
import com.ocms.online_clinic_management_system.service.dto.request.UpdateMedicalServiceRequest;
import com.ocms.online_clinic_management_system.service.dto.response.MedicalServiceDetailResponse;
import com.ocms.online_clinic_management_system.service.dto.response.MedicalServiceResponse;
import com.ocms.online_clinic_management_system.service.entity.MedicalService;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface MedicalServiceMapper {

    @Mapping(target = "specialty", ignore = true)
    MedicalService toEntity(CreateMedicalServiceRequest request);

    @Mapping(source = "specialty.name", target = "specialtyName")
    MedicalServiceResponse toResponse(MedicalService medicalService);

    @Mapping(source = "specialty.id", target = "specialtyId")
    @Mapping(source = "specialty.name", target = "specialtyName")
    MedicalServiceDetailResponse toDetailResponse(MedicalService medicalService);

    @Mapping(target = "specialty", ignore = true)
    void updateEntity(UpdateMedicalServiceRequest request, @MappingTarget MedicalService medicalService);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "specialty", ignore = true)
    void patchEntity(PatchMedicalServiceRequest request, @MappingTarget MedicalService medicalService);



}