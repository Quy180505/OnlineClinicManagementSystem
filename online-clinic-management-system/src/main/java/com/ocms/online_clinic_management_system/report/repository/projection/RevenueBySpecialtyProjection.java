package com.ocms.online_clinic_management_system.report.repository.projection;
import java.math.BigDecimal;

public interface RevenueBySpecialtyProjection {
    Long getSpecialtyId();
    String getSpecialtyName();
    BigDecimal getRevenue();
}