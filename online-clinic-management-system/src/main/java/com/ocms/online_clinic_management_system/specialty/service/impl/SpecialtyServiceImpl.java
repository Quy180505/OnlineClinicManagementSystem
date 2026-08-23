package com.ocms.online_clinic_management_system.specialty.service.impl;
import com.ocms.online_clinic_management_system.common.response.PageResponse;
import com.ocms.online_clinic_management_system.specialty.dto.request.CreateSpecialtyRequest;
import com.ocms.online_clinic_management_system.specialty.dto.request.UpdateSpecialtyRequest;
import com.ocms.online_clinic_management_system.specialty.dto.response.SpecialtyDetailResponse;
import com.ocms.online_clinic_management_system.specialty.dto.response.SpecialtyResponse;
import com.ocms.online_clinic_management_system.specialty.entity.Specialty;
import com.ocms.online_clinic_management_system.specialty.mapper.SpecialtyMapper;
import com.ocms.online_clinic_management_system.specialty.repository.SpecialtyRepository;
import com.ocms.online_clinic_management_system.specialty.service.SpecialtyService;
import com.ocms.online_clinic_management_system.specialty.specification.SpecialtySpecification;
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
public class SpecialtyServiceImpl implements SpecialtyService {

    private final SpecialtyRepository specialtyRepository;
    private final SpecialtyMapper specialtyMapper;
    private final SpecialtyValidator specialtyValidator;

    @Override
    @Transactional(readOnly = true)
    public List<SpecialtyResponse> getAll() {
        return specialtyRepository.findAll(Sort.by("name")).stream().map(specialtyMapper::toSpecialtyResponse).toList();
    }
    @Override
    public SpecialtyResponse create(CreateSpecialtyRequest request) {

        specialtyValidator.validateSpecialtyNameNotExists(request.getName());
        Specialty specialty = specialtyMapper.toEntity(request);
        specialty = specialtyRepository.save(specialty);

        return specialtyMapper.toSpecialtyResponse(specialty);
    }

    @Override
    public SpecialtyResponse update(Long specialtyId, UpdateSpecialtyRequest request) {

        Specialty specialty = specialtyValidator.validateSpecialtyExists(specialtyId);

        if (!specialty.getName().equalsIgnoreCase(request.getName())) {
            specialtyValidator.validateSpecialtyNameNotExists(request.getName());
        }

        specialtyMapper.updateFromRequest(request, specialty);
        specialty = specialtyRepository.save(specialty);

        return specialtyMapper.toSpecialtyResponse(specialty);
    }

    @Override
    public void delete(Long specialtyId) {
        Specialty specialty = specialtyValidator.validateSpecialtyExists(specialtyId);
        specialtyRepository.delete(specialty);
    }

    @Override
    @Transactional
    public SpecialtyResponse partialUpdate(Long specialtyId, UpdateSpecialtyRequest request) {

        Specialty specialty = specialtyValidator.validateSpecialtyExists(specialtyId);

        if (request.getName() != null && !request.getName().equalsIgnoreCase(specialty.getName()))
        {
            specialtyValidator.validateSpecialtyNameNotExists(request.getName());
        }

        specialtyMapper.updateFromRequest(request, specialty);
        specialtyRepository.save(specialty);

        return specialtyMapper.toSpecialtyResponse(specialty);
    }

    @Override
    @Transactional(readOnly = true)
    public SpecialtyDetailResponse getById(Long specialtyId) {
        Specialty specialty = specialtyValidator.validateSpecialtyExists(specialtyId);
        return specialtyMapper.toSpecialtyDetailResponse(specialty);
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<SpecialtyResponse> getAll(String keyword, int page, int size, String sortBy, String direction) {

        Sort.Direction sortDirection = Sort.Direction.fromString(direction);
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));
        Specification<Specialty> specification = SpecialtySpecification.hasName(keyword);
        Page<Specialty> specialtyPage = specialtyRepository.findAll(specification, pageable);
        Page<SpecialtyResponse> responsePage = specialtyPage.map(specialtyMapper::toSpecialtyResponse);

        return PageResponse.of(responsePage);
    }
}