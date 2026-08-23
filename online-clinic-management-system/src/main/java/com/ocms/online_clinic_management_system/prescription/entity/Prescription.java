package com.ocms.online_clinic_management_system.prescription.entity;
import com.ocms.online_clinic_management_system.common.entity.BaseEntity;
import com.ocms.online_clinic_management_system.doctor.entity.Doctor;
import com.ocms.online_clinic_management_system.medicalrecord.entity.MedicalRecord;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "prescription")
@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
public class Prescription extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medical_record_id", nullable = false,  unique = true)
    private MedicalRecord medicalRecord;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @Column(name = "prescription_date", nullable = false)
    private LocalDateTime prescriptionDate;

    @Lob
    private String note;

    @OneToMany(mappedBy = "prescription", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PrescriptionDetail> details;
}