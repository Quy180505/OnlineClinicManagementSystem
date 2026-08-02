package com.ocms.online_clinic_management_system.specialty.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateSpecialtyRequest {

    @NotBlank(message = "Specialty name is required")
    @Size(max = 100)
    private String name;

    @Size(max = 1000)
    private String description;
}