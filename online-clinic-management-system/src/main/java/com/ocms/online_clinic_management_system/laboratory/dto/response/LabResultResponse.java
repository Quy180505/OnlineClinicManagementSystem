package com.ocms.online_clinic_management_system.laboratory.dto.response;
import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LabResultResponse {

    private Long id;
    private Long testOrderDetailId;
    private Long testOrderId;
    private Long medicalRecordId;
    private Long serviceId;
    private String serviceName;
    private String resultContent;
    private LocalDateTime resultDate;
}