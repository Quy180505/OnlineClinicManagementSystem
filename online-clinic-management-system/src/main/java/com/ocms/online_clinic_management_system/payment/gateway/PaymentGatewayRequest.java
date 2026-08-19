package com.ocms.online_clinic_management_system.payment.gateway;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@Builder
public class PaymentGatewayRequest {
    private Long paymentId;
    private Long invoiceId;
    private BigDecimal amount;
    private String paymentMethod;
    private String description;
    private String transactionCode;
}