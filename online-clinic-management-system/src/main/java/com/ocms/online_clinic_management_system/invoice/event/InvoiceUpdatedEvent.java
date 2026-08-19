package com.ocms.online_clinic_management_system.invoice.event;

import com.ocms.online_clinic_management_system.common.event.BaseEvent;
import com.ocms.online_clinic_management_system.common.event.DomainEvent;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
public class InvoiceUpdatedEvent extends BaseEvent implements DomainEvent {

    private final Long invoiceId;
    private final Long patientId;
    private final Long appointmentId;
    private final BigDecimal totalAmount;

    public InvoiceUpdatedEvent(Long invoiceId, Long patientId, Long appointmentId, BigDecimal totalAmount) {
        this.invoiceId = invoiceId;
        this.patientId = patientId;
        this.appointmentId = appointmentId;
        this.totalAmount = totalAmount;
    }
}