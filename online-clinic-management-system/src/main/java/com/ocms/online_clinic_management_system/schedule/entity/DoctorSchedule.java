package com.ocms.online_clinic_management_system.schedule.entity;
import com.ocms.online_clinic_management_system.appointment.entity.Appointment;
import com.ocms.online_clinic_management_system.common.constant.enums.ScheduleStatus;
import com.ocms.online_clinic_management_system.common.entity.BaseEntity;
import com.ocms.online_clinic_management_system.doctor.entity.Doctor;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Table(name = "doctor_schedule", uniqueConstraints = {@UniqueConstraint(columnNames = {"doctor_id", "work_date", "start_time"}) })
public class DoctorSchedule extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @Column(name = "work_date", nullable = false)
    private LocalDate workDate;

    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;

    @Column(name = "max_patients", nullable = false)
    private Integer maxPatients = 20;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ScheduleStatus status = ScheduleStatus.AVAILABLE;

    @OneToMany(mappedBy = "schedule")
    private List<Appointment> appointments = new ArrayList<>();
}