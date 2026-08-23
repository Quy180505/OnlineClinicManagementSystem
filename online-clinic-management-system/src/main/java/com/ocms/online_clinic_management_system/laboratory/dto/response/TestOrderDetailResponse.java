package com.ocms.online_clinic_management_system.laboratory.dto.response;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TestOrderDetailResponse {

    private Long id;
    private Long testOrderId;
    private Long serviceId;
    private String serviceName;
    private Boolean resultAvailable;
}