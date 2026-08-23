package com.ocms.online_clinic_management_system.laboratory.dto.response;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TestOrderResponse {

    private Long id;
    private Long medicalRecordId;
    private Long doctorId;
    private LocalDateTime orderDate;
    private String status;
    private List<TestOrderDetailResponse> details;
}