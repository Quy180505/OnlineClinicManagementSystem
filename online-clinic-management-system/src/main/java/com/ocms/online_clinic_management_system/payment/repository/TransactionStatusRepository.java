package com.ocms.online_clinic_management_system.payment.repository;
import com.ocms.online_clinic_management_system.payment.entity.TransactionStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TransactionStatusRepository extends JpaRepository<TransactionStatus, Long> {

    Optional<TransactionStatus> findByNameIgnoreCase(String name);
}