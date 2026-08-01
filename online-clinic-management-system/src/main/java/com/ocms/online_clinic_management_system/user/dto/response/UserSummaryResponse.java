package com.ocms.online_clinic_management_system.user.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserSummaryResponse {

    private Long id;

    private String username;

    private String fullName;

    private String role;

}
