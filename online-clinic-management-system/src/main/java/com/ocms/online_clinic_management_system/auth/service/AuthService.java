package com.ocms.online_clinic_management_system.auth.service;
import com.ocms.online_clinic_management_system.auth.dto.request.LoginRequest;
import com.ocms.online_clinic_management_system.auth.dto.request.RegisterRequest;
import com.ocms.online_clinic_management_system.auth.dto.response.LoginResponse;


public interface AuthService {

    LoginResponse register(RegisterRequest request);
    LoginResponse login(LoginRequest request);

}