package com.ocms.online_clinic_management_system.payment.event;
import com.ocms.online_clinic_management_system.common.event.BaseEvent;
import com.ocms.online_clinic_management_system.common.event.DomainEvent;
import lombok.Getter;
import java.math.BigDecimal;

@Getter
public class PaymentFailedEvent extends BaseEvent implements DomainEvent {

    private final Long paymentId;
    private final Long invoiceId;
    private final Long patientId;
    private final Long patientUserId;
    private final Long paymentTransactionId;
    private final String paymentMethod;
    private final String transactionCode;
    private final BigDecimal amount;

    public PaymentFailedEvent(Long paymentId, Long invoiceId, Long patientId, Long patientUserId, Long paymentTransactionId, String paymentMethod, String transactionCode, BigDecimal amount) {
        this.paymentId = paymentId;
        this.invoiceId = invoiceId;
        this.patientId = patientId;
        this.patientUserId = patientUserId;
        this.paymentTransactionId = paymentTransactionId;
        this.paymentMethod = paymentMethod;
        this.transactionCode = transactionCode;
        this.amount = amount;
    }
}