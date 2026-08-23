package com.ocms.online_clinic_management_system.patient.dto.response;
import com.ocms.online_clinic_management_system.common.constant.enums.BloodType;
import com.ocms.online_clinic_management_system.common.constant.enums.Gender;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
public class PatientDetailResponse {

    private Long userId;
    private String username;
    private String fullName;
    private String email;
    private String phone;
    private LocalDate dateOfBirth;
    private Gender gender;

    private Long patientId;
    private String citizenId;
    private String address;
    private BloodType bloodType;
    private String allergyInfo;
    private String medicalHistory;
    private String emergencyContact;

}