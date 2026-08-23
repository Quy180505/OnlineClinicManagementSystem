package com.ocms.online_clinic_management_system.payment.dto.response;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class PaymentTransactionResponse {

    private Long id;
    private Long paymentMethodId;
    private String paymentMethodName;
    private String transactionCode;
    private BigDecimal amount;
    private Long transactionStatusId;
    private String transactionStatusName;
    private LocalDateTime transactionTime;
}