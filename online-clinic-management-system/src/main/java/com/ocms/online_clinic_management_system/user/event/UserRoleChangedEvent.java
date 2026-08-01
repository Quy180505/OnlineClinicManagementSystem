package com.ocms.online_clinic_management_system.user.event;

import com.ocms.online_clinic_management_system.common.event.BaseEvent;
import com.ocms.online_clinic_management_system.common.event.DomainEvent;
import lombok.Getter;

@Getter
public class UserRoleChangedEvent extends BaseEvent implements DomainEvent {

    private final Long userId;

    private final String oldRole;

    private final String newRole;

    public UserRoleChangedEvent(
            Long userId,
            String oldRole,
            String newRole
    ) {
        this.userId = userId;
        this.oldRole = oldRole;
        this.newRole = newRole;
    }

}