package com.ocms.online_clinic_management_system.specialty.mapper;

import com.ocms.online_clinic_management_system.specialty.dto.request.CreateSpecialtyRequest;
import com.ocms.online_clinic_management_system.specialty.dto.request.UpdateSpecialtyRequest;
import com.ocms.online_clinic_management_system.specialty.dto.response.SpecialtyDetailResponse;
import com.ocms.online_clinic_management_system.specialty.dto.response.SpecialtyResponse;
import com.ocms.online_clinic_management_system.specialty.entity.Specialty;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface SpecialtyMapper {

    SpecialtyResponse toSpecialtyResponse(Specialty specialty);
    SpecialtyDetailResponse toSpecialtyDetailResponse(Specialty specialty);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "doctors", ignore = true)
    @Mapping(target = "medicalServices", ignore = true)
    Specialty toEntity(CreateSpecialtyRequest request);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "doctors", ignore = true)
    @Mapping(target = "medicalServices", ignore = true)
    void updateFromRequest(UpdateSpecialtyRequest request, @MappingTarget Specialty specialty);

}