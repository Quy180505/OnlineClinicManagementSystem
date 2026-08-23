package com.ocms.online_clinic_management_system.specialty.dto.response;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public class SpecialtyResponse {

    private Long id;
    private String name;

}