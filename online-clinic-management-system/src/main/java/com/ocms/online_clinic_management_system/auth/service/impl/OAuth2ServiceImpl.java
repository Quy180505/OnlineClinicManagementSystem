package com.ocms.online_clinic_management_system.auth.service.impl;
import com.ocms.online_clinic_management_system.auth.dto.response.LoginResponse;
import com.ocms.online_clinic_management_system.auth.dto.response.TokenResponse;
import com.ocms.online_clinic_management_system.auth.jwt.JwtProvider;
import com.ocms.online_clinic_management_system.auth.security.UserPrincipal;
import com.ocms.online_clinic_management_system.auth.service.OAuth2Service;
import com.ocms.online_clinic_management_system.common.constant.enums.AuthProvider;
import com.ocms.online_clinic_management_system.common.event.DomainEventPublisher;
import com.ocms.online_clinic_management_system.patient.service.PatientService;
import com.ocms.online_clinic_management_system.user.entity.Role;
import com.ocms.online_clinic_management_system.user.entity.User;
import com.ocms.online_clinic_management_system.user.event.UserCreatedEvent;
import com.ocms.online_clinic_management_system.user.exception.InvalidRoleException;
import com.ocms.online_clinic_management_system.user.repository.RoleRepository;
import com.ocms.online_clinic_management_system.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class OAuth2ServiceImpl implements OAuth2Service {

    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PatientService patientService;
    private final DomainEventPublisher eventPublisher;

    @Override
    public LoginResponse loginWithGoogle(User googleUser) {

        User user = userRepository.findByEmail(googleUser.getEmail()).orElseGet(() -> registerGoogleUser(googleUser));
        UserPrincipal principal = UserPrincipal.create(user);
        String accessToken = jwtProvider.generateToken(principal);

        return LoginResponse.builder()
                .userId(user.getId())
                .username(user.getUsername())
                .fullName(user.getFullName())
                .role(user.getRole().getRoleName())
                .token(TokenResponse.builder().accessToken(accessToken).tokenType("Bearer").expiresIn(jwtProvider.getExpiration() / 1000).build())
                .build();
    }
    private User registerGoogleUser(User googleUser) {

        Role patientRole = roleRepository.findByRoleName("ROLE_PATIENT").orElseThrow(InvalidRoleException::new);
        googleUser.setRole(patientRole);
        googleUser.setProvider(AuthProvider.GOOGLE);
        googleUser.setUsername("google_" + googleUser.getProviderId());
        User savedUser = userRepository.save(googleUser);

        patientService.createPatient(savedUser);
        eventPublisher.publish(new UserCreatedEvent(savedUser.getId(), savedUser.getUsername(), savedUser.getRole().getRoleName()));

        return savedUser;
    }

}
