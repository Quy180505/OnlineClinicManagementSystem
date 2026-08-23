package com.ocms.online_clinic_management_system.inventory.mapper;
import com.ocms.online_clinic_management_system.inventory.dto.request.CreateMedicineCategoryRequest;
import com.ocms.online_clinic_management_system.inventory.dto.request.UpdateMedicineCategoryRequest;
import com.ocms.online_clinic_management_system.inventory.dto.response.MedicineCategoryResponse;
import com.ocms.online_clinic_management_system.inventory.entity.MedicineCategory;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface MedicineCategoryMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "medicines", ignore = true)
    MedicineCategory toEntity(CreateMedicineCategoryRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "medicines", ignore = true)
    void updateEntity(UpdateMedicineCategoryRequest request, @MappingTarget MedicineCategory medicineCategory);

    MedicineCategoryResponse toResponse(MedicineCategory medicineCategory);
}