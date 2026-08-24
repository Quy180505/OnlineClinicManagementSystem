package com.ocms.online_clinic_management_system.common.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "pagination.user")
public class UserPaginationProperties {

    private int pageSize = 5;
}