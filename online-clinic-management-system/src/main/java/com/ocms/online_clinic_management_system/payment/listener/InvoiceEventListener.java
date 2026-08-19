package com.ocms.online_clinic_management_system.payment.listener;

import com.ocms.online_clinic_management_system.invoice.event.InvoiceCreatedEvent;
import com.ocms.online_clinic_management_system.invoice.event.InvoiceUpdatedEvent;
import com.ocms.online_clinic_management_system.payment.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class InvoiceEventListener {

    private final PaymentService paymentService;

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void handleInvoiceCreated(InvoiceCreatedEvent event) {
        paymentService.createPaymentFromInvoice(event);
    }

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void handleInvoiceUpdated(InvoiceUpdatedEvent event) {
        paymentService.updatePaymentAmount(event);
    }
}