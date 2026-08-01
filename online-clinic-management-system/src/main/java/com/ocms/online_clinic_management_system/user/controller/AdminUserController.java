package com.ocms.online_clinic_management_system.user.controller;

import com.ocms.online_clinic_management_system.common.response.ApiResponse;
import com.ocms.online_clinic_management_system.user.dto.request.*;
import com.ocms.online_clinic_management_system.user.dto.response.UserDetailResponse;
import com.ocms.online_clinic_management_system.user.dto.response.UserResponse;
import com.ocms.online_clinic_management_system.user.dto.response.UserSummaryResponse;
import com.ocms.online_clinic_management_system.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class AdminUserController {

    private final UserService userService;

    @PostMapping("/doctor")
    public ApiResponse<UserResponse> createDoctor(@Valid @RequestBody CreateDoctorRequest request) {
        return ApiResponse.success(userService.createDoctor(request));
    }

    @PostMapping("/staff")
    public ApiResponse<UserResponse> createStaff(@Valid @RequestBody CreateStaffRequest request) {
        return ApiResponse.success(userService.createStaff(request));
    }

    @PatchMapping("/{id}")
    public ApiResponse<UserDetailResponse> updateUser(@PathVariable Long id, @Valid @RequestBody UpdateUserRequest request) {
        return ApiResponse.success(userService.updateUser(id, request));
    }

    @PatchMapping("/{id}/role")
    public ApiResponse<UserDetailResponse> updateRole(@PathVariable Long id, @Valid @RequestBody UpdateUserRoleRequest request) {
        return ApiResponse.success(userService.updateRole(id, request));
    }

    @PatchMapping("/{id}/status")
    public ApiResponse<UserDetailResponse> updateStatus(@PathVariable Long id, @Valid @RequestBody UpdateUserStatusRequest request) {
        return ApiResponse.success(userService.updateStatus(id, request));
    }

    @GetMapping("/{id}")
    public ApiResponse<UserDetailResponse> getById(@PathVariable Long id) {
        return ApiResponse.success(userService.findById(id));
    }

    @PostMapping("/search")
    public ApiResponse<Page<UserSummaryResponse>> search(@RequestBody UserSearchRequest request) {
        return ApiResponse.success(userService.search(request));
    }

}