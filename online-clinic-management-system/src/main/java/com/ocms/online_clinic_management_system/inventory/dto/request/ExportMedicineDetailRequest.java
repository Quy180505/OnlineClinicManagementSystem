package com.ocms.online_clinic_management_system.inventory.dto.request;

import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
public class ExportMedicineDetailRequest {

    @NotNull
    private Long medicineId;

    @NotNull
    private Long prescriptionDetailId;

    @NotNull
    @Positive
    private Integer quantity;
}