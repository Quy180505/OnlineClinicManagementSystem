package com.ocms.online_clinic_management_system.auth.service;

import com.ocms.online_clinic_management_system.auth.dto.response.LoginResponse;
import com.ocms.online_clinic_management_system.user.entity.User;

public interface OAuth2Service {

    LoginResponse loginWithGoogle(User googleUser);


}