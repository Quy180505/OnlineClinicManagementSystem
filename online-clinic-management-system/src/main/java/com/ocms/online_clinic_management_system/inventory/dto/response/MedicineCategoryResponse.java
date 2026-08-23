package com.ocms.online_clinic_management_system.inventory.dto.response;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MedicineCategoryResponse {

    private Long id;
    private String categoryName;
    private String description;
}