package com.ocms.online_clinic_management_system.inventory.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.validation.constraints.NotNull;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ExportMedicineRequest {

    @NotNull
    private Long prescriptionId;

    @NotEmpty
    @Valid
    private List<ExportMedicineDetailRequest> details;
}