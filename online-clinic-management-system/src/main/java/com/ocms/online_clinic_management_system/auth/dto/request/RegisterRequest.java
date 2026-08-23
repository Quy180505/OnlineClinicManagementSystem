package com.ocms.online_clinic_management_system.auth.dto.request;
import com.ocms.online_clinic_management_system.common.constant.enums.Gender;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
public class RegisterRequest {

    @NotBlank
    private String username;
    @NotBlank
    private String password;
    @NotBlank
    private String fullName;
    @Email
    private String email;
    private String phone;
    private LocalDate dateOfBirth;
    private Gender gender;

}