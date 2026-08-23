package com.ocms.online_clinic_management_system.schedule.validator;
import com.ocms.online_clinic_management_system.schedule.dto.request.CreateDoctorScheduleRequest;
import com.ocms.online_clinic_management_system.schedule.dto.request.UpdateDoctorScheduleRequest;
import com.ocms.online_clinic_management_system.schedule.entity.DoctorSchedule;
import com.ocms.online_clinic_management_system.schedule.exception.DoctorScheduleNotFoundException;
import com.ocms.online_clinic_management_system.schedule.exception.InvalidScheduleTimeException;
import com.ocms.online_clinic_management_system.schedule.repository.DoctorScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import java.time.LocalTime;

@Component
@RequiredArgsConstructor
public class DoctorScheduleValidator {

    private final DoctorScheduleRepository doctorScheduleRepository;

    public DoctorSchedule validateScheduleExists(Long scheduleId) {
        return doctorScheduleRepository.findById(scheduleId).orElseThrow(DoctorScheduleNotFoundException::new);
    }


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