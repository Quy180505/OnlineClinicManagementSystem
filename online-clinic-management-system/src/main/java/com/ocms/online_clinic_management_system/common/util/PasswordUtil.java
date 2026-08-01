package com.ocms.online_clinic_management_system.common.util;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
public class PasswordUtil {


    private final PasswordEncoder encoder;


    public String encode(String password){

        return encoder.encode(password);

    }


    public boolean matches(
            String raw,
            String encoded
    ){

        return encoder.matches(raw, encoded);

    }

}