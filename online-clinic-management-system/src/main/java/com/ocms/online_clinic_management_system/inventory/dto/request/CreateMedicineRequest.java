package com.ocms.online_clinic_management_system.inventory.dto.request;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

@Getter
@Setter
public class CreateMedicineRequest {

    @NotBlank(message = "Medicine name is required")
    @Size(max = 150, message = "Medicine name must not exceed 150 characters")
    private String medicineName;
    @NotNull(message = "Medicine category ID is required")
    private Long medicineCategoryId;
    @NotBlank(message = "Unit is required")
    @Size(max = 30, message = "Unit must not exceed 30 characters")
    private String unit;
    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
    private BigDecimal price;

    private String description;
}