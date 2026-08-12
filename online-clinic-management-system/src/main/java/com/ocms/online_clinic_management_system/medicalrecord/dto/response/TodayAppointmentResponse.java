package com.ocms.online_clinic_management_system.medicalrecord.dto.response;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TodayAppointmentResponse {

    private Long appointmentId;

    private Long patientId;

    private String patientName;

    private String patientPhone;

    private Long serviceId;

    private String serviceName;

    private LocalDate workDate;

    private LocalTime startTime;

    private LocalTime endTime;

    private String appointmentStatus;
}