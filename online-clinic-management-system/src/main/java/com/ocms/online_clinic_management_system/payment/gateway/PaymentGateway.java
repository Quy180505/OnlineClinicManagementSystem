package com.ocms.online_clinic_management_system.payment.gateway;

public interface PaymentGateway {
    PaymentGatewayResponse process(PaymentGatewayRequest request);
    boolean supports(String paymentMethod);
}