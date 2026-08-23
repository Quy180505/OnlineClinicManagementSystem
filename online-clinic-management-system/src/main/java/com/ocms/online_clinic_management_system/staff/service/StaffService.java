package com.ocms.online_clinic_management_system.staff.service;
import com.ocms.online_clinic_management_system.staff.dto.request.UpdateStaffRequest;
import com.ocms.online_clinic_management_system.staff.dto.response.StaffResponse;
import com.ocms.online_clinic_management_system.user.entity.User;

public interface StaffService {

    void createStaff(User user, String position);
    StaffResponse update(Long staffId, UpdateStaffRequest request);
    StaffResponse findById(Long staffId);

}