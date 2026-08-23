package com.ocms.online_clinic_management_system.auth.oauth2;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ocms.online_clinic_management_system.auth.dto.response.LoginResponse;
import com.ocms.online_clinic_management_system.auth.service.OAuth2Service;
import com.ocms.online_clinic_management_system.common.constant.enums.AuthProvider;
import com.ocms.online_clinic_management_system.user.entity.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final OAuth2Service oauth2Service;
    private final ObjectMapper objectMapper;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {

        OAuth2UserPrincipal principal = (OAuth2UserPrincipal) authentication.getPrincipal();

        User user = User.builder()
                .email(principal.getEmail())
                .fullName(principal.getFullName())
                .provider(AuthProvider.GOOGLE)
                .providerId(principal.getProviderId())
                .build();

        LoginResponse loginResponse =  oauth2Service.loginWithGoogle(user);
        response.setContentType("application/json");

        objectMapper.writeValue(response.getOutputStream(), loginResponse);
    }

}