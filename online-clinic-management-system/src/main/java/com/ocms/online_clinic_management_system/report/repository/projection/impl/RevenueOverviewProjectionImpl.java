package com.ocms.online_clinic_management_system.report.repository.projection.impl;
import com.ocms.online_clinic_management_system.report.repository.projection.RevenueOverviewProjection;
import java.math.BigDecimal;

public record RevenueOverviewProjectionImpl(Integer period, BigDecimal revenue) implements RevenueOverviewProjection {

    @Override
    public Integer getPeriod() {
        return period;
    }

    @Override
    public BigDecimal getRevenue() {
        return revenue;
    }
}