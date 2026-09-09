package com.ocms.online_clinic_management_system.prescription.service.impl;
import com.ocms.online_clinic_management_system.appointment.service.AppointmentService;
import com.ocms.online_clinic_management_system.auth.security.SecurityHelper;
import com.ocms.online_clinic_management_system.common.response.PageResponse;
import com.ocms.online_clinic_management_system.doctor.entity.Doctor;
import com.ocms.online_clinic_management_system.inventory.dto.request.ExportMedicineDetailRequest;
import com.ocms.online_clinic_management_system.inventory.dto.request.ExportMedicineRequest;
import com.ocms.online_clinic_management_system.inventory.entity.Medicine;
import com.ocms.online_clinic_management_system.inventory.service.InventoryService;
import com.ocms.online_clinic_management_system.inventory.validator.MedicineValidator;
import com.ocms.online_clinic_management_system.invoice.service.InvoiceService;
import com.ocms.online_clinic_management_system.medicalrecord.entity.MedicalRecord;
import com.ocms.online_clinic_management_system.medicalrecord.validator.MedicalRecordValidator;
import com.ocms.online_clinic_management_system.prescription.dto.request.CreatePrescriptionRequest;
import com.ocms.online_clinic_management_system.prescription.dto.request.PrescriptionDetailRequest;
import com.ocms.online_clinic_management_system.prescription.dto.request.PrescriptionSearchRequest;
import com.ocms.online_clinic_management_system.prescription.dto.response.PrescriptionPatientResponse;
import com.ocms.online_clinic_management_system.prescription.dto.response.PrescriptionResponse;
import com.ocms.online_clinic_management_system.prescription.entity.Prescription;
import com.ocms.online_clinic_management_system.prescription.entity.PrescriptionDetail;
import com.ocms.online_clinic_management_system.prescription.event.PrescriptionCreatedEvent;
import com.ocms.online_clinic_management_system.prescription.mapper.PrescriptionMapper;
import com.ocms.online_clinic_management_system.prescription.repository.PrescriptionRepository;
import com.ocms.online_clinic_management_system.prescription.service.PrescriptionService;
import com.ocms.online_clinic_management_system.prescription.specification.PrescriptionSpecification;
import com.ocms.online_clinic_management_system.prescription.validator.PrescriptionValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class PrescriptionServiceImpl implements PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;
    private final PrescriptionMapper prescriptionMapper;
    private final PrescriptionValidator prescriptionValidator;
    private final MedicineValidator medicineValidator;
    private final MedicalRecordValidator medicalRecordValidator;
    private final InventoryService inventoryService;
    private final InvoiceService invoiceService;
    private final SecurityHelper securityHelper;
    private final ApplicationEventPublisher eventPublisher;
    private final AppointmentService appointmentService;
    @Override
    @Transactional(readOnly = true)
    public PageResponse<PrescriptionPatientResponse> search(PrescriptionSearchRequest request, Pageable pageable) {

        Long currentUserId = securityHelper.getCurrentUserId();

        Specification<Prescription> specification = Specification.allOf(
                PrescriptionSpecification.hasPatientUserId(currentUserId),
                PrescriptionSpecification.hasKeyword(request.getKeyword()),
                PrescriptionSpecification.prescriptionDateFrom(request.getFromDate()),
                PrescriptionSpecification.prescriptionDateTo(request.getToDate())
        );

        Page<PrescriptionPatientResponse> responsePage = prescriptionRepository.findAll(specification, pageable).map(prescriptionMapper::toPatientResponse);

        return PageResponse.of(responsePage);
    }

    @Override
    @Transactional(readOnly = true)
    public PrescriptionResponse getByMedicalRecordId(Long medicalRecordId) {
        return prescriptionRepository.findByMedicalRecordId(medicalRecordId).map(prescriptionMapper::toResponse).orElse(null);
    }


    @Override
    @Transactional(readOnly = true)
    public PrescriptionPatientResponse getMyPrescriptionByMedicalRecord(Long medicalRecordId) {
        Prescription prescription = prescriptionRepository.findByMedicalRecordId(medicalRecordId).orElse(null);

        if (prescription == null) {
            return null;
        }
        Long currentUserId = securityHelper.getCurrentUserId();
        prescriptionValidator.validatePatientOwnership(prescription, currentUserId);

        return prescriptionMapper.toPatientResponse(prescription);
    }

    @Override
    @Transactional(readOnly = true)
    public PrescriptionPatientResponse getMyPrescription(Long prescriptionId) {

        Prescription prescription = prescriptionValidator.validatePrescriptionExists(prescriptionId);
        Long currentUserId = securityHelper.getCurrentUserId();
        prescriptionValidator.validatePatientOwnership(prescription, currentUserId);

        return prescriptionMapper.toPatientResponse(prescription);
    }

    @Override
    public PrescriptionResponse create(Long medicalRecordId, CreatePrescriptionRequest request) {

        MedicalRecord medicalRecord = medicalRecordValidator.validateMedicalRecordById(medicalRecordId);
        Long currentUserId = securityHelper.getCurrentUserId();

        medicalRecordValidator.validateDoctorOwnership(medicalRecord, currentUserId);
        medicalRecordValidator.validateAppointmentInProgress(medicalRecord);
        prescriptionValidator.validatePrescriptionNotExists(medicalRecordId);

        Doctor doctor = medicalRecord.getDoctor();

        Prescription prescription = Prescription.builder()
                .medicalRecord(medicalRecord)
                .doctor(doctor)
                .prescriptionDate(LocalDateTime.now())
                .note(request.getNote())
                .build();

        List<PrescriptionDetail> details = new ArrayList<>();


        for (PrescriptionDetailRequest detailRequest : request.getDetails()) {
            Medicine medicine = medicineValidator.validateMedicineExists(detailRequest.getMedicineId());
            PrescriptionDetail detail = prescriptionMapper.toDetailEntity(detailRequest);
            detail.setPrescription(prescription);
            detail.setMedicine(medicine);
             detail.setUnitPrice(medicine.getPrice());
            details.add(detail);
        }

        prescription.setDetails(details);
        prescription = prescriptionRepository.save(prescription);

        ExportMedicineRequest exportRequest = buildExportMedicineRequest(prescription);

        inventoryService.exportMedicine(exportRequest);
        invoiceService.addPrescriptionToInvoice(prescription);

        publishPrescriptionCreatedEvent(prescription, medicalRecord);
        appointmentService.completeByMedicalRecordId(medicalRecordId);
        return prescriptionMapper.toResponse(prescription);
    }

    @Override
    @Transactional(readOnly = true)
    public PrescriptionResponse getById(Long prescriptionId) {
        Prescription prescription = prescriptionValidator.validatePrescriptionExists(prescriptionId);
        return prescriptionMapper.toResponse(prescription);
    }


    private ExportMedicineRequest buildExportMedicineRequest(Prescription prescription) {

        List<ExportMedicineDetailRequest> details =
                prescription.getDetails().stream().map(detail -> {
                            ExportMedicineDetailRequest request = new ExportMedicineDetailRequest();

                            request.setMedicineId(detail.getMedicine().getId());
                            request.setPrescriptionDetailId(detail.getId());
                            request.setQuantity(detail.getQuantity());

                            return request;
                        }).toList();

        ExportMedicineRequest request = new ExportMedicineRequest();

        request.setPrescriptionId(prescription.getId());
        request.setDetails(details);

        return request;
    }


    private void publishPrescriptionCreatedEvent(Prescription prescription, MedicalRecord medicalRecord) {
        eventPublisher.publishEvent(
                new PrescriptionCreatedEvent(
                        prescription.getId(),
                        medicalRecord.getId(),
                        medicalRecord.getPatient().getId(),
                        medicalRecord.getPatient().getUser().getId(),
                        prescription.getDoctor().getId()
                )
        );
    }
}