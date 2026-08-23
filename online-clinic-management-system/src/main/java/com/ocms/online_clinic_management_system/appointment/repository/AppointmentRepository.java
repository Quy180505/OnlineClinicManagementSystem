package com.ocms.online_clinic_management_system.appointment.repository;
import com.ocms.online_clinic_management_system.appointment.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long>, JpaSpecificationExecutor<Appointment> {

    boolean existsByPatient_IdAndSchedule_Id(Long patientId, Long scheduleId);

    @Query("""
            SELECT COUNT(a)
            FROM Appointment a
            WHERE a.schedule.id = :scheduleId
            AND a.appointmentStatus.name IN
                ('PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED')
            """)
    long countValidAppointmentsByScheduleId(@Param("scheduleId") Long scheduleId);

    @Query("""
            SELECT a
            FROM Appointment a
            WHERE a.doctor.id = :doctorId
            AND a.schedule.workDate = :workDate
            AND a.appointmentStatus.name IN :statuses
            ORDER BY a.schedule.startTime ASC
            """)
    List<Appointment> findByDoctorAndWorkDateAndStatuses(@Param("doctorId") Long doctorId, @Param("workDate") LocalDate workDate, @Param("statuses") Collection<String> statuses);

    @Query("""
        SELECT a
        FROM Appointment a
        WHERE a.doctor.user.id = :userId
        AND a.schedule.workDate = :workDate
        AND a.appointmentStatus.name IN :statuses
        ORDER BY a.schedule.startTime ASC
        """)
    List<Appointment> findByDoctorUserIdAndWorkDateAndStatuses(
            @Param("userId") Long userId,
            @Param("workDate") LocalDate workDate,
            @Param("statuses") Collection<String> statuses
    );
}