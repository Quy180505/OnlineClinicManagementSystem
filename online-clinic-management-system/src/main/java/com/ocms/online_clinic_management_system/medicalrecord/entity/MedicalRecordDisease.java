package com.ocms.online_clinic_management_system.medicalrecord.entity;
import com.ocms.online_clinic_management_system.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Table(name = "medical_record_disease", uniqueConstraints = {@UniqueConstraint(columnNames = {"medical_record_id", "disease_id"})})
@EqualsAndHashCode(callSuper = true)
public class MedicalRecordDisease extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medical_record_id", nullable = false)
    private MedicalRecord medicalRecord;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "disease_id", nullable = false)
    private Disease disease;
}