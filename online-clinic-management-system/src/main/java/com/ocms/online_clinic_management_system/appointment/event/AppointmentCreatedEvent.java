package com.ocms.online_clinic_management_system.appointment.event;
import com.ocms.online_clinic_management_system.common.event.BaseEvent;
import com.ocms.online_clinic_management_system.common.event.DomainEvent;
import lombok.Getter;

@Getter
public class AppointmentCreatedEvent extends BaseEvent implements DomainEvent {

    private final Long appointmentId;
    private final Long patientId;
    private final Long doctorId;
    private final Long serviceId;
    private final Long scheduleId;
    private final Long patientUserId;

    public AppointmentCreatedEvent(Long appointmentId, Long patientId, Long doctorId, Long serviceId, Long scheduleId, Long patientUserId) {
        this.appointmentId = appointmentId;
        this.patientId = patientId;
        this.doctorId = doctorId;
        this.serviceId = serviceId;
        this.scheduleId = scheduleId;
        this.patientUserId = patientUserId;
    }
}