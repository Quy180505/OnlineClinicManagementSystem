package com.ocms.online_clinic_management_system.user.validator;

import com.ocms.online_clinic_management_system.common.exception.ErrorCode;
import com.ocms.online_clinic_management_system.user.dto.request.CreateDoctorRequest;
import com.ocms.online_clinic_management_system.user.dto.request.CreateStaffRequest;
import com.ocms.online_clinic_management_system.user.exception.InvalidRoleException;
import com.ocms.online_clinic_management_system.user.exception.UserAlreadyExistsException;
import com.ocms.online_clinic_management_system.user.repository.RoleRepository;
import com.ocms.online_clinic_management_system.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserValidator {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public void validateCreateDoctor(CreateDoctorRequest request) {
        validateUsername(request.getUsername());
        validateEmail(request.getEmail());
        validatePhone(request.getPhone());

    }

    public void validateCreateStaff(CreateStaffRequest request) {
        validateUsername(request.getUsername());
        validateEmail(request.getEmail());
        validatePhone(request.getPhone());
    }

    private void validateUsername(String username) {
        if (userRepository.existsByUsername(username)) {
            throw new UserAlreadyExistsException(ErrorCode.USERNAME_ALREADY_EXISTS);
        }
    }

    private void validateEmail(String email) {
        if (userRepository.existsByEmail(email)) {
            throw new UserAlreadyExistsException(ErrorCode.EMAIL_ALREADY_EXISTS);
        }

    }
    private void validatePhone(String phone) {
        if (phone != null && userRepository.existsByPhone(phone)) {
            throw new UserAlreadyExistsException(ErrorCode.PHONE_ALREADY_EXISTS);
        }
    }

    public void validateRoleExists(String roleName) {
        roleRepository.findByRoleName(roleName).orElseThrow(InvalidRoleException::new);
    }

}