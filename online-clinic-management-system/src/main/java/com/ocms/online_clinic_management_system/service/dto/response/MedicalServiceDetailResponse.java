package com.ocms.online_clinic_management_system.service.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class MedicalServiceDetailResponse {

    private Long id;

    private Long specialtyId;

    private String specialtyName;

    private String serviceName;

    private BigDecimal price;

    private String description;

}