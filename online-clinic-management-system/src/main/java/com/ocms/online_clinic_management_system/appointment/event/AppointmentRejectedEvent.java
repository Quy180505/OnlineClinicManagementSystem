package com.ocms.online_clinic_management_system.appointment.event;

import com.ocms.online_clinic_management_system.common.event.BaseEvent;
import com.ocms.online_clinic_management_system.common.event.DomainEvent;
import lombok.Getter;

@Getter
public class AppointmentRejectedEvent extends BaseEvent implements DomainEvent {

    private final Long appointmentId;
    private final Long patientId;
    private final Long doctorId;
    private final Long patientUserId;
    private final String reason;

    public AppointmentRejectedEvent(Long appointmentId, Long patientId, Long doctorId,  Long patientUserId,String reason) {
        this.appointmentId = appointmentId;
        this.patientId = patientId;
        this.doctorId = doctorId;
        this.patientUserId = patientUserId;
        this.reason=reason;
    }
}