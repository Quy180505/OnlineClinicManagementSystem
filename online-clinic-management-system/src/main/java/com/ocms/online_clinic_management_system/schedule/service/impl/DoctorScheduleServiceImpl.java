package com.ocms.online_clinic_management_system.schedule.service.impl;
import com.ocms.online_clinic_management_system.common.constant.enums.ScheduleStatus;
import com.ocms.online_clinic_management_system.common.response.PageResponse;
import com.ocms.online_clinic_management_system.doctor.entity.Doctor;
import com.ocms.online_clinic_management_system.doctor.exception.DoctorNotFoundException;
import com.ocms.online_clinic_management_system.doctor.repository.DoctorRepository;
import com.ocms.online_clinic_management_system.schedule.dto.request.CreateDoctorScheduleRequest;
import com.ocms.online_clinic_management_system.schedule.dto.request.DoctorScheduleSearchRequest;
import com.ocms.online_clinic_management_system.schedule.dto.request.UpdateDoctorScheduleRequest;
import com.ocms.online_clinic_management_system.schedule.dto.response.DoctorScheduleDetailResponse;
import com.ocms.online_clinic_management_system.schedule.dto.response.DoctorScheduleResponse;
import com.ocms.online_clinic_management_system.schedule.entity.DoctorSchedule;
import com.ocms.online_clinic_management_system.schedule.exception.DoctorScheduleNotFoundException;
import com.ocms.online_clinic_management_system.schedule.exception.DuplicateDoctorScheduleException;
import com.ocms.online_clinic_management_system.schedule.mapper.DoctorScheduleMapper;
import com.ocms.online_clinic_management_system.schedule.repository.DoctorScheduleRepository;
import com.ocms.online_clinic_management_system.schedule.service.DoctorScheduleService;
import com.ocms.online_clinic_management_system.schedule.specification.DoctorScheduleSpecification;
import com.ocms.online_clinic_management_system.schedule.validator.DoctorScheduleValidator;
import com.ocms.online_clinic_management_system.common.event.DomainEventPublisher;
import com.ocms.online_clinic_management_system.schedule.event.DoctorScheduleCreatedEvent;
import com.ocms.online_clinic_management_system.schedule.event.DoctorScheduleUpdatedEvent;
import com.ocms.online_clinic_management_system.schedule.event.DoctorScheduleDeletedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class DoctorScheduleServiceImpl implements DoctorScheduleService {

    private final DoctorScheduleRepository doctorScheduleRepository;
    private final DoctorRepository doctorRepository;
    private final DoctorScheduleMapper doctorScheduleMapper;
    private final DoctorScheduleValidator doctorScheduleValidator;
    private final DomainEventPublisher eventPublisher;

    @Override
    public DoctorScheduleDetailResponse create(CreateDoctorScheduleRequest request) {

        doctorScheduleValidator.validate(request);

        Doctor doctor = doctorRepository.findById(request.getDoctorId()).orElseThrow(DoctorNotFoundException::new);

        if (doctorScheduleRepository.existsOverlappingSchedule(doctor.getId(), request.getWorkDate(), request.getStartTime(), request.getEndTime()))
        {
            throw new DuplicateDoctorScheduleException();
        }

        DoctorSchedule schedule = doctorScheduleMapper.toEntity(request);
        schedule.setStatus(ScheduleStatus.AVAILABLE);
        schedule.setDoctor(doctor);

        doctorScheduleRepository.save(schedule);

        eventPublisher.publish(new DoctorScheduleCreatedEvent(schedule.getId(), doctor.getId()));

        return doctorScheduleMapper.toDetailResponse(schedule);
    }
    @Override
    @Transactional(readOnly = true)
    public PageResponse<DoctorScheduleResponse> getFuture(DoctorScheduleSearchRequest request, Pageable pageable) {

        Specification<DoctorSchedule> specification = Specification.allOf(
                DoctorScheduleSpecification.hasDoctorId(request.getDoctorId()),
                DoctorScheduleSpecification.hasSpecialtyId(request.getSpecialtyId()),
                DoctorScheduleSpecification.hasWorkDate(request.getWorkDate()),
                DoctorScheduleSpecification.isFuture()
        );

        Page<DoctorSchedule> page = doctorScheduleRepository.findAll(specification, pageable);

        return PageResponse.of(page.map(doctorScheduleMapper::toResponse));
    }
    @Override
    public DoctorScheduleDetailResponse update(Long id, UpdateDoctorScheduleRequest request) {

        doctorScheduleValidator.validate(request);

        DoctorSchedule schedule = doctorScheduleRepository.findById(id).orElseThrow(DoctorScheduleNotFoundException::new);

        if (doctorScheduleRepository.existsOverlappingScheduleForUpdate(id, schedule.getDoctor().getId(),
                                        request.getWorkDate(), request.getStartTime(), request.getEndTime()))
        {
            throw new DuplicateDoctorScheduleException();
        }

        doctorScheduleMapper.updateEntity(request, schedule);

        doctorScheduleRepository.save(schedule);

        eventPublisher.publish(new DoctorScheduleUpdatedEvent(schedule.getId(), schedule.getDoctor().getId()));

        return doctorScheduleMapper.toDetailResponse(schedule);
    }

    @Override
    public void delete(Long id) {
        DoctorSchedule schedule = doctorScheduleRepository.findById(id).orElseThrow(DoctorScheduleNotFoundException::new);
        eventPublisher.publish(new DoctorScheduleDeletedEvent(schedule.getId(), schedule.getDoctor().getId()));

        doctorScheduleRepository.delete(schedule);
    }

    @Override
    @Transactional(readOnly = true)
    public DoctorScheduleDetailResponse getById(Long id) {

        DoctorSchedule schedule = doctorScheduleRepository.findById(id).orElseThrow(DoctorScheduleNotFoundException::new);
        return doctorScheduleMapper.toDetailResponse(schedule);
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<DoctorScheduleResponse> getAll(DoctorScheduleSearchRequest request, Pageable pageable) {

        Specification<DoctorSchedule> specification = Specification.allOf(
                DoctorScheduleSpecification.hasDoctorId(request.getDoctorId()),
                DoctorScheduleSpecification.hasWorkDate(request.getWorkDate())
        );
        Page<DoctorSchedule> page = doctorScheduleRepository.findAll(specification, pageable);
        return PageResponse.of(page.map(doctorScheduleMapper::toResponse));
    }

}