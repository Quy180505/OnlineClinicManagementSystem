package com.ocms.online_clinic_management_system.invoice.listener;

import com.ocms.online_clinic_management_system.invoice.service.InvoiceService;
import com.ocms.online_clinic_management_system.laboratory.event.TestOrderCreatedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
@Component
@RequiredArgsConstructor
public class TestOrderEventListener {

    private final InvoiceService invoiceService;

    @EventListener
    @Transactional
    public void handleTestOrderCreated(TestOrderCreatedEvent event) {
        invoiceService.addTestOrderToInvoice(event);
    }
}