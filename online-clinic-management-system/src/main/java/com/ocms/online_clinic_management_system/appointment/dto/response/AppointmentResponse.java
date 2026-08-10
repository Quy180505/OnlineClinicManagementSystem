package com.ocms.online_clinic_management_system.appointment.dto.response;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppointmentResponse {

    private Long id;

    private String appointmentStatus;

    private Long doctorId;

    private String doctorName;

    private Long serviceId;

    private String serviceName;

    private LocalDate appointmentDate;

    private LocalTime startTime;

    private LocalTime endTime;

}