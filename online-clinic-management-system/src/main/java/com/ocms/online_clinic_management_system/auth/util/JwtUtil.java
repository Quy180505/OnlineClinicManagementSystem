package com.ocms.online_clinic_management_system.auth.util;

import com.ocms.online_clinic_management_system.auth.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JwtUtil {

    private final JwtProvider jwtProvider;

    public String extractUsername(String token) {
        return jwtProvider.getUsername(token);
    }

    public boolean validateToken(String token) {
        return jwtProvider.validate(token);
    }
}