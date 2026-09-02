package com.ocms.online_clinic_management_system.invoice.validator;
import com.ocms.online_clinic_management_system.invoice.entity.Invoice;
import com.ocms.online_clinic_management_system.invoice.exception.InvoiceAccessDeniedException;
import com.ocms.online_clinic_management_system.invoice.exception.InvoiceNotFoundException;
import com.ocms.online_clinic_management_system.invoice.repository.InvoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class InvoiceValidator {

    private final InvoiceRepository invoiceRepository;

    public Invoice validateInvoiceExists(Long invoiceId) {
        return invoiceRepository.findById(invoiceId).orElseThrow(InvoiceNotFoundException::new);
    }

    public void validatePatientOwnership(Invoice invoice, Long currentUserId) {

        if (invoice == null || invoice.getPatient() == null || invoice.getPatient().getUser() == null
                || !invoice.getPatient().getUser().getId().equals(currentUserId)) {
            throw new InvoiceAccessDeniedException();
        }
    }
}