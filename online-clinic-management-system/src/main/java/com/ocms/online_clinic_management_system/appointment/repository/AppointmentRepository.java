package com.ocms.online_clinic_management_system.appointment.repository;

import com.ocms.online_clinic_management_system.appointment.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AppointmentRepository
        extends JpaRepository<Appointment, Long>,
        JpaSpecificationExecutor<Appointment> {

    boolean existsByPatient_IdAndSchedule_Id(
            Long patientId,
            Long scheduleId
    );

    @Query("""
            SELECT COUNT(a)
            FROM Appointment a
            WHERE a.schedule.id = :scheduleId
            AND a.appointmentStatus.name IN
                ('PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED')
            """)
    long countValidAppointmentsByScheduleId(@Param("scheduleId") Long scheduleId);
}