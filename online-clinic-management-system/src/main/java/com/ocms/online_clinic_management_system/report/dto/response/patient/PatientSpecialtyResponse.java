package com.ocms.online_clinic_management_system.report.dto.response.patient;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatientSpecialtyResponse {

    private Long specialtyId;
    private String specialtyName;
    private Long patientCount;
}