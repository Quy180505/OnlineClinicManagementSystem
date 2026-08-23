package com.ocms.online_clinic_management_system.prescription.dto.response;
import lombok.Builder;
import lombok.Getter;
import java.math.BigDecimal;

@Getter
@Builder
public class PrescriptionDetailResponse {

    private Long id;
    private Long medicineId;
    private String medicineName;
    private Integer quantity;
    private String dosage;
    private String usageInstruction;
    private BigDecimal unitPrice;
    private BigDecimal totalPrice;
}