package com.ocms.online_clinic_management_system.user.event;

import com.ocms.online_clinic_management_system.common.event.BaseEvent;
import com.ocms.online_clinic_management_system.common.event.DomainEvent;
import lombok.Getter;

@Getter
public class UserCreatedEvent extends BaseEvent implements DomainEvent {

    private final Long userId;

    private final String username;

    private final String role;

    public UserCreatedEvent(Long userId, String username, String role) {
        this.userId = userId;
        this.username = username;
        this.role = role;
    }

}