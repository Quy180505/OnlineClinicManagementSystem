package com.ocms.online_clinic_management_system.invoice.service.impl;
import com.ocms.online_clinic_management_system.appointment.entity.Appointment;
import com.ocms.online_clinic_management_system.invoice.entity.Invoice;
import com.ocms.online_clinic_management_system.invoice.entity.InvoiceDetail;
import com.ocms.online_clinic_management_system.invoice.exception.InvoiceAlreadyExistsException;
import com.ocms.online_clinic_management_system.invoice.exception.InvoiceNotFoundException;
import com.ocms.online_clinic_management_system.invoice.repository.InvoiceRepository;
import com.ocms.online_clinic_management_system.invoice.service.InvoiceService;
import com.ocms.online_clinic_management_system.common.constant.enums.InvoiceItemType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;


@Service
@RequiredArgsConstructor
@Transactional
public class InvoiceServiceImpl implements InvoiceService {

    private final InvoiceRepository invoiceRepository;

    @Override
    public Invoice createInitialInvoice(Appointment appointment) {

        if (invoiceRepository.existsByAppointment_Id(appointment.getId())) {
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

        return invoiceRepository.save(invoice);
    }

    @Override
    @Transactional(readOnly = true)
    public Invoice getByAppointmentId(Long appointmentId) {

        return invoiceRepository.findByAppointment_Id(appointmentId).orElseThrow(InvoiceNotFoundException::new);
    }
}

