package com.ocms.online_clinic_management_system.staff.dto.response;

import com.ocms.online_clinic_management_system.common.constant.enums.BloodType;
import com.ocms.online_clinic_management_system.common.constant.enums.Gender;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class PatientManagementResponse {

    private Long patientId;

    private Long userId;

    private String fullName;

    private String phone;

    private String email;

    private LocalDate dateOfBirth;

    private Gender gender;

    private String citizenId;

    private String address;

    private BloodType bloodType;

    private String allergyInfo;

    private String medicalHistory;

    private String emergencyContact;

}