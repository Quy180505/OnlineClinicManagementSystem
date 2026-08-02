package com.ocms.online_clinic_management_system.patient.event;

import com.ocms.online_clinic_management_system.common.event.BaseEvent;
import com.ocms.online_clinic_management_system.common.event.DomainEvent;
import lombok.Getter;

@Getter
public class PatientUpdateEvent extends BaseEvent implements DomainEvent {

    private final Long patientId;
    private final Long userId;

    public PatientUpdateEvent(Long patientId, Long userId) {
        this.patientId = patientId;
        this.userId = userId;
    }

}