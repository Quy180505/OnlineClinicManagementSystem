package com.ocms.online_clinic_management_system.appointment.dto.request;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RejectAppointmentRequest {

    @NotBlank(message = "Rejection reason must not be blank")
    @Size(max = 500, message = "Rejection reason must not exceed 500 characters")
    private String reason;

}