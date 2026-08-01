package com.ocms.online_clinic_management_system.user.dto.request;

import com.ocms.online_clinic_management_system.common.constant.enums.UserStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateUserStatusRequest {

    @NotNull
    private UserStatus status;

}