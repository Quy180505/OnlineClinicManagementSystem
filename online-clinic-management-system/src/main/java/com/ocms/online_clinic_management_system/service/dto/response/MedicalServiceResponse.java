package com.ocms.online_clinic_management_system.service.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class MedicalServiceResponse {

    private Long id;

    private String serviceName;

    private BigDecimal price;

    private String specialtyName;

}