package com.ocms.online_clinic_management_system.inventory.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class UpdateMedicineRequest {

    @Size(max = 150, message = "Medicine name must not exceed 150 characters")
    private String medicineName;

    @Positive(message = "Medicine category ID must be greater than 0")
    private Long medicineCategoryId;

    @Size(max = 30, message = "Unit must not exceed 30 characters")
    private String unit;

    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
    private BigDecimal price;

    private String description;
}