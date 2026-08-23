package com.ocms.online_clinic_management_system.payment.gateway;
import lombok.Builder;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter
@Builder
public class PaymentGatewayResponse {

    private boolean success;
    private String transactionCode;
    private String transactionStatus;
    private LocalDateTime transactionTime;
    private String paymentUrl;
    private String message;
}