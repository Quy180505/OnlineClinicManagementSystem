package com.ocms.online_clinic_management_system.appointment.service.impl;

import com.ocms.online_clinic_management_system.appointment.dto.response.AppointmentStatusResponse;
import com.ocms.online_clinic_management_system.appointment.mapper.AppointmentStatusMapper;
import com.ocms.online_clinic_management_system.appointment.repository.AppointmentStatusRepository;
import com.ocms.online_clinic_management_system.appointment.service.AppointmentStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AppointmentStatusServiceImpl implements AppointmentStatusService {

    private final AppointmentStatusRepository appointmentStatusRepository;
    private final AppointmentStatusMapper appointmentStatusMapper;

    @Override
    public List<AppointmentStatusResponse> getAll() {
        return appointmentStatusRepository.findAll().stream().map(appointmentStatusMapper::toResponse).toList();
    }
}