package com.ocms.online_clinic_management_system.report.dto.response.revenue;
import lombok.*;
import java.math.BigDecimal;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RevenueOverviewResponse {

    private Integer period;
    private BigDecimal revenue;
}