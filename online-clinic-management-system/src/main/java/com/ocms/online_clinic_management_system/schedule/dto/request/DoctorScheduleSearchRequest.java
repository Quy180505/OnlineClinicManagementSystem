package com.ocms.online_clinic_management_system.schedule.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class DoctorScheduleSearchRequest {

    private Long doctorId;

    private LocalDate workDate;

}