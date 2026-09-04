package com.ocms.online_clinic_management_system.report.dto.response.patient;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatientGenderResponse {

    private String gender;
    private Long patientCount;
}