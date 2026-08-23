package com.ocms.online_clinic_management_system.specialty.validator;
import com.ocms.online_clinic_management_system.specialty.entity.Specialty;
import com.ocms.online_clinic_management_system.specialty.exception.SpecialtyAlreadyExistsException;
import com.ocms.online_clinic_management_system.specialty.exception.SpecialtyNotFoundException;
import com.ocms.online_clinic_management_system.specialty.repository.SpecialtyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SpecialtyValidator {

    private final SpecialtyRepository specialtyRepository;

    public Specialty validateSpecialtyExists(Long specialtyId) {
        return specialtyRepository.findById(specialtyId).orElseThrow(SpecialtyNotFoundException::new);
    }

    public void validateSpecialtyNameNotExists(String specialtyName) {
        if (specialtyRepository.existsByName(specialtyName)) {
            throw new SpecialtyAlreadyExistsException();
        }

    }

}