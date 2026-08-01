package com.ocms.online_clinic_management_system.user.mapper;

import com.ocms.online_clinic_management_system.user.dto.request.UpdateUserRequest;
import com.ocms.online_clinic_management_system.user.dto.response.UserDetailResponse;
import com.ocms.online_clinic_management_system.user.dto.response.UserResponse;
import com.ocms.online_clinic_management_system.user.dto.response.UserSummaryResponse;
import com.ocms.online_clinic_management_system.user.entity.User;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "role", source = "role.roleName")
    UserResponse toUserResponse(User user);

    @Mapping(target = "role", source = "role.roleName")
    UserDetailResponse toUserDetailResponse(User user);

    @Mapping(target = "role", source = "role.roleName")
    UserSummaryResponse toUserSummaryResponse(User user);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateUserFromRequest(UpdateUserRequest request, @MappingTarget User user);

}