package com.ocms.online_clinic_management_system.inventory.validator;

import com.ocms.online_clinic_management_system.inventory.entity.Medicine;
import com.ocms.online_clinic_management_system.inventory.entity.MedicineCategory;
import com.ocms.online_clinic_management_system.inventory.exception.MedicineAlreadyExistsException;
import com.ocms.online_clinic_management_system.inventory.exception.MedicineCategoryNotFoundException;
import com.ocms.online_clinic_management_system.inventory.exception.MedicineNotFoundException;
import com.ocms.online_clinic_management_system.inventory.repository.MedicineCategoryRepository;
import com.ocms.online_clinic_management_system.inventory.repository.MedicineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MedicineValidator {

    private final MedicineRepository medicineRepository;

    public Medicine validateInactiveMedicineExists(Long medicineId) {
        return medicineRepository.findByIdAndIsActiveFalse(medicineId).orElseThrow(MedicineNotFoundException::new);
    }

    public Medicine validateMedicineExists(Long medicineId) {
        return medicineRepository.findByIdAndIsActiveTrue(medicineId).orElseThrow(MedicineNotFoundException::new);
    }


    public void validateMedicineNameNotExists(String medicineName) {
        if (medicineRepository.existsByMedicineNameIgnoreCase(medicineName)) {
            throw new MedicineAlreadyExistsException();
        }
    }

    public void validateMedicineNameNotExistsForUpdate(String medicineName, Long medicineId) {
        if (medicineRepository.existsByMedicineNameIgnoreCaseAndIdNot(medicineName, medicineId)) {
            throw new MedicineAlreadyExistsException();
        }
    }
}