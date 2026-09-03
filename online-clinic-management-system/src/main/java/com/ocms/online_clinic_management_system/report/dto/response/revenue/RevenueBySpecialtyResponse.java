package com.ocms.online_clinic_management_system.report.dto.response.revenue;
import lombok.*;
import java.math.BigDecimal;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RevenueBySpecialtyResponse {

    private Long specialtyId;
    private String specialtyName;
    private BigDecimal revenue;
}