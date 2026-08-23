package com.ocms.online_clinic_management_system.service.service.impl;
import com.ocms.online_clinic_management_system.common.constant.enums.MedicalServiceType;
import com.ocms.online_clinic_management_system.common.response.PageResponse;
import com.ocms.online_clinic_management_system.service.dto.request.CreateMedicalServiceRequest;
import com.ocms.online_clinic_management_system.service.dto.request.PatchMedicalServiceRequest;
import com.ocms.online_clinic_management_system.service.dto.request.UpdateMedicalServiceRequest;
import com.ocms.online_clinic_management_system.service.dto.response.MedicalServiceDetailResponse;
import com.ocms.online_clinic_management_system.service.dto.response.MedicalServiceResponse;
import com.ocms.online_clinic_management_system.service.entity.MedicalService;
import com.ocms.online_clinic_management_system.service.mapper.MedicalServiceMapper;
import com.ocms.online_clinic_management_system.service.repository.MedicalServiceRepository;
import com.ocms.online_clinic_management_system.service.service.MedicalServiceService;
import com.ocms.online_clinic_management_system.service.specification.MedicalServiceSpecification;
import com.ocms.online_clinic_management_system.service.validator.MedicalServiceValidator;
import com.ocms.online_clinic_management_system.specialty.entity.Specialty;
import com.ocms.online_clinic_management_system.specialty.validator.SpecialtyValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class MedicalServiceServiceImpl implements MedicalServiceService {

    private final MedicalServiceRepository medicalServiceRepository;
    private final MedicalServiceMapper medicalServiceMapper;
    private final MedicalServiceValidator medicalServiceValidator;
    private final SpecialtyValidator specialtyValidator;

    @Override
    @Transactional(readOnly = true)
    public List<MedicalServiceResponse> getExaminationServicesBySpecialty(Long specialtyId) {

        specialtyValidator.validateSpecialtyExists(specialtyId);

        return medicalServiceRepository
                .findAllBySpecialty_IdAndServiceTypeOrderByServiceName(specialtyId, MedicalServiceType.EXAM)
                .stream()
                .map(medicalServiceMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<MedicalServiceResponse> getBySpecialty(Long specialtyId) {

        specialtyValidator.validateSpecialtyExists(specialtyId);

        return medicalServiceRepository
                .findAllBySpecialty_IdOrderByServiceName(specialtyId)
                .stream()
                .map(medicalServiceMapper::toResponse)
                .toList();
    }


    @Override
    public MedicalServiceResponse create(CreateMedicalServiceRequest request) {

        Specialty specialty = specialtyValidator.validateSpecialtyExists(request.getSpecialtyId());
        medicalServiceValidator.validateMedicalServiceNameNotExists(request.getServiceName(), request.getSpecialtyId());

        MedicalService medicalService = medicalServiceMapper.toEntity(request);

        medicalService.setSpecialty(specialty);
        medicalService = medicalServiceRepository.save(medicalService);

        return medicalServiceMapper.toResponse(medicalService);
    }

    @Override
    public MedicalServiceResponse update(Long medicalServiceId, UpdateMedicalServiceRequest request) {

        MedicalService medicalService = medicalServiceValidator.validateMedicalServiceExists(medicalServiceId);

        Specialty specialty = specialtyValidator.validateSpecialtyExists(request.getSpecialtyId());

        boolean changed = !medicalService.getServiceName().equalsIgnoreCase(request.getServiceName())
                        || !medicalService.getSpecialty().getId().equals(request.getSpecialtyId());

        if (changed) {
            medicalServiceValidator.validateMedicalServiceNameNotExists(request.getServiceName(), request.getSpecialtyId());
        }

        medicalServiceMapper.updateEntity(request, medicalService);

        medicalService.setSpecialty(specialty);
        medicalService = medicalServiceRepository.save(medicalService);

        return medicalServiceMapper.toResponse(medicalService);
    }

    @Override
    public void delete(Long medicalServiceId) {
        MedicalService medicalService = medicalServiceValidator.validateMedicalServiceExists(medicalServiceId);
        medicalServiceRepository.delete(medicalService);
    }

    @Override
    @Transactional(readOnly = true)
    public MedicalServiceDetailResponse getById(Long medicalServiceId) {
        MedicalService medicalService = medicalServiceValidator.validateMedicalServiceExists(medicalServiceId);
        return medicalServiceMapper.toDetailResponse(medicalService);
    }


    @Override
    @Transactional
    public MedicalServiceResponse partialUpdate(Long medicalServiceId, PatchMedicalServiceRequest request) {

        MedicalService medicalService = medicalServiceValidator.validateMedicalServiceExists(medicalServiceId);
        Long newSpecialtyId = request.getSpecialtyId() != null ? request.getSpecialtyId() : medicalService.getSpecialty().getId();
        String newServiceName = request.getServiceName() != null ? request.getServiceName() : medicalService.getServiceName();

        if (!newServiceName.equalsIgnoreCase(medicalService.getServiceName()) || !newSpecialtyId.equals(medicalService.getSpecialty().getId())) {
            medicalServiceValidator.validateMedicalServiceNameNotExists(newServiceName, newSpecialtyId);
        }

        if (request.getSpecialtyId() != null) {
            Specialty specialty = specialtyValidator.validateSpecialtyExists(newSpecialtyId);
            medicalService.setSpecialty(specialty);
        }
        medicalServiceMapper.patchEntity(request, medicalService);
        medicalServiceRepository.save(medicalService);
        return medicalServiceMapper.toResponse(medicalService);
    }



    @Override
    @Transactional(readOnly = true)
    public PageResponse<MedicalServiceResponse> getAll(String keyword, Long specialtyId,int page, int size, String sortBy, String direction) {

        Sort.Direction sortDirection = Sort.Direction.fromString(direction);
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));
        Specification<MedicalService> specification = Specification.allOf(
                MedicalServiceSpecification.hasServiceName(keyword),
                MedicalServiceSpecification.hasSpecialty(specialtyId)
        );

        Page<MedicalService> medicalServicePage = medicalServiceRepository.findAll(specification, pageable);
        Page<MedicalServiceResponse> responsePage = medicalServicePage.map(medicalServiceMapper::toResponse);

        return PageResponse.of(responsePage);
    }
}