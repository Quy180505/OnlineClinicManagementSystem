package com.ocms.online_clinic_management_system.payment.dto.request;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CreatePaymentRequest {

    @NotNull(message = "Payment method is required")
    private Long paymentMethodId;
}