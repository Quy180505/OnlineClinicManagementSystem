package com.ocms.online_clinic_management_system.inventory.dto.request;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ImportMedicineRequest {

    @NotNull(message = "Medicine ID is required")
    private Long medicineId;

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be greater than 0")
    private Integer quantity;

    @NotNull(message = "Import date is required")
    private LocalDate importDate;

    @NotNull(message = "Expire date is required")
    @Future(message = "Expire date must be in the future")
    private LocalDate expireDate;

    private String note;
}