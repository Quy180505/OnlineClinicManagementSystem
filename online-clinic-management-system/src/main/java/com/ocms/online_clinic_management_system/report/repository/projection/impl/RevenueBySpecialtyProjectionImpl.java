package com.ocms.online_clinic_management_system.report.repository.projection.impl;
import com.ocms.online_clinic_management_system.report.repository.projection.RevenueBySpecialtyProjection;
import java.math.BigDecimal;

public record RevenueBySpecialtyProjectionImpl(Long specialtyId, String specialtyName, BigDecimal revenue) implements RevenueBySpecialtyProjection {

    @Override
    public Long getSpecialtyId() {
        return specialtyId;
    }

    @Override
    public String getSpecialtyName() {
        return specialtyName;
    }

    @Override
    public BigDecimal getRevenue() {
        return revenue;
    }
}