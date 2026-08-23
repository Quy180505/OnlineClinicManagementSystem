package com.ocms.online_clinic_management_system.service.validator;
import com.ocms.online_clinic_management_system.service.entity.MedicalService;
import com.ocms.online_clinic_management_system.service.exception.MedicalServiceAlreadyExistsException;
import com.ocms.online_clinic_management_system.service.exception.MedicalServiceNotFoundException;
import com.ocms.online_clinic_management_system.service.repository.MedicalServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MedicalServiceValidator {

    private final MedicalServiceRepository medicalServiceRepository;

    public MedicalService validateMedicalServiceExists(Long medicalServiceId)
    {
        return medicalServiceRepository.findById(medicalServiceId).orElseThrow(MedicalServiceNotFoundException::new);
    }

    public void validateMedicalServiceNameNotExists(String serviceName, Long specialtyId) {
        if (medicalServiceRepository.existsByServiceNameAndSpecialty_Id(serviceName, specialtyId)) {
            throw new MedicalServiceAlreadyExistsException();
        }

    }

}