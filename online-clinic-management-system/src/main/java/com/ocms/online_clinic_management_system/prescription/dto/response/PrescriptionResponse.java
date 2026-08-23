package com.ocms.online_clinic_management_system.prescription.dto.response;
import lombok.Builder;
import lombok.Getter;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class PrescriptionResponse {

    private Long id;
    private Long medicalRecordId;
    private Long doctorId;
    private String doctorName;
    private LocalDateTime prescriptionDate;
    private String note;
    private List<PrescriptionDetailResponse> details;
}