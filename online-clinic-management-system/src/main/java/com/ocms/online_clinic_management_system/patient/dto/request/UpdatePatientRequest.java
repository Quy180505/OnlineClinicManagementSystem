package com.ocms.online_clinic_management_system.patient.dto.request;
import com.ocms.online_clinic_management_system.common.constant.enums.BloodType;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdatePatientRequest {

    @Size(max = 20)
    private String citizenId;
    @Size(max = 255)
    private String address;
    private BloodType bloodType;
    private String allergyInfo;
    private String medicalHistory;
    @Size(max = 100)
    private String emergencyContact;

}