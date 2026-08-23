package com.ocms.online_clinic_management_system.prescription.validator;
import com.ocms.online_clinic_management_system.doctor.entity.Doctor;
import com.ocms.online_clinic_management_system.prescription.entity.Prescription;
import com.ocms.online_clinic_management_system.prescription.entity.PrescriptionDetail;
import com.ocms.online_clinic_management_system.prescription.exception.PrescriptionAccessDeniedException;
import com.ocms.online_clinic_management_system.prescription.exception.PrescriptionAlreadyExistsException;
import com.ocms.online_clinic_management_system.prescription.exception.PrescriptionDetailNotFoundException;
import com.ocms.online_clinic_management_system.prescription.exception.PrescriptionNotFoundException;
import com.ocms.online_clinic_management_system.prescription.repository.PrescriptionDetailRepository;
import com.ocms.online_clinic_management_system.prescription.repository.PrescriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PrescriptionValidator {

    private final PrescriptionRepository prescriptionRepository;
    private final PrescriptionDetailRepository prescriptionDetailRepository;

    public void validatePrescriptionNotExists(Long medicalRecordId) {
        if (prescriptionRepository.existsByMedicalRecordId(medicalRecordId)) {
            throw new PrescriptionAlreadyExistsException();
        }
    }

    public Prescription validatePrescriptionExists(Long prescriptionId) {
        return prescriptionRepository.findById(prescriptionId).orElseThrow(PrescriptionNotFoundException::new);
    }

    public void validateDoctorOwnership(Prescription prescription, Long currentUserId) {
        Doctor doctor = prescription.getDoctor();
        if (doctor == null || doctor.getUser() == null || !doctor.getUser().getId().equals(currentUserId)) {
            throw new PrescriptionAccessDeniedException();
        }
    }

    public void validatePatientOwnership(Prescription prescription, Long currentUserId) {
        if (prescription.getMedicalRecord() == null || prescription.getMedicalRecord().getPatient() == null
                || prescription.getMedicalRecord().getPatient().getUser() == null
                || !prescription.getMedicalRecord().getPatient().getUser().getId().equals(currentUserId))
        {
            throw new PrescriptionAccessDeniedException();
        }
    }

    public PrescriptionDetail validatePrescriptionDetailExists(Long prescriptionDetailId, Long prescriptionId) {
        return prescriptionDetailRepository.findByIdAndPrescriptionId(prescriptionDetailId, prescriptionId)
                .orElseThrow(PrescriptionDetailNotFoundException::new);
    }
}