package com.ocms.online_clinic_management_system.doctor.service.impl;
import com.ocms.online_clinic_management_system.common.response.PageResponse;
import com.ocms.online_clinic_management_system.doctor.dto.request.UpdateDoctorRequest;
import com.ocms.online_clinic_management_system.doctor.dto.response.DoctorResponse;
import com.ocms.online_clinic_management_system.doctor.dto.response.DoctorSummaryResponse;
import com.ocms.online_clinic_management_system.doctor.entity.Doctor;
import com.ocms.online_clinic_management_system.doctor.exception.DoctorNotFoundException;
import com.ocms.online_clinic_management_system.doctor.mapper.DoctorMapper;
import com.ocms.online_clinic_management_system.doctor.repository.DoctorRepository;
import com.ocms.online_clinic_management_system.doctor.service.DoctorService;
import com.ocms.online_clinic_management_system.specialty.entity.Specialty;
import com.ocms.online_clinic_management_system.specialty.exception.SpecialtyNotFoundException;
import com.ocms.online_clinic_management_system.specialty.repository.SpecialtyRepository;
import com.ocms.online_clinic_management_system.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepository doctorRepository;
    private final SpecialtyRepository specialtyRepository;
    private final DoctorMapper doctorMapper;

    @Override
    public void createDoctor(User user, Long specialtyId, String degree,Integer experiences){
        Specialty specialty = specialtyRepository.findById(specialtyId).orElseThrow(SpecialtyNotFoundException::new);

        Doctor doctor = Doctor.builder()
                        .user(user)
                        .specialty(specialty)
                        .degree(degree)
                        .experienceYears(experiences)
                        .build();
        doctorRepository.save(doctor);
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<DoctorSummaryResponse> getAllDoctors(Pageable pageable) {

        Page<Doctor> page = doctorRepository.findAll(pageable);

        return PageResponse.of(page.map(doctorMapper::toSummaryResponse));
    }

    @Override
    public DoctorResponse update(Long doctorId, UpdateDoctorRequest request){
        Doctor doctor = findEntity(doctorId);

        doctorMapper.updateDoctorFromRequest(request, doctor);
        return doctorMapper.toDoctorResponse(doctor);
    }


    @Override
    @Transactional(readOnly = true)
    public DoctorResponse findById(Long doctorId){
        return doctorMapper.toDoctorResponse(findEntity(doctorId));
    }


    public Doctor findEntity(Long id){
        return doctorRepository.findById(id).orElseThrow(DoctorNotFoundException::new);
    }
}