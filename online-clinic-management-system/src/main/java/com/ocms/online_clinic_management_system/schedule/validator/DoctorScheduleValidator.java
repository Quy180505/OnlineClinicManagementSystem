package com.ocms.online_clinic_management_system.schedule.validator;

import com.ocms.online_clinic_management_system.schedule.dto.request.CreateDoctorScheduleRequest;
import com.ocms.online_clinic_management_system.schedule.dto.request.UpdateDoctorScheduleRequest;
import com.ocms.online_clinic_management_system.schedule.exception.InvalidScheduleTimeException;
import org.springframework.stereotype.Component;

import java.time.LocalTime;

@Component
public class DoctorScheduleValidator {

    public void validate(CreateDoctorScheduleRequest request) {
        validateTime(request.getStartTime(), request.getEndTime());
    }

    public void validate(UpdateDoctorScheduleRequest request) {
        validateTime(request.getStartTime(), request.getEndTime());
    }

    private void validateTime(LocalTime startTime, LocalTime endTime) {
        if (!startTime.isBefore(endTime)) {
            throw new InvalidScheduleTimeException();
        }
    }

}