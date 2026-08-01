package com.ocms.online_clinic_management_system.user.dto.response;

import com.ocms.online_clinic_management_system.common.constant.enums.Gender;
import com.ocms.online_clinic_management_system.common.constant.enums.UserStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class UserDetailResponse {

    private Long id;

    private String username;

    private String fullName;

    private String email;

    private String phone;

    private LocalDate dateOfBirth;

    private Gender gender;

    private String role;

    private UserStatus status;

}