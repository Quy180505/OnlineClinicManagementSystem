package com.ocms.online_clinic_management_system.laboratory.dto.request;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateLabResultRequest {

    @NotBlank(message = "Result content must not be blank")
    @Size(max = 5000, message = "Result content must not exceed 5000 characters")
    private String resultContent;
}