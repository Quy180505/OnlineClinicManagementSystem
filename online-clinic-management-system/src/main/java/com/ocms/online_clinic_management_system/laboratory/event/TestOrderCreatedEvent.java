package com.ocms.online_clinic_management_system.laboratory.event;
import com.ocms.online_clinic_management_system.common.event.BaseEvent;
import com.ocms.online_clinic_management_system.common.event.DomainEvent;
import lombok.Getter;

@Getter
public class TestOrderCreatedEvent extends BaseEvent implements DomainEvent {

    private final Long testOrderId;
    private final Long medicalRecordId;
    private final Long patientId;
    private final Long patientUserId;
    private final Long doctorId;

    public TestOrderCreatedEvent(Long testOrderId, Long medicalRecordId, Long patientId,   Long patientUserId, Long doctorId) {
        this.testOrderId = testOrderId;
        this.medicalRecordId = medicalRecordId;
        this.patientId = patientId;
        this.patientUserId = patientUserId;
        this.doctorId = doctorId;
    }
}