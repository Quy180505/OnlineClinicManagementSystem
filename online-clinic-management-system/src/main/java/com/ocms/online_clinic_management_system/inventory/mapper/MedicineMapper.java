package com.ocms.online_clinic_management_system.inventory.mapper;
import com.ocms.online_clinic_management_system.inventory.dto.request.CreateMedicineRequest;
import com.ocms.online_clinic_management_system.inventory.dto.request.UpdateMedicineRequest;
import com.ocms.online_clinic_management_system.inventory.dto.response.MedicineDetailResponse;
import com.ocms.online_clinic_management_system.inventory.dto.response.MedicineResponse;
import com.ocms.online_clinic_management_system.inventory.entity.Medicine;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface MedicineMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "medicineCategory", ignore = true)
    Medicine toEntity(CreateMedicineRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "medicineCategory", ignore = true)
    void updateEntity(UpdateMedicineRequest request, @MappingTarget Medicine medicine);

    @Mapping(target = "medicineCategoryId", source = "medicineCategory.id")
    @Mapping(target = "medicineCategoryName", source = "medicineCategory.categoryName")
    MedicineResponse toResponse(Medicine medicine);

    @Mapping(target = "medicineCategoryId", source = "medicineCategory.id")
    @Mapping(target = "medicineCategoryName", source = "medicineCategory.categoryName")
    MedicineDetailResponse toDetailResponse(Medicine medicine);
}