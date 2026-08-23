package com.ocms.online_clinic_management_system.payment.service;
import com.ocms.online_clinic_management_system.invoice.event.InvoiceCreatedEvent;
import com.ocms.online_clinic_management_system.invoice.event.InvoiceUpdatedEvent;
import com.ocms.online_clinic_management_system.payment.dto.request.CreatePaymentRequest;
import com.ocms.online_clinic_management_system.payment.dto.response.CreatePaymentResponse;
import com.ocms.online_clinic_management_system.payment.dto.response.PaymentResponse;

public interface PaymentService {

    CreatePaymentResponse createPayment(Long invoiceId, CreatePaymentRequest request);
    PaymentResponse getMyPayment(Long invoiceId);
    void createPaymentFromInvoice(InvoiceCreatedEvent event);
    void updatePaymentAmount(InvoiceUpdatedEvent event);
}