package com.ocms.online_clinic_management_system.user.dto.request;
import com.ocms.online_clinic_management_system.common.constant.enums.Gender;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
public class CreateDoctorRequest {

    @NotBlank
    @Size(max = 50)
    private String username;
    @NotBlank
    @Size(min = 8, max = 100)
    private String password;
    @NotBlank
    @Size(max = 100)
    private String fullName;
    @Email
    @NotBlank
    private String email;
    @NotBlank
    private String phone;
    @NotNull
    private LocalDate dateOfBirth;
    @NotNull
    private Gender gender;
    @NotNull
    private Long specialtyId;
    @Size(max = 150)
    private String degree;
    @Min(0)
    private Integer experienceYears;

}