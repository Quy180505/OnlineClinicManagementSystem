package com.ocms.online_clinic_management_system.specialty.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SpecialtyResponse {

    private Long id;

    private String name;

    private String description;

}