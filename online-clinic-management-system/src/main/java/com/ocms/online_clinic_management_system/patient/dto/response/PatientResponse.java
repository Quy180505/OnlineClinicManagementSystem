package com.ocms.online_clinic_management_system.patient.dto.response;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PatientResponse {

    private Long id;
    private Long userId;
    private String fullName;
    private String citizenId;
}