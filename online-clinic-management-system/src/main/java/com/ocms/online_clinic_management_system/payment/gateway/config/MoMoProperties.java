package com.ocms.online_clinic_management_system.payment.gateway.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "momo")
public class MoMoProperties {
    private String partnerCode;
    private String accessKey;
    private String secretKey;
    private String paymentUrl;
    private String returnUrl;
    private String ipnUrl;
}