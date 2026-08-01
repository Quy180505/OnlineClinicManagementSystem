package com.ocms.online_clinic_management_system.common.event;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public abstract class BaseEvent {

    private final LocalDateTime occurredOn;

    protected BaseEvent() {
        this.occurredOn = LocalDateTime.now();
    }

}