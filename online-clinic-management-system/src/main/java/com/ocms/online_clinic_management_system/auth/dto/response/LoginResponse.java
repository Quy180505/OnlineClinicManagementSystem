package com.ocms.online_clinic_management_system.auth.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class LoginResponse {

    private Long userId;

    private String username;

    private String fullName;

    private String role;

    private TokenResponse token;

}