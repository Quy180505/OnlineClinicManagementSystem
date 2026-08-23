package com.ocms.online_clinic_management_system.appointment.event;
import com.ocms.online_clinic_management_system.common.event.BaseEvent;
import com.ocms.online_clinic_management_system.common.event.DomainEvent;
import lombok.Getter;

@Getter
public class AppointmentCancelledEvent extends BaseEvent implements DomainEvent {

    private final Long appointmentId;
    private final Long patientId;
    private final Long patientUserId;
    private final Long doctorId;

    public AppointmentCancelledEvent(Long appointmentId, Long patientId, Long patientUserId, Long doctorId) {
        this.appointmentId = appointmentId;
        this.patientId = patientId;
        this.patientUserId = patientUserId;
        this.doctorId = doctorId;
    }
}