package com.ocms.online_clinic_management_system.appointment.entity;
import com.ocms.online_clinic_management_system.common.entity.BaseEntity;
import com.ocms.online_clinic_management_system.doctor.entity.Doctor;
import com.ocms.online_clinic_management_system.medicalrecord.entity.MedicalRecord;
import com.ocms.online_clinic_management_system.patient.entity.Patient;
import com.ocms.online_clinic_management_system.schedule.entity.DoctorSchedule;
import com.ocms.online_clinic_management_system.service.entity.MedicalService;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Table(name = "appointment", uniqueConstraints = {@UniqueConstraint(columnNames = {"patient_id", "schedule_id"})})
public class Appointment extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_id", nullable = false)
    private MedicalService service;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "schedule_id", nullable = false)
    private DoctorSchedule schedule;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "appointment_status_id", nullable = false)
    private AppointmentStatus appointmentStatus;
    @Lob
    private String note;
    @OneToOne(mappedBy = "appointment")
    private MedicalRecord medicalRecord;
}