package com.ocms.online_clinic_management_system.medicalrecord.entity;
import com.ocms.online_clinic_management_system.appointment.entity.Appointment;
import com.ocms.online_clinic_management_system.common.entity.BaseEntity;
import com.ocms.online_clinic_management_system.doctor.entity.Doctor;
import com.ocms.online_clinic_management_system.patient.entity.Patient;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Table(name = "medical_record")
public class MedicalRecord extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "appointment_id", nullable = false, unique = true)
    private Appointment appointment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @Lob
    private String symptoms;

    @Lob
    @Column(name = "examination_result")
    private String examinationResult;

    @Column(name = "examination_date")
    private LocalDateTime examinationDate;

    @Lob
    private String diagnosis;

    @OneToMany(mappedBy = "medicalRecord", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MedicalRecordDisease> diseases = new ArrayList<>();
}