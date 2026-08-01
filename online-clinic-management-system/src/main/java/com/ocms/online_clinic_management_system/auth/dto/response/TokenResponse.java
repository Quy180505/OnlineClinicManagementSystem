package com.ocms.online_clinic_management_system.auth.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class TokenResponse {

    private String accessToken;

    private String tokenType;

    private Long expiresIn;

}