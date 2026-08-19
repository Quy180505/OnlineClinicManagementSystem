package com.ocms.online_clinic_management_system.payment.validator;

import com.ocms.online_clinic_management_system.invoice.entity.Invoice;
import com.ocms.online_clinic_management_system.payment.entity.Payment;
import com.ocms.online_clinic_management_system.payment.entity.PaymentMethod;
import com.ocms.online_clinic_management_system.payment.entity.PaymentStatus;
import com.ocms.online_clinic_management_system.payment.entity.PaymentTransaction;
import com.ocms.online_clinic_management_system.payment.entity.TransactionStatus;
import com.ocms.online_clinic_management_system.payment.exception.InvalidPaymentException;
import com.ocms.online_clinic_management_system.payment.exception.PaymentAccessDeniedException;
import com.ocms.online_clinic_management_system.payment.exception.PaymentAlreadyPaidException;
import com.ocms.online_clinic_management_system.payment.exception.PaymentNotFoundException;
import com.ocms.online_clinic_management_system.payment.exception.PaymentTransactionNotFoundException;
import com.ocms.online_clinic_management_system.payment.repository.PaymentMethodRepository;
import com.ocms.online_clinic_management_system.payment.repository.PaymentRepository;
import com.ocms.online_clinic_management_system.payment.repository.PaymentStatusRepository;
import com.ocms.online_clinic_management_system.payment.repository.PaymentTransactionRepository;
import com.ocms.online_clinic_management_system.payment.repository.TransactionStatusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PaymentValidator {

    private final PaymentRepository paymentRepository;
    private final PaymentTransactionRepository paymentTransactionRepository;
    private final PaymentMethodRepository paymentMethodRepository;
    private final PaymentStatusRepository paymentStatusRepository;
    private final TransactionStatusRepository transactionStatusRepository;

    public Payment validatePaymentExistsByInvoiceId(Long invoiceId) {
        return paymentRepository.findByInvoiceId(invoiceId).orElseThrow(PaymentNotFoundException::new);
    }

    public PaymentTransaction validatePaymentTransactionExists(Long transactionId) {
        return paymentTransactionRepository.findById(transactionId).orElseThrow(PaymentTransactionNotFoundException::new);
    }

    public void validatePaymentNotPaid(Payment payment) {

        if (payment.getPaymentStatus() == null) {
            throw new InvalidPaymentException();
        }

        if ("PAID".equalsIgnoreCase(payment.getPaymentStatus().getName())) {
            throw new PaymentAlreadyPaidException();
        }
    }

    public void validatePatientOwnership(Invoice invoice, Long currentUserId) {

        if (invoice == null || invoice.getPatient() == null || invoice.getPatient().getUser() == null
                || !invoice.getPatient().getUser().getId().equals(currentUserId))
        {
            throw new PaymentAccessDeniedException();
        }
    }

    public PaymentMethod validatePaymentMethodExists(Long paymentMethodId) {
        return paymentMethodRepository.findById(paymentMethodId).orElseThrow(InvalidPaymentException::new);
    }

    public PaymentStatus validatePaymentStatus(String statusName) {
        return paymentStatusRepository.findByNameIgnoreCase(statusName).orElseThrow(InvalidPaymentException::new);
    }

    public TransactionStatus validateTransactionStatus(String statusName) {
        return transactionStatusRepository.findByNameIgnoreCase(statusName).orElseThrow(InvalidPaymentException::new);
    }
}