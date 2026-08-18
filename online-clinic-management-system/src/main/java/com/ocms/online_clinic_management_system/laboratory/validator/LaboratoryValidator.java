package com.ocms.online_clinic_management_system.laboratory.validator;

import com.ocms.online_clinic_management_system.common.constant.enums.MedicalServiceType;
import com.ocms.online_clinic_management_system.common.constant.enums.TestOrderStatus;
import com.ocms.online_clinic_management_system.laboratory.entity.LabResult;
import com.ocms.online_clinic_management_system.laboratory.entity.TestOrder;
import com.ocms.online_clinic_management_system.laboratory.entity.TestOrderDetail;
import com.ocms.online_clinic_management_system.laboratory.exception.*;
import com.ocms.online_clinic_management_system.laboratory.repository.LabResultRepository;
import com.ocms.online_clinic_management_system.laboratory.repository.TestOrderDetailRepository;
import com.ocms.online_clinic_management_system.laboratory.repository.TestOrderRepository;
import com.ocms.online_clinic_management_system.service.entity.MedicalService;
import com.ocms.online_clinic_management_system.doctor.entity.Doctor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class LaboratoryValidator {

    private final TestOrderRepository testOrderRepository;
    private final TestOrderDetailRepository testOrderDetailRepository;
    private final LabResultRepository labResultRepository;

    public TestOrder validateTestOrderExists(Long testOrderId) {
        return testOrderRepository.findById(testOrderId).orElseThrow(TestOrderNotFoundException::new);
    }

    public void validateTestOrderDoctorOwnership(TestOrder testOrder, Long currentUserId) {
        if (!testOrder.getDoctor().getUser().getId().equals(currentUserId)) {
            throw new LaboratoryAccessDeniedException();
        }
    }

    public void validateServiceIsTest(MedicalService medicalService) {
        if (medicalService.getServiceType() != MedicalServiceType.TEST) {
            throw new InvalidLabServiceTypeException();
        }
    }

    public TestOrderDetail validateTestOrderDetailExists(Long testOrderDetailId) {
        return testOrderDetailRepository.findById(testOrderDetailId).orElseThrow(TestOrderDetailNotFoundException::new);
    }

    public void validateTestOrderDetailBelongsToOrder(TestOrderDetail testOrderDetail, Long testOrderId) {
        if (!testOrderDetail.getTestOrder().getId().equals(testOrderId)) {
            throw new LaboratoryAccessDeniedException();
        }
    }

    public LabResult validateLabResultExists(Long testOrderDetailId) {
        return labResultRepository.findByTestOrderDetailId(testOrderDetailId).orElseThrow(LabResultNotFoundException::new);
    }

    public void validateLabResultNotExists(Long testOrderDetailId) {
        if (labResultRepository.existsByTestOrderDetailId(testOrderDetailId)) {
            throw new LabResultAlreadyExistsException();
        }
    }

    public void validateTestOrderCanStart(TestOrder testOrder) {
        if (testOrder.getStatus() != TestOrderStatus.PENDING) {
            throw new InvalidTestOrderStatusException();
        }
    }

    public void validateTestOrderCanReceiveResult(TestOrder testOrder) {
        if (testOrder.getStatus() != TestOrderStatus.IN_PROGRESS) {
            throw new InvalidTestOrderStatusException();
        }
    }

    public void validateTestOrderCompleted(LabResult labResult) {
        if (labResult.getTestOrderDetail().getTestOrder().getStatus() != TestOrderStatus.COMPLETED) {
            throw new InvalidTestOrderStatusException();
        }
    }

    public void validateServiceBelongsToDoctorSpecialty(MedicalService medicalService, Doctor doctor) {
        if (!medicalService.getSpecialty().getId().equals(doctor.getSpecialty().getId())) {
            throw new InvalidLabServiceException();
        }
    }

    public void validateLabResultPatientOwnership(LabResult labResult, Long patientId) {
        Long resultPatientId = labResult.getTestOrderDetail().getTestOrder().getMedicalRecord().getPatient().getId();
        if (!resultPatientId.equals(patientId)) {
            throw new LaboratoryAccessDeniedException();
        }
    }
}