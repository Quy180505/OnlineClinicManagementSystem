package com.ocms.online_clinic_management_system.payment.gateway.factory;

import com.ocms.online_clinic_management_system.payment.exception.InvalidPaymentException;
import com.ocms.online_clinic_management_system.payment.gateway.PaymentGateway;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class PaymentGatewayFactory {

    private final List<PaymentGateway> paymentGateways;

    public PaymentGateway getGateway(String paymentMethod) {
        return paymentGateways.stream().filter(gateway -> gateway.supports(paymentMethod)).findFirst().orElseThrow(InvalidPaymentException::new);
    }
}