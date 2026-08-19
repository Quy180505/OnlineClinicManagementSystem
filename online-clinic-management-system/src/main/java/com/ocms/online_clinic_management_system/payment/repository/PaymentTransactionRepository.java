package com.ocms.online_clinic_management_system.payment.repository;

import com.ocms.online_clinic_management_system.payment.entity.PaymentTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PaymentTransactionRepository extends JpaRepository<PaymentTransaction, Long> {

    Optional<PaymentTransaction> findByIdAndPaymentId(Long transactionId, Long paymentId);

    Optional<PaymentTransaction> findByTransactionCode(String transactionCode);

    boolean existsByTransactionCode(String transactionCode);

    List<PaymentTransaction> findByPaymentIdOrderByTransactionTimeDesc(Long paymentId);

    Optional<PaymentTransaction> findFirstByPaymentIdOrderByTransactionTimeDesc(Long paymentId);
}