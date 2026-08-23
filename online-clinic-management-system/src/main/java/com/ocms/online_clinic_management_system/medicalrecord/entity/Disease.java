package com.ocms.online_clinic_management_system.medicalrecord.entity;
import com.ocms.online_clinic_management_system.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Table(name = "disease")
@EqualsAndHashCode(callSuper = true)
public class Disease extends BaseEntity {

    @Column(name = "disease_name", nullable = false, unique = true, length = 200)
    private String diseaseName;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String description;

    @Builder.Default
    @OneToMany(mappedBy = "disease")
    private List<MedicalRecordDisease> medicalRecords = new ArrayList<>();
}