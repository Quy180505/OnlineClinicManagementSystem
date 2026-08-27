package com.ocms.online_clinic_management_system.invoice.repository;
import com.ocms.online_clinic_management_system.invoice.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

    Optional<Invoice> findByAppointmentId(Long appointmentId);
    boolean existsByAppointmentId(Long appointmentId);

}