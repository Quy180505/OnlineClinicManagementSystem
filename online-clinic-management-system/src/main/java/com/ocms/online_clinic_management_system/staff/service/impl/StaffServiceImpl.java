package com.ocms.online_clinic_management_system.staff.service.impl;

import com.ocms.online_clinic_management_system.staff.dto.request.UpdateStaffRequest;
import com.ocms.online_clinic_management_system.staff.dto.response.StaffResponse;
import com.ocms.online_clinic_management_system.staff.entity.Staff;
import com.ocms.online_clinic_management_system.staff.exception.StaffNotFoundException;
import com.ocms.online_clinic_management_system.staff.mapper.StaffMapper;
import com.ocms.online_clinic_management_system.staff.repository.StaffRepository;
import com.ocms.online_clinic_management_system.staff.service.StaffService;
import com.ocms.online_clinic_management_system.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class StaffServiceImpl implements StaffService {

    private final StaffRepository staffRepository;
    private final StaffMapper staffMapper;
    @Override
    public void createStaff(User user, String position){
        Staff staff = Staff.builder().user(user).position(position).build();
        staffRepository.save(staff);
    }

    @Override
    public StaffResponse update(Long staffId, UpdateStaffRequest request){
        Staff staff = findEntity(staffId);
        staffMapper.updateStaffFromRequest(request, staff);
        return staffMapper.toStaffResponse(staff);
    }

    @Override
    @Transactional(readOnly = true)
    public StaffResponse findById(Long staffId){

        return staffMapper.toStaffResponse(findEntity(staffId));
    }
    private Staff findEntity(Long id){
        return staffRepository.findById(id).orElseThrow(StaffNotFoundException::new);
    }
}