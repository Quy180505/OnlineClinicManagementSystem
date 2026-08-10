package com.ocms.online_clinic_management_system.appointment.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateAppointmentRequest {

    @NotNull(message = "Service ID must not be null")
    private Long serviceId;

    @NotNull(message = "Schedule ID must not be null")
    private Long scheduleId;

    private String note;
}