package com.ocms.online_clinic_management_system.payment.dto.response;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CreatePaymentResponse {

    private Long paymentId;
    private Long transactionId;
    private String transactionCode;
    private String paymentMethod;
    private String paymentUrl;
    private String transactionStatus;
}