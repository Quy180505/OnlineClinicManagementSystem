package com.ocms.online_clinic_management_system.patient.dto.request;

import com.ocms.online_clinic_management_system.common.constant.enums.Gender;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateAccountRequest {

    @Size(min = 4, max = 50)
    private String username;

    @Size(min = 8, max = 100)
    private String newPassword;

    @Size(min = 8, max = 100)
    private String confirmPassword;

    private Gender gender;

}