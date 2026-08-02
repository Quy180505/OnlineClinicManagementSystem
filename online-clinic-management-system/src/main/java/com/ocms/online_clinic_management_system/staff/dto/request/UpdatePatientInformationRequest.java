package com.ocms.online_clinic_management_system.staff.dto.request;

import com.ocms.online_clinic_management_system.common.constant.enums.Gender;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class UpdatePatientInformationRequest {

    @Size(max = 100)
    private String fullName;

    @Size(max = 20)
    private String phone;

    private LocalDate dateOfBirth;

    private Gender gender;

    @Size(max = 20)
    private String citizenId;

    @Size(max = 255)
    private String address;

    @Size(max = 100)
    private String emergencyContact;
}