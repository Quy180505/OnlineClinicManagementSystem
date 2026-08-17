package com.ocms.online_clinic_management_system.prescription.mapper;

import com.ocms.online_clinic_management_system.prescription.dto.request.PrescriptionDetailRequest;
import com.ocms.online_clinic_management_system.prescription.dto.response.PrescriptionDetailResponse;
import com.ocms.online_clinic_management_system.prescription.dto.response.PrescriptionPatientResponse;
import com.ocms.online_clinic_management_system.prescription.dto.response.PrescriptionResponse;
import com.ocms.online_clinic_management_system.prescription.entity.Prescription;
import com.ocms.online_clinic_management_system.prescription.entity.PrescriptionDetail;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.math.BigDecimal;

@Mapper(componentModel = "spring")
public interface PrescriptionMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "prescription", ignore = true)
    @Mapping(target = "medicine", ignore = true)
    @Mapping(target = "unitPrice", ignore = true)
    PrescriptionDetail toDetailEntity(PrescriptionDetailRequest request);

    @Mapping(target = "id", source = "id")
    @Mapping(target = "medicalRecordId", source = "medicalRecord.id")
    @Mapping(target = "doctorId", source = "doctor.id")
    @Mapping(target = "doctorName", source ="doctor.user.fullName")
    @Mapping(target = "details", source = "details")
    PrescriptionResponse toResponse(Prescription prescription);

    @Mapping(target = "id", source = "id")
    @Mapping(target = "medicineId", source = "medicine.id")
    @Mapping(target = "medicineName", source = "medicine.medicineName")
    @Mapping(target = "quantity", source = "quantity")
    @Mapping(target = "dosage", source = "dosage")
    @Mapping(target = "usageInstruction", source = "usageInstruction")
    @Mapping(target = "unitPrice", source = "unitPrice")
    @Mapping(target = "totalPrice", expression = "java(calculateTotalPrice(detail))")
    PrescriptionDetailResponse toDetailResponse(PrescriptionDetail detail);

    @Mapping(source = "doctor.user.fullName", target = "doctorName")
    PrescriptionPatientResponse toPatientResponse(Prescription prescription);

    default BigDecimal calculateTotalPrice(PrescriptionDetail detail) {
        if (detail.getUnitPrice() == null || detail.getQuantity() == null) {
            return BigDecimal.ZERO;
        }
        return detail.getUnitPrice().multiply(BigDecimal.valueOf(detail.getQuantity()));
    }
}