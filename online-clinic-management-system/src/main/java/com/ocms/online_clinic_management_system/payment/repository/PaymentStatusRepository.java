package com.ocms.online_clinic_management_system.payment.repository;
import com.ocms.online_clinic_management_system.payment.entity.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaymentStatusRepository extends JpaRepository<PaymentStatus, Long> {
    Optional<PaymentStatus> findByNameIgnoreCase(String name);
}