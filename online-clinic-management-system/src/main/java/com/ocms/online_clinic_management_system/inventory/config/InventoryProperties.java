package com.ocms.online_clinic_management_system.inventory.config;

import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;

@Getter
@Setter
@Component
@Validated
@ConfigurationProperties(prefix = "inventory")
public class InventoryProperties {

    @Min(value = 1, message = "Low stock threshold must be greater than 0")
    private Integer lowStockThreshold;
}