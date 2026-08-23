package com.ocms.online_clinic_management_system.user.validator;
import com.ocms.online_clinic_management_system.auth.dto.request.RegisterRequest;
import com.ocms.online_clinic_management_system.common.exception.ErrorCode;
import com.ocms.online_clinic_management_system.user.exception.UserAlreadyExistsException;
import com.ocms.online_clinic_management_system.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RegisterValidator {

    private final UserRepository userRepository;

    public void validate(RegisterRequest request) {

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new UserAlreadyExistsException(ErrorCode.USERNAME_ALREADY_EXISTS);
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new UserAlreadyExistsException(ErrorCode.EMAIL_ALREADY_EXISTS);
        }

        if (userRepository.existsByPhone(request.getPhone())) {
            throw new UserAlreadyExistsException(ErrorCode.PHONE_ALREADY_EXISTS);
        }

    }

}