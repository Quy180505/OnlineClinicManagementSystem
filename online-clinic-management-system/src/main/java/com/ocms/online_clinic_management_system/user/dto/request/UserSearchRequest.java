package com.ocms.online_clinic_management_system.user.dto.request;
import com.ocms.online_clinic_management_system.common.constant.enums.UserStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserSearchRequest {

    private String keyword;
    private String roleName;
    private UserStatus status;
    private Integer page = 0;
}