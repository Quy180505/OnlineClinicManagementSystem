package com.ocms.online_clinic_management_system.inventory.dto.request;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MedicineSearchRequest {

    private String medicineName;
    private Long medicineCategoryId;
}