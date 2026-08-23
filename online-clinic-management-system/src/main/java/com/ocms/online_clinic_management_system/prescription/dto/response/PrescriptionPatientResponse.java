package com.ocms.online_clinic_management_system.prescription.dto.response;
import lombok.Getter;
import lombok.Setter;
import lombok.Builder;
import java.time.LocalDateTime;
import java.util.List;


@Getter
@Setter
@Builder
public class PrescriptionPatientResponse {

    private Long id;
    private LocalDateTime prescriptionDate;
    private String doctorName;
    private String note;
    private List<PrescriptionDetailResponse> details;
}