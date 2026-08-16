package com.ocms.online_clinic_management_system.inventory.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Builder
public class MedicineDetailResponse {

    private Long id;
    private String medicineName;
    private Long medicineCategoryId;
    private String medicineCategoryName;
    private String unit;
    private BigDecimal price;
    private String description;
}