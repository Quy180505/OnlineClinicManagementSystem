package com.ocms.online_clinic_management_system.laboratory.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateTestOrderRequest {

    @NotEmpty(message = "Service IDs must not be empty")
    private List<@NotNull(message = "Service ID must not be null") Long> serviceIds;
}