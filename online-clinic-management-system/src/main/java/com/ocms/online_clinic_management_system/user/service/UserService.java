package com.ocms.online_clinic_management_system.user.service;
import com.ocms.online_clinic_management_system.user.dto.request.*;
import com.ocms.online_clinic_management_system.user.dto.response.*;
import org.springframework.data.domain.Page;

public interface UserService {

    UserResponse createDoctor(CreateDoctorRequest request);
    UserResponse createStaff(CreateStaffRequest request);
    UserDetailResponse updateUser(Long userId, UpdateUserRequest request);
    UserDetailResponse updateRole(Long userId, UpdateUserRoleRequest request);
    UserDetailResponse updateStatus(Long userId, UpdateUserStatusRequest request);
    UserDetailResponse findById(Long userId);
    Page<UserSummaryResponse> search(UserSearchRequest request);

}