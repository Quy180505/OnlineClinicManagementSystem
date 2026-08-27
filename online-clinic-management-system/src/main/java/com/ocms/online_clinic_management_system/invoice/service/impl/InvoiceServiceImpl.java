package com.ocms.online_clinic_management_system.invoice.service.impl;
import com.ocms.online_clinic_management_system.appointment.entity.Appointment;
import com.ocms.online_clinic_management_system.common.event.DomainEventPublisher;
import com.ocms.online_clinic_management_system.invoice.entity.Invoice;
import com.ocms.online_clinic_management_system.invoice.entity.InvoiceDetail;
import com.ocms.online_clinic_management_system.invoice.exception.InvoiceAlreadyExistsException;
import com.ocms.online_clinic_management_system.invoice.exception.InvoiceNotFoundException;
import com.ocms.online_clinic_management_system.invoice.repository.InvoiceRepository;
import com.ocms.online_clinic_management_system.invoice.service.InvoiceService;
import com.ocms.online_clinic_management_system.common.constant.enums.InvoiceItemType;
import com.ocms.online_clinic_management_system.laboratory.entity.TestOrder;
import com.ocms.online_clinic_management_system.laboratory.entity.TestOrderDetail;
import com.ocms.online_clinic_management_system.laboratory.event.TestOrderCreatedEvent;
import com.ocms.online_clinic_management_system.laboratory.exception.TestOrderNotFoundException;
import com.ocms.online_clinic_management_system.laboratory.repository.TestOrderRepository;
import com.ocms.online_clinic_management_system.prescription.entity.Prescription;
import com.ocms.online_clinic_management_system.prescription.entity.PrescriptionDetail;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import com.ocms.online_clinic_management_system.invoice.event.InvoiceCreatedEvent;
import com.ocms.online_clinic_management_system.invoice.event.InvoiceUpdatedEvent;

@Service
@RequiredArgsConstructor
@Transactional
public class InvoiceServiceImpl implements InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final TestOrderRepository testOrderRepository;
    private final DomainEventPublisher eventPublisher;
    @Override
    public void addPrescriptionToInvoice(Prescription prescription) {

        Long appointmentId = prescription.getMedicalRecord().getAppointment().getId();
        Invoice invoice = invoiceRepository.findByAppointmentId(appointmentId).orElseThrow(InvoiceNotFoundException::new);
        BigDecimal additionalAmount = BigDecimal.ZERO;

        for (PrescriptionDetail detail : prescription.getDetails()) {

            BigDecimal unitPrice = detail.getUnitPrice();
            BigDecimal amount = unitPrice.multiply(BigDecimal.valueOf(detail.getQuantity()));

            InvoiceDetail invoiceDetail = InvoiceDetail.builder()
                    .invoice(invoice)
                    .itemType(InvoiceItemType.MEDICINE)
                    .prescriptionDetail(detail)
                    .description(detail.getMedicine().getMedicineName())
                    .quantity(detail.getQuantity())
                    .unitPrice(unitPrice)
                    .amount(amount)
                    .build();

            invoice.getInvoiceDetails().add(invoiceDetail);
            additionalAmount = additionalAmount.add(amount);
        }
        invoice.setTotalAmount(invoice.getTotalAmount().add(additionalAmount));
        invoiceRepository.save(invoice);
        eventPublisher.publish(new InvoiceUpdatedEvent(invoice.getId(),  invoice.getPatient().getId(),
                invoice.getAppointment().getId(),invoice.getTotalAmount()));
    }


    @Override
    public void createInitialInvoice(Appointment appointment) {

        if (invoiceRepository.existsByAppointmentId(appointment.getId())) {
            throw new InvoiceAlreadyExistsException();
        }

        BigDecimal servicePrice = appointment.getService().getPrice();

        InvoiceDetail detail = InvoiceDetail.builder()
                .itemType(InvoiceItemType.SERVICE)
                .service(appointment.getService())
                .description(appointment.getService().getServiceName())
                .quantity(1)
                .unitPrice(servicePrice)
                .amount(servicePrice)
                .build();

        Invoice invoice = Invoice.builder()
                .appointment(appointment)
                .patient(appointment.getPatient())
                .totalAmount(servicePrice)
                .build();

        detail.setInvoice(invoice);
        invoice.getInvoiceDetails().add(detail);

        invoiceRepository.save(invoice);
        eventPublisher.publish(new InvoiceCreatedEvent(invoice.getId(),  invoice.getPatient().getId(),
                invoice.getAppointment().getId(),invoice.getTotalAmount()));
    }
    @Override
    public void addTestOrderToInvoice(TestOrderCreatedEvent event) {

        TestOrder testOrder = testOrderRepository.findById(event.getTestOrderId()).orElseThrow(TestOrderNotFoundException::new);
        Invoice invoice = invoiceRepository.findByAppointmentId(testOrder.getMedicalRecord().getAppointment().getId()).orElseThrow(InvoiceNotFoundException::new);
        BigDecimal additionalAmount = BigDecimal.ZERO;

        for (TestOrderDetail detail : testOrder.getDetails()) {
            BigDecimal unitPrice = detail.getService().getPrice();
            InvoiceDetail invoiceDetail = InvoiceDetail.builder()
                    .invoice(invoice)
                    .itemType(InvoiceItemType.TEST)
                    .testOrderDetail(detail)
                    .description(detail.getService().getServiceName())
                    .quantity(1)
                    .unitPrice(unitPrice)
                    .amount(unitPrice)
                    .build();

            invoice.getInvoiceDetails().add(invoiceDetail);
            additionalAmount = additionalAmount.add(unitPrice);
        }

        invoice.setTotalAmount(invoice.getTotalAmount().add(additionalAmount));

        invoiceRepository.save(invoice);
        eventPublisher.publish(new InvoiceUpdatedEvent(invoice.getId(),  invoice.getPatient().getId(),
                invoice.getAppointment().getId(),invoice.getTotalAmount()));
    }

    @Override
    @Transactional(readOnly = true)
    public Invoice getByAppointmentId(Long appointmentId) {
        return invoiceRepository.findByAppointmentId(appointmentId).orElseThrow(InvoiceNotFoundException::new);
    }
}

