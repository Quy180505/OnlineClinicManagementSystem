package com.ocms.online_clinic_management_system.schedule.dto.request;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class UpdateDoctorScheduleRequest {

    @NotNull
    @FutureOrPresent
    private LocalDate workDate;

    @NotNull
    private LocalTime startTime;

    @NotNull
    private LocalTime endTime;

    @NotNull
    @Min(1)
    private Integer maxPatients;

}