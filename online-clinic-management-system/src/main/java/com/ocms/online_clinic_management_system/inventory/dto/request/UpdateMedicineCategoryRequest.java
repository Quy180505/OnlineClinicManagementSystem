package com.ocms.online_clinic_management_system.inventory.dto.request;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateMedicineCategoryRequest {

    @Size(max = 100, message = "Category name must not exceed 100 characters")
    private String categoryName;

    private String description;
}