package com.ocms.online_clinic_management_system.medicalrecord.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateMedicalRecordRequest {

    @NotBlank(message = "Symptoms must not be blank")
    @Size(max = 5000, message = "Symptoms must not exceed 5000 characters")
    private String symptoms;

    @NotBlank(message = "Examination result must not be blank")
    @Size(max = 5000, message = "Examination result must not exceed 5000 characters")
    private String examinationResult;

    @NotBlank(message = "Diagnosis must not be blank")
    @Size(max = 2000, message = "Diagnosis must not exceed 2000 characters")
    private String diagnosis;
}