package com.ocms.online_clinic_management_system.staff.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateStaffRequest {

    @NotBlank
    @Size(max = 100)
    private String position;

}