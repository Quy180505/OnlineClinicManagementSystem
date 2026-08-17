package com.ocms.online_clinic_management_system.prescription.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PrescriptionDetailRequest {

    @NotNull(message = "Medicine ID is required")
    private Long medicineId;

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be at least 1")
    private Integer quantity;

    @NotBlank(message = "Dosage is required")
    @Size(max = 255, message = "Dosage must not exceed 255 characters")
    private String dosage;

    @Size(max = 2000, message = "Usage instruction must not exceed 2000 characters")
    private String usageInstruction;
}