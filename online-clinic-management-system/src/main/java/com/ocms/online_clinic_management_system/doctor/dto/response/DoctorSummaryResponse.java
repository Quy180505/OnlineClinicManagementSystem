package com.ocms.online_clinic_management_system.doctor.dto.response;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DoctorSummaryResponse {

    private Long id;
    private String fullName;
    private String specialtyName;
    private String degree;

}