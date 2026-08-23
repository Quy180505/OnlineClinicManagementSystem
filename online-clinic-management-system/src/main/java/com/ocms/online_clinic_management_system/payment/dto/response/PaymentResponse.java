package com.ocms.online_clinic_management_system.payment.dto.response;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class PaymentResponse {

    private Long id;
    private Long invoiceId;
    private BigDecimal amountDue;
    private Long paymentStatusId;
    private String paymentStatusName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<PaymentTransactionResponse> transactions;
}