package com.ocms.online_clinic_management_system.laboratory.service.impl;
import com.ocms.online_clinic_management_system.auth.security.SecurityHelper;
import com.ocms.online_clinic_management_system.common.constant.enums.TestOrderStatus;
import com.ocms.online_clinic_management_system.common.event.DomainEventPublisher;
import com.ocms.online_clinic_management_system.doctor.entity.Doctor;
import com.ocms.online_clinic_management_system.doctor.exception.DoctorNotFoundException;
import com.ocms.online_clinic_management_system.doctor.repository.DoctorRepository;
import com.ocms.online_clinic_management_system.laboratory.dto.request.CreateTestOrderRequest;
import com.ocms.online_clinic_management_system.laboratory.dto.request.UpdateLabResultRequest;
import com.ocms.online_clinic_management_system.laboratory.dto.response.LabResultResponse;
import com.ocms.online_clinic_management_system.laboratory.dto.response.PatientLabResultDetailResponse;
import com.ocms.online_clinic_management_system.laboratory.dto.response.PatientLabResultResponse;
import com.ocms.online_clinic_management_system.laboratory.dto.response.TestOrderResponse;
import com.ocms.online_clinic_management_system.laboratory.entity.LabResult;
import com.ocms.online_clinic_management_system.laboratory.entity.TestOrder;
import com.ocms.online_clinic_management_system.laboratory.entity.TestOrderDetail;
import com.ocms.online_clinic_management_system.laboratory.event.LabResultUpdatedEvent;
import com.ocms.online_clinic_management_system.laboratory.event.TestOrderCreatedEvent;
import com.ocms.online_clinic_management_system.laboratory.exception.LabResultNotFoundException;
import com.ocms.online_clinic_management_system.laboratory.mapper.LabResultMapper;
import com.ocms.online_clinic_management_system.laboratory.mapper.TestOrderMapper;
import com.ocms.online_clinic_management_system.laboratory.repository.LabResultRepository;
import com.ocms.online_clinic_management_system.laboratory.repository.TestOrderDetailRepository;
import com.ocms.online_clinic_management_system.laboratory.repository.TestOrderRepository;
import com.ocms.online_clinic_management_system.laboratory.service.LaboratoryService;
import com.ocms.online_clinic_management_system.laboratory.validator.LaboratoryValidator;
import com.ocms.online_clinic_management_system.medicalrecord.entity.MedicalRecord;
import com.ocms.online_clinic_management_system.medicalrecord.validator.MedicalRecordValidator;
import com.ocms.online_clinic_management_system.patient.entity.Patient;
import com.ocms.online_clinic_management_system.patient.exception.PatientNotFoundException;
import com.ocms.online_clinic_management_system.patient.repository.PatientRepository;
import com.ocms.online_clinic_management_system.service.entity.MedicalService;
import com.ocms.online_clinic_management_system.service.exception.MedicalServiceNotFoundException;
import com.ocms.online_clinic_management_system.service.repository.MedicalServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LaboratoryServiceImpl implements LaboratoryService {

    private final TestOrderRepository testOrderRepository;
    private final TestOrderDetailRepository testOrderDetailRepository;
    private final LabResultRepository labResultRepository;
    private final MedicalServiceRepository medicalServiceRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final LaboratoryValidator laboratoryValidator;
    private final MedicalRecordValidator medicalRecordValidator;
    private final TestOrderMapper testOrderMapper;
    private final LabResultMapper labResultMapper;
    private final SecurityHelper securityHelper;
    private final DomainEventPublisher domainEventPublisher;


    @Override
    public List<PatientLabResultResponse> getMyLabResults() {

        Long currentUserId = securityHelper.getCurrentUserId();
        Patient patient = patientRepository.findByUserId(currentUserId).orElseThrow(PatientNotFoundException::new);
        List<LabResult> labResults = labResultRepository.findByTestOrderDetail_TestOrder_MedicalRecord_Patient_IdAndTestOrderDetail_TestOrder_StatusOrderByResultDateDesc(patient.getId(),TestOrderStatus.COMPLETED);
        return labResultMapper.toPatientLabResultResponseList(labResults);
    }

    @Override
    public PatientLabResultDetailResponse getMyLabResult(Long labResultId) {

        Long currentUserId = securityHelper.getCurrentUserId();
        Patient patient = patientRepository.findByUserId(currentUserId).orElseThrow(PatientNotFoundException::new);
        LabResult labResult = labResultRepository.findById(labResultId).orElseThrow(LabResultNotFoundException::new);
        laboratoryValidator.validateLabResultPatientOwnership(labResult, patient.getId());
        laboratoryValidator.validateTestOrderCompleted(labResult);
        return labResultMapper.toPatientLabResultDetailResponse(labResult);
    }

    @Override
    @Transactional
    public TestOrderResponse startTestOrder(Long testOrderId) {

        TestOrder testOrder = laboratoryValidator.validateTestOrderExists(testOrderId);
        laboratoryValidator.validateTestOrderCanStart(testOrder);
        testOrder.setStatus(TestOrderStatus.IN_PROGRESS);
        TestOrder savedTestOrder = testOrderRepository.save(testOrder);

        return testOrderMapper.toResponse(savedTestOrder);
    }


    @Override
    @Transactional
    public TestOrderResponse createTestOrder(Long medicalRecordId, CreateTestOrderRequest request) {

        Long currentUserId = securityHelper.getCurrentUserId();
        Doctor doctor = doctorRepository.findByUserId(currentUserId).orElseThrow(DoctorNotFoundException::new);
        MedicalRecord medicalRecord = medicalRecordValidator.validateMedicalRecordById(medicalRecordId);

        medicalRecordValidator.validateDoctorOwnership(medicalRecord, currentUserId);
        medicalRecordValidator.validateAppointmentInProgress(medicalRecord);

        TestOrder testOrder = TestOrder.builder()
                .medicalRecord(medicalRecord)
                .doctor(doctor)
                .orderDate(LocalDateTime.now())
                .status(TestOrderStatus.PENDING)
                .build();

        List<TestOrderDetail> details = request.getServiceIds()
                .stream()
                .map(serviceId -> createTestOrderDetail(testOrder, serviceId, doctor))
                .toList();

        testOrder.setDetails(details);

        TestOrder savedTestOrder = testOrderRepository.save(testOrder);

        domainEventPublisher.publish(new TestOrderCreatedEvent(
                        savedTestOrder.getId(),
                        medicalRecord.getId(),
                        medicalRecord.getPatient().getId(),
                        medicalRecord.getPatient().getUser().getId(),
                        doctor.getId()
                )
        );

        return testOrderMapper.toResponse(savedTestOrder);
    }

    private TestOrderDetail createTestOrderDetail(TestOrder testOrder, Long serviceId, Doctor doctor) {
        MedicalService medicalService = medicalServiceRepository.findById(serviceId).orElseThrow(MedicalServiceNotFoundException::new);

        laboratoryValidator.validateServiceIsTest(medicalService);
        laboratoryValidator.validateServiceBelongsToDoctorSpecialty(medicalService, doctor);

        return TestOrderDetail.builder()
                .testOrder(testOrder)
                .service(medicalService)
                .build();
    }

    @Override
    public TestOrderResponse getTestOrder(Long testOrderId) {

        TestOrder testOrder = laboratoryValidator.validateTestOrderExists(testOrderId);

        return testOrderMapper.toResponse(testOrder);
    }

    @Override
    @Transactional
    public LabResultResponse updateLabResult(Long testOrderDetailId, UpdateLabResultRequest request) {

        TestOrderDetail testOrderDetail = laboratoryValidator.validateTestOrderDetailExists(testOrderDetailId);
        TestOrder testOrder = testOrderDetail.getTestOrder();

        laboratoryValidator.validateTestOrderCanReceiveResult(testOrder);
        laboratoryValidator.validateLabResultNotExists(testOrderDetailId);

        LabResult labResult = LabResult.builder()
                .testOrderDetail(testOrderDetail)
                .resultContent(request.getResultContent())
                .resultDate(LocalDateTime.now())
                .build();

        LabResult savedLabResult = labResultRepository.save(labResult);

        updateTestOrderStatusAfterResult(testOrder);

        domainEventPublisher.publish(new LabResultUpdatedEvent(
                        savedLabResult.getId(),
                        testOrderDetail.getId(),
                        testOrder.getId(),
                        testOrder.getMedicalRecord().getId(),
                        testOrder.getMedicalRecord().getPatient().getId(),
                        testOrder.getDoctor().getId()
                )
        );

        return labResultMapper.toResponse(savedLabResult);
    }

    private void updateTestOrderStatusAfterResult(TestOrder testOrder) {
        boolean  hasIncompleteDetails = testOrderDetailRepository.existsByTestOrderIdAndLabResultIsNull(testOrder.getId());

        if (!hasIncompleteDetails) {
            testOrder.setStatus(TestOrderStatus.COMPLETED);
            testOrderRepository.save(testOrder);
        }
    }

    @Override
    public LabResultResponse getLabResult(Long testOrderDetailId) {

        laboratoryValidator.validateTestOrderDetailExists(testOrderDetailId);
        LabResult labResult = laboratoryValidator.validateLabResultExists(testOrderDetailId);

        return labResultMapper.toResponse(labResult);
    }
}