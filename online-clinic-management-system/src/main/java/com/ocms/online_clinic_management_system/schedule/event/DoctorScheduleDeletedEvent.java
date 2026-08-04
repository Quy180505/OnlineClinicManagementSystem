package com.ocms.online_clinic_management_system.schedule.event;

import com.ocms.online_clinic_management_system.common.event.BaseEvent;
import com.ocms.online_clinic_management_system.common.event.DomainEvent;
import lombok.Getter;

@Getter
public class DoctorScheduleDeletedEvent extends BaseEvent implements DomainEvent {

    private final Long scheduleId;
    private final Long doctorId;

    public DoctorScheduleDeletedEvent(Long scheduleId, Long doctorId) {
        this.scheduleId = scheduleId;
        this.doctorId = doctorId;
    }

}