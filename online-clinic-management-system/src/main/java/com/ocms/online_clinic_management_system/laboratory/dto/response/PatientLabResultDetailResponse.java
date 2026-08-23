package com.ocms.online_clinic_management_system.laboratory.dto.response;
import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PatientLabResultDetailResponse {
    private Long labResultId;
    private Long testOrderDetailId;
    private Long testOrderId;
    private Long medicalRecordId;
    private String serviceName;
    private String resultContent;
    private LocalDateTime resultDate;
}