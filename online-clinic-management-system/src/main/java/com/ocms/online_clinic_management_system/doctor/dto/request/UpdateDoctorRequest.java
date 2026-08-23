package com.ocms.online_clinic_management_system.doctor.dto.request;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateDoctorRequest {

    @NotNull
    private Long specialtyId;
    @Size(max = 150)
    private String degree;
    @Min(0)
    private Integer experienceYears;

}