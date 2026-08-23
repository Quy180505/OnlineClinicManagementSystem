package com.ocms.online_clinic_management_system.laboratory.dto.response;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PatientLabResultResponse {

    private Long labResultId;
    private Long testOrderDetailId;
    private Long testOrderId;
    private Long medicalRecordId;
    private String serviceName;
    private String resultDate;
}