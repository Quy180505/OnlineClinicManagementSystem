package com.ocms.online_clinic_management_system.doctor.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DoctorResponse {

    private Long id;

    private Long userId;

    private String fullName;

    private String specialty;

    private String degree;

    private Integer experienceYears;

}