package com.ocms.online_clinic_management_system.medicalrecord.repository;

import com.ocms.online_clinic_management_system.medicalrecord.entity.MedicalRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, Long> {

    Optional<MedicalRecord> findByAppointmentId(Long appointmentId);

    List<MedicalRecord> findByPatientIdOrderByExaminationDateDesc(Long patientId);
    boolean existsByAppointmentId(Long appointmentId);
}