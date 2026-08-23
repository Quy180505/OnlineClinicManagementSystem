package com.ocms.online_clinic_management_system.prescription.dto.request;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class CreatePrescriptionRequest {

    @Size(max = 1000, message = "Note must not exceed 1000 characters")
    private String note;
    @NotEmpty(message = "Prescription details must not be empty")
    @Valid
    private List<PrescriptionDetailRequest> details;
}