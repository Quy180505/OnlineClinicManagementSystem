package com.ocms.online_clinic_management_system.user.dto.response;

import com.ocms.online_clinic_management_system.common.constant.enums.UserStatus;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserResponse {

    private Long id;

    private String username;

    private String fullName;

    private String email;

    private String phone;

    private String role;

    private UserStatus status;

}