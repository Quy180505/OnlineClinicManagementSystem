package com.ocms.online_clinic_management_system.staff.dto.response;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class StaffResponse {

    private Long id;
    private Long userId;
    private String fullName;
    private String position;

}