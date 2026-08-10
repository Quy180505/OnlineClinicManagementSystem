package com.ocms.online_clinic_management_system.appointment.repository;

import com.ocms.online_clinic_management_system.appointment.entity.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AppointmentStatusRepository extends JpaRepository<AppointmentStatus, Long> {

    Optional<AppointmentStatus> findByName(String name);

}