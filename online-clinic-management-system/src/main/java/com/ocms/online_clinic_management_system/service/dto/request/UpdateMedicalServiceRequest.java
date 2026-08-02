package com.ocms.online_clinic_management_system.service.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class UpdateMedicalServiceRequest {

    @NotNull
    private Long specialtyId;

    @NotBlank
    @Size(max = 150)
    private String serviceName;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal price;

    @Size(max = 2000)
    private String description;

}