package com.ocms.online_clinic_management_system.auth.service.impl;
import com.ocms.online_clinic_management_system.auth.dto.request.LoginRequest;
import com.ocms.online_clinic_management_system.auth.dto.request.RegisterRequest;
import com.ocms.online_clinic_management_system.auth.dto.response.LoginResponse;
import com.ocms.online_clinic_management_system.auth.dto.response.TokenResponse;
import com.ocms.online_clinic_management_system.auth.jwt.JwtProvider;
import com.ocms.online_clinic_management_system.auth.security.UserPrincipal;
import com.ocms.online_clinic_management_system.auth.service.AuthService;
import com.ocms.online_clinic_management_system.common.constant.enums.AuthProvider;
import com.ocms.online_clinic_management_system.common.event.DomainEventPublisher;
import com.ocms.online_clinic_management_system.common.util.PasswordUtil;
import com.ocms.online_clinic_management_system.patient.service.PatientService;
import com.ocms.online_clinic_management_system.user.entity.Role;
import com.ocms.online_clinic_management_system.user.entity.User;
import com.ocms.online_clinic_management_system.user.event.UserCreatedEvent;
import com.ocms.online_clinic_management_system.user.exception.InvalidRoleException;
import com.ocms.online_clinic_management_system.user.repository.RoleRepository;
import com.ocms.online_clinic_management_system.user.repository.UserRepository;
import com.ocms.online_clinic_management_system.user.validator.RegisterValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PatientService patientService;
    private final DomainEventPublisher eventPublisher;
    private final RegisterValidator registerValidator;
    private final PasswordUtil passwordUtil;


    @Override
    public LoginResponse register(RegisterRequest request) {

        registerValidator.validate(request);
        Role patientRole = roleRepository.findByRoleName("ROLE_PATIENT").orElseThrow(InvalidRoleException::new);

        User user = User.builder()
                .username(request.getUsername())
                .password(passwordUtil.encode(request.getPassword()))
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .dateOfBirth(request.getDateOfBirth())
                .gender(request.getGender())
                .provider(AuthProvider.LOCAL)
                .role(patientRole)
                .build();

        User savedUser = userRepository.save(user);
        patientService.createPatient(savedUser);
        eventPublisher.publish(new UserCreatedEvent(savedUser.getId(), savedUser.getUsername(), patientRole.getRoleName()));

        UserPrincipal principal = new UserPrincipal(savedUser);
        String accessToken = jwtProvider.generateToken(principal);

        return LoginResponse.builder()
                .userId(savedUser.getId())
                .username(savedUser.getUsername())
                .fullName(savedUser.getFullName())
                .role(patientRole.getRoleName())
                .token(TokenResponse.builder().accessToken(accessToken).tokenType("Bearer").build())
                .build();
    }


    @Override
    @Transactional(readOnly = true)
    public LoginResponse login(LoginRequest request) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();

        String accessToken = jwtProvider.generateToken(principal);

        return LoginResponse.builder()
                .userId(principal.getId())
                .username(principal.getUsername())
                .fullName(principal.getFullName())
                .role(principal.getRole())
                .token(TokenResponse.builder().accessToken(accessToken).tokenType("Bearer").expiresIn(jwtProvider.getExpiration() / 1000).build())
                .build();
    }


}