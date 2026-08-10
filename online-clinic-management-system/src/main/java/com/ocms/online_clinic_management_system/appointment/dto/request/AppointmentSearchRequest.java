package com.ocms.online_clinic_management_system.appointment.dto.request;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppointmentSearchRequest {

    private Long patientId;

    private Long doctorId;

    private Long serviceId;

    private Long appointmentStatusId;

    private LocalDate fromDate;

    private LocalDate toDate;

}