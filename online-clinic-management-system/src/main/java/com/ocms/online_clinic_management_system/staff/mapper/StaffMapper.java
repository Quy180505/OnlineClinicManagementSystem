package com.ocms.online_clinic_management_system.staff.mapper;

import com.ocms.online_clinic_management_system.staff.dto.request.UpdateStaffRequest;
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

}