package com.ocms.online_clinic_management_system.user.event;
import com.ocms.online_clinic_management_system.common.event.BaseEvent;
import com.ocms.online_clinic_management_system.common.event.DomainEvent;
import lombok.Getter;

@Getter
public class UserLockedEvent extends BaseEvent implements DomainEvent {

    private final Long userId;

    public UserLockedEvent(Long userId) {
        this.userId = userId;
    }

}