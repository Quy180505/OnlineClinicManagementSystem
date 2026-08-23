package com.ocms.online_clinic_management_system.appointment.dto.request;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CancelAppointmentRequest {

    @NotBlank(message = "Cancellation reason must not be blank")
    @Size(max = 500, message = "Cancellation reason must not exceed 500 characters")
    private String reason;
}