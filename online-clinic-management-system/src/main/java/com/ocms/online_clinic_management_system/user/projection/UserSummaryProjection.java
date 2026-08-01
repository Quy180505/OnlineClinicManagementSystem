package com.ocms.online_clinic_management_system.user.projection;


import com.ocms.online_clinic_management_system.common.constant.enums.UserStatus;

public interface UserSummaryProjection {

    Long getId();

    String getUsername();

    String getFullName();

    String getEmail();

    UserStatus getStatus();

    String getRoleName();

}