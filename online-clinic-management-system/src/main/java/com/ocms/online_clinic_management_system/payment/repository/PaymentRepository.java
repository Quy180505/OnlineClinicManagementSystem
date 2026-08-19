package com.ocms.online_clinic_management_system.payment.repository;

import com.ocms.online_clinic_management_system.payment.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    Optional<Payment> findByInvoiceId(Long invoiceId);
    boolean existsByInvoiceId(Long invoiceId);
    Optional<Payment> findByIdAndInvoicePatientId(Long paymentId, Long patientId);
}