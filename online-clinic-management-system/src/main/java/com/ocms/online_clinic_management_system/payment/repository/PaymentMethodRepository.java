package com.ocms.online_clinic_management_system.payment.repository;
import com.ocms.online_clinic_management_system.payment.entity.PaymentMethod;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaymentMethodRepository extends JpaRepository<PaymentMethod, Long> {

    Optional<PaymentMethod> findByNameIgnoreCase(String name);
    boolean existsByNameIgnoreCase(String name);
}