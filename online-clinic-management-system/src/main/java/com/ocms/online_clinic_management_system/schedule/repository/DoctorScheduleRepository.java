package com.ocms.online_clinic_management_system.schedule.repository;
import com.ocms.online_clinic_management_system.schedule.entity.DoctorSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface DoctorScheduleRepository extends JpaRepository<DoctorSchedule, Long>,
        JpaSpecificationExecutor<DoctorSchedule> {

    List<DoctorSchedule> findByDoctorId(Long doctorId);

    List<DoctorSchedule> findByDoctorIdAndWorkDate(Long doctorId, LocalDate workDate);

    @Query("""
            SELECT COUNT(ds) > 0
            FROM DoctorSchedule ds
            WHERE ds.doctor.id = :doctorId
              AND ds.workDate = :workDate
              AND ds.startTime < :endTime
              AND ds.endTime > :startTime
            """)
    boolean existsOverlappingSchedule(@Param("doctorId") Long doctorId,
                                      @Param("workDate") LocalDate workDate,
                                      @Param("startTime") LocalTime startTime,
                                      @Param("endTime") LocalTime endTime);

    @Query("""
            SELECT COUNT(ds) > 0
            FROM DoctorSchedule ds
            WHERE ds.id <> :scheduleId
              AND ds.doctor.id = :doctorId
              AND ds.workDate = :workDate
              AND ds.startTime < :endTime
              AND ds.endTime > :startTime
            """)
    boolean existsOverlappingScheduleForUpdate(@Param("scheduleId") Long scheduleId,
                                               @Param("doctorId") Long doctorId,
                                               @Param("workDate") LocalDate workDate,
                                               @Param("startTime") LocalTime startTime,
                                               @Param("endTime") LocalTime endTime);

}