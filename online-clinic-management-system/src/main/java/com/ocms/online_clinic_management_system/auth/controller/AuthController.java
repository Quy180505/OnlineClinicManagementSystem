package com.ocms.online_clinic_management_system.auth.controller;
import com.ocms.online_clinic_management_system.auth.dto.request.LoginRequest;
import com.ocms.online_clinic_management_system.auth.dto.request.RegisterRequest;
import com.ocms.online_clinic_management_system.auth.dto.response.LoginResponse;
import com.ocms.online_clinic_management_system.auth.service.AuthService;
import com.ocms.online_clinic_management_system.common.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        return ApiResponse.success(authService.login(request));
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<LoginResponse>> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.<LoginResponse>builder().success(true).message("Register successfully.").data(authService.register(request)).build());
    }


}